import { Button, Typography } from "@mui/material";
import React from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Link } from "react-router-dom";




const useStyles = makeStyles(theme => {
    return {
        jumbotron: {
            width: '100%',
            backgroundColor: theme.palette.darkBackground.main,
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexFlow: 'column wrap'
        },
        navLinks: {
            textDecoration: 'none',
            textTransform: 'none',
            color: 'inherit'
            
          }
    }

})

const Jumbotron = () => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (

        <div className={styles.jumbotron}>
            <Typography
            variant="h3"
            align="center"
            
            >
                Welcome to VAMPIRE research
            </Typography>
            <Typography
            variant="h6"
            align="center"
            >
                This is not a research group about vampires
            </Typography>
            <Button variant="contained" color="accent">
                <Link className={styles.navLinks} to={'/publications'}>
                    Read more
                </Link>
            </Button>
            
            
        </div>

    )

}

export default Jumbotron