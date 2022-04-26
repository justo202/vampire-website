import {
  Alert,
  Button,
  Checkbox,
  Collapse,
  Container,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {collection, getDocs} from "firebase/firestore";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import Jumbotron from "../components/JumbotronComponent";
import {Publication} from "../content/Publication";
import db, {app} from "../firebase";
import useStyles from "../styles/PublicationSearch";
import {updateFirebase} from "../utils";

export const PublicationsSearch = () => {
  // initialise state values
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({type: "info", message: ""});
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [showDuplicates, setShowDuplicates] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [existingItems, setExistingItems] = useState([]);

  // function to get existing items in publications
  // and then set them in state
  const getExistingItems = () => {
    getDocs(collection(db, "publications")).then((res) => {
      let documents = [];
      res.forEach((item) => {
        documents.push(item.data());
      });
      setExistingItems((curr) => [...documents]);
    });
  };

  // function runs on intial component render
  useEffect(() => {
    getExistingItems();
  }, []);

  // function will send off request to Firebase Function "create"
  // to have items returned using a search term
  // it will then set all items into state
  const getItems = async () => {
    setItems(null);
    setLoading(true);
    setCount(0);

    const functions = getFunctions(app, "europe-west2");
    connectFunctionsEmulator(functions, "localhost", 5000);
    const create = httpsCallable(functions, "create");

    create({author: searchTerm}).then((res) => {
      if (res.data) {
        let returnedData = [];
        let filteredData = [];
        let articlesFound = 0;

        // remove anomaly object from data
        if (res.data.uids) delete res.data.uids;
        articlesFound--;

        // loop through each item
        Object.values(res.data).forEach((item) => {
          // checks if item already exists in publications using it's title and if so
          // doesn't add it to main array of items
          let found =
            existingItems.filter(
              (exItem) =>
                exItem.title
                  .replace(/[^\w\s]|_/g, "")
                  .replace(/\s+/g, " ")
                  .includes(item.title) ||
                item.title
                  .replace(/[^\w\s]|_/g, "")
                  .replace(/\s+/g, " ")
                  .includes(exItem.title)
            ).length > 0;
          if (!found) {
            filteredData.push(item);
          }
          returnedData.push(item);
          articlesFound++;
        });

        // state update functions
        setFilteredItems(filteredData);
        setItems(returnedData);
        setStatus({
          code: "success",
          message: `${
            articlesFound > 0 ? `${articlesFound} a` : "A"
          }rticles successfully found.`,
        });
        setOpen(true);
      } else {
        setStatus({
          code: "error",
          message:
            "No items found. Please try again using a different search term.",
        });
        setOpen(true);
      }
      // sets loading to false to declare data has now been loaded
      setLoading(false);
    });
  };

  // function to upload item to Firebase Firestore Database
  const uploadPublications = () => {
    const upload = new Promise((res, rej) => {
      let itemsUploaded = 0;
      let itemsToUpload = 0;

      // loops through each item and creates a new instance of Publication
      // then uploads each item individually to the Database.
      Object.values(items).forEach((item, idx) => {
        if (!item.checked) {
          return;
        }
        itemsToUpload++;

        if (!item.title) {
          setStatus({
            code: "error",
            message: "There was an issue with uploading one or more items.",
          });
        }

        const instance = new Publication(item),
          values = {};

        instance.id = uuidv4();

        instance.getAttributes().forEach((item) => {
          values[item.name] = item.value;
        });

        updateFirebase("publications", instance.id, values)
          .then((res) => {
            itemsUploaded++;
            getExistingItems();
          })
          .catch((e) => {
            setStatus({
              code: "error",
              message: "There was an issue with uploading one or more items.",
            });
            console.error(e);
          });
      });

      res({itemsToUpload, itemsUploaded});
    });

    // calls function
    upload
      .then((res) => {
        setStatus({code: "success", message: "Successfully uploaded items."});
        setOpen(true);
      })
      .catch((error) => {
        setStatus({
          code: "error",
          message:
            "Failed to upload item(s), please contact a site administrator if this continues to happen.",
        });
        setOpen(true);
        console.log(error);
      });
  };

  // function to handle the checking of a publication item
  const updateChecked = (title) => {
    const temp = items.slice();

    // finds item by title in array
    const found = temp.find((item) => item.title === title);

    // increments count value depending on item being found
    if (found.checked) {
      setCount((curr) => (curr -= 1));
    } else {
      setCount((curr) => (curr += 1));
    }

    // updates state and checked value
    found.checked = !found.checked;
    setItems(temp);
  };

  return (
    <>
      <Jumbotron title='Search for Publications' />
      <Container className={classes.container}>
        <Container className={classes.info}>
          <Typography variant='p'>
            This area is to be used for searching for publications on{" "}
            <Link to='https://pubmed.ncbi.nlm.nih.gov/'>PubMed</Link>,{" "}
            <Link to='https://ieeexplore.ieee.org/Xplore/home.jsp'>
              IEEE Xplore
            </Link>{" "}
            and <Link to='https://scholar.google.com/'>Google Scholar</Link>.
          </Typography>
          <Typography display='block' variant='p'>
            Simply, enter your search term in the text box below and hit
            "Search". This will bring you a list of publications, and allow you
            to manually tick the items that you'd like to import into the
            website. Once done, hit "Done" and you'll then see the chosen
            publications reflected into the{" "}
            <Link to='/cms/publications'>publications list</Link>.
          </Typography>
          <Typography variant='p' display='block'>
            The search field is programmed to search by <strong>Author</strong>.
            For the best results, try to use the author's full name as the
            system will programmatically deal with any formatting.
          </Typography>
          <Typography variant='p' display='block'>
            If you cannot find the publication you are expecting to find, you
            are always able to create a new publication{" "}
            <Link to='/cms/publications/new'>here</Link> and fill out the
            details yourself. Otherwise, try again with a different, more
            specific query.
          </Typography>
          <Typography variant='p' display='block'>
            The list of publications has been filtered also, to make sure that
            it's unlikely that you add an item that already exists in the
            publication database. This function has been carried out using the
            publication title and no other fields.
          </Typography>
          <Typography variant='p' display='block' fontStyle='italic'>
            This Publication Search Tool has been made possible with the help of{" "}
            <Link to='https://serpapi.com'>SerpAPI</Link>.
          </Typography>
        </Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Collapse in={open}>
              <Alert
                severity={status.code}
                onClose={() => setOpen(false)}
                sx={{alignItems: "center"}}
              >
                {status.message}
              </Alert>
            </Collapse>
          </Grid>
          <Grid item xs={12} md={8}>
            <TextField
              value={searchTerm}
              fullWidth
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term e.g. 'Joe Bloggs'"
            />
          </Grid>
          <Grid item md={2} xs={12} className={classes.toolbarItem}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => getItems()}
              className={classes.searchBtn}
              fullWidth
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={12} md={2} className={classes.toolbarItem}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showDuplicates}
                  onChange={(e) => setShowDuplicates((curr) => !curr)}
                />
              }
              label='Show Duplicates?'
            />
          </Grid>
          {count > 0 && (
            <>
              <Grid item md={10} xs={12}>
                <Typography>{`${count} item${
                  count > 1 ? "s" : ""
                } selected`}</Typography>
              </Grid>
              <Grid item md={2} xs={12}>
                <Button
                  color='success'
                  variant='contained'
                  fullWidth
                  onClick={() => uploadPublications()}
                >
                  Upload Items
                </Button>
              </Grid>
            </>
          )}
        </Grid>
        <List>
          {items
            ? Object.values(showDuplicates ? items : filteredItems).map(
                (item, idx) =>
                  item.title && (
                    <ListItem className={classes.listItem} key={item.title}>
                      <Checkbox
                        checked={item.checked || false}
                        onChange={(e) => updateChecked(item.title)}
                      />
                      <Container className={classes.item}>
                        <Typography>
                          <strong>Title</strong>: {item.title}
                        </Typography>
                        {(item.pubdate ||
                          item.epubdate ||
                          item.publication_date) && (
                          <Typography className={classes.date}>
                            <strong>Date</strong>:{" "}
                            {item.pubdate ||
                              item.epubdate ||
                              item.publication_date}
                          </Typography>
                        )}
                        {(item.publisher || item.publishername) && (
                          <Typography>
                            <strong>Publisher</strong>:{" "}
                            {item.publisher || item.publishername}
                          </Typography>
                        )}
                        {(item.fulljournalname ||
                          item.booktitle ||
                          item.conference_name) && (
                          <Typography>
                            <strong>Journal, Booktitle or Conference</strong>:{" "}
                            {item.fulljournalname ||
                              item.booktitle ||
                              item.conference_name}
                          </Typography>
                        )}
                      </Container>
                    </ListItem>
                  )
              )
            : loading &&
              new Array(10).fill(0).map((i) => (
                <ListItem key={Math.random()}>
                  <Skeleton height={60} width='100%' variant='rectangular' />
                </ListItem>
              ))}
        </List>
      </Container>
    </>
  );
};
