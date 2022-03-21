import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import { Typography, Grid, CardMedia, Box } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const testimonialInfo = [
  {
    description: "great website, i like it a lot",
    name: "its me",
    idd: 1,
  },
  {
    description:
      "tfytguhuwjaetissraweopawoeijtawoejaowegnaiuh awej oawnfklgs jfng ;aweork awoen ialeri jaweoijawnligahuwoeij",
    name: "someone",
    idd: 2,
  },
  {
    description:
      "i cant believe this workser awera weraw erawe rawer awer awer awerawe rawer awerawerawer awera werwae rawer",
    name: "who",
    idd: 3,
  },
  {
    description:
      "they were really good to work with and im happy that everything went well, cant wait to work with them again in the futur",
    name: "person",
    idd: 4,
  },
];

const useStyles = makeStyles((theme) => {
  return {
    slides: {
      height: "100%",
      width: "100vw",
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
    },
    slide: {
      height: "300px",
      width: "100%",
    },
    card: {
      height: "300px",
      position: "relative",
    },
    cardContainer: {
      height: "100%",
      position: "relative",
    },
    cardMedia: {
      width: "100%",
      height: "100%",
      overflow: "hidden",
      position: "relative",
    },
  };
});

const TestimonialContainer = (props) => {
  const { style, cards, group = false } = props;
  return (
    <Box className={style.card}>
      <Grid container columnSpacing={2} className={style.cardContainer}>
        {group ? cards.map((item) => item) : cards}
      </Grid>
    </Box>
  );
};
function debounce(fn, ms) {
  let timer;
  return (_) => {
    clearTimeout(timer);
    timer = setTimeout((_) => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
const Testimonials = () => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debouncedHandleResize);

    return (_) => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  const styles = useStyles(useTheme());
  var testimonialCards = [];
  testimonialInfo.forEach((element) => {
    testimonialCards.push(
      <Grid xs={12} sm={4} item className={styles.cardContainer}>
        <CardMedia
          className={styles.cardMedia}
          image={"https://picsum.photos/200"}
          title={"hello"}
        >
          <Box
            sx={{
              textOverflow: "ellipsis",
              position: "absolute",
              width: "100%",
              height: "100%",
              color: "white",
              textAlign: "center",
              zIndex: 99,
              padding: "0.1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography
              sx={{
                textOverflow: "ellipsis",
                width: "100%",
                color: "white",
                textAlign: "center",
                zIndex: 99,
              }}
            >
              {element.description}
            </Typography>
            <Typography
              sx={{
                textOverflow: "ellipsis",
                width: "100%",
                color: "white",
                textAlign: "center",
                zIndex: 99,
                fontStyle: "italic",
              }}
              align="center"
            >
              {element.name}
            </Typography>
          </Box>

          <div
            style={{
              opacity: "0.6",
              backgroundColor: "black",
              height: "100%",
              width: "100%",
              position: "absolute",
              zIndex: 9,
            }}
          ></div>
        </CardMedia>
      </Grid>
    );
  });
  if (dimensions.width > 601) {
    let groupedTestimonials = [];
    let temp = [];
    for (let index = 0; index < testimonialCards.length; index++) {
      temp.push(testimonialCards[index]);
      if (temp.length === 3) {
        groupedTestimonials.push(temp);
        temp = [];
      }
    }
    if (temp.length !== 0) {
      groupedTestimonials.push(temp);
    }
    return (
      <Carousel className={styles.slides}>
        {groupedTestimonials.map((item, index) => (
          <TestimonialContainer key={index} cards={item} style={styles} group />
        ))}
      </Carousel>
    );
  } else {
    return (
      <Carousel className={styles.slides}>
        {testimonialCards.map((card, index) => (
          <TestimonialContainer key={index} cards={card} style={styles} />
        ))}
      </Carousel>
    );
  }
};

export default Testimonials;
