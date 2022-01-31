import { Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {
    return {
        jumbotron: {
            backgroundColor: "#CCC5B9",
            width: '100%'
        }
    }

})

const Jumbotron = () => {
    const styles = useStyles();
    return (

        <div className={styles.jumbotron}>
            <Typography
            variant="h2">
                Welcome message
            </Typography>
        </div>

    )

}

export default Jumbotron