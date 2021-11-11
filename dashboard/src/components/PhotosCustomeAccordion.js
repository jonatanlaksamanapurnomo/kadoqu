import React, {Component} from 'react';
import showTransformationsPhoto from "../library/showTransformationsPhoto";

class PhotosCustomeAccordion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
  }

  toggleShowContainer() {
    this.setState({
      isShow: !this.state.isShow
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-3">
          <p onClick={() => this.toggleShowContainer()}
             style={{color: "#00998d", cursor: "pointer"}}
             className="lead m-0 p-0">Photos</p>
          {this.state.isShow === true && (
            <span style={{color: "#00998d"}} className="m-0 p-0">Click Photo To Download</span>
          )}
        </div>
        {this.state.isShow === true && (
          <div className="mt-3">
            <div className="row">
              {this.props.photos.map((photo, idx) => (
                <div className="col-4">
                  <a
                    href="/#"
                    onClick={e => {
                      e.preventDefault();
                      fetch(photo).then(response => {
                        response.blob().then(blob => {
                          let url = window.URL.createObjectURL(blob);
                          let a = document.createElement("a");
                          a.href = url;
                          a.download = `custome_photo_${idx}`;
                          a.click();
                        });
                      });
                    }}
                  >
                    <img
                      width="50%"
                      src={showTransformationsPhoto(250, 200, photo.substring(37))}
                      alt=""/>
                  </a>

                </div>
              ))}
            </div>
          </div>
        )}

      </React.Fragment>

    );
  }
}

export default PhotosCustomeAccordion;
