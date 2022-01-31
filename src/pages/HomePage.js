import React from "react";
import { Grid } from "@mui/material";

import Testimonials from "../components/TestimonialsComponent";

const Home = () => {

    return(
        <Grid container direction={"column"} alignItems={"center"}>
            <Grid item xs={12}>
            <Testimonials />
            </Grid>
            <Grid item>
                <h1>hello</h1>
            </Grid>
        </Grid>
    );

}

export default Home;