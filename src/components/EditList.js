import {doc, getDoc} from "@firebase/firestore/lite";
import Alert from "@mui/material/Alert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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

  const handleStatusUpdate = (code, message) => {
    setStatus({code, message});
  };

  const fieldChangeFunction = (e, options) => {
    const {newValue, fieldId, arrayIndex, isNew, toDelete, fieldLabel} =
      options;

    // checks if event has been triggered
    if (!e) return;

    // determines which field type has been modified on the page
    // and works with the specific type's data to update the component state
    if (fieldId === "collaborators") {
      // creates copy of collaborators array to avoid data manipulation
      let temp = values.collaborators.slice();

      // determines if action is to create, update or delete
      if (isNew) {
        // pushes a default instance of a collaborator to the temporary collaborators array
        temp.push({name: "New Person", institution: ""});
      } else if (toDelete) {
        // removes collaborator from temporary array by index
        temp.splice(arrayIndex, 1);
      } else {
        // updates value of field depending on e.index being either "name" or "institution"
        temp[arrayIndex][fieldLabel] = newValue;
      }

      // updates values state using the updated array
      setValues((curr) => ({
        ...curr,
        collaborators: temp,
      }));
    } else if (fieldId === "authors") {
      // creates copy of authors array
      let temp = values.authors.slice();

      // determines if action is to create, update or delete
      if (isNew) {
        // adds new author to array
        temp.push("New Person");
      } else if (toDelete) {
        // deletes author at index of array
        temp.splice(arrayIndex, 1);
      } else {
        // updates value at specified index using
        temp[arrayIndex] = newValue;
      }

      // updates values state using the updated array
      setValues((curr) => ({
        ...curr,
        authors: temp,
      }));
    } else if (
      fieldId === "date" ||
      fieldId === "startDate" ||
      fieldId === "endDate"
    ) {
      // updates the current value in values state using provided values
      if (arrayIndex) {
        setValues((curr) => ({...curr, [arrayIndex]: newValue}));
      } else {
        setValues((curr) => ({...curr, [fieldId]: newValue}));
      }
    } else {
      // state update for all non-custom components that require an id and update value
      // there is no need to have a create or delete parameter for these fields
      setValues((curr) => ({...curr, [fieldId]: e.target.value}));
    }
  };

  // mapping of component names to custom components
  const components = {
    img: ImageEdit,
    text: TextField,
    date: CustomDatePickerWrapper,
    collaborators: Collaborators,
    authors: Authors,
  };

  // this function will be triggered on initial render of EditList as well as when the value
  // of "loading" updates
  useEffect(() => {
    // creates reference to document in Firestore using document type and id which have
    // been acquired from the URL location
    // e.g. type may equal "publications" and id may equal "1234abcd"
    // eventually getting a reference to document in collection "publications" with id
    // equalling "1234abcd"
    const docRef = doc(db, type, id);

    // sends request to document using acquired reference and waits for response
    getDoc(docRef).then((res) => {
      // initialises variables
      let instance = null,
        values = {};

      // checks if the document exists
      if (res.exists()) {
        // create an instance, passing in the type and document data
        instance = createInstance(type, res.data());
        // attaches id of document to temporary
        instance.id = id;
      } else {
        // if the document doesn't exist, default to a new instance of the specific type
        navigate(`/cms/${type}/new`, {replace: true});

        // create an empty instance of specific type
        instance = createInstance(type, null);

        // use a unique ID stored in component state for the new item
        instance.id = customId;
      }

      // exports data fields to state where they can be mapped out on the page
      instance.getAttributes().forEach((item) => {
        values[item.name] = item.value;
      });

      // updates component state
      setValues(values);
      setInstance(instance);
      setLoading(false);
    });
  }, [loading]);

  // creates a skeleton of the item to use while the document is being loaded into state
  if (loading) {
    return (
      <>
        <Jumbotron title='Edit Item' />
        <Container>
          <Grid container>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant='text' width='100%' height='40' />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  // function to map out values state once loading has complete
  const displayItem = () => {
    // ensures that instance exists as well as loading being complete
    if (instance && !loading) {
      console.log(instance);
      // loops through field in item
      return instance.getAttributes().map((item) => {
        // creates a TagName using name found in item's
        const TagName = components[item.tag.name];
        const {
          tag: {name},
        } = item;

        // if the item is of type date, authors or collaborators, the state updater function will be passed down
        // this would not work on a component if it did not accept/expect this prop
        if (name === "date" || name === "authors" || name === "collaborators") {
          item.tag.props.handleFieldChange = fieldChangeFunction;
        }

        // checks if the item is an image, and if so, pass it the hasImage prop as well
        if (name === "img") {
          item.tag.props.handleStatusUpdate = handleStatusUpdate;
          item.tag.props.hasImage = instance._hasImage;
        }

        // if the name of the item is hasImage, return a hidden field / only used for updating state
        if (name === "hasImage") return <></>;

        // create a Grid item around the generated component with it's respective layout demands
        // and pass down all necessary props to the component
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
              onChange={(e) => fieldChangeFunction(e, {fieldId: item.name})}
            />
          </Grid>
        );
      });
    }
  };

  // function handler used when closing status alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    // updates open state of alert
    setOpen(false);
  };

  // function hanlder for popup confirming deletion of document
  const handleConfirm = (answer) => {
    // closes popup
    setDeleteOpen(false);

    // if deletion is confirmed then call deleteFirebase using type and id
    if (answer) {
      deleteFirebase(type, id).then((res) => {
        const {code, message} = res;
        setStatus({code, message});

        // navigate back one page as the document no longer exists
        navigate(-1, {replace: true});
      });
    }
  };

  // default return of page containing Jumbotron, breadcrumbs, Firebase action buttons as well as the item to be displayed also
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
            <Dialog.Actions>
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
            </Dialog.Actions>
          </Dialog>
          {displayItem()}
          <Grid item md={12}>
            <Grid container spacing={1}>
              <Grid item md={1}>
                <Button
                  variant='contained'
                  color='success'
                  onClick={async () => {
                    const idToUse = id === "new" ? customId : id;
                    const {code, message} = await updateFirebase(
                      type,
                      idToUse,
                      values
                    );

                    // checks the status of the update
                    if (code === "success") {
                      setStatus({code, message});
                      navigate(`/cms/${type}/${idToUse}`, {replace: true});
                    } else {
                      setStatus({code, message});
                      setOpen((curr) => true);
                    }
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
