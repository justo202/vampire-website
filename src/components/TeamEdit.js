import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { uploadFile } from "../utils";

export const TeamEdit = () => {
  const [file, setFile] = useState("");
  const [team, setTeam] = useState([]);

  const onImageSelect = (file) => {
    const src = uploadFile(file, "team");
  };

  useEffect(() => {
    axios(
      "http://localhost:5000/vampire-research/europe-west2/fetch?collection=team"
    ).then((res) => {
      console.log(res.data);
      setTeam(res.data);
    });
  }, []);

  // const displayField = (field, idx) => {
  //   switch (typeof field) {
  //     case "object":
  //       // if (field._seconds) {
  //       //   return <TextField key={idx} value={new Date(field._seconds).toDateString()} />
  //       // }
  //       break;
  //     case "string":
  //       if (field.includes("vampire-research.appspot.com")) {
  //         return <span key={idx} style={{verticalAlign: "middle"}}><i>IMAGE HERE</i></span>
  //       } else {
  //         return <TextField key={idx} value={field} alt="Field" />
  //       }
  //     default:
  //       return <TextField key={idx} value={field} alt="Field" />
  //   }
  // }

  // const updateTeamItem = (e) => {
  //   e.preventDefault();
  // }

  return (
    <>
      <Typography variant="h4">Edit Team Members</Typography>
      {/* <TextField type="file" value="" name="upload" accept="image/*" onChange={(e) => onImageSelect(e.target.files[0])}/>
      {file && <img src={file} alt="preview" />} */}
      <Container>
        <p>Hi</p>
        {/* {Object.values(team).map((item,idx) => <TeamEditItem key={idx} fields={item} />)} */}
      </Container>
    </>
  );
};

export default TeamEdit;
