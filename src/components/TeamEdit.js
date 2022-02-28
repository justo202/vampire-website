import {TextField} from "@mui/material";
import {useState} from "react";
import {uploadFile} from "../utils";

export const TeamEdit = () => {
  const [file, setFile] = useState("");

  const onImageSelect = (file) => {
    const src = uploadFile(file, "team")
  }

  return (
    <>
      <TextField type="file" name="upload" accept="image/*" onChange={(e) => onImageSelect(e.target.files[0])}/>
      {file && <img src={file} alt="preview" />}
    </>
  )
}

export default TeamEdit;
