import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    padding: "0 !important",
  },
  image: {
    width: "auto",
  },
  name: {
    fontWeight: 600,
    padding: 0,
    margin: 0,
  },
  institution: {
    fontSize: "18px",
    fontStyle: "italic",
    fontWeight: "300",
  },
  description: {
    fontWeight: "300",
    fontSize: 18,
  },
}));

export default useStyles;
