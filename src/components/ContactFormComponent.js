import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {Component} from "react";

const required = (val) => val && val.length;
const minLength = (len, val) => val && val.length >= len;
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      message: "",
      errors: {
        name: "",
        email: "",
        message: "",
      },
    };
  }

  validate = (values = this.state) => {
    let error = { ...this.state.errors };
    if ("name" in values)
      error.name = required(this.state.name)
        ? minLength(3, this.state.name)
          ? ""
          : "Name must be longer than 3 chars"
        : "This field is required";
    if ("email" in values)
      error.email = validEmail(this.state.email) ? "" : "Invalid email";
    if ("message" in values)
      error.message = required(this.state.message)
        ? minLength(5, this.state.message)
          ? ""
          : "Message must be longer than 5 chars"
        : "This field is required";
    this.setState({
      errors: error,
    });
    if (values == this.state)
      return Object.values(error).every((item) => item === "");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validate()) alert("working");
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.validate({ [name]: value });
  };
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
        <form id="form" autoComplete="false" onSubmit={this.handleSubmit}>
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
                label="Message"
                name="message"
                multiline
                rows={5}
                value=""
                value={this.state.message}
                placeholder="Your message"
                variant="outlined"
                fullWidth
                required
                onBlur={this.handleInputChange}
                error={this.state.errors.message != ""}
                helperText={this.state.errors.message}
                onChange={this.handleInputChange}
              ></TextField>
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
