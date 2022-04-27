import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InteractiveMap from "../components/InteractiveMapComponent";
import Jumbotron from "../components/JumbotronComponent";
import Logos from "../components/LogoSectionComponent";
import NewsSection from "../components/NewsComponent";
import Testimonials from "../components/TestimonialsComponent";
import useStyles from "../styles/HomePage";

const Home = () => {
  const styles = useStyles();
  return (
    <>
      <Jumbotron
        title='VAMPIRE'
        button='Watch our video'
        image='https://picsum.photos/1100'
      />
      <Grid
        sx={{margin: "auto", maxWidth: "1100px", width: "100%"}}
        container
        direction={"column"}
        alignItems={"center"}
        rowSpacing={2}
      >
        <Grid item width={"100%"}>
          <Typography
            mb={2}
            sx={{fontWeight: "bold", fontSize: "34px"}}
            className={styles.headers}
            variant='h5'
          >
            News
          </Typography>

          <NewsSection />
        </Grid>
        <Grid item width={"100%"}>
          <Typography
            mb={2}
            sx={{fontWeight: "bold", fontSize: "34px"}}
            className={styles.headers}
            variant='h5'
          >
            Testimonials
          </Typography>

          <Testimonials />
        </Grid>
        <Grid item width={"100%"}>
          <Typography
            mb={2}
            sx={{fontWeight: "bold", fontSize: "34px"}}
            className={styles.headers}
            variant='h5'
          >
            Some of our recent Partners
          </Typography>

          <Logos />
        </Grid>
      </Grid>

      <InteractiveMap />
    </>
  );
};

export default Home;
