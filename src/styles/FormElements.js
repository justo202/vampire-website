import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  image: {
    height: "100px",
    objectFit: "contain",
    display: "block",
  },
  imageContainer: {
    flexDirection: "column",
  },
  label: {
    color: `${theme.palette.text.primary} !important`,
  },
}));

export default useStyles;
