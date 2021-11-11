import React from "react";
import { Modal, Button } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import { Mutation, withApollo } from "react-apollo";
import Toast from "./Toast";
import { TextInput } from "./FormComponents";
import uploadPhoto from "../library/uploadfoto";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import { validateNumeric } from "../utils/regexInputConverter";

class AddWrappingLabPropertyModal extends React.Component {
  state = {
    name: "",
    rank: 0,
    price: 0,
    additionalInfo: "",
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
            Add New {this.props.property} Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Mutation {...this.props.mutation}>
            {mutate => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (
                    !this.state.base64 ||
                    this.state.name === "" ||
                    this.state.price === 0
                  ) {
                    Toast.fire({
                      type: "warning",
                      title: "Please complete the form first"
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
                        `/Wrapping_Lab/${this.props.property.toLowerCase()}/${this.state.name
                          .toLowerCase()
                          .replace(/[\s]/g, "_")}/`
                      )
                        .then(photoUrl =>
                          mutate({
                            variables: {
                              name: this.state.name,
                              rank: this.state.rank,
                              price: this.state.price,
                              image: photoUrl,
                              ...(this.props.property === "Ribbon" && {
                                info: this.state.additionalInfo
                              })
                            }
                          })
                            .then(() => {
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
                            .catch(error => console.log(error.message))
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
                <TextInput
                  fieldName="Price"
                  numeric
                  value={this.state.price || ""}
                  onChange={e =>
                    this.setState({ price: parseFloat(e.target.value) })
                  }
                />
                {this.props.property === "Ribbon" && (
                  <TextInput
                    fieldName="Additional Info"
                    placeholder="Example: lebar: 20cm"
                    value={this.state.additionalInfo}
                    onChange={e =>
                      this.setState({ additionalInfo: e.target.value })
                    }
                  />
                )}
                Thumbnail:{" "}
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

export default withApollo(AddWrappingLabPropertyModal);
