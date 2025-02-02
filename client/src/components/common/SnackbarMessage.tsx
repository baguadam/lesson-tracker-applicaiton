import { Alert, Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";

const SnackbarMessage = ({
  message,
  open,
  handleClose,
}: {
  message: string;
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
}) => {
  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default SnackbarMessage;
