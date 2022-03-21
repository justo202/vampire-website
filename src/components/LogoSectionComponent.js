import React from "react";
import { Grid, Typography } from "@mui/material";

const Logos = () => {
  const logoImages = [
    {
      imageURL: "https://picsum.photos/200",
      key: 1,
    },
    {
      imageURL: "https://picsum.photos/200",
      key: 2,
    },
    {
      imageURL: "https://picsum.photos/200",
      key: 3,
    },
    {
      imageURL: "https://picsum.photos/200",
      key: 4,
    },
  ];
  const logoMap = logoImages.map((image) => {
    return (
      <Grid key={image.key} item xs={6} md={3}>
        <a href={"https://mui.com/components/grid/"}>
          {" "}
          <img
            height={"150px"}
            width={"100%"}
            alt="logo"
            src={image.imageURL}
          />{" "}
        </a>
      </Grid>
    );
  });

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}></Grid>
      {logoMap}
    </Grid>
  );
};

export default Logos;
