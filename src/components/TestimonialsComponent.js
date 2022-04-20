import {Box, Card, Grid, Typography} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import db from "../firebase";

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
      height: "200px",
      width: "100%",
    },
    card: {
      height: "200px",
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
  const {style, cards, group = false} = props;
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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(db, "testimonials"));
      setItems(
        snapshot.docs.map((doc, idx) => {
          return {...doc.data(), id: doc.id};
        })
      );
      setLoading(false);
    }
    getData();
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
  items &&
    items.forEach((element) => {
      testimonialCards.push(
        <Grid xs={12} sm={4} item className={styles.cardContainer}>
          <Card
            className={styles.cardMedia}
            title={"hello"}
            sx={{width: "100%", borderBottom: "2px #FF7700  solid"}}
          >
            <Box
              sx={{
                textOverflow: "ellipsis",
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "#ffff",
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

                  textAlign: "center",
                  zIndex: 99,
                }}
              >
                {element.text}
              </Typography>
              <Typography
                sx={{
                  textOverflow: "ellipsis",
                  width: "100%",
                  textAlign: "center",
                  zIndex: 99,
                  fontStyle: "italic",
                  fontWeight: "bolder",
                }}
                align='center'
              >
                {element.name}
              </Typography>
            </Box>
          </Card>
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
