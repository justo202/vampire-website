import React from "react";
import { Grid } from "@mui/material";
import { LOGO_IMAGES } from "../data/LOGO_IMAGES";

const Logos = () => {
  
  const logoMap = LOGO_IMAGES.map((image) => {
    return (
      <Grid key={image.key} item xs={6} md={3}>
          <img
            height={"150px"}
            width={"100%"}
            alt="logo"
            style={{objectFit: 'contain'}}
            src={image.imageURL}
          />
      </Grid>
    );
  });

  return (
    <Grid container spacing={1} mb={3}>
      {logoMap}
    </Grid>
  );
};

export default Logos;
