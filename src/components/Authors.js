import {Add, Delete} from "@mui/icons-material";
import {Button, Grid, IconButton, InputLabel, TextField} from "@mui/material";
import useStyles from "../styles/FormElements";

export const Authors = ({handleFieldChange, ...props}) => {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item md={12} sm={12} xs={12}>
        <InputLabel className={classes.label}>Authors</InputLabel>
      </Grid>
      {props.value &&
        props.value.map((author, idx) => {
          return (
            <Grid item xs={12} md={2} sm={6} key={idx}>
              <TextField
                fullWidth
                value={author}
                onChange={(e) =>
                  handleFieldChange({
                    fieldId: "authors",
                    newValue: e.target.value,
                    arrayIndex: idx,
                  })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton
                      edge='end'
                      onClick={() =>
                        handleFieldChange({
                          fieldId: "authors",
                          toDelete: true,
                          arrayIndex: idx,
                        })
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
      <Grid item xs={12} sm={6} md={2}>
        <Button
          onClick={(e) => handleFieldChange({fieldId: "authors", isNew: true})}
        >
          <Add /> Add Author
        </Button>
      </Grid>
    </Grid>
  );
};

export default Authors;
