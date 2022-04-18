import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "2rem auto",
  },
  listItem: {
    padding: 0,
  },
  date: {
    fontStyle: "italic",
  },
  item: {
    margin: "12px 0",
    padding: "12px",
    border: "2px solid #eee",
    borderRadius: "3px",
  },
  searchBtn: {
    height: "100%",
  },
  info: {
    background: theme.palette.grey[100],
    borderRadius: 2,
    padding: "1.2rem",
    marginBottom: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  toolbarItem: {
    display: "flex",
    alignItems: "center",
  },
}));

export default useStyles;
