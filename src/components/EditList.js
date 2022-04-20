import {
  Alert,
  Breadcrumbs,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Link,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {Link as RouterLink, useNavigate, useParams} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import db from "../firebase";
import {createInstance, deleteFirebase, updateFirebase} from "../utils";
import Authors from "./Authors";
import Collaborators from "./Collaborators";
import CustomDatePickerWrapper from "./DatePicker";
import ImageEdit from "./ImageEdit";
import Jumbotron from "./JumbotronComponent";

const EditList = () => {
  const [instance, setInstance] = useState();
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({code: "info", message: ""});
  const [open, setOpen] = useState(false);
  const {type, id} = useParams();
  const [customId, setCustomId] = useState(uuidv4());
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const fieldChangeFunction = (fieldId, e, index, isNew, toDelete) => {
    if (!e) return;
    if (fieldId === "collaborators") {
      let temp = values.collaborators.slice();
      if (isNew) {
        temp.push({name: "New Person", institution: ""});
      } else if (toDelete) {
        temp.splice(index, 1);
      } else {
        temp[index][e.index] = e.newValue;
      }
      setValues((curr) => ({
        ...curr,
        collaborators: temp,
      }));
    } else if (fieldId === "authors") {
      let temp = values.authors.slice();
      if (isNew) {
        temp.push(e);
      } else if (toDelete) {
        temp.splice(index, 1);
      } else {
        temp[index] = e.target.value;
      }
      setValues((curr) => ({
        ...curr,
        authors: temp,
      }));
    } else if (
      fieldId === "date" ||
      fieldId === "startDate" ||
      fieldId === "endDate"
    ) {
      if (index) {
        setValues((curr) => ({...curr, [index]: e}));
      } else {
        setValues((curr) => ({...curr, [fieldId]: e}));
      }
    } else {
      setValues((curr) => ({...curr, [fieldId]: e.target.value}));
    }
  };

  const components = {
    img: ImageEdit,
    text: TextField,
    date: CustomDatePickerWrapper,
    collaborators: Collaborators,
    authors: Authors,
  };

  useEffect(() => {
    const docRef = doc(db, type, id);
    getDoc(docRef).then((res) => {
      if (res.exists()) {
        const temp = createInstance(type, res.data());
        temp.id = id;
        let values = {};
        temp.getAttributes().forEach((item) => {
          values[item.name] = item.value;
        });
        setValues(values);
        setInstance(temp);
        setLoading(false);
      } else {
        navigate(`/cms/${type}/new`, {replace: true});
        const temp = createInstance(type, null);
        temp.id = customId;
        let values = {};
        temp.getAttributes().forEach((item) => {
          values[item.name] = item.value;
        });
        setValues(values);
        setInstance(temp);
        setLoading(false);
      }
    });
  }, [loading]);

  if (loading) {
    <>
      <Jumbotron title='Edit Item' />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
          <Grid item xs={12}>
            <Skeleton variant='text' />
          </Grid>
        </Grid>
      </Container>
    </>;
  }

  const displayItem = () => {
    if (instance && !loading) {
      return instance.getAttributes().map((item) => {
        const TagName = components[item.tag.name];
        if (
          item.tag.name === "date" ||
          item.tag.name === "authors" ||
          item.tag.name === "collaborators"
        ) {
          item.tag.props.handleFieldChange = fieldChangeFunction;
        }

        if (item.tag.name === "img") {
          item.tag.props.hasImage = instance._hasImage;
        }

        if (item.tag.name === "hasImage") return <></>;

        return (
          <Grid
            item
            xs={item.size ? item.size.mobile : true}
            md={item.size ? item.size.desktop : true}
            key={item.tag.props.label}
          >
            <TagName
              {...item.tag.props}
              id={id}
              type={type}
              value={values[item.name]}
              onChange={(e) => fieldChangeFunction(item.name, e)}
            />
          </Grid>
        );
      });
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleConfirm = (answer) => {
    if (answer) {
      deleteFirebase(type, id).then((res) => {
        const {code, message} = res;
        setStatus({code, message});
        setDeleteOpen((curr) => true);
        navigate(-1, {replace: true});
      });
    } else {
      setDeleteOpen(false);
    }
  };

  return (
    <>
      <Jumbotron title={`Edit Item`} />
      <Container sx={{margin: "1rem auto 2rem"}}>
        {type && values && (
          <Breadcrumbs aria-label='breadcrumb' sx={{marginBottom: "1.5rem"}}>
            <Link component={RouterLink} to='/cms'>
              CMS
            </Link>
            <Link component={RouterLink} to={`/cms/${type}`}>
              {`${type[0].toUpperCase()}${type.slice(1)}`}
            </Link>
            <Typography color='text.primary'>
              {id === "new"
                ? "New Item"
                : values.title
                ? values.title
                : values.name}
            </Typography>
          </Breadcrumbs>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Collapse in={open}>
              <Alert
                severity={status.code}
                onClose={() => handleClose(false)}
                sx={{alignItems: "center"}}
              >
                {status.message}
              </Alert>
            </Collapse>
          </Grid>
          <Dialog open={deleteOpen} onClose={() => handleConfirm(false)}>
            <DialogTitle>
              Are you sure you would like to delete this item?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                You will not able to undo this action.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                color='info'
                variant='contained'
                onClick={() => handleConfirm(false)}
              >
                No
              </Button>
              <Button
                color='error'
                variant='contained'
                onClick={() => handleConfirm(true)}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          {displayItem()}
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md={1}>
                <Button
                  variant='contained'
                  color='success'
                  onClick={() => {
                    const idToUse = id === "new" ? customId : id;
                    updateFirebase(type, idToUse, values).then((res) => {
                      const {code, message} = res;
                      setStatus({code, message});
                      setOpen((curr) => true);
                      if (code === "success") {
                        navigate(`/cms/${type}/${idToUse}`, {replace: true});
                      }
                    });
                  }}
                >
                  Save
                </Button>
              </Grid>
              {id !== "new" && (
                <Grid item md={1}>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => {
                      setDeleteOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default EditList;
