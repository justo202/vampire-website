 import React, { useState } from "react";

import { Toolbar, AppBar, Typography, Container, Button, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles(() => {
  return {
    toolbarHeigh: {
      padding: '40px'
    },
    navLinks: {
      textDecoration: 'none',
      textTransform: 'none',
      color: '#FF8040'
    }
  }

})
 const Navbar = () => {
    const styles = useStyles();


    const [anchorElNav, setAnchorElNav] = useState(null);
  
    const pages = [
      {
        key: 1,
        name: "Home",
        url: "/"
      },
      {
        name: "Publications",
        url: "/publications"
      },
      {
        key: 2,
        name: "Team",
        url: "/team"
      },
      {
        key: 3,
        name: "About us",
        url: "/about"
      },
      {
        key: 4,
        name: "Contact us",
        url: "contact"
      }

    ]
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    return (
        <>
        <AppBar>
            <Container >
                <Toolbar  disableGutters>
                    <Typography
                        variant="h6"
                        noWrap 
                        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                          <MenuIcon />
                    </IconButton>
                    <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                    >
                    {pages.map(page => (
                    <MenuItem key={page.key} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center"><Link className={styles.navLinks} to={page.url}>{page.name}</Link></Typography>
                    </MenuItem>
                    ))}            
                    </Menu>
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {pages.map(page => (
                          <Button key={page.key} sx={{ my: 2, display: 'block' }}>
                            <Link className={styles.navLinks} to={page.url} >
                            <Typography
                            variant="h6"
                            >
                              {page.name}
                            </Typography>
                             
                            </Link>
                            </Button>
                        ))}   
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
        <div className={styles.toolbarHeigh}></div>
        </>

    );


}

export default Navbar;