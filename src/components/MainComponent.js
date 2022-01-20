import React, { Component } from 'react';
import Navbar from './NavbarComponent';
import Home from './HomeComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Publications from './Publications';
import Team from './TeamComponent';
import AboutUs from './AboutUsComponent';
import ContactUs from './ContactUsComponent';
const customTheme = createTheme({
    palette: {
        primary: {
            main: '#141414',
        },

    }
})
class Main extends Component {
    render() {

        return(
            <>
            <ThemeProvider theme={customTheme}>
                <Router>
                 <Navbar />
                 
                    <Routes>
                        <Route path='/' element={<Home/>}/>
                        <Route path='/publications' element={<Publications/>}/>
                        <Route path='/team' element={<Team/>}/>
                        <Route path='/about' element={<AboutUs/>}/>
                        <Route path='/contact' element={<ContactUs/>}/>

                    </Routes>
                </Router>
          

           
            </ThemeProvider>
            </>
        );
    }
}

export default Main;