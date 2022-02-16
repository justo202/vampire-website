import React from "react";
import {Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import { LockOutlined } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
const config = {
    apiKey: "AIzaSyCqvF0Y-w4fTN32f-iOVzfSh6VVvfxJ-WA",
    authDomain: "vampire-research.firebaseapp.com",
    projectId: "vampire-research",
    storageBucket: "vampire-research.appspot.com",
    messagingSenderId: "444693724107",
    appId: "1:444693724107:web:f2eef9f917aa270381944e",
    measurementId: "G-L6P85RGSFE"
  }

  const app = initializeApp(config);




const auth = getAuth();


const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    signInWithEmailAndPassword(auth, "justaslabeikis23@gmail.com", "test123")
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  


}

const LoginForm = () => {

    return(
       
            <Paper elevation={10}>
                <Grid container alignItems={'center'} rowGap={2} direction='column' width={'300px'} p={3}>
                <Avatar> <LockOutlined /> </Avatar>
                <Typography
                variant="h4"
                mb={2}>
                    Sign in
                </Typography>
                <form onSubmit={(e) => handleSubmit(e)} >
                <TextField
                label="Username"
                name="username"
                placeholder="Enter your Username"
                variant="standard"
                fullWidth
                required 
                sx={{marginBottom: '5px'}}/>
                <TextField
                label="Password"
                name="password"
                type={'password'}
                placeholder="Enter your password"
                variant="standard"
                fullWidth
                required 
                sx={{marginBottom: '5px'}}/>
            <Button fullWidth type="submit" variant="contained" color="accent">
                Log in
              </Button>
                </form>

                </Grid>

            </Paper>
      

    )
}

export default LoginForm;