import {Add, Delete} from "@mui/icons-material";
import {Button, Grid, IconButton, InputLabel, TextField} from "@mui/material";
import React from "react";
import useStyles from "../styles/FormElements";

export const Collaborators = ({handleFieldChange, ...props}) => {
  const classes = useStyles();
  return (
    <Grid container spacing={3} rowSpacing={1} alignItems='center'>
      <Grid item md={12} xs={12}>
        <InputLabel className={classes.label}>Collaborators</InputLabel>
      </Grid>
      {props.value &&
        props.value.map((collaborator, idx) => {
          return (
            <React.Fragment key={idx}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  value={collaborator.name}
                  placeholder='Name'
                  onChange={(e) => {
                    handleFieldChange(
                      "collaborators",
                      {index: "name", newValue: e.target.value},
                      idx
                    );
                  }}
                />
              </Grid>
              <Grid item md={5} xs={9}>
                <TextField
                  fullWidth
                  value={collaborator.institution}
                  placeholder='Institution'
                  onChange={(e) => {
                    handleFieldChange(
                      "collaborators",
                      {index: "institution", newValue: e.target.value},
                      idx
                    );
                  }}
                />
              </Grid>
              <Grid item xs={2} md={1} alignItems='center' display='flex'>
                <Button
                  variant='contained'
                  color='error'
                  onClick={() =>
                    handleFieldChange("collaborators", true, idx, 0, true)
                  }
                >
                  <Delete />
                </Button>
                <IconButton edge='end' color='error'></IconButton>
              </Grid>
            </React.Fragment>
          );
        })}
      <Grid item xs={12} md={6}>
        <Button
          onClick={(e) =>
            handleFieldChange(
              "collaborators",
              {name: "New Person", institution: ""},
              -1,
              true
            )
          }
        >
          <Add /> Add Collaborator
        </Button>
      </Grid>
    </Grid>
  );
};

export default Collaborators;