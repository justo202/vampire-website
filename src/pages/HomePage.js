import {Grid} from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import LoginForm from "../components/LoginForm";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";
import Testimonials from "../components/TestimonialsComponent";

const Home = () => {
  return (
    <Grid container direction={"column"} alignItems={"center"} rowSpacing={2}>
      <LoginForm />
      <Grid item width={"100%"}>
        <Jumbotron
          title='Welcome to VAMPIRE Research'
          subtitle='This is not a research group about vampires'
          button='Read More'
          buttonLink='/publications'
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
    </Grid>
  );
};

export default Home;
