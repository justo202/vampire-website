import {
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import firebase from "../firebase";
import {createInstance} from "../utils";

// main publications page
const Publications = () => {
  // initialises state
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);

  // function is run when component initially renders
  useEffect(() => {
    // gets all data from the publications collection
    async function getData() {
      const snapshot = await getDocs(collection(firebase, "publications"));
      setPubs(
        snapshot.docs.map((doc, idx) => {
          return createInstance("publications", doc.data()).generateCitation();
        })
      );
      // sets loading to false as data has been loaded in
      setLoading(false);
    }
    // calls function
    getData();
  }, []);

  // renderer function that checks if the data has loaded yet
  const displayItems = () => {
    if (loading) {
      // if the data is still loading, create a similar layout of placeholder components
      return (
        <>
          {new Array(10).fill(0).map((i) => (
            <Grid item key={Math.random()} xs={12} md={6} sm={12}>
              <Skeleton height={120} variant='rectangular' />
            </Grid>
          ))}
        </>
      );
    } else if (pubs.length > 0) {
      return pubs.map((pub, idx) => {
        return (
          <Grid key={idx} item xs={12} md={6} sm={12}>
            <Card sx={{height: "100%"}}>
              <CardContent>
                <Typography variant='p'>{pub}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      });
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Jumbotron title='Publications' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {displayItems()}
        </Grid>
      </Container>
    </>
  );
};

export default Publications;
