export const STATE_REGEX = /^[\da-zA-Z]?$/;
export const CEP_REGEX = /^(\d{1,5})?(\d{1,3})?$/;
export const CARD_NUMBER_REGEX = /^(\d{4})(\d{4})(\d{4})(\d{4})$/;
export const PHONE_REGEX = /^(\d{1,2})?(\d{1,5})?(\d{1,4})?$/;
export const CPF_REGEX = /^(\d{1,3})?(\d{1,3})?(\d{1,3})?(\d{1,2})?$/;
export const CARD_NUMBER_FORMATTER_REGEX = /^(\d{1,4})?(\d{1,4})?(\d{1,4})?(\d{1,4})?$/;

export const formatter = (value: string, regExp: RegExp, mapFormatter: (v: string, i: number) => void = (v) => v || '') =>
  value
    .replace(/\D/g, '')
    .match(regExp)
    .filter((v, i) => i && v)
    .map(mapFormatter)
    .join(' ');

export const PhoneNumberFormatter = (phone: string): string => {
  const onlyNumbers = phone.replace(/\D/g, '').substr(0, 11);

  const groups = [
    onlyNumbers.substr(0, 2),
    onlyNumbers.substr(2, onlyNumbers.length === 11 ? 5 : 4),
    onlyNumbers.substr(onlyNumbers.length === 11 ? 7 : 6),
  ];

  if (onlyNumbers.length <= 2) {
    return groups[0];
  }

  if (onlyNumbers.length <= 6) {
    return `(${groups[0]}) ${groups[1]}`;
  }

  return `(${groups[0]}) ${groups[1]}-${groups[2]}`;
};

export const CepNumberFormatter = (cep: string): string => formatter(cep, CEP_REGEX);

export const CpfNumberFormatter = (cpf: string): string => formatter(cpf, CPF_REGEX);

export const CardNumberFormatter = (cardNumber: string) => formatter(cardNumber, CARD_NUMBER_FORMATTER_REGEX);

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

export const CardHolderNameFormatter = (value: string): string => {
  return value;
};
