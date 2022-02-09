import {Book, Link, School} from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import {useTheme} from "@mui/styles";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import {team} from "../data/team.json";
import fireApp from "../firebaseConfig";
import {collection,documentId,getDocs} from "firebase/firestore";
import { app } from "../firebaseConfig";
import { getFirestore } from "firebase/firestore";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true)
  const theme = useTheme();

  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(getFirestore(), "users"))
      setTeam(snapshot.docs.map((doc, idx) => {
        return doc.data()
      }))
      setLoading(false);
    }
    getData()
  }, [])

  if (loading) {
    return (
      <h1>Fuck Sake</h1>
      )
  }

  return (
    <>
      <Jumbotron title='Team' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {!loading &&
            team.map((member) => {
              return (
                <Grid item xs={4} key={member.id}>
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
                      image='https://picsum.photos/id/1005/200'
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
                        color={theme.palette.accent.main}
                      >
                        {/* {member.dateJoined} */}
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
