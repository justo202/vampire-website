import React from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Card, CardContent, Grid, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    slides: {
      height: '100%',
      width: '600px',
    },
    slide: {
      height: "300px",
      width: "100%",
    },
  };
});

const Testimonial = (props) => {
  return (
    <Card sx={{ minHeight: "150px" }}>
      <CardContent>
        <Typography variant="h6" component="div" align="center">
          {props.description}
        </Typography>
        <Typography
          sx={{ fontStyle: "italic" }}
          color="text.secondary"
          align="center"
        >
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  );
};
const TestimonialContainer = (props) => {

  return (
    <Card sx={{height: '200px', position: 'relative'}}>
    <Grid container spacing={0} sx={{height: '400px', position: 'relative'}}>
        <Grid xs={4} item sx={{height: '100%', position: 'relative'}}>
        <CardMedia
                    sx={{width: '200px', height: '100%', overflow: 'hidden',position: 'relative'}}
                    image={"https://picsum.photos/200"}
                    title={'hello'}
                >
                    <Typography sx={{textOverflow: 'ellipsis', position: 'abosolute', bottom: 0, padding: '15px', width: '100%'}}>
                        {'name'}
                    </Typography>
                </CardMedia>
        </Grid>
        <Grid xs={4} item sx={{height: '100%', position: 'relative'}}>
        <CardMedia
                    sx={{height: '100%', overflow: 'hidden',position: 'relative'}}
                    image={"https://picsum.photos/200"}
                    title={'hello'}
                >
                    <Typography sx={{textOverflow: 'ellipsis', position: 'abosolute', bottom: 0, padding: '15px', width: '100%'}}>
                        {'name'}
                    </Typography>
                </CardMedia>
</Grid>
<Grid xs={4} item sx={{height: '100%', position: 'relative'}}>
<CardMedia
                   sx={{height: '100%', overflow: 'hidden',position: 'relative'}}
                    image={"https://picsum.photos/200"}
                    title={'hello'}
                >
                    <Typography sx={{textOverflow: 'ellipsis', position: 'abosolute', bottom: 0, padding: '15px', width: '100%'}}>
                        {'name'}
                    </Typography>
                </CardMedia>
</Grid>
    </Grid>
    </Card>
  )
}
const Testimonials = () => {
  const styles = useStyles();
  const testimonialInfo = [
    {
      description: "great website, i like it a lot",
      name: "its me",
      idd: 1
    },
    {
      description:
        "tfytguhuwjaetissraweopawoeijtawoejaowegnaiuh awej oawnfklgs jfng ;aweork awoen ialeri jaweoijawnligahuwoeij",
      name: "someone",
      idd: 2
    },
    {
      description:
        "i cant believe this workser awera weraw erawe rawer awer awer awerawe rawer awerawerawer awera werwae rawer",
      name: "who",
      idd: 3
    },
    {
      description:
        "they were really good to work with and im happy that everything went well, cant wait to work with them again in the futur",
      name: "person",
      idd: 4
    },
  ];

  return (
    <Carousel className={styles.slides}>
      <TestimonialContainer />
      <TestimonialContainer />
      <TestimonialContainer />
      <TestimonialContainer />
    </Carousel>
  )
/*
  return (
    <Carousel className={styles.slides}>
      {testimonialInfo.map((testimonial) => (
        <Testimonial
          key={testimonial.idd}
          description={testimonial.description}
          name={testimonial.name}
        />
      ))}
    </Carousel>
  );
  */
};

export default Testimonials;
