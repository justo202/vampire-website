import {Button, Grid, Input, InputLabel, Typography} from "@mui/material";
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
  ...props
}) => {
  const classes = useStyles();
  const [image, setImage] = useState("");

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

    reader.addEventListener("load", function () {
      if (reader.result) {
        setImage(reader.result);
        upload({
          image: reader.result.split(",")[1],
          path: `${type}/${id}`,
        })
          .then((res) => {
            updateDoc(doc(db, type, id), {
              hasImage: true,
            });
          })
          .catch((e) => {});
      }
    });

    if (file) {
      reader.readAsDataURL(file);
    } else {
    }
  };

  const deleteImage = () => {
    const storage = getStorage(app);
    // console.log(ref(storage, `${type}/${id}`));
    deleteObject(ref(storage, `${type}/${id}`))
      .then((res) => {
        updateDoc(doc(db, type, id), {
          hasImage: false,
        }).then((res) => {
          console.log("done and done!");
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // TODO ADD functionality to delete image
  // TODO ADD functionality to add more than one image

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
        {hasImage ? (
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
        {props.hasImage ? (
          <Button onClick={(e) => deleteImage(e)}>Remove Image</Button>
        ) : (
          <Input type='file' onChange={(e) => uploadImage(e)} />
        )}
      </Grid>
    </Grid>
  );
};

export default ImageEdit;
