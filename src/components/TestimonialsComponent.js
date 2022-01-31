import React from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Typography, Card, CardContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { width } from "@mui/system";

const useStyles = makeStyles(() => {
    return {
        slides: {
            width: "400px",
            height: "300px"
            
        },
        slide: {
            height: "300px",
            width: "100%"
        }
    }
})

const Testimonial = (props) => {

    return( 
        <Card sx={{ minHeight: "150px" }}>
        <CardContent>
          <Typography variant="h6" component="div"
          align="center">
          {props.description}
          </Typography>
          <Typography sx={{ fontStyle: "italic"}} color="text.secondary"
          align="center"
          >
            {props.name}
          </Typography>
        </CardContent>
      </Card>

    );


}


const Testimonials = () => {
    const styles = useStyles();
    const testimonialInfo = [
        {
            description: "this is a very good websites yesyesawerawe awerawefaweawe rawera werawer awera",
            name: "its me"
        },
        {
            description: "what the eck is this even wow so goodsdafsgdfhewrrtwe waeraf awe awera weraw",
            name: "some guy"
        },
        {
            description: "i cant believe this workser awera weraw erawe rawer awer awer awerawe rawer awerawerawer awera werwae rawer",
            name: "who"
        },
        {
            description: "they were really good to work with and im happy that everything went well, cant wait to work with them again in the futurewe rawer awer awerawerasdfawe",
            name: "person"
        }
    ]

    return (
        <Carousel className={styles.slides} >
           
            {testimonialInfo.map(testimonial => <Testimonial description={testimonial.description} name={testimonial.name}/>)}
           
          
        </Carousel>
    )

}

export default Testimonials;