import { Button, Typography, Box, Grid } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import YoutubeEmbed from "./youtubeVideoComponent";

const useStyles = makeStyles((theme) => {
  return {
    jumbotron: {
      width: "100%",
      backgroundColor: theme.palette.darkBackground.main,
      height: "100%",
      minHeight: "300px",
      display: "flex",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
    },
  };
});

const Jumbotron = ({
  title,
  subtitle,
  button,
  buttonLink,
  isHomePage = false,
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  if (!isHomePage)
    return (
      <div
        className={styles.jumbotron}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column wrap",
        }}
      >
        <Typography variant="h3" align="center">
          {title}
        </Typography>
        <Typography variant="h6" align="center">
          {subtitle}
        </Typography>
        {button && (
          <Button variant="contained" color="accent">
            <Link className={styles.navLinks} to={buttonLink}>
              {button}
            </Link>
          </Button>
        )}
      </div>
    );
  else
    return (
      <div className={styles.jumbotron}>
        <Grid
          sx={{
            margin: { md: "auto", xs: "20px auto" },
            width: { xs: "100%", md: "70%" },
            height: "100%",
          }}
          container
          alignItems={"center"}
          spacing={0}
        >
          <Grid item xs={12} md={6}>
            <Box
              width={"100%"}
              sx={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" align="left">
                {title}
              </Typography>
              <Typography variant="h6" align="justify">
                {subtitle}
              </Typography>
              {button && (
                <Button variant="contained" color="accent">
                  <Link className={styles.navLinks} to={buttonLink}>
                    {button}
                  </Link>
                </Button>
              )}
              <Box justifyContent={"center"} display={"flex"}>
                <img
                  alt="logo"
                  style={{
                    maxHeight: "20%",
                    width: "50%",
                    alignSelf: "center",
                  }}
                  src="./images/vampire_logo.png"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", height: "350px", alignSelf: "center" }}>
              <YoutubeEmbed embedId={"Zm5WwuYcUwE"} />
            </Box>
          </Grid>
        </Grid>
      </div>
    );
};

export default Jumbotron;
