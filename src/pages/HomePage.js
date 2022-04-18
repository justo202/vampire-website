import { Grid, Typography } from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";
import Testimonials from "../components/TestimonialsComponent";
import InteractiveMap from "../components/InteractiveMapComponent";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    headers: {
      paddingLeft: '0.5rem',
      paddingRight: '2rem',
      borderBottom: '2px #CBCBCB solid',
      display: 'inline-block',
    }
  }

})


const Home = () => {
  const styles = useStyles();
  return (
    <>
      <Jumbotron
        title="VAMPIRE"
        button="Watch our video"
        image="https://picsum.photos/1100"

      />
      <Grid
        sx={{ margin: "auto", maxWidth: '1100px', width: '100%' }}
        container
        direction={"column"}
        alignItems={"center"}
        rowSpacing={2}
      >
        <Grid item width={"100%"}>
          <Typography mb={2} sx={{fontWeight:'bold', fontSize: '34px'}}className={styles.headers} variant="h5">
            News
          </Typography>
        
          <NewsSection />
        </Grid>
        <Grid item width={"100%"}>
          <Typography mb={2} sx={{fontWeight:'bold', fontSize: '34px'}}className={styles.headers} variant="h5">
            Testimonials
          </Typography>
         
          <Testimonials />
        </Grid>
        <Grid item width={"100%"}>
          <Typography mb={2} sx={{fontWeight:'bold', fontSize: '34px'}}className={styles.headers} variant="h5">
            Partners
          </Typography>
       
          <Logos />
        </Grid>
       
      </Grid>
     
          <InteractiveMap />
      
    </>
  );
};

export default Home;
