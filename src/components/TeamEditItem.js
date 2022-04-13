import { Button, TextField } from "@mui/material";
import { useState } from "react";

export const TeamEditItem = ({ fields }) => {
  const [file, setFile] = useState("");

  const displayField = (field, idx) => {
    switch (typeof field) {
      case "object":
        if (field._seconds) {
          // return <TextField key={idx} value={new Date(field._seconds).toDateString()} />
        }
        break;
      case "string":
        if (field.includes("vampire-research.appspot.com")) {
          return (
            <span key={idx} style={{ verticalAlign: "middle" }}>
              <i>IMAGE HERE</i>
            </span>
          );
        } else {
          return <TextField key={idx} value={field} alt="Field" />;
        }
      default:
        return <TextField key={idx} value={field} alt="Field" />;
    }
  };

  const updateTeamItem = (e) => {
    e.preventDefault();

    // axios("http://localhost:5000/vampire-research/europe-west2/update", data).then(res => console.log(res))
  };

  return (
    <>
      {/* <TextField type="file" value="" name="upload" accept="image/*" onChange={(e) => onImageSelect(e.target.files[0])}/>
      {file && <img src={file} alt="preview" />} */}
      <form onSubmit={updateTeamItem}>
        {Object.values(fields).map((field, idx) => displayField(field, idx))}
        <Button type="submit" variant="contained">
          Update
        </Button>
        <Button type="" variant="contained">
          Update
        </Button>
      </form>
    </>
  );
};

export default TeamEditItem;
