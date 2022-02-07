import React from "react";
import Jumbotron from "../components/JumbotronComponent";
import { Grid, Paper, Typography } from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => {
    return {
      researchImages: {
        width: '100%',
        height: '100%'
      },
      textBackground: {
        backgroundColor: theme.palette.darkBackground.main
      }
    }
})
  
const ResearchItem = ({imgUrl, description, title, even}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
   
    if(even) {
        return (
            <>
            <Grid item xs={12} md={8}>
            <Paper sx={{backgroundColor: theme.palette.lightBackground.main}}>
                <Grid container>
                <Grid item xs={12} sm={5}>
                <img className={styles.researchImages} src={imgUrl} alt='Research'/>
            </Grid>
            <Grid item xs={12} sm={7} padding={10}>
                
                <Typography
                variant="h5"
                
                >
                    {title}
                </Typography>
                <Typography variant="p" >
                    {description}
                </Typography>
            </Grid>
                </Grid>
            
            </Paper>
            </Grid>
            </>

        );
    } else {
        return(
            <>
            <Grid item xs={12} md={8}>
                <Paper sx={{backgroundColor: theme.palette.lightBackground.main}}>
                    <Grid container>
                        <Grid item xs={12} sx={{display: { xs: 'flex', sm: 'none' } }}>
                             <img className={styles.researchImages} src={imgUrl} alt='Research'/>
                        </Grid>
                        <Grid item xs={12} sm={7} padding={10}>
                            <Typography
                            variant="h5"
                            >
                                {title}
                            </Typography>
                            <Typography variant="p" >
                                {description}
                            </Typography>
                      </Grid>
                        <Grid item xs={12} sm={5} sx={{display: { xs: 'none', sm: 'flex' } }}>
                             <img className={styles.researchImages} src={imgUrl} alt='Research'/>
                        </Grid>
                  
                    </Grid>
                
                </Paper>
            </Grid>
            </>
        )
    }

}



const Research = () => {
    const researchList = [
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
            title: '1',
            key: 1
        },
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            title: '2',
            key: 2
        },
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
            title: '3',
            key: 3
        },
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
            title: '4',
            key: 4
        },
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
            title: '5',
            key: 5
        },
        {
            imgUrl: 'https://picsum.photos/400',
            description: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsumlorem ipsum lorem ipsum',
            title: '6',
            key: 6
        }
    ]
    var isEven = false;
    const researchListMap = researchList.map(item => {
        isEven = !isEven
        return(
        <ResearchItem even={isEven} imgUrl={item.imgUrl} description={item.description} title={item.title} key={item.key}/>
        )
    })

    return(
        <>
        <Jumbotron  title={'Research'} subtitle={'Research projects done in VAMPIRE'}/>
        <Grid container alignItems={'center'} mr={'auto'} ml={"auto"} direction={"column"} spacing={0} maxWidth={'1100px'}>
            {researchListMap}
        </Grid>
        </>
    );

}

export default Research;