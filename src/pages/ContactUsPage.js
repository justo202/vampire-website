import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ContactForm from "../components/ContactFormComponent";
import Jumbotron from "../components/JumbotronComponent";
const ContactUs = () => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item width={"100%"}>
        <Jumbotron
          title='Contact us'
          subtitle='Please let us known if you wish to get in contact'
        />
      </Grid>

      <Grid xs={8} md={5} item sx={{p: {md: 5, xs: 1}}}>
        <Typography variant='h5'>Interested in VAMPIRE?</Typography>
        <hr />
        <Box sx={{p: {md: 3, xs: 0}}}>
          <Typography variant='p'>
            Please fill in this form to help us understand your project and
            needs.
          </Typography>
          <br></br>
          <Typography variant='p'>
            We shall contact you as soon as feasible to discuss possible
            collaborations.
          </Typography>
          <br />
          <Typography variant='p'>
            Thank you for your interest in VAMPIRE.
          </Typography>
        </Box>

        <ContactForm />
      </Grid>
    </Grid>
  );
};

export default ContactUs;
