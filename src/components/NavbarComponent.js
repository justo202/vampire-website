import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import LoginForm from "./LoginForm";

const useStyles = makeStyles((theme) => {
  return {
    toolbarHeigh: {
      padding: "35px",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
      "&:hover": {
        color: theme.palette.accent.main,
      },
    },
  };
});

const AccountButton = ({ isLogged, logout, openModal }) => {
  if (!isLogged)
    return (
      <Button
        type="outlined"
        sx={{
          color: "accent.contrastText",
          backgroundColor: "accent.main",
          "&:hover": {
            backgroundColor: "lightBlack.main",
            color: "accent.main",
          },
          my: 2,
          display: "flex",
        }}
        endIcon={<ArrowRightOutlinedIcon />}
        onClick={openModal}
      >
        <Typography textAlign={"center"} variant="h6">
          Login
        </Typography>
      </Button>
    );
  else
    return (
      <Button
        type="outlined"
        sx={{
          color: "accent.contrastText",
          backgroundColor: "accent.main",
          "&:hover": {
            backgroundColor: "lightBackground.main",
            color: "accent.main",
          },
          my: 2,
          display: "flex",
        }}
        endIcon={<ArrowRightOutlinedIcon />}
        onClick={logout}
      >
        <Typography textAlign={"center"} variant="h6">
          Log out
        </Typography>
      </Button>
    );
};

const Navbar = (props) => {
  const { isLogged, signUserOut } = props;
  const theme = useTheme();
  const styles = useStyles(theme);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const pages = [
    {
      name: "Publications",
      url: "/publications",
    },
    {
      name: "Team",
      url: "/team",
    },
    {
      name: "Research",
      url: "/research",
    },
    {
      name: "Contact us",
      url: "/contact",
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
      <AppBar color="lightBlack">
        <Container>
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Link to={"/"}>
                <img
                  alt="logo"
                  width={"130px"}
                  src="./images/vampire_logo.png"
                />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="accent"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, idx) => {
                  return (
                    <MenuItem key={idx} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
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
              variant="h6"
              noWrap
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <Link to={"/"}>
                <img
                  alt="logo"
                  width={"130px"}
                  src="./images/vampire_logo.png"
                />
              </Link>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => (
                <Typography
                  sx={{ m: 1, display: "block" }}
                  key={idx}
                  color="white"
                  variant="h6"
                >
                  {" "}
                  <Link className={styles.navLinks} to={page.url}>
                    {page.name}
                  </Link>
                </Typography>
              ))}
            </Box>
            <AccountButton
              isLogged={isLogged}
              logout={signUserOut}
              openModal={handleOpen}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Login"
        aria-describedby="Login form"
      >
        <Box>
          <LoginForm closeForm={handleClose} />
        </Box>
      </Modal>
      <div className={styles.toolbarHeigh}></div>
    </>
  );
};

export default Navbar;
