import React, { Component } from 'react';
import Navbar from './NavbarComponent';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Publications from '../pages/PublicationsPage';
import Home from '../pages/HomePage';
import Team from '../pages/TeamPage';
import Research from '../pages/Research';
import ContactUs from '../pages/ContactUsPage';
import ContentManagementSystem from '../pages/ContentManagementSystem';
const customTheme = createTheme({
    palette: {
        lightBackground: {
            main: '#FFFCF2',
        },
        darkBackground: {
            main: '#CCC5B9'
        },
        black: {
            main: '#252422'
        },
        lightBlack: {
            main: '#403D39'
        },
        accent: {
            main: '#FF8040',
            contrastText: '#fff'
        }


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
                        <Route path='/research' element={<Research/>}/>
                        <Route path='/contact' element={<ContactUs/>}/>
                        <Route path='/cms' element={<ContentManagementSystem/>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
            </>
        );
    }
}

export default Main;
