export type LoginCredentials = { email: string; password: string };
export type Errors = { email?: string; password?: string };
export interface LoginValidationErrors {
  [key: string]: string;
}