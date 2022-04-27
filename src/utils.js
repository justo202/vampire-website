import {deleteDoc, doc, setDoc} from "@firebase/firestore";
import {TeamMember} from "./content";
import {Project} from "./content/Project";
import {Publication} from "./content/Publication";
import {Testimonial} from "./content/Testimonial";
import {Update} from "./content/Update";
import db from "./firebase";

const error = (message) => {
  return {code: "error", message};
};

const success = (message) => {
  return {code: "success", message};
};

export const deleteFirebase = (type, id) => {
  if (!id)
    return error(
      "Document was not found, please refresh this page or try again"
    );

  return deleteDoc(doc(db, type, id))
    .then(() => {
      return success("Successfully deleted item");
    })
    .catch(() => {
      return error(
        "Unable to delete document, please refresh this page or try again"
      );
    });
};

const verifyDate = (data) => {
  const {date, startDate, endDate} = data;
  if (data.hasOwnProperty("date") && !date) {
    data.date = new Date().valueOf();
  } else if (
    data.hasOwnProperty("endDate") &&
    !endDate &&
    data.hasOwnProperty("startDate") &&
    !startDate
  ) {
    data.endDate = new Date().valueOf();
    data.startDate = new Date().valueOf();
  }
  return data;
};

export const updateFirebase = async (type, id, data) => {
  // data = verifyDate(data);
  // const {startDate, endDate} = data;

  // if (typeof startDate === "object") {
  //   try {
  //     data.startDate = startDate.toMillis();
  //   } catch (e) {
  //     data.startDate = startDate.valueOf();
  //   }
  // }

  // if (typeof endDate === "object") {
  //   try {
  //     data.endDate = endDate.toMillis();
  //   } catch (e) {
  //     data.endDate = endDate.valueOf();
  //   }
  // }

  if (data.name === "" || data.title === "") {
    return error(
      "Please ensure that there is a valid name or title to your item before saving."
    );
  }

  const tempId = data.id;

  delete data.id;

  const result = await setDoc(doc(db, type, id), data)
    .then((e) => {
      data.id = tempId;
      return success("Document successfully updated!");
    })
    .catch((e) => {
      console.log(e);
      data.id = tempId;
      return error("Document failed to update.");
    });

  return result;
};

// function to create and return an instance having specified type and data
export const createInstance = (type, data = {}) => {
  switch (type) {
    case "team":
      return new TeamMember(data);
    case "projects":
      return new Project(data);
    case "testimonials":
      return new Testimonial(data);
    case "updates":
      return new Update(data);
    case "publications":
      return new Publication(data);
    default:
      return [];
  }
};
