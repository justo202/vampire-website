import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "../firebase";
import ContactUs from "../pages/ContactUsPage";
import ContentManagementSystem from "../pages/ContentManagementSystem";
import Home from "../pages/HomePage";
import Publications from "../pages/PublicationsPage";
import Research from "../pages/Research";
import Team from "../pages/TeamPage";
import Footer from "./Footer";
import Navbar from "./NavbarComponent";

const customTheme = createTheme({
  palette: {
    lightBackground: {
      main: "#FFFCF2",
    },
    darkBackground: {
      main: "#CCC5B9",
    },
    black: {
      main: "#252422",
    },
    lightBlack: {
      main: "#403D39",
    },
    accent: {
      main: "#FF8040",
      contrastText: "#fff",
    },
  },
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }


  signUserOut = async () => {
    const auth = getAuth();
     await signOut(auth);
  }

   componentDidMount() {
    const auth = getAuth();

     onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({
          loggedIn: true,
        });
      } else {
        this.setState({
          loggedIn: false,
        });
      }
    });
  }


  render() {
    return (
      <>
        <ThemeProvider theme={customTheme}>
          <Router>
            <Navbar isLogged={this.state.loggedIn}  signUserOut={this.signUserOut} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/team" element={<Team />} />
              <Route path="/research" element={<Research />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/cms" element={<ContentManagementSystem />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </>
    );
  }
}

export default Main;
