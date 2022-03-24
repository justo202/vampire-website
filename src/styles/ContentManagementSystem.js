import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "24px 0"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flexWrap: "wrap"
  },
  link: {
    textDecoration: "none",
    color: "initial",
    border: "2px solid #eee",
    padding: "16px",
    flex: "1 0 calc(50% - 2px)",
    "&:hover": {
      background: "rgba(255, 128, 64, 0.1) !important"
    },
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  edit: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  }
}))

export default useStyles;
