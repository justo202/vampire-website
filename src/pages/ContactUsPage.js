import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import ContactForm from "../components/ContactFormComponent";
import Jumbotron from "../components/JumbotronComponent";
const ContactUs = () => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item width={"100%"}>
        <Jumbotron
          title="Contact us"
          subtitle="Please let us known if you wish to get in contact"
          button="Contact form"
          buttonLink="#form"
        />
      </Grid>

      <Grid xs={8} md={5} item p={5}>
        <Typography variant="h4">Contact us</Typography>
        <hr />
        <Box p={3}>
          <Typography variant="p">Our telepohe numbers</Typography>
          <br></br>
          <Typography variant="p">+44 123123123</Typography>
          <br />
          <Typography variant="p">
            Or please fill out the form bellow.
          </Typography>
        </Box>

        <ContactForm />
      </Grid>
    </Grid>
  );
};

export default ContactUs;
