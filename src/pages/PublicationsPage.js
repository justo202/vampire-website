import {Card, CardContent, Container, Grid, Typography} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import firebase, {getAuth} from "../firebase";
import {createInstance} from "../utils";

const Publications = () => {
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = getAuth();
    console.log(user);
    async function getData() {
      const snapshot = await getDocs(collection(firebase, "publications"));
      setPubs(
        snapshot.docs.map((doc, idx) => {
          return createInstance("publications", doc.data()).generateCitation();
        })
      );
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Jumbotron title='Publications' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {pubs.length > 0 &&
            pubs.map((pub, idx) => {
              return (
                <Grid key={idx} item xs={6}>
                  <Card sx={{height: "100%"}}>
                    <CardContent>
                      <Typography variant='p'>{pub}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Publications;
