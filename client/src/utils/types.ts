import { Theme } from "@emotion/react";
import { SxProps, TextFieldVariants } from "@mui/material";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Errors {
  email?: string;
  password?: string;
}

export interface LoginValidationErrors {
  [key: string]: string;
}

export interface LoginError {
  isError: boolean;
  errorMessage: string;
}

export interface Token {
  token: string;
}

export interface CustomInputFieldProps {
  label: string;
  type?: string;
  variant?: TextFieldVariants;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}
