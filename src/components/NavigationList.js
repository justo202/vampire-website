import {Add, ArrowRightAlt} from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Container,
  Grid,
  Link,
  List,
  Typography,
} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import Jumbotron from "../components/JumbotronComponent";
import db from "../firebase";
import useStyles from "../styles/ContentManagementSystem";

const NavigationList = () => {
  const {type} = useParams();
  const classes = useStyles();
  const [values, setValues] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (type) {
      getDocs(collection(db, type)).then((res) => {
        let results = [];
        res.forEach((item) => {
          if (item.id) {
            results[item.id] = {...item.data(), id: item.id};
          }
        });
        setValues(results);
      });
    }
  }, []);

  const addNew = () => {
    navigate(`/cms/${type}/new`, {replace: false});
  };

  return (
    <>
      <Jumbotron title={`Edit ${type[0].toUpperCase()}${type.slice(1)}`} />
      <Container className={classes.container} spacing={2}>
        {type && values && (
          <Breadcrumbs aria-label='breadcrumb' sx={{marginBottom: "1.5rem"}}>
            <Link component={RouterLink} to='/cms'>
              CMS
            </Link>
            <Typography color='text.primary'>
              {`${type[0].toUpperCase()}${type.slice(1)}`}
            </Typography>
          </Breadcrumbs>
        )}
        <Grid container columnSpacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={(e) => addNew()}
              sx={{marginBottom: "1rem"}}
            >
              Create New <Add />
            </Button>
          </Grid>
          {type === "publications" && (
            <Grid item xs={12} sm={6} md={3}>
              <Button
                fullWidth
                variant='contained'
                color='warning'
                onClick={(e) => navigate("/cms/publications/search")}
                sx={{marginBottom: "1rem"}}
              >
                Search Publications <Add />
              </Button>
            </Grid>
          )}
        </Grid>
        <List className={classes.list}>
          {values &&
            Object.values(values).map((item) => {
              const {name, title} = item;
              return (
                <RouterLink
                  key={item.id}
                  component='ListItem'
                  to={`./${item.id}`}
                  className={classes.link}
                >
                  <Typography variant='h6'>
                    {name || title ? name || title : "New Item"}
                  </Typography>
                  <Typography variant='h6' className={classes.edit}>
                    Edit <ArrowRightAlt />
                  </Typography>
                </RouterLink>
              );
            })}
        </List>
      </Container>
    </>
  );
};

export default NavigationList;
