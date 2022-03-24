import {ArrowRightAlt} from "@mui/icons-material";
import {Container, List, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import useStyles from "../styles/ContentManagementSystem";

const ContentManagementArea = () => {
  const classes = useStyles();
  const areas = [
    "Team", "Publications", "Research", "Updates", "Testimonials"];

  return (
    <>
      <Jumbotron title="Content Management Area" />
      <Container className={classes.container}>
        <List className={classes.list}>
           {areas.map(item => {
             return (
             <Link key={item} component="ListItem" to={`./${item.toLowerCase()}`} className={classes.link}>
               <Typography variant="h6">{item}</Typography>
               <Typography variant="h6" className={classes.edit}>Edit <ArrowRightAlt/></Typography>
             </Link>
           )})}
        </List>
      </Container>
    </>
  )
}

export default ContentManagementArea;
