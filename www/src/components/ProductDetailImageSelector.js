import React from "react";
import MediaQuery from "react-responsive";
import {MIN_DESKTOP_SIZE} from "../data/constants";

import "./ProductDetailImageSelector.css";
import showTransformationsPhoto from "../library/ShowImageTransformation";

class ProductDetailImageSelectorMiniImage extends React.Component {

  handleClickDetailSelector(e, url, caption) {
    document.getElementById("mainImage").src = showTransformationsPhoto(500, 500, url);
    document.getElementById("mainImage").alt = caption;
  }


  render() {
    return (
      <button
        onClick={e =>
          this.handleClickDetailSelector(e, this.props.url, this.props.caption)
        }
        className="btn product-detail-secondary-image"
      >
        <img width="100%"
             src={showTransformationsPhoto(100, 100, this.props.url)}
             alt={this.props.caption}/>
      </button>
    );
  }
}

class ProductDetailImageMobileArrows extends React.Component {
  state = {
    currentIndex: 0
  };

  componentDidMount() {
    console.log(this.props.photos);
  }

  handleClickBack = () => {
    if (this.state.currentIndex - 1 < 0) {
      return;
    }
    this.setState({currentIndex: this.state.currentIndex - 1}, () => {
      document.getElementById("mainImage").src = showTransformationsPhoto(500, 500, this.props.photos[
        this.state.currentIndex
        ].url);
      document.getElementById("mainImage").alt = this.props.photos[
        this.state.currentIndex
        ].caption;
    });
  };
  handleClickNext = () => {
    if (this.state.currentIndex + 1 >= this.props.photos.length) {
      return;
    }
    this.setState({currentIndex: this.state.currentIndex + 1}, () => {
      document.getElementById("mainImage").src = showTransformationsPhoto(500, 500, this.props.photos[
        this.state.currentIndex
        ].url);
      document.getElementById("mainImage").alt = this.props.photos[
        this.state.currentIndex
        ].caption;
    });
  };

  render() {
    return (
      <React.Fragment>
        <i
          className={
            "fa fa-chevron-left" +
            (this.state.currentIndex === 0 ? " disabled" : "")
          }
          onClick={this.handleClickBack}
        />
        <i
          className={
            "fa fa-chevron-right" +
            (this.state.currentIndex + 1 === this.props.photos.length
              ? " disabled"
              : "")
          }
          onClick={this.handleClickNext}
        />
      </React.Fragment>
    );
  }
}

const ProductDetailImageSelector = props => {
  return (
    <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {isDesktop => (
        <div id="product-detail-image-selector" className="position-relative">
          {props.details.photos.slice(0, 1).map((photos, idx) => (
            <img
              key={idx}
              className="product-detail-main-image"
              width="100%"
              id="mainImage"
              src={showTransformationsPhoto(500, 500, photos.url)}
              alt={photos.caption}
            />
          ))}

          {isDesktop &&
          props.details.photos.map((photos, idx) => (
            <ProductDetailImageSelectorMiniImage
              key={idx}
              url={photos.url}
              alt={photos.caption}
            />
          ))}

          {!isDesktop && (
            <ProductDetailImageMobileArrows photos={props.details.photos}/>
          )}
        </div>
      )}
    </MediaQuery>
  );
};
export default ProductDetailImageSelector;
