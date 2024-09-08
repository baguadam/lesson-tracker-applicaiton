import { Theme } from "@emotion/react";
import { SxProps, TextField, TextFieldVariants } from "@mui/material";

interface CustomInputFieldProps {
  label: string;
  type?: string;
  variant?: TextFieldVariants;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}

const CustomInputField = ({
  label,
  type = "text",
  variant = "standard",
  sx = {},
  ...props
}: CustomInputFieldProps) => {
  return (
    <TextField
      label={label}
      type={type}
      variant={variant}
      sx={{
        input: { color: "white" },
        "& .MuiInputLabel-root": { color: "white" },
        ...sx,
      }}
      {...props}
    />
  );
};

export default CustomInputField;
