import { Grid, Typography } from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";
import Testimonials from "../components/TestimonialsComponent";
import InteractiveMap from "../components/InteractiveMapComponent";

const Home = () => {
  return (
    <>
      <Jumbotron
        title="Welcome to VAMPIRE Research"
        subtitle="This is not a research group about vampires"
        button="Read More"
        buttonLink="/publications"
        isHomePage
      />
      <Grid
        sx={{ margin: "auto", maxWidth: '1100px', width: { xs: "100%", md: "70%" } }}
        container
        direction={"column"}
        alignItems={"center"}
        rowSpacing={2}
      >
        <Grid item width={"100%"}>
          <Typography p={1} variant="h4">
            News
          </Typography>
          <hr />
          <NewsSection />
        </Grid>
        <Grid item width={"100%"}>
          <Typography p={1} variant="h4">
            Testimonials
          </Typography>
          <hr />
          <Testimonials />
        </Grid>
        <Grid item width={"100%"}>
          <Typography p={1} variant="h4">
            Partners
          </Typography>
          <hr />
          <Logos />
        </Grid>
        <Grid item width={"100%"}>
          <InteractiveMap />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
