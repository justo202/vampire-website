import React from "react";
import { Grid } from "@mui/material";

import Testimonials from "../components/TestimonialsComponent";
import Jumbotron from "../components/JumbotronComponent";

const Home = () => {

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item width={'100%'} >
            <Jumbotron />
            </Grid>
            <Grid item>
            <Testimonials />
            </Grid>
        </Grid>
    );

}

export default Home;