import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItemButton,
  Slide,
  Toolbar,
  Typography,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import { Routes, Link } from "react-router-dom";
import { useLinkContext } from "../../providers/linksProvider";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface NavigationMenuProps {
  open: boolean;
  handleClose: () => void;
}

export const NavigationMenuFullscreen = ({
  open,
  handleClose,
}: NavigationMenuProps) => {

  const linkContext = useLinkContext();

  return (
    
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <Routes>

      </Routes>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Books App
          </Typography>
        </Toolbar>
      </AppBar>
      <List disablePadding>
        {linkContext.pages.map((page) => (
          <div key={page.path}>
            <ListItemButton
              sx={{ py: 3 }}
              onClick={handleClose}
            >
              <Link to={page.path} style={{ textDecoration: 'none' }} target="_blank">{page.name}</Link>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </Dialog>
  );
};