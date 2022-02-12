import {Button, Container, FormGroup, TextField, Typography} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";


export const PublicationsEdit = () => {
  const [author, setAuthor] = useState("");
  const [pubs, setPubs] = useState([]);
  const [activePubs, setActivePubs] = useState([]);

  const fetchPublications = async (e) => {
    e.preventDefault();
    setPubs([]);
    const result = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?retmode=json&term=${encodeURIComponent(author)}[Full%20Author%20Name]&usehistory=y`);
    const publications = await axios.get(`https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?retmode=json&WebEnv=${result.data.esearchresult.webenv}&query_key=1&db=pubmed`);
    delete publications.data.result.uids;
    const postObj = {
      data: Object.values(publications.data.result).filter(p => p.uid),
      collection: "publications"
    }
    axios.post("/.netlify/functions/create",postObj);
    setAuthor("");
  }
  return (
    <Container>
      <Typography variant="h4">Publications</Typography>
      <Typography variant="p">In this section, you can create, edit and delete specific publications.</Typography>
      <Typography variant="p">By using the search box, you can find publications that reference an author.</Typography>
      <FormGroup sx={{display: "flex", justifyContent: "flex-start", flexDirection: "row", alignItems: "center"}}>
        <TextField name="author" label="Author's Lastname, Firstname" sx={{flex: 1}} value={author} onChange={(e) => setAuthor(e.target.value)}/>
        <Button onClick={fetchPublications} type="submit">Fetch</Button>
      </FormGroup>
    </Container>
  )
}

export default PublicationsEdit;
