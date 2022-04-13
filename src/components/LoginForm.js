import React from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "../firebase";

const auth = getAuth();

const handleSubmit = (e, close) => {
  const email = e.target[0].value;
  const password = e.target[1].value;

  e.preventDefault();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      close();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const LoginForm = ({ closeForm }) => {
  return (
    <Paper
      elevation={10}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Grid
        container
        alignItems={"center"}
        rowGap={2}
        direction="column"
        width={"300px"}
        p={3}
      >
        <Avatar>
          {" "}
          <LockOutlined />{" "}
        </Avatar>
        <Typography variant="h4" mb={2}>
          Sign in
        </Typography>
        <form onSubmit={(e) => handleSubmit(e, closeForm)}>
          <TextField
            label="Email"
            name="email"
            placeholder="Enter your Email"
            variant="standard"
            type="email"
            fullWidth
            required
            sx={{ marginBottom: "5px" }}
          />
          <TextField
            label="Password"
            name="password"
            type={"password"}
            placeholder="Enter your password"
            variant="standard"
            fullWidth
            required
            sx={{ marginBottom: "30px" }}
          />
          <Button fullWidth type="submit" variant="contained" color="accent">
            Log in
          </Button>
        </form>
      </Grid>
    </Paper>
  );
};

export default LoginForm;
