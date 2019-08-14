export const PHONE_REGEX = /^(\d{1,2})?(\d{1,5})?(\d{1,4})?$/;
export const CPF_REGEX = /^(\d{1,3})?(\d{1,3})?(\d{1,3})?(\d{1,2})?$/;
export const CEP_REGEX = /^(\d{1,5})?(\d{1,3})?$/;
export const STATE_REGEX = /^[\da-zA-Z]?$/;

export const CardNumberFormatter = (value: string): string => {
  return value
    .replace(/\s?/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim();
};

export const formatter = (str: string, regExp: RegExp, mapFormatter: (v: string, i: number) => void = v => v || '') =>
  str
    .replace(/\D/g, '')
    .match(regExp)
    .filter((v, i) => i && v)
    .map(mapFormatter)
    .join(' ');

export const PhoneNumberFormatter = (phone: string): string =>
  formatter(phone, PHONE_REGEX, (v, i) => (!i ? `(${v})` : v));

export const CepNumberFormatter = (cep: string): string => formatter(cep, CEP_REGEX);

export const CpfNumberFormatter = (cpf: string): string => formatter(cpf, CPF_REGEX);
export const StateFormatter = (state: string): string => state.toUpperCase();

export const ExpirationDateFormatter = (value: string, stateValue: string): string => {
  let formatted: string = value;

  if (formatted[0] !== '1' && formatted[0] !== '0') {
    formatted = '';
  }

  if (formatted.length === 2) {
    if (parseInt(formatted.substring(0, 2), 10) > 12) {
      formatted = formatted[0];
    } else if (stateValue.length === 1) {
      formatted += '/';
    } else {
      formatted = formatted[0];
    }
  }
  return formatted;
};

export const CvvFormatter = (value: string): string => {
  return value;
};

export const CardholderNameFormatter = (value: string): string => {
  return value.toLocaleUpperCase();
};
