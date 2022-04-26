import {
  Alert,
  Button,
  Collapse,
  Grid,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import {doc, updateDoc} from "firebase/firestore";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import {deleteObject, getStorage, ref} from "firebase/storage";
import {useEffect, useState} from "react";
import db, {app} from "../firebase";
import useStyles from "../styles/FormElements";

export const ImageEdit = ({
  handleFieldChange,
  hasImage,
  type,
  id,
  handleStatusUpdate,
  ...props
}) => {
  const classes = useStyles();
  const [image, setImage] = useState("");
  const [status, setStatus] = useState({code: "", message: ""});
  const [statusOpen, setStatusOpen] = useState(false);

  // function handler used when closing status alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    // updates open state of alert
    setStatusOpen(false);
  };

  useEffect(() => {
    const storage = getStorage();
    const imageRef = ref(storage, `${type}/${id}`);
    if (imageRef.fullPath) {
      setImage(
        `https://storage.googleapis.com/${imageRef.bucket}/${imageRef.fullPath}`
      );
    }
  }, []);

  const uploadImage = (e) => {
    const functions = getFunctions(app, "europe-west2");
    connectFunctionsEmulator(functions, "localhost", 5000);
    const upload = httpsCallable(functions, "upload");
    const reader = new FileReader();
    const file = document.querySelector("input[type=file]").files[0];

    // attaches an event listener to the file reader
    reader.addEventListener("load", function () {
      // if there is a file after the event has been triggered, continue with checks
      if (reader.result) {
        // if the file is not of type image
        // MIME type includes image/*
        if (!reader.result.split(",")[0].includes("image")) {
          setStatus({
            code: "error",
            message:
              "Please make sure that the file loaded is of type: Image. SVGs will not work when uploaded. They can be instead, converted to a PNG if need be.",
          });
          setStatusOpen(true);
          setImage(null);
          return;
        } else {
          setImage(reader.result);
        }

        // upload resulting image to Firebase Function "upload"
        upload({
          image: reader.result.split(",")[1],
          path: `${type}/${id}`,
        })
          .then((res) => {
            updateDoc(doc(db, type, id), {
              hasImage: true,
            });
            setStatus({
              code: "success",
              message:
                "Succesfully uploaded image, please refresh to see the changes",
            });
            setStatusOpen(true);
          })
          .catch((e) => {
            setStatus({
              code: "error",
              message:
                "Failed to upload image, please contact a site administrator if this continues to fail",
            });
            setStatusOpen(true);
            console.error(e);
          });
      }
    });

    // ensures that file is loaded in as a DataURL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // function to delete an object from Firebase Storage
  const deleteImage = () => {
    const storage = getStorage(app);
    // deletes object by reference to type and document id
    deleteObject(ref(storage, `${type}/${id}`))
      .then((res) => {
        updateDoc(doc(db, type, id), {
          hasImage: false,
        }).then((res) => {
          setStatus({
            code: "success",
            message: "Successfully deleted image",
          });
          setStatusOpen(true);
          setImage(null);
        });
      })
      .catch((e) => {
        setStatus({
          code: "error",
          message:
            "Failed to upload image, please contact a site administrator if this continues to fail",
        });
        setStatusOpen(true);
        console.error(e);
      });
  };

  return (
    <Grid
      container
      spacing={3}
      rowSpacing={1}
      className={classes.imageContainer}
    >
      <Grid item md={12}>
        <InputLabel className={classes.label}>Image</InputLabel>
      </Grid>
      <Grid item>
        {hasImage && image ? (
          <img
            alt='Placeholder'
            {...props}
            src={image}
            className={classes.image}
          />
        ) : (
          <Typography variant='p' sx={{fontStyle: "italic"}}>
            There is currently no image. You'll need to upload one.
          </Typography>
        )}
      </Grid>
      <Grid item>
        {hasImage && image ? (
          <Button onClick={(e) => deleteImage(e)}>Remove Image</Button>
        ) : (
          <Input type='file' onChange={(e) => uploadImage(e)} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Collapse in={statusOpen}>
          <Alert
            severity={status.code || "success"}
            onClose={() => handleClose(false)}
            sx={{alignItems: "center"}}
          >
            {status.message}
          </Alert>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default ImageEdit;
