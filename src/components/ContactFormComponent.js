import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {Component} from "react";
import axios from 'axios'
import ReCaptchaV2 from 'react-google-recaptcha'


const required = (val) => val && val.length;
const minLength = (len, val) => val && val.length >= len;
const maxLength = (len, val) => val.split(" ").length <= len;
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      affiliation: "",
      description: "",
      need: "",
      images: "",
      feedback: "",
      token: null,
      errors: {
        name: "",
        email: "",
        affiliation: "",
        description: "",
        need: "",
        images: "",
        feedback: "",
      },
    };
  }
  validate = (values = this.state) => {
    let error = { ...this.state.errors };
    if ("name" in values)
      error.name = required(values.name)
        ? minLength(3, values.name)
          ? ""
          : "Name must be longer than 3 chars"
        : "This field is required";
    if ("email" in values)
      error.email = validEmail(values.email) ? "" : "Invalid email";
    if ("affiliation" in values)
      error.affiliation = required(values.affiliation)
        ? ""
        : "Please enter your affiliation";
    if ("description" in values)
      error.description = required(values.description)
        ? maxLength(100, values.description)
          ? ""
          : "Message cannot exceed 100 words"
        : "This field is required";
    if ("need" in values)
      error.need = required(values.need)
        ? maxLength(50, values.need)
          ? ""
          : "Message cannot exceed 50 words"
        : "This field is required";
    if ("images" in values)
      error.images = required(values.images)
        ? maxLength(50, values.images)
          ? ""
          : "Message cannot exceed 50 words"
        : "This field is required";
    if ("feedback" in values)
      error.feedback = required(values.feedback)
        ? maxLength(30, values.feedback)
          ? ""
          : "Message cannot exceed 30 words"
        : "This field is required";
    this.setState({
      errors: error,
    });
    if (values == this.state)
      return Object.values(error).every((item) => item === "");
  };
  handleSubmit = (e) => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      affiliation: this.state.affiliation,
      description: this.state.description,
      reason: this.state.need,
      images: this.state.images,
      feedback: this.state.feedback
    }
    e.preventDefault();
    axios({
      method: "POST", 
      url: '/.netlify/functions/sendEmail', 
      data:  data
    }).then((response)=>{
      if (response.data.status === 'success'){
          alert("Message Sent."); 
          
      }else if(response.data.status === 'fail'){
          alert("Message failed to send.")
      }
    })
  }
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.validate({ [name]: value });
  };

   handleToken = (token) => {
    this.setState((currentForm) => {
     return {...currentForm, token }
    })
  }
   handleExpire = () => {
    this.setState((currentForm) => {
     return {...currentForm, token: null }
    })
  }
  render() {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Contact Form
        </Typography>
        <hr />
        <Typography variant="body2" component={"p"} color="lightBlack">
          Please fill out the form
        </Typography>
        <form
          name="contact"
          method="POST"
          data-netlify-recaptcha="true"
          data-netlify="true"
          autoComplete="false"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <Grid container spacing={1}>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Name"
                name="name"
                value={this.state.name}
                placeholder="Please enter your full name"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                onChange={this.handleInputChange}
                error={this.state.errors.name != ""}
                helperText={this.state.errors.name}
              ></TextField>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TextField
                label="Email"
                name="email"
                type={"email"}
                value={this.state.email}
                placeholder="Please enter your Email"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.email != ""}
                helperText={this.state.errors.email}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Affiliation"
                name="affiliation"
                value={this.state.affiliation}
                placeholder="Please enter your Affiliation"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.affiliation != ""}
                helperText={this.state.errors.affiliation}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Describe your project"
                name="description"
                multiline
                rows={3}
                value={this.state.description}
                placeholder="Please describe your research project (max 100 words)"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.description != ""}
                helperText={this.state.errors.description}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="Why is VAMPIRE needed?"
                name="need"
                multiline
                rows={3}
                value={this.state.need}
                placeholder="Why is VAMPIRE needed? (max 50 words)"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.need != ""}
                helperText={this.state.errors.need}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="How many images would you like to measure with VAMPIRE, and from how many patients?"
                name="images"
                multiline
                rows={3}
                value={this.state.images}
                placeholder="How many images would you like to measure with VAMPIRE, and from how many patients? (max 50 words)"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.images != ""}
                helperText={this.state.errors.images}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
              <TextField
                label="How did you hear of VAMPIRE?"
                name="feedback"
                multiline
                rows={5}
                value={this.state.feedback}
                placeholder="How did you hear of VAMPIRE? (max 30 words)"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.feedback != ""}
                helperText={this.state.errors.feedback}
                onChange={this.handleInputChange}
              ></TextField>
            </Grid>
            <Grid xs={12} item>
            <ReCaptchaV2 sitekey='6LfguJseAAAAAKWD94kvIrwRUFgzIx8uqKyIl5vd' 
            onChange={this.handleToken}
            onExpired={this.handleExpire}/> {/*REMEMBER TO REMOVE SITE KEY WHEN SITE ACTUALLY GOES LIVE*/}
            </Grid>
            <Grid xs={12} item>
              <Button type="submit" variant="contained" color="accent">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </>
    );
  }
}

export default ContactForm;
