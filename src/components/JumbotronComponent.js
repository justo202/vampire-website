import {Button, Typography} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import React from "react";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    jumbotron: {
      width: "100%",
      backgroundColor: theme.palette.darkBackground.main,
      height: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexFlow: "column wrap",
    },
    navLinks: {
      textDecoration: "none",
      textTransform: "none",
      color: "inherit",
    },
  };
});

const Jumbotron = ({title, subtitle, button, buttonLink}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <div className={styles.jumbotron}>
      <Typography variant='h3' align='center'>
        {title}
      </Typography>
      <Typography variant='h6' align='center'>
        {subtitle}
      </Typography>
      {button && (
        <Button variant='contained' color='accent'>
          <Link className={styles.navLinks} to={buttonLink}>
            {button}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default Jumbotron;
