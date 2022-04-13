import { Grid, InputLabel, Typography } from "@mui/material";
import useStyles from "../styles/FormElements";

export const ImageEdit = (props) => {
  const classes = useStyles();

  // TODO ADD functionality to upload image
  // TODO ADD functionality to delete image
  // TODO ADD functionality to add more than one image

  return (
    <Grid container spacing={3} rowSpacing={1}>
      <Grid item md={12}>
        <InputLabel className={classes.label}>Image</InputLabel>
      </Grid>
      <Grid item>
        {props.value ? (
          <img alt="Placeholder" {...props} className={classes.image} />
        ) : (
          <Typography variant="p" sx={{ fontStyle: "italic" }}>
            There is currently no image. You'll need to upload one.
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageEdit;
