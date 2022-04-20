import {Box, Button, Modal, Typography} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import {useState} from "react";
import YoutubeEmbed from "./youtubeVideoComponent";

const useStyles = makeStyles((theme) => {
  return {
    jumbotron: {
      width: "100%",
      backgroundColor: theme.palette.lightBlack.main,
      height: "100%",
      minHeight: "300px",
      display: "flex",
      overflow: "hidden",
      position: "relative",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
      fontSize: "1.2rem",
    },
    backgroundImage: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      right: 0,
      left: 0,
      opacity: 0.25,
      objectFit: "cover",
      zIndex: 1,
    },
    decoration: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      objectFit: "cover",
    },
    logo: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '130px'
    }
  };
});

const Jumbotron = ({title, subtitle, button, image = ""}) => {
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
          color: "white",
        }}
      >

        <Box
          sx={{
            zIndex: 99,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            maxWidth: '1100px'
          }}
        >

          <Typography
            sx={{font: "normal normal bold 4rem Roboto"}}
            color='#fff'
            align='center'
          >
            {title}
          </Typography>
          <Typography variant='h6' align='center'>
            {subtitle}
          </Typography>
          {button && (
            <Button
              onClick={handleOpen}
              sx={{
                alignSelf: "center",
                font: "normal normal normal 24px/32px Roboto",
              }}
              variant='outlined'
              color='accent'
            >
              <Typography>{button} </Typography>
            </Button>
          )}
        </Box>

        {image ? (
          <img
            className={styles.backgroundImage}
            src={image}
            alt='background'
          />
        ) : (
          <img
            className={styles.decoration}
            alt='decoration'
            src='/images/jumbotron_decoration.svg'
          />
        )}
 
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='Youtube video'
        aria-describedby='Youtube video'
        className={styles.modal}
      >
        <Box
          sx={{
            position: "absolute",
            transform: "translate(-50%, -50%)",
            top: "50%",
            left: "50%",
            margin: "auto",
            width: "100%",
            maxWidth: "1100px",
            height: "500px",
            alignSelf: "center",
          }}
        >
          <YoutubeEmbed embedId={"Zm5WwuYcUwE"} />
        </Box>
      </Modal>
    </>
  );
};

export default Jumbotron;
