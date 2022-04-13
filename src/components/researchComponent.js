import React from "react";
import { Box, Grid, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    researchImage: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      width: "100%",
      height: "60%",
    },
  };
});

const CaptionSection = ({ funding, timeframe }) => {
  return (
    <Box mb={1}>
      <Typography
        pr={2}
        sx={{ fontWeight: "bolder" }}
        variant="caption"
        gutterBottom
      >
        Time Frame:{" "}
        <span style={{ fontWeight: "normal" }}>
          {timeframe[0]}-{timeframe[1]}
        </span>
      </Typography>
      <Typography sx={{ fontWeight: "bolder" }} variant="caption" gutterBottom>
        Supporting grants:{" "}
        <span style={{ fontWeight: "normal" }}>{funding}</span>
      </Typography>
    </Box>
  );
};
const SectionPointers = ({ pointers }) => {
  const mapPointers = pointers.map((pointer) => (
    <Link
      display={"block"}
      href={pointer.link}
      variant="body1"
      gutterBottom
      underline="hover"
      color={"accent.main"}
    >
      {pointer.title}
    </Link>
  ));

  return mapPointers;
};

const TextSection = ({
  title,
  funding,
  timeframe,
  description,
  collaborators,
}) => {
  return (
    <Grid xs={7} item>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <CaptionSection funding={funding} timeframe={timeframe} />
      <Typography mb={2} variant="body1">
        <span style={{ fontWeight: "bold" }}>Description: </span>
        {description}
      </Typography>
      <Typography variant="body2">
        <span style={{ fontWeight: "bold" }}>Collaborators: </span>
        {collaborators.join(", ")}
      </Typography>
    </Grid>
  );
};
const ImageSection = ({ styles, photo, pointers }) => {
  return (
    <Grid xs={5} item alignItems={"center"}>
      <Box className={styles.imageContainer} mb={1} sx={{ boxShadow: 3 }}>
        <img className={styles.researchImage} alt="research" src={photo} />
      </Box>
      <Typography variant="body1" textAlign={"center"}>
        Publication pointers
      </Typography>
      <SectionPointers pointers={pointers} />
    </Grid>
  );
};

const ResearchSection = ({
  title,
  description,
  funding = "",
  timeframe = ["", ""],
  photo,
  collaborators = [],
  pointers = [],
  imageLeft = false,
}) => {
  const styles = useStyles();
  return (
    <Grid container spacing={2}>
      {imageLeft ? (
        <ImageSection styles={styles} photo={photo} pointers={pointers} />
      ) : (
        <TextSection
          title={title}
          description={description}
          funding={funding}
          timeframe={timeframe}
          collaborators={collaborators}
        />
      )}
      {imageLeft ? (
        <TextSection
          title={title}
          description={description}
          funding={funding}
          timeframe={timeframe}
          collaborators={collaborators}
        />
      ) : (
        <ImageSection styles={styles} photo={photo} pointers={pointers} />
      )}
    </Grid>
  );
};

export default ResearchSection;
