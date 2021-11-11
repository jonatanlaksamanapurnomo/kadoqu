import React from "react";
import { Modal, Button } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import { Mutation, withApollo } from "react-apollo";
import Toast from "./Toast";
import uploadPhoto from "../library/uploadfoto";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";

class EditWrappingLabPropertiesThumbnail extends React.Component {
  state = {
    base64: null
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => this.setState({ base64: null }, this.props.onHide)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="mt-2">
            <div className="text-uppercase">
              Change {this.props.property} Thumbnail
            </div>
            <div className="font-weight-bold">{this.props.type.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          <img
            className="mw-100 mb-2"
            src={this.props.type.thumbnail}
            alt="Thumbnail"
          />
          <Mutation {...this.props.mutation}>
            {mutate => (
              <form
                className="d-flex flex-column justify-content-center align-items-center"
                onSubmit={e => {
                  e.preventDefault();
                  if (!this.state.base64) {
                    Toast.fire({
                      type: "warning",
                      title: "Please upload the photo first"
                    });
                    return;
                  }
                  const filename = `${~~(Date.now() / 1000)}_button`;
                  this.props.client
                    .mutate({
                      mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                      variables: { filename: filename }
                    })
                    .then(({ data }) =>
                      uploadPhoto(
                        data.createUploadToken.hash,
                        this.state.base64.split(",")[1],
                        filename,
                        data.createUploadToken.timestamp,
                        `/Wrapping_Lab/${this.props.property.toLowerCase()}/${this.props.type.name
                          .toLowerCase()
                          .replace(/[\s]/g, "_")}/`
                      )
                        .then(photoUrl =>
                          mutate({
                            variables: {
                              id: this.props.type.id,
                              image: photoUrl,
                              currentUrl: this.props.type.thumbnail
                            }
                          })
                            .then(() =>
                              this.setState({ base64: null }, () => {
                                Toast.fire({
                                  type: "success",
                                  title: `Thumbnail of ${this.props.type.name} is updated`
                                });
                                this.props.onHide();
                              })
                            )
                            .catch(error => console.log(error.message))
                        )
                        .catch(error => console.log(error.message))
                    );
                }}
              >
                <FileBase64
                  className="form-control"
                  name="photo"
                  accept="image/*"
                  onDone={file => {
                    if (file.type.startsWith("image/")) {
                      this.setState({ base64: file.base64 });
                    }
                  }}
                />
                {this.state.base64 && (
                  <img src={this.state.base64} alt="" className="w-50 mt-2" />
                )}
                <Button block type="submit" className="mt-2">
                  Submit
                </Button>
              </form>
            )}
          </Mutation>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withApollo(EditWrappingLabPropertiesThumbnail);
