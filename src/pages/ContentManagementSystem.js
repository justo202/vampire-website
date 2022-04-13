import {ArrowRightAlt} from "@mui/icons-material";
import {Container, List, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import useStyles from "../styles/ContentManagementSystem";

const ContentManagementArea = () => {
  const classes = useStyles();
  const areas = [
    {
      label: "Site Meta",
      link: "meta",
    },
    {
      label: "Team",
      link: "team",
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
      label: "Updates",
      link: "updates",
    },
    {
      label: "Testimonials",
      link: "testimonials",
    },
  ];

  return (
    <>
      <Jumbotron title='Content Management Area' />
      <Container className={classes.container}>
        <List className={classes.list}>
          {areas.map((item) => {
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
