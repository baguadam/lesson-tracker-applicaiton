import { Button, TextField } from "@mui/material";

const Login = () => {
  return (
    <>
      <form>
        <TextField variant="standard" label="Email-cím" />
        <TextField variant="standard" label="Jelszó" type="pasword" />
        <Button type="submit" variant="outlined">
          Bejelentkezés
        </Button>
      </form>
    </>
  );
};

export default Login;
