import {Container, Grid, Typography} from "@mui/material";
import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import {team} from "../data/team.json";

const Team = () => {
  return (
    <>
      <Jumbotron title='Team' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {Object.values(team).length > 0 &&
            Object.values(team).map((member) => {
              return (
                <Grid item xs={6} key={member.id} component='li'>
                  <Typography
                    variant='h6'
                    sx={{display: "inline-block", marginRight: "1rem"}}
                  >
                    {member.name}
                  </Typography>
                  <Typography variant='span'>{member.dateJoined}</Typography>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Team;
