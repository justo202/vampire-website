import {CardContent, Container, Grid, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";

const Publications = () => {
  const [pubs, setPubs] = useState([]);
  useEffect(() => {
    axios
      .get("/.netlify/functions/publications")
      .then((res) => {
        console.log(res);
        setPubs(res.data);
      })
      .catch(
        setPubs([
          {citationKey: "fff", entryTags: {title: "Hello", author: "Me"}},
        ])
      );
  }, []);

  return (
    <>
      <Jumbotron title='Publications' />
      <Container sx={{maxWidth: 1200, margin: "0 auto"}}>
        <Grid container>
          {pubs &&
            pubs.map((pub) => {
              return (
                <Grid key={pub.citationKey} item xs={4} component='Card'>
                  <CardContent>
                    <Typography variant='h6' component='div'>
                      {pub.entryTags.title}
                    </Typography>
                    <Typography variant='p' component='p'>
                      {pub.entryTags.author}
                    </Typography>
                  </CardContent>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Publications;
