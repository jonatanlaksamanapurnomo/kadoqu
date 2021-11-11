import React from "react";
import { FormText } from "reactstrap";
import { Image } from "react-bootstrap";
import FileBase64 from "../components/FIleBase64";
import "./PhotosUploader.css";
import { CloseLoadingAlert } from "./Loader";

const PhotosUploader = props => {
  return (
    <React.Fragment>
      <FileBase64
        className="inputfile"
        multiple={true}
        onDone={photos => {
          props.handlePhotos(photos);
          CloseLoadingAlert();
        }}
        accept="image/*"
      />

      {props.photos.length > 0 ? (
        <FormText color="muted">Click photo to remove</FormText>
      ) : null}

      <div className="photo-uploader-preview row">
        {props.photos.map((item, idx) => {
          return (
            <div className="px-0 mr-3 mt-3 col-2 ml-3" key={idx}>
              <Image
                onClick={() => props.removePhoto(idx)}
                src={item}
                fluid
                width="100%"
                className={props.isProductDetail === true ? "h-100" : "h-100"}
              />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export { PhotosUploader };
