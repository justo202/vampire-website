import react from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const styles = makeStyles(() => {
  return {
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
    },
  };
});

const Footer = () => {
  const useStyle = styles();

  return (
    <footer>
      <Box boxShadow={12} bgcolor="lightBackground.main" p={2} mt={2}>
        <Grid container columnSpacing={2}>
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
        </Grid>
      </Box>
    </footer>
  );
};

export default Footer;
