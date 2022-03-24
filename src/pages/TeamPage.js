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
import {connectFunctionsEmulator, getFunctions, httpsCallable} from "firebase/functions";
import {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import {app} from "../firebase";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const functions = getFunctions(app, "europe-west2");
    connectFunctionsEmulator(functions, "localhost", 5000);
    const get_token = httpsCallable(functions, "get_token");
    get_token({name: "REACT_APP_MAPBOX_TOKEN"}).then(res => {
      console.log(res);
    })
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
                <Grid item xs={12} sm={6} key={member.id} md={4} sx={{display:"flex"}}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      padding: "1rem",
                      flexGrow: "1"
                    }}
                  >
                    <CardMedia
                      height="70"
                      component='img'
                      sx={{alignSelf: "center", objectFit: "cover", width: "auto", borderRadius: "1rem"}}
                      image={member.photoUrl ? member.photoUrl : 'https://picsum.photos/id/1005/200'}
                    />
                    <CardContent sx={{flex: 1, position: "relative", padding: "0 0 0 1rem", paddingBottom: "0 !important"}}>
                      <Typography
                        variant='span'
                        sx={{display: "inline-block",fontSize: "1.2rem", marginBottom: "1rem", marginTop: "0.2rem"}}
                      >
                        {member.name}
                      </Typography>
                      <Grid container spacing={0} sx={{fontSize: "1.2rem"}}>
                        <Grid item  sx={{ padding: "5px"}}>
                          <Link sx={{fontSize: "inherit"}}></Link>
                        </Grid>
                        <Grid item sx={{ padding: "5px"}}>
                          <Book sx={{fontSize: "inherit"}}></Book>
                        </Grid>
                        <Grid item  sx={{padding: "5px"}}>
                          <School sx={{fontSize: "inherit "}}></School>
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
