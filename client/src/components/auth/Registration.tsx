import { Button, InputLabel, MenuItem, Select } from "@mui/material";
import CustomInputField from "../common/CustomInputField";

import "../../styles/Forms.css";

const Registration = () => {
  // HANDLERS
  const handleSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <CustomInputField
          label="Email-cím"
          sx={{ marginBottom: "20px" }}
          type="email"
          name="email"
        />
        <CustomInputField
          label="Jelszó"
          sx={{ marginBottom: "20px" }}
          type="password"
          name="password"
        />
        <CustomInputField
          label="Jelszó újra"
          sx={{ marginBottom: "20px" }}
          type="password"
          name="password-again"
        />
        <InputLabel
          id="subject-select-label"
          sx={{ color: "white", marginBottom: "10px" }}
        >
          Oktatott tárgyak
        </InputLabel>
        <Select
          labelId="subject-select-label"
          id="subject-select"
          label="Oktatott tárgyak"
          value="maths"
          sx={{ color: "white", marginBottom: "20px" }}
        >
          <MenuItem value="maths">Matematika</MenuItem>
          <MenuItem value="it">Informatika</MenuItem>
          <MenuItem value="physics">Fizika</MenuItem>
          <MenuItem value="english">Angol</MenuItem>
          <MenuItem value="hungarian">Magyar nyelv és irodalom</MenuItem>
        </Select>
        <Button
          type="submit"
          variant="outlined"
          sx={{ color: "white", borderColor: "black", height: "40px" }}
        >
          Regisztráció
        </Button>
      </form>
    </div>
  );
};

export default Registration;
