import { Box } from "@mui/material";
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        onClose={handleClose}
        message={message}
      />
    </Box>
  );
};
export default SnackbarMessage;
