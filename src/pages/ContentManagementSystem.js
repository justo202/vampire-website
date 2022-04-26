import {ArrowRightAlt} from "@mui/icons-material";
import {Container, List, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import useStyles from "../styles/ContentManagementSystem";

// a static array of all labels and links that should be mapped out
const areas = [
  {
    label: "Partners",
    link: "partners",
  },
  {
    label: "Publications",
    link: "publications",
  },
  {
    label: "Research",
    link: "projects",
  },
  {
    label: "Team",
    link: "team",
  },
  {
    label: "Testimonials",
    link: "testimonials",
  },
  {
    label: "Updates",
    link: "updates",
  },
];

const ContentManagementArea = () => {
  // object classes contains all component styles
  const classes = useStyles();

  return (
    <>
      <Jumbotron title='Content Management Area' />
      <Container className={classes.container}>
        <List className={classes.list}>
          {areas.map((item) => {
            // mapping out of all items in the areas array
            return (
              <Link
                key={item.label}
                component='ListItem'
                to={`./${item.link}`}
                className={classes.link}
              >
                <Typography variant='h6'>{item.label}</Typography>
                <Typography variant='h6' className={classes.edit}>
                  Edit <ArrowRightAlt />
                </Typography>
              </Link>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default ContentManagementArea;
