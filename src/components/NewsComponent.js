import React from "react";
import { Card, CardMedia, CardContent, CardActions, Typography, Button, Grid } from "@mui/material";

const NewsItem = (props) => {
    return (
        <Grid item xs={12} sm={4}>
            <Card sx={{ width: {xs: '100%', md: '300px'}}}>
            <CardMedia
                component="img"
                height="140"
                image={props.image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {props.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                {props.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button color={'accent'}size="small">Learn More</Button>
            </CardActions>
            </Card>
        </Grid>
      );
}




const NewsSection = () => {
    const newsItems = [
        {
            image: 'https://picsum.photos/200',
            title: "First",
            description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius; dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare. Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat.',
            key: 1
        },
        {
            image: 'https://picsum.photos/200',
            title: "Second",
            description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius; dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare. Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat.',
            key: 2
        },
        {
            image: 'https://picsum.photos/200',
            title: "Third",
            description: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius; dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare. Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat.',
            key: 3
        }
    ]
    return (
        <Grid container spacing={1}>
          {newsItems.map(item => <NewsItem key={item.key} image={item.image} title={item.title} description={item.description}/>)}
        </Grid>
    )


}

export default NewsSection;