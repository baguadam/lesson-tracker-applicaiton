import { Button } from "@mui/material";
import "./Login.css";
import CustomInputField from "../common/CustomInputField";

const Login = () => {
  return (
    <div className="form-wrapper">
      <form>
        <CustomInputField label="Email-cím" sx={{ marginBottom: "20px" }} />
        <CustomInputField label="Jelszó" sx={{ marginBottom: "30px" }} />
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
