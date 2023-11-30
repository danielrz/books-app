import { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  Stack,
  Typography,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Link
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import useUserDetails from "../../hooks/useUserDetails";
import { NavigationMenuFullscreen } from "./NavigationMenuFullscreen";
import { useLinkContext } from "../../providers/linksProvider";
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const { userDetails, signOut } = useUserDetails();
  const linkContext = useLinkContext();

  const [openNav, setOpenNav] = useState(false);

  const handleOpenNav = () => {
    setOpenNav(true);
  };

  const handleCloseNav = () => {
    setOpenNav(false);
  };

  const [linksAnchorEl, setLinkAnchorEl] = useState<null | HTMLElement>(null);
  const linkMenuIsOpen = Boolean(linksAnchorEl);
  const onShowLinksClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setLinkAnchorEl(event.currentTarget);
  };
  const closeLinkMenu = () => {
    setLinkAnchorEl(null);
  };

  return (
    <>
      <NavigationMenuFullscreen open={openNav} handleClose={handleCloseNav} />
      <AppBar position="static" elevation={0}>
        <Container maxWidth="xl" sx={{width: 1, display: 'flex'}}>
          <Box
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton size="large" color="inherit" aria-label="menu" onClick={handleOpenNav}>
                <MenuIcon />
              </IconButton>
            </Box>
            <RouterLink to="/" style={{ textDecoration: 'none' }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 550,
                  fontFamily: "fangsong",
                }}
              >
                Books App
              </Typography>
            </RouterLink>
            <Stack direction="row" spacing={2} alignItems="end">
              <Typography
                sx={{
                  display: { xs: "none", md: "inline" },
                }}
              >
                {userDetails?.firstName} {userDetails?.lastName}
              </Typography>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: "none", md: "inline" },
                }}
              />
              <Stack sx={{
                  display: { xs: "none", md: "inline" },
                }}>
                <Link
                  aria-controls={linkMenuIsOpen ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={linkMenuIsOpen ? 'true' : undefined}
                  onClick={(e) => onShowLinksClick(e)}
                  color="secondary"
                >
                  Useful links
                </Link>
                <Menu
                  anchorEl={linksAnchorEl}
                  open={linkMenuIsOpen}
                  onClose={closeLinkMenu}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  {linkContext.pages.map((page) => (
                    <div key={page.path}>
                      <MenuItem onClick={closeLinkMenu}>
                        <RouterLink to={page.path} style={{ textDecoration: 'none' }} target="_blank">{page.name}</RouterLink>
                      </MenuItem>
                    </div>
                  ))}
                </Menu>
              </Stack>
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  display: { xs: "none", md: "inline" },
                }}
              />
              <Link color="secondary" onClick={() => signOut()}>
                Sign Out
              </Link>
            </Stack>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
