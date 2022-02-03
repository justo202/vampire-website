import React from "react";
import { Grid } from "@mui/material";

import Testimonials from "../components/TestimonialsComponent";
import Jumbotron from "../components/JumbotronComponent";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";

const Home = () => {

    return(
        <Grid container direction={"column"} alignItems={"center"} rowSpacing={2}>
            <Grid item width={'100%'} >
            <Jumbotron />
            </Grid>
            <Grid item>
                <NewsSection />
            </Grid>
            <Grid item>
            <Testimonials />
            </Grid>
            <Grid item >
            <Logos />
            </Grid>
        </Grid>
    );

}

export default Home;