import { TextField } from "@mui/material";
import { CustomInputFieldProps } from "../../utils/types";

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
