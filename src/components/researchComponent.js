import {Box, Grid, Link, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles(() => {
  return {
    researchImage: {
      objectFit: "cover",
      width: "100%",
      height: "100%",
    },
    imageContainer: {
      width: "100%",
      height: "400px",
    },
  };
});

const CaptionSection = ({grants, timeframe}) => {
  return (
    <Box mb={1}>
      <Typography
        pr={2}
        sx={{fontWeight: "bolder"}}
        variant='caption'
        gutterBottom
      >
        Time Frame:{" "}
        <span style={{fontWeight: "normal"}}>
          {`${new Date(timeframe[0]).getFullYear()} - ${new Date(
            timeframe[1]
          ).getFullYear()}`}
        </span>
      </Typography>
      {grants && (
        <Typography sx={{fontWeight: "bolder"}} variant='caption' gutterBottom>
          Supporting grants:{" "}
          <span style={{fontWeight: "normal"}}>{grants}</span>
        </Typography>
      )}
    </Box>
  );
};
const SectionPointers = ({pointers}) => {
  const mapPointers = pointers.map((pointer) => (
    <Link
      display={"block"}
      href={pointer.link}
      variant='body1'
      gutterBottom
      underline='hover'
      color={"accent.main"}
    >
      {pointer.title}
    </Link>
  ));

  return mapPointers;
};

const TextSection = ({
  description,
  title,
  grants,
  startDate,
  endDate,
  collaborators,
}) => {
  return (
    <Grid xs={12} sm={7}  item>
      <Typography variant='h5' gutterBottom>
        {title}
      </Typography>
      <CaptionSection grants={grants} timeframe={[startDate, endDate]} />
      {description.length > 0 && (
        <Typography mb={2} variant='body1'>
          <span style={{fontWeight: "bold"}}>Description: </span>
          {description}
        </Typography>
      )}
      {collaborators.length > 0 && (
        <Typography variant='body2'>
          <span style={{fontWeight: "bold"}}>Collaborators: </span>
          {collaborators.map(
            (col, idx) =>
              `${col.name} (${col.institution})${
                idx === collaborators.length - 2 ? " and " : ""
              }${idx < collaborators.length - 2 ? ", " : ""}`
          )}
        </Typography>
      )}
    </Grid>
  );
};
const ImageSection = ({styles, id, hasImage, pointers}) => {
  return (
    <Grid xs={12} sm={5} item alignItems={"center"}>
      {hasImage && (
        <Box className={styles.imageContainer} mb={1} sx={{boxShadow: 3}}>
          <img
            className={styles.researchImage}
            alt='research'
            src={
             `https://storage.googleapis.com/vampire-research.appspot.com/projects/${id}` ||
              "https://picsum.photos/200"
            }
          />
        </Box>
      )}
      <Typography variant='body1' textAlign={"center"}>
        Publication pointers
      </Typography>
      <SectionPointers pointers={pointers} />
    </Grid>
  );
};

const MobileView = ({
  title,
  description,
  grants = "",
  endDate,
  startDate,
  id,
  hasImage,
  collaborators = [],
  pointers = [],
  styles
}) => {

  return(
    <Grid sx={{display: {sm: 'none'}}}container spacing={2} mb={2}>
        <ImageSection
          styles={styles}
          id={id}
          hasImage={hasImage}
          pointers={pointers}
        />
     
        <TextSection
          title={title}
          description={description}
          grants={grants}
          endDate={endDate}
          startDate={startDate}
          collaborators={collaborators}
        />

    </Grid>
  )

}

const ResearchSection = ({
  title,
  description,
  grants = "",
  endDate,
  startDate,
  id,
  hasImage,
  collaborators = [],
  pointers = [],
  imageLeft = false,
}) => {
  const styles = useStyles();
  return (
    <>
    
    <Grid sx={{display: {sm: 'flex', xs: 'none'}}} container spacing={2}>
      {imageLeft ? (
        <ImageSection
          styles={styles}
          id={id}
          hasImage={hasImage}
          pointers={pointers}
        />
      ) : (
        <TextSection
          title={title}
          description={description}
          grants={grants}
          endDate={endDate}
          startDate={startDate}
          collaborators={collaborators}
        />
      )}
      {imageLeft ? (
        <TextSection
          title={title}
          description={description}
          grants={grants}
          endDate={endDate}
          startDate={startDate}
          collaborators={collaborators}
        />
      ) : (
        <ImageSection
          styles={styles}
          id={id}
          hasImage={hasImage}
          pointers={pointers}
        />
      )}
    </Grid>
    <MobileView title={title} description={description} grants={grants} endDate={endDate} startDate={startDate} id={id} hasImage={hasImage} collaborators={collaborators} pointers={pointers} styles={styles} />
    </>
  );
};

export default ResearchSection;
