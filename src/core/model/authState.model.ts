import { Customer } from './customer.model';
export interface AuthState extends Customer {
  refreshToken?: string;
  accessToken?: string;
  expirationTime?: string;
  redirectEventId?: string;
}
