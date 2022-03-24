import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import db from "../firebase";
import Jumbotron from "./JumbotronComponent";

const EditList = () => {
  const [values, setValues] = useState([{}]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const {type, id} = useParams();

  useEffect(() => {
    const docRef = doc(db, type, id)
    getDoc(docRef).then(res => {
      if (res.exists()) {
        setValues(res.data())
        setFields(Object.keys(res.data()).filter((i) => i !== "0" || typeof i !== Object));
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    <>
    <Jumbotron title="Edit Item" />
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
        <Grid item xs={12}>
          <TextField />
        </Grid>
      </Grid>
    </Container>
    </>
  }

  return (
  <>
    <Jumbotron title={`Edit ${type[0].toUpperCase()}${type.slice(1)} Item`} />
    <Container sx={{margin: "2rem auto"}}>
      <Grid container spacing={3}>
      {Object.keys(values).sort().map((item, idx) => {
        switch(item) {
          case "photo":
            return <Grid fullWidth item xs={12} key={item} component={Box} md={12}>
              <Typography variant="h6">Image(s)</Typography><img width={150} src={values[item] ? values[item] : "#"} alt={type + " image"} /></Grid>
          case "photos":
            return values[item].map(img =>
              <Grid fullWidth item xs={12} key={img} component={Box} md={6}><img src={img ? img : "#"} width={50} alt={type + " image"} /></Grid>
              );
          case "timeframe":
          case "date":
            return <Grid item xs={12} key={item} component={Box} md={6}>
              <TextField fullWidth value={"Date in maintenance"} label={"Date"} /></Grid>
          default:
            return <Grid item xs={12} key={item} component={Box} md={6}>
              <TextField fullWidth multiline value={values[item]} label={`${item[0].toUpperCase()}${item.slice(1)}`}></TextField></Grid>
        }
      })}
      <Grid item md={12} fullWidth>
        <Grid container spacing={1}>
          <Grid item md={1}>
            <Button variant="contained" color="success">Update</Button>
          </Grid>
          <Grid item md={1}>
            <Button variant="contained" color="error">Delete</Button>
          </Grid>

        </Grid>

      </Grid>
      </Grid>
    </Container>
    {/* <NavigationList values={values} /> */}
  </>)
}

export default EditList;
