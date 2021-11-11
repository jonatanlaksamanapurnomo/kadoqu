import React from "react";
import "./FIleBase64.css";
import Resizer from "react-image-file-resizer";
import { LoadingAlert } from "./Loader";

class FileBase64 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
  }

  handleChange(e) {
    // get the files
    let files = e.target.files;

    // Process each file
    var allFiles = [];
    LoadingAlert("Menambahkan foto ...");
    for (var i = 0; i < files.length; i++) {
      let file = files[i];

      // Make new FileReader
      // let reader = new FileReader();

      // Convert the file to base64 text
      // reader.readAsDataURL(file);

      // on reader load somthing...
      const size= Math.round(file.size / 1e3)
      const quality = size>5000?50:size>2000?55:60
      Resizer.imageFileResizer(
        file,
        1500,
        1500,
        "JPEG",
        quality,
        0,
        uri => {
          let base64 = {
            base64: uri,
            file: file,
            name: file.name,
            size: Math.round(file.size / 1e3) + " kB",
            type: file.type
          };

          // Push it to the state
          allFiles.push(base64);

          // If all files have been proceed
          if (allFiles.length === files.length) {
            // Apply Callback function
            if (this.props.multiple) this.props.onDone(allFiles);
            else this.props.onDone(allFiles[0]);
          }
        },
        "base64"
      );
    } // for
  }

  render() {
    return (
      <>
        <label htmlFor="file-upload" className="custom-file-upload">
          <i style={{ color: "#00998d" }} className="fa fa-plus-square"></i>
          <span className="ml-2" style={{ color: "#00998d" }}>
            Klik Disini untuk mengupload photo
          </span>
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={this.handleChange.bind(this)}
          multiple={this.props.multiple}
        />
      </>
    );
  }
}

FileBase64.defaultProps = {
  multiple: false
};

export default FileBase64;
