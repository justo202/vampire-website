import axios from "axios";

export const uploadFile = (file, location) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  return reader.onloadend = (e) => {
    return axios.post("http://localhost:5000/vampire-research/europe-west2/upload", {data: {
      image: reader.result.toString().replace(/^data:(.*,)?/, ''),
      path: `${location}/${file.name}`
    }}).then(res => res).catch(e => e);
  }
}
