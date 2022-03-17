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
      height: "300px",
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
      <div style={{ height: "400px" }} className={styles.jumbotron}>
        <Grid
          xs={{ height: "100%" }}
          container
          direction={"column"}
          alignItems={"center"}
        >
          <Grid
            item
            sx={{
              width: "60%",
              height: "100%",
              display: "inline-flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              width={"55%"}
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
                    width: "60%",
                    alignSelf: "center",
                  }}
                  src="./images/vampire_logo.png"
                />
              </Box>
            </Box>
            <Box width={"43%"} height={"95%"} xs={{ alignSelf: "center" }}>
              <YoutubeEmbed embedId={"Zm5WwuYcUwE"} />
            </Box>
          </Grid>
        </Grid>
      </div>
    );
};

export default Jumbotron;
