import Box from "@mui/material/Box";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Component} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {getAuth, onAuthStateChanged, signOut} from "../firebase";
import ContactUs from "../pages/ContactUsPage";
import ContentManagementSystem from "../pages/ContentManagementSystem";
import Home from "../pages/HomePage";
import Publications from "../pages/PublicationsPage";
import {PublicationsSearch} from "../pages/PublicationsSearch";
import Research from "../pages/Research";
import Team from "../pages/TeamPage";
import EditList from "./EditList";
import Footer from "./Footer";
import Jumbotron from "./JumbotronComponent";
import Navbar from "./NavbarComponent";
import NavigationList from "./NavigationList";

const customTheme = createTheme({
  palette: {
    background: {
      default: "#FFFCF2",
    },
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
    grayText: {
      main: "#707070",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
          border: "1px solid rgba(0,0,0,0.08)",
        },
      },
    },
  },
});
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      email: "",
    };
  }

  signUserOut = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  componentDidMount() {
    
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.setState({
          loggedIn: true,
          email: user.email,
        });
      } else {
        this.setState({
          loggedIn: false,
          email: "",
        });
      }
    });
  }

  render() {
    return (
      <>
        <ThemeProvider theme={customTheme}>
          <Box
            sx={{
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Router>
              <Navbar isLogged={this.state.loggedIn} email={this.state.email} />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/publications' element={<Publications />} />
                <Route path='/team' element={<Team />} />
                <Route path='/research' element={<Research />} />
                <Route path='/contact' element={<ContactUs />} />
                <Route
                  path='/cms/publications/search'
                  element={<PublicationsSearch />}
                />
                <Route path='/cms/:type/:id' element={<EditList />} />
                <Route path='/cms/:type' element={<NavigationList />} />
                <Route path='/cms' element={<ContentManagementSystem />} />
                <Route path='*' element={<Jumbotron title='Page not found' />} />
              </Routes>
              <Footer
                isLogged={this.state.loggedIn}
                signUserOut={this.signUserOut}
              />
            </Router>
          </Box>
        </ThemeProvider>
      </>
    );
  }
}

export default Main;
