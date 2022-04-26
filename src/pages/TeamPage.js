import {collection, getDocs} from "@firebase/firestore";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import db from "../firebase";
import useStyles from "../styles/Team";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  // functions runs when component is initially rendered
  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(db, "team"));
      // sorts the team members by last name in ascending order
      setTeam(
        snapshot.docs
          .sort((a, b) => {
            const x = a.data().name.split(" ")[1];
            const y = b.data().name.split(" ")[1];
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          })
          .map((doc, idx) => {
            return {...doc.data(), id: doc.id};
          })
      );
      // updates loading state to false
      setLoading(false);
    }

    // calls function
    getData();
  }, []);

  const displayData = () => {
    if (loading) {
      // if the data is still loading, create a similar layout of placeholder components
      return (
        <>
          {new Array(10).fill(0).map((i) => (
            <Grid item key={Math.random()} xs={12} md={4} sm={12}>
              <Skeleton height={120} variant='rectangular' />
            </Grid>
          ))}
        </>
      );
    } else if (team.length > 0) {
      return team.map((member) => {
        return (
          <Grid
            item
            xs={12}
            sm={6}
            key={member.id}
            md={4}
            sx={{display: "flex"}}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: "20px",
                flexGrow: "1",
                gap: "6px",
              }}
            >
              <CardMedia
                height='56'
                component='img'
                className={classes.image}
                width='56'
                image={
                  member.hasImage ? "" : "https://picsum.photos/id/1005/200"
                }
              />
              <CardContent className={classes.content}>
                <Container
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 !important",
                  }}
                >
                  <Typography
                    variant='h5'
                    className={classes.name}
                    sx={{
                      display: "inline-block",
                      marginBottom: "1rem",
                      marginTop: "0.2rem",
                    }}
                  >
                    {member.name}
                  </Typography>
                  <Typography className={classes.institution} variant='p'>
                    {member.institute}
                  </Typography>
                </Container>
                <Typography className={classes.description} variant='p'>
                  {member.description}
                </Typography>
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
      <Jumbotron title='Team' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={3}>
          {displayData()}
        </Grid>
      </Container>
    </>
  );
};

export default Team;
