import React, { Component } from "react";
import { Button, FormGroup } from "reactstrap";
import { Form, Modal } from "react-bootstrap";
import gql from "graphql-tag";
import { PhotosUploader } from "./FormComponents";
import uploadPhoto from "../library/uploadfoto";
import { withApollo } from "react-apollo";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";

import "./AddProductPhotoModal.css";

const MUTATION_PHOTO_UPLOAD_TOKEN = gql`
  mutation mutateCreateUploadToken($filename: String) {
    createUploadToken(filename: $filename) {
      hash
      timestamp
    }
  }
`;

const MUTATION_PHOTO = gql`
  mutation mutatePhotos(
    $productId: String
    $productName: String
    $url: String
  ) {
    addPhoto(productId: $productId, productName: $productName, url: $url)
  }
`;

class AddProductPhotoModal extends Component {
  state = {
    formData: {
      photos: []
    },
    onLoadingState: false
  };

  resetForm = () => {
    this.setState({
      formData: {
        photos: []
      }
    });
  };

  activateLoadingState = () => {
    this.setState({ onLoadingState: true });
    document.body.style.cursor = "progress";
  };

  deactivateLoadingState = () => {
    this.setState({ onLoadingState: false });
    document.body.style.cursor = "initial";
  };

  render() {
    const Toast = this.props.toast;
    return (
      <React.Fragment>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Photo for {this.props.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="add-product-photo-modal-body">
            <Form
              onReset={() => {
                if (this.state.onLoadingState) {
                  return;
                }
                this.resetForm();
              }}
              onSubmit={e => {
                e.preventDefault();
                let { photos } = this.state.formData;
                if (photos.length === 0) {
                  Toast.fire({
                    type: "warning",
                    title: "Please upload the photo(s) first"
                  });
                  return;
                }
                if (this.state.onLoadingState) {
                  return;
                }
                let progress = 0;
                let total = photos.length;
                this.activateLoadingState();
                LoadingAlert(`Uploading Picture(s) ${progress}/${total}`);
                const { client, productId, productName } = this.props;
                let photoPromises = [];
                let promises = [
                  client
                    .mutate({
                      mutation: MUTATION_ADD_PRODUCT_REVIEW,
                      variables: {
                        productId: productId
                      }
                    })
                    .then(() => {
                      client.mutate({
                        mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                        variables: {
                          status: false,
                          productId: productId
                        }
                      });
                    })
                ];
                photos.forEach((photoBase64, idx) => {
                  const fileName =
                    ~~(Date.now() / 1000) +
                    "_" +
                    idx +
                    "_" +
                    productName
                      .toLowerCase()
                      .replace(/\s/g, "X")
                      .replace(/\W/g, "")
                      .replace(/[X]/g, "-");
                  photoPromises.push(
                    client
                      .mutate({
                        mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                        variables: { filename: fileName }
                      })
                      .then(({ data }) =>
                        uploadPhoto(
                          data.createUploadToken.hash,
                          photoBase64.split(",")[1],
                          fileName,
                          data.createUploadToken.timestamp
                        ).then(photoUrl =>
                          promises.push(
                            client
                              .mutate({
                                mutation: MUTATION_PHOTO,
                                variables: {
                                  productId: productId,
                                  productName: productName,
                                  url: photoUrl
                                },
                                refetchQueries: [this.props.query]
                              })
                              .then(() => {
                                LoadingAlert(
                                  `Uploading Picture(s) ${++progress}/${total}`
                                );
                              })
                          )
                        )
                      )
                  );
                });

                Promise.all(photoPromises)
                  .then(() => {
                    Promise.all(promises)
                      .then(() => {
                        this.resetForm();
                        this.props.onHide();
                        this.deactivateLoadingState();
                        CloseLoadingAlert();
                        this.props.setAlert({
                          message: `Success! Photos have been added!`,
                          variant: "success"
                        });
                      })
                      .catch(error =>
                        Toast.fire({
                          type: "error",
                          title: error.message || error
                        })
                      );
                  })
                  .catch(error =>
                    Toast.fire({
                      type: "error",
                      title: error.message || error
                    })
                  );
              }}
              className="form-horizontal"
            >
              <FormGroup>
                <div>(Only displayed photos would be uploaded)</div>
                <PhotosUploader
                  photos={this.state.formData.photos}
                  handlePhotos={photos => {
                    let newPhotos = this.state.formData.photos;
                    const inputPhotos = [];
                    photos.forEach(photo => {
                      if (photo.type.startsWith("image/")) {
                        inputPhotos.push(photo.base64);
                      }
                    });
                    newPhotos = newPhotos.concat(inputPhotos);
                    this.setState({
                      formData: { ...this.state.formData, photos: newPhotos }
                    });
                  }}
                  removePhoto={index => {
                    const newPhotos = this.state.formData.photos;
                    newPhotos.splice(index, 1);
                    this.setState({
                      formData: { ...this.state.formData, photos: newPhotos }
                    });
                  }}
                />
              </FormGroup>
              <div className="mt-3 d-flex justify-content-center">
                <Button
                  type="submit"
                  color="primary"
                  className="w-25 mr-2"
                  disabled={this.state.onLoadingState}
                >
                  Add Photo{this.state.formData.photos.length < 2 ? null : "s"}
                </Button>
                <Button
                  type="reset"
                  color="secondary"
                  className="w-25"
                  disabled={this.state.onLoadingState}
                >
                  Reset
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withApollo(AddProductPhotoModal);
