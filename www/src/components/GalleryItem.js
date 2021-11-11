import React from "react";
import { Image } from "react-bootstrap";
import "./GalleryItem.css";

const GalleryItem = props => (
  <div className={(props.className || "") + " gallery-item-container"}>
    <Image
      fluid
      src={props.src}
      alt={props.alt}
      className="gallery-item-image"
    />
    <div className="gallery-item-overlay">
      <div className="gallery-item-testimony">"{props.testimony}"</div>
    </div>
  </div>
);

export default GalleryItem;
