import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

function Loader() {
  return (
    <Backdrop
      sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loader;
