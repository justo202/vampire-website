import {collection, getDocs} from "@firebase/firestore/lite";
import {Card, CardContent, Grid, Skeleton, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import db from "../firebase";

const NewsItem = ({date, text, title}) => {
  return (
    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          width: "100%",
          minHeight: "300px",
          borderBottom: "2px #FF7700  solid",
        }}
      >
        <CardContent>
          <Typography variant='caption' color='text.primary'>
            {/* {date.toLocaleDateString()} */}
          </Typography>
          <Typography gutterBottom variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

const NewsSection = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  // const classes = useStyles();

  useEffect(() => {
    async function getData() {
      const snapshot = await getDocs(collection(db, "updates"));
      setUpdates(() => {
        var temp = snapshot.docs.slice(0, 3).map((doc, idx) => {
          return {...doc.data(), id: doc.id};
        });
        return temp.sort((a, b) => b.date.seconds - a.date.seconds);
      });

      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton height='400' width='100%' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton height='400' width='100%' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton height='400' width='100%' />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Skeleton height='400' width='100%' />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={1}>
      {updates &&
        updates.map((item, idx) => (
          <NewsItem
            // date={item.date.getDate()}
            key={idx}
            id={item.id}
            title={item.title}
            text={item.text}
          />
        ))}
    </Grid>
  );
};

export default NewsSection;
