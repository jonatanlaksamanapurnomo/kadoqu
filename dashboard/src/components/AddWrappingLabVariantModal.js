import React from "react";
import { Modal, Button } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import { Mutation, withApollo } from "react-apollo";
import Toast from "./Toast";
import { TextInput } from "./FormComponents";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import { validateNumeric } from "../utils/regexInputConverter";

class AddWrappingLabVariantModal extends React.Component {
  state = {
    name: "",
    rank: 0,
    base64: null
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() =>
          this.setState({ name: "", base64: null }, this.props.onHide)
        }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="mt-2">
            Add New {this.props.property} Variant
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mutation {...this.props.mutation}>
            {mutate => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!this.state.base64 || this.state.name === "") {
                    Toast.fire({
                      type: "warning",
                      title: "Please complete the form first"
                    });
                    return;
                  }
                  const filename = `${~~(
                    Date.now() / 1000
                  )}_${this.state.name.toLowerCase().replace(/[\s]/g, "_")}`;
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
                              name: this.state.name,
                              rank: this.state.rank,
                              typeId: this.props.type.id,
                              image: photoUrl
                            }
                          }).then(() => {
                            const name = this.state.name;
                            this.setState(
                              { name: "", price: 0, base64: null },
                              () => {
                                Toast.fire({
                                  type: "success",
                                  title: `${name} has been added`
                                });
                                this.props.onHide();
                              }
                            );
                          })
                        )
                        .catch(error => console.log(error.message))
                    );
                }}
              >
                <TextInput
                  fieldName="Name"
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
                <TextInput
                  fieldName="Rank"
                  value={this.state.rank}
                  onChange={e =>
                    this.setState({
                      rank: parseInt(validateNumeric(e.target.value))
                    })
                  }
                />
                Image:{" "}
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

export default withApollo(AddWrappingLabVariantModal);
