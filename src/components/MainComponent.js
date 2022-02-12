import {createTheme, ThemeProvider} from '@mui/material/styles';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ContactUs from '../pages/ContactUsPage';
import ContentManagementSystem from '../pages/ContentManagementSystem';
import Home from '../pages/HomePage';
import Publications from '../pages/PublicationsPage';
import Research from '../pages/Research';
import Team from '../pages/TeamPage';
import Navbar from './NavbarComponent';

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
const Main = () => {
  return(
      <>
      <ThemeProvider theme={customTheme}>
          <Router>
            <Navbar />
              <Routes>
                  <Route path='/' element={<Home />}/>
                  <Route path='/publications' element={<Publications />}/>
                  <Route path='/team' element={<Team />}/>
                  <Route path='/research' element={<Research />}/>
                  <Route path='/contact' element={<ContactUs />}/>
                  <Route path='/cms' element={<ContentManagementSystem />}/>
              </Routes>
          </Router>
      </ThemeProvider>
      </>
  );
}

export default Main;
