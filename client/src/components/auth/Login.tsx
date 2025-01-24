import { Button } from "@mui/material";
import "./Login.css";
import CustomInputField from "../common/CustomInputField";
import { ChangeEvent, FormEvent, useState } from "react";
import { Errors, LoginCredentials } from "../../utils/types";
import { validateInputs } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../state/apiSlice";

const Login = () => {
  // **********
  // HOOKS
  // **********
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const dispatch = useDispatch();
  const [sendLogin] = useLoginMutation();

  // **********
  // HANDLERS
  // **********
  const handleCredentialsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = credentials;

    // validation
    const newErrors = validateInputs({ email, password });
    setErrors(newErrors);
    if (Object.keys(newErrors).length !== 0) {
      return;
    }

    // api call
    await sendLogin(credentials)
      .unwrap()
      .then((payload) => {
        console.log(`payload: ${payload}`);
      })
      .catch((e) => {
        console.error(`An error occured during operation: ${e}`);
      });
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={(e) => handleSubmit(e)}>
        <CustomInputField
          label="Email-cím"
          sx={{ marginBottom: "20px" }}
          type="email"
          name="email"
          value={credentials.email}
          error={!!errors.email}
          helperText={errors.email}
          onChange={handleCredentialsChange}
        />
        <CustomInputField
          label="Jelszó"
          sx={{ marginBottom: "30px" }}
          type="password"
          name="password"
          value={credentials.password}
          error={!!errors.password}
          helperText={errors.password}
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
