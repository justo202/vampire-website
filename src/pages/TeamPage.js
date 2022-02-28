import {Book, Link, School} from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography
} from "@mui/material";
import {collection, getDocs, getFirestore} from "firebase/firestore";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(getFirestore(), "team"))
      setTeam(snapshot.docs.map((doc, idx) => {
        return doc.data()
      }))
      setLoading(false);
    }
    getData()
  }, [])

  return (
    <>
      <Jumbotron title='Team' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {team &&
            team.map((member) => {
              return (
                <Grid item xs={12} sm={6} key={member.id} md={4} >
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      padding: "1rem",
                    }}
                  >
                    <CardMedia
                      height='100'
                      component='img'
                      sx={{width: "auto", borderRadius: "50%"}}
                      image={member.photoUrl ? member.photoUrl : 'https://picsum.photos/id/1005/200'}
                    />
                    <CardContent sx={{flex: 1}}>
                      <Typography
                        variant='h6'
                        sx={{display: "inline-block", marginRight: "1rem"}}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant='span'
                      >
                        {member.dateJoined.toDate().getFullYear()}
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item>
                          <Link></Link>
                        </Grid>
                        <Grid item>
                          <Book></Book>
                        </Grid>
                        <Grid item>
                          <School></School>
                        </Grid>
                      </Grid>
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

export default Team;
