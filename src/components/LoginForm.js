import React from "react";
import {Avatar, Grid, Paper, Typography, TextField, Button } from '@mui/material'
import { LockOutlined } from "@mui/icons-material";
import { getAuth, signInWithEmailAndPassword } from "../firebase";


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