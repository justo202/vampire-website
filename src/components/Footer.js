import {Box, Button, Grid, Modal, Typography} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import {useState} from "react";
import {Link} from "react-router-dom";
import LoginForm from "./LoginForm";

const styles = makeStyles((theme) => {
  return {
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
      padding: 0,
      "&:hover": {
        color: theme.palette.accent.main,
      },
    },
    footerPos: {
      bottom: 0,
      left: 0,
      width: "100%",
      marginTop: "auto",
      color: "white",
      position: "relative",
    },
    decoration: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      zIndex: 1,
    },
    loginButton: {
      height: "fit-content", 
      padding: "0.2rem",
      color: 'white',
      borderColor: 'white',
      "&:hover": {
        color: theme.palette.accent.main,
      }
    }
  };
});

const Footer = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const useStyle = styles(theme);

  return (
    <footer className={useStyle.footerPos}>
      <Box boxShadow={12} bgcolor='lightBlack.main' p={2}>
        <Grid
          container
          m={"auto"}
          width={"100%"}
          sx={{maxWidth: "1100px"}}
          spacing={0}
        >
          <Grid
            item
            sx={{
              flexDirection: "column",
              display: {xs: "inherit", md: "none"},
            }}
            p={6}
            pb={0}
          >
            <Typography
              width={"100%"}
              color={"accent.main"}
              variant='h5'
              gutterBottom
            >
              Navigation
            </Typography>
            <Box>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/research"}>
                  About
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/team"}>
                  Team
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/publications"}>
                  Publications
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/news"}>
                  News
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/contact"}>
                  Contact
                </Link>
              </Typography>
              <Button
                className={useStyle.loginButton}
                color='accent'
                variant='outlined'
                onClick={handleOpen}
              >
                <Typography
                  variant='h6'
                  sx={{padding: '0', textTransform: "none"}}
                >
                  Editor Login
                </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={5} p={6}>
            <Box sx={{position: "relative", zIndex: 99}} width={"80%"}>
              <Typography color={"accent.main"} variant='h5' gutterBottom>
                Vampire research group
              </Typography>
              <Typography variant='body1' color={"white"}>
                This is just sample text about what the vampire team can be.
                just one or two sentences is fine but this gives an idea how it
                can looks.
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            sx={{display: {xs: "none", md: "inherit"}}}
            xs={12}
            md={7}
            p={6}
          >
            <Box sx={{display: "inline-flex"}}>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/research"}>
                  About
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/team"}>
                  Team
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/publications"}>
                  Publications
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/news"}>
                  News
                </Link>
              </Typography>
              <Typography p={1} pt={0} variant='h6' color={"white"}>
                <Link className={useStyle.navLinks} to={"/contact"}>
                  Contact
                </Link>
              </Typography>
              <Button
                className={useStyle.loginButton}
                color='accent'
                variant='outlined'
                onClick={handleOpen}
              >
                <Typography
                  variant='h6'
                  sx={{padding: '0', textTransform: "none"}}
                >
                  Editor Login
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='Login'
        aria-describedby='Login form'
      >
        <Box>
          <LoginForm closeForm={handleClose} />
        </Box>
      </Modal>
      <img
        src='/images/footer_decoration.svg'
        alt='decoration'
        className={useStyle.decoration}
      />
    </footer>
  );
};

export default Footer;
