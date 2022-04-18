import axios from "axios";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {TeamMember} from "./content";
import {Project} from "./content/Project";
import {Publication} from "./content/Publication";
import {Testimonial} from "./content/Testimonial";
import {Update} from "./content/Update";
import db from "./firebase";
export const uploadFile = (file, location) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  return (reader.onloadend = (e) => {
    return axios
      .post("http://localhost:5000/vampire-research/europe-west2/upload", {
        data: {
          image: reader.result.toString().replace(/^data:(.*,)?/, ""),
          path: `${location}/${file.name}`,
        },
      })
      .then((res) => res)
      .catch((e) => e);
  });
};

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
  if (data.hasOwnProperty("date") && !data.date) {
    data.date = new Date().valueOf();
  } else if (
    data.hasOwnProperty("endDate") &&
    !data.endDate &&
    data.hasOwnProperty("startDate") &&
    !data.startDate
  ) {
    data.endDate = new Date().valueOf();
    data.startDate = new Date().valueOf();
  }
  return data;
};

export const updateFirebase = async (type, id, data) => {
  // data = verifyDate(data);
  // if (typeof data.startDate === "object") {
  //   try {
  //     data.startDate = data.startDate.toMillis();
  //   } catch (e) {
  //     data.startDate = data.startDate.valueOf();
  //   }
  // }
  // if (typeof data.endDate === "object") {
  //   try {
  //     data.endDate = data.endDate.toMillis();
  //   } catch (e) {
  //     data.endDate = data.endDate.valueOf();
  //   }
  // }

  // if (data.name === "" || data.title === "") {
  //   return error(
  //     "Please ensure that there is a valid name or title to your item before saving."
  //   );
  // }

  const tempId = data.id;

  delete data.id;

  return await setDoc(doc(db, type, id), data)
    .then(() => {
      data.id = tempId;
      return success("Document successfully updated!");
    })
    .catch(() => {
      data.id = tempId;
      return error("Document failed to update.");
    });
};

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
