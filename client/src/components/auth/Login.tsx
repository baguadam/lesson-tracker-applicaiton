import { Button } from "@mui/material";
import "./Login.css";
import CustomInputField from "../common/CustomInputField";
import { ChangeEvent, FormEvent, useState } from "react";

type Credentials = { email: string; password: string };

const Login = () => {
  // HOOKS
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  // HANDLERS
  const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInputField
          label="Email-cím"
          sx={{ marginBottom: "20px" }}
          name="email"
          value={credentials.email}
          onChange={handleCredentialsChange}
        />
        <CustomInputField
          label="Jelszó"
          sx={{ marginBottom: "30px" }}
          name="password"
          value={credentials.password}
          onChange={handleCredentialsChange}
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ color: "white", borderColor: "black", height: "40px" }}
        >
          Bejelentkezés
        </Button>
      </form>
    </div>
  );
};

export default Login;
