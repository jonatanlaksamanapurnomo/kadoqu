import  axios from 'axios';
function deleteImages(path , signature){
  const IMAGEKIT_ID = process.env.REACT_APP_IMAGEKIT_ID;
  const form = new FormData();
  form.append('path' , path);
  form.append('imagekitId' , IMAGEKIT_ID);
  form.append('signature' , signature);
  return  axios.post(`https://imagekit.io/api/admin/media/deleteFile` , form,
    {
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).then(res => {
    console.log(res);
  });

}

export  default  deleteImages;