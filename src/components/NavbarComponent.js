import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {makeStyles, useTheme} from "@mui/styles";
import {useState} from "react";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => {
  return {
    toolbarHeigh: {
      padding: "55px",
    },
    navLinks: {
      fontSize: "1.25rem",
      fontFamily: "Segoe UI",
      textDecoration: "none",
      textTransform: "none",
      color: theme.palette.grayText.main,
      "&:hover": {
        color: theme.palette.accent.main,
      },
    },
  };
});

const LoginBar = ({email}) => {
  if(email !== "")
    return (
      <Box sx={{display: 'flex', backgroundColor: "darkBackground.main", justifyContent: 'center'}}>
      <Box sx={{width: '100%', maxWidth: '1100px'}} >
        <Box sx={{float: 'right'}} display={'inline-flex'}>
        <Typography
          variant="body1"
          color={'grayText.main'}
          mr={1}>
          Hello,
        </Typography>
          <Typography
          variant="body1"
          color={'grayText.main'}
          sx={{fontWeight: 'bolder'}}>
          {email}
          </Typography>
        </Box>

      </Box>

    </Box>
    )
  return null
}
const Navbar = (props) => {
  const {isLogged, email } = props;
  const theme = useTheme();
  const styles = useStyles(theme);

  const [anchorElNav, setAnchorElNav] = useState(null);

  const pages = [
    {
      name: "Publications",
      url: "/publications",
      show: true
    },
    {
      name: "Team",
      url: "/team",
      show: true
    },
    {
      name: "Research",
      url: "/research",
      show: true
    },
    {
      name: "Contact us",
      url: "/contact",
      show: true
    },
    {
      name: "CMS",
      url: "/cms",
      show: isLogged
    }
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <AppBar sx={{backgroundColor: "#ffff"}}>
        <Container>
          <Toolbar disableGutters sx={{maxWidth: "1100px"}}>
            <Typography
              variant='h6'
              noWrap
              sx={{flexGrow: 0, display: {xs: "none", md: "flex"}}}
            >
              <Link to={"/"}>
                <img
                  alt='logo'
                  width={"250px"}
                  src='/images/vampire_logo.png'
                />
              </Link>
            </Typography>
            <Box sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='accent'
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: {xs: "block", md: "none"},
                }}
              >
                {pages.map((page, idx) => {
                  if(page.show)
                    return (
                      <MenuItem key={idx} onClick={handleCloseNavMenu}>
                        <Typography textAlign='center'>
                          <Link className={styles.navLinks} to={page.url}>
                            {page.name}
                          </Link>
                        </Typography>
                      </MenuItem>
                    );
                  return null
                })}
              </Menu>
            </Box>
            <Typography
              variant='h6'
              noWrap
              sx={{flexGrow: 1, display: {xs: "flex", md: "none"}}}
            >
              <Link to={"/"}>
                <img
                  alt='logo'
                  width={"250px"}
                  src='./images/vampire_logo.png'
                />
              </Link>
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
                flexGrow: 0,
                display: {xs: "none", md: "flex"},
                justifyContent: "space-between",
                width: "50%",
              }}
            >
              {pages.map((page, idx) => {
                if(page.show)
                  return (
               
                    <Typography
                      sx={{m: 1, display: "block"}}
                      key={idx}
                      color='white'
                      variant='h6'
                    >
                      <Link className={styles.navLinks} to={page.url}>
                        {page.name}
                      </Link>
                    </Typography>
                  )
                return null


              })}
            </Box>
          </Toolbar>
        </Container>
        <LoginBar email={email}/>
      </AppBar>

      <div className={styles.toolbarHeigh}></div>
      
    </>
  );
};

export default Navbar;
