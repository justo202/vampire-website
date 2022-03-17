import {Grid} from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";
import Testimonials from "../components/TestimonialsComponent";
import InteractiveMap from "../components/InteractiveMapComponent";
import YoutubeEmbed from "../components/youtubeVideoComponent";

const Home = () => {
  return (
    <Grid container direction={"column"} alignItems={"center"} rowSpacing={2}>
      <Grid item width={"100%"}>
        <Jumbotron
          title='Welcome to VAMPIRE Research'
          subtitle='This is not a research group about vampires'
          button='Read More'
          buttonLink='/publications'
          isHomePage
        />
      </Grid>
      <Grid item>
        <NewsSection />
      </Grid>
      <Grid item>
        <Testimonials />
      </Grid>
      <Grid item>
        <Logos />
      </Grid>
      <Grid item sx={{width: {xs: '100%', md: '70%'}}}>
        <InteractiveMap />
      </Grid>
    </Grid>
  );
};

export default Home;
