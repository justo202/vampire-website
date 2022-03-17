import React from 'react'
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {
    return {
      videoResponsive: {
        overflow: 'hidden',
        position: "relative",
        height: '100%',
        width: '100%',
        "& iframe": {
            left: 0,
            top: 0,
            height: "100%",
            width: "100%",
            position: "absolute"
        }
      },
    };
  });
const YoutubeEmbed = ({ embedId }) => {
    
    const styles = useStyles();

    
    return (
    <div className={styles.videoResponsive}>
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  )};


  export default YoutubeEmbed;