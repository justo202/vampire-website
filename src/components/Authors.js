import {Add, Delete} from "@mui/icons-material";
import {Button, Grid, IconButton, InputLabel, TextField} from "@mui/material";
import useStyles from "../styles/FormElements";

export const Authors = ({handleFieldChange, ...props}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item md={12}>
        <InputLabel className={classes.label}>Authors</InputLabel>
      </Grid>
      {props.value &&
        props.value.map((author, idx) => {
          return (
            <Grid item xs={2} key={idx}>
              <TextField
                fullWidth
                value={author}
                onChange={(e) => {
                  handleFieldChange("authors", e, idx);
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge='end'
                      onClick={() =>
                        handleFieldChange("authors", true, idx, 0, true)
                      }
                    >
                      <Delete />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
          );
        })}
      <Grid item xs={2}>
        <Button
          onClick={(e) => handleFieldChange("authors", "New Person", -1, true)}
        >
          <Add /> Add Author
        </Button>
      </Grid>
    </Grid>
  );
};

export default Authors;
