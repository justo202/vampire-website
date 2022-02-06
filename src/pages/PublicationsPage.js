import PersonIcon from "@mui/icons-material/Person";
import {
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  IconButton,
  Modal,
  Pagination,
  Typography,
} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Jumbotron from "../components/JumbotronComponent";
import pubJson from "../data/publications.json";

const Publications = () => {
  const [pubs, setPubs] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const pagesCount = Math.ceil(pubJson[0].data.length / 12);
  const [modalOpen, setModalOpen] = useState(false);

  const parseAuthors = (text) => {
    let newText = text
      .split(" and")
      .map((author) => author.trim() + ",")
      .sort()
      .filter((i) => i.length > 10)
      .join(" ");
    return newText.slice(0, newText.length - 1) + ".";
  };

  useEffect(() => {
    axios({
      method: "post",
      url: "/.netlify/functions/publications",
      data: {
        pageNumber,
        pubsPerPage: 12,
      },
    })
      .then((res) => {
        setPubs(res.data);
      })
      .catch((e) => {
        setPubs([
          {
            citationKey: "fff",
            entryTags: {title: "Loading...", author: "Loading...", link: "#"},
          },
        ]);
      });
  }, [pageNumber]);

  return (
    <>
      <Jumbotron title='Publications' />
      <Container sx={{maxWidth: 1200, margin: "2rem auto"}}>
        <Grid container spacing={2}>
          {pubs.length > 0 &&
            pubs.map((pub) => {
              return (
                <Grid key={pub.citationKey} item xs={6}>
                  <Card sx={{height: "100%"}}>
                    <CardContent>
                      <Typography variant='h6' component='div'>
                        {pub.entryTags.title}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => setModalOpen({id: pub.citationKey})}
                      >
                        <PersonIcon />
                      </IconButton>
                      <Typography component='span'>
                        {pub.entryTags.author.split(" and").length}
                      </Typography>
                      <Modal
                        id={pub.citationKey}
                        open={modalOpen.id === pub.citationKey}
                        onClose={() => setModalOpen({id: null})}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            p: 4,
                          }}
                        >
                          <Typography>
                            {parseAuthors(pub.entryTags.author)}
                          </Typography>
                        </Box>
                      </Modal>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Pagination
          sx={{marginTop: "2rem"}}
          page={pageNumber}
          count={pagesCount}
          onChange={(e, v) => setPageNumber(v)}
        ></Pagination>
      </Container>
    </>
  );
};

export default Publications;
