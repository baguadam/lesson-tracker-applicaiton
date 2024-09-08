import { LoginValidationErrors } from "./types";

export const validateInputs = (values: {
  [key: string]: string;
}): LoginValidationErrors => {
  const newErrors: LoginValidationErrors = {};

  for (const [key, value] of Object.entries(values)) {
    if (value.trim() === "") {
      newErrors[key] = `${
        key.charAt(0).toUpperCase() + key.slice(1)
      } is required!`;
    }
  }

  return newErrors;
};
