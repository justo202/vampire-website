import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
        />
      </Grid>

      <Grid xs={8} md={5} item p={5}>
        <Typography variant="h5">Interested in VAMPIRE?</Typography>
        <hr />
        <Box p={3}>
          <Typography variant="p">
            Please fill in this form to help us understand your project and
            needs.
          </Typography>
          <br></br>
          <Typography variant="p">
            We shall contact you as soon as feasible to discuss possible
            collaborations.
          </Typography>
          <br />
          <Typography variant="p">
            Thank you for your interest in VAMPIRE.
          </Typography>
        </Box>

        <ContactForm />
      </Grid>
    </Grid>
  );
};

export default ContactUs;
