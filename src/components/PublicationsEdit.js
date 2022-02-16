import {Button, Container, FormGroup, TextField, Typography} from "@mui/material";
import {useTheme} from "@mui/styles";
import axios from "axios";
import React, {useState} from "react";

export const PublicationsEdit = () => {
  const [author, setAuthor] = useState(
    {name: "", id: ""}
  );
  const [pubs, setPubs] = useState([]);
  const [activePubs, setActivePubs] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [authors, setAuthors] = useState([]);
  const theme = useTheme();

  const fetchPublications = async (e) => {
    e.preventDefault();
    setPubs([]);
    setSuccessMessage(null);
    setErrorMessage(null)
    const postObj = {
      collection: "publications",
      author
    }
    axios.post("/.netlify/functions/create",postObj).then(res => {
      setSuccessMessage(`Successully uploaded ${res.data.count} publications`);
    }).catch(res => {
      setErrorMessage(`Failed to fetch publications. There must be something wrong...`);
    });

    setAuthor({name: "", id: ""});
  }
  return (
    <Container>
      <Typography variant="h4">Publications</Typography>
      <Typography variant="p">In this section, you can create, edit and delete specific publications.</Typography>
      <Typography variant="p">By using the search box, you can find publications that reference an author.</Typography>
      <FormGroup sx={{display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "center"}}>
        <TextField name="author" label="Author's Full Name" sx={{flex: 1}} value={author.name}
        onChange={(e) => setAuthor(curr => ({...curr, name: e.target.value }))} />
        <Button onClick={fetchPublications} type="submit">Fetch</Button>
      </FormGroup>
      <Typography hidden={!successMessage} sx={{padding: "1rem", backgroundColor: `${theme.palette.success.main}22`, color: theme.palette.success.dark }}>{successMessage}</Typography>
      <Typography hidden={!errorMessage} sx={{padding: "1rem", backgroundColor: `${theme.palette.error.main}22` }}>{errorMessage}</Typography>
    </Container>
  )
}

export default PublicationsEdit;
