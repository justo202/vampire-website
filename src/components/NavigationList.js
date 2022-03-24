import {ArrowRightAlt} from "@mui/icons-material";
import {Container, List, Typography} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import db from "../firebase";
import useStyles from "../styles/ContentManagementSystem";

const NavigationList = () => {
  const {type} = useParams();
  const classes = useStyles();
  const [values, setValues] = useState([]);

  useEffect(() => {
    if (type) {
      getDocs(collection(db, type)).then(res => {
        let results = [];
        res.forEach(item => {
          if (item.id) {
            results[item.id] = {...item.data(), id: item.id};
          }
        })
        setValues(results);

      });
    }
  }, []);

  return (
    <>
    <Jumbotron title={`Edit ${type[0].toUpperCase()}${type.slice(1)}`} />
    <Container className={classes.container}>
      <List className={classes.list}>
        {values && Object.values(values).map((item) => {
          const {name, title} = item;
          if (name || title) {
            return (
            <Link key={item.id} component="ListItem" to={`./${item.id}`} className={classes.link}>
              <Typography variant="h6">{name ? name : title}</Typography>
              <Typography variant="h6" className={classes.edit}>Edit <ArrowRightAlt/></Typography>
            </Link>
            )
          }
          return <p>{item.id}</p>
        }
        )}
      </List>
    </Container>
    </>
  )
}


export default NavigationList;
