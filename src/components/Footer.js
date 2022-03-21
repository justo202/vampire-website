import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";

const styles = makeStyles((theme) => {
  return {
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
      '&:hover': {
          color: theme.palette.accent.main
      }
    },
  };
});

const Footer = () => {
  const theme = useTheme();
  const useStyle = styles(theme);

  return (
    <footer>
      <Box boxShadow={12} bgcolor="lightBackground.main" p={2} mt={2}>
        <Grid container m={'auto'}width={'85%'}spacing={0} >
            <Grid item sx={{ flexDirection: 'column',display: { xs: "inherit", md: "none" }}} p={6} pb={0}>
            <Typography width={'100%'}color={"accent.main"} variant="h5" gutterBottom>
                Navigation
              </Typography>
              <Box>

              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/research"}>
                About
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/team"}>
              Team
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/publications"}>
              Publications
             </Link>
             </Typography>
             <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/news"}>
                News
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/contact"}>
              Contact
             </Link>

              </Typography>

            
              </Box>
      


            </Grid>
            <Grid item xs={12} md={6} p={6}>
              <Box width={'80%'}>
              <Typography color={"accent.main"} variant="h5" gutterBottom>
                Vampire research group
              </Typography>
              <Typography variant="body1" color={'black'}>
                This is just sample text about what the vampire team can be. just one or two sentences is fine but this gives an idea how it can looks.
              </Typography>

              </Box>

            </Grid>
            <Grid item sx={{ display: { xs: "none", md: "inherit" }}}xs={12} md={6} p={6}>
              <Box sx={{display: 'inline-flex'}}>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/research"}>
                About
             </Link>

              </Typography>
              <Typography p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/team"}>
                Team
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/publications"}>
              Publications
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/news"}>
                News
             </Link>

              </Typography>
              <Typography  p={1} pt={0}variant="h6" color={'black'} >
              <Link className={useStyle.navLinks} to={"/contact"}>
                Contact
             </Link>

              </Typography>

              </Box>
             
              
             

            </Grid>

        </Grid>
        {/* <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" borderBottom={1}>
              Research Links
            </Typography>
            <Box>
              <Typography variant="caption" color={"accent.main"}>
                <Link className={useStyle.navLinks} to={"/research"}>
                  Research
                </Link>
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color={"accent.main"}>
                <Link className={useStyle.navLinks} to={"/publications"}>
                  Publications
                </Link>
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color={"accent.main"}>
                <Link className={useStyle.navLinks} to={"/team"}>
                  Team
                </Link>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle2" borderBottom={1}>
              Contact
            </Typography>
            <Box>
              <Typography variant="caption" color={"accent.main"}>
                <Link className={useStyle.navLinks} to={"/contact"}>
                  Contact us
                </Link>
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color={"accent.main"}>
                <Link className={useStyle.navLinks} to={"/"}>
                  Home
                </Link>
              </Typography>
            </Box>
          </Grid>
  </Grid> */}
      </Box>
    </footer>
  );
};

export default Footer;
