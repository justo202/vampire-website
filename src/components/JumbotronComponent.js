import { Button, Typography, Box, Grid, Modal } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import React, {useState} from "react";
import { Link } from "react-router-dom";
import YoutubeEmbed from "./youtubeVideoComponent";

const useStyles = makeStyles((theme) => {
  return {
    jumbotron: {
      width: "100%",
      backgroundColor: theme.palette.lightBlack.main,
      height: "100%",
      minHeight: '300px',
      display: "flex",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
      fontSize: '1.2rem'
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const theme = useTheme();
  const styles = useStyles(theme);

    return (
      <>
      <div
        className={styles.jumbotron}
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexFlow: "column wrap",
          color: 'white'
        }}
      >
        <Typography sx={{font: 'normal normal bold 63px/83px Roboto'}} color='#fff' align="center">
          {title}
        </Typography>
        <Typography variant="h6" align="center">
          {subtitle}
        </Typography>
        {button && (
          <Button onClick={handleOpen} sx={{font: 'normal normal normal 24px/32px Roboto'}}variant="outlined" color="accent">
            <Typography>{button} </Typography>
          </Button>
        )}
      </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Youtube video"
            aria-describedby="Youtube video"
            className={styles.modal}
          >
          <Box sx={{ margin: 'auto', width: '100%', maxWidth: '1100px', height: '500px', alignSelf: "center" }}>
              <YoutubeEmbed embedId={"Zm5WwuYcUwE"} />
            </Box>
          </Modal>
          </>
    );
 
    return (
      <div  className={styles.jumbotron}>
        <Grid
          sx={{ margin: {md: 'auto', xs: '20px auto'}, maxWidth: '1100px', width: {xs: '100%', md: '70%'},height: "100%" }}
          container
          alignItems={"center"}
          spacing={0}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <Box
              width={"100%"}
              sx={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
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
              <Typography my={2}variant="h6" align="justify">
                {subtitle}
              </Typography>
              {button && (
                <Button variant="outlined" color="accent">
                  <Link className={styles.navLinks} to={buttonLink}>
                    {button}
                  </Link>
                </Button>
              )}

            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            
          >
          <Box sx={{ width: '100%', height: '350px', alignSelf: "center" }}>
              <YoutubeEmbed embedId={"Zm5WwuYcUwE"} />
            </Box>
            </Grid>
        </Grid>
      </div>
    );
};

export default Jumbotron;
