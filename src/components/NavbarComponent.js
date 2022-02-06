import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import {Link} from "react-router-dom";

const useStyles = makeStyles(() => {
  return {
    toolbarHeigh: {
      padding: "35px",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
    },
  };
});
const Navbar = () => {
  const styles = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Publications",
      url: "/publications",
    },
    {
      name: "Team",
      url: "/team",
    },
    {
      name: "About us",
      url: "/about",
    },
    {
      name: "Contact us",
      url: "contact",
    },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar color='lightBackground'>
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant='h6'
              noWrap
              sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}
            >
              LOGO
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: "block", md: "none"},
                }}
              >
                {pages.map((page, idx) => {
                  return (
                    <MenuItem key={idx} onClick={handleCloseNavMenu}>
                      <Typography textAlign='center'>
                        <Link className={styles.navLinks} to={page.url}>
                          {page.name}
                        </Link>
                      </Typography>
                    </MenuItem>
                  );
                })}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
            >
              LOGO
            </Typography>
            <Box sx={{display: {xs: "none", md: "flex"}}}>
              {pages.map((page, idx) => (
                <Button color='accent' key={idx} sx={{my: 2, display: "block"}}>
                  <Link className={styles.navLinks} to={page.url}>
                    <Typography variant='h6'>{page.name}</Typography>
                  </Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className={styles.toolbarHeigh}></div>
    </>
  );
};

export default Navbar;
