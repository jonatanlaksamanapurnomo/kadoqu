import axios from "axios";

function uploadPhoto(
  signature,
  base64,
  filename,
  timestamp,
  folder = "products"
) {
  const imagekitId = process.env.REACT_APP_IMAGEKIT_ID;
  const apiKey = process.env.REACT_APP_IMAGEKIT_API_KEY;
  const form = new FormData();
  form.append("filename", filename);
  form.append("apiKey", apiKey);
  form.append("signature", signature);
  form.append("timestamp", timestamp);
  form.append("file", base64);
  form.append("useUniqueFilename", false);
  form.append("folder", `/${folder}/`);


  // console.log(base64);
  return axios
    .post(`https://upload.imagekit.io/rest/api/image/v2/${imagekitId}`, form, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => {
      return res.data.url;
    });
}

export default uploadPhoto;
