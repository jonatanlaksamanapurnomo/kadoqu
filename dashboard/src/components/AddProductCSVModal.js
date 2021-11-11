/* eslint-disable no-extend-native  */
import React from "react";
import { UncontrolledTooltip } from "reactstrap";
import CSVReader from "react-csv-reader";
import { withApollo } from "react-apollo";
import {
  Button,
  Col,
  Container,
  Form,
  FormText,
  Modal,
  ProgressBar,
  Row
} from "react-bootstrap";
import uploadPhoto from "../library/uploadfoto";
import FileBase64 from "react-file-base64";
import Stepper from "react-stepper-horizontal";
import { MUTATION_ADD_PHOTO, MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import {
  MUTATION_ADD_PRODUCT_BY_CSV,
  QUERY_GET_PRODUCTS
} from "../gql/product";
import Swal from "sweetalert2";

const WarningToast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  type: "warning"
});

const fieldNameMapper = {
  sku: "sku",
  name: "name",
  image: "photo",
  smallimage:"smallImage",
  thumbnail:"thumbnail",
  price: "price",
  specialprice: "discountPrice",
  weight: "weight",
  color: "colors",
  status: "isEnable",
  description: "longDescription",
  shortdescription: "shortDescription",
  qty: "stock",
  capitalprice: "merchantPrice",
  merchant: "merchant",
  storecategory: "storeCategoryId",
  giftcategory: "giftCategoryId",
  length:"length",
  width:"width",
  height:"height"
};

const colorMapper = {
  merah: "red",
  biru: "blue",
  navy: "blue",
  hitam: "black",
  kuning: "yellow",
  putih: "white",
  hijau: "green",
  abuabu: "grey",
  pink: "pink"
};
Array.prototype.photosParser = function(data){
  let results = [];
  for(let i = 0 ; i<data.length ; i++){
    let kambing = data[i];
    kambing.photos= [kambing.photo,kambing.smallImage,kambing.thumbnail];
    delete kambing.photo;
    delete kambing.smallImage;
    delete kambing.thumbnail;
    results.push(kambing);
  }
  return results;
};

class AddProductCSVModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      photos: {},
      progressLoading: null,
      step: 0
    };
    this.isReset = false;
  }

  componentDidUpdate = () => {
    if (
      this.state.progressLoading !== null &&
      this.state.progressLoading === this.state.data.length &&
      this.isReset
    ) {
      setTimeout(() => {
        Swal.fire({
          type: "success",
          title: "Products are successfully uploaded"
        }).then(() => {
          this.isReset = false;
          this.props.onHide();
          this.resetState();
        });
      }, 1000);
    }
  };
  resetState = () => {
    this.setState({ data: [], photos: {}, progressLoading: null, step: 0 });
  };
  resetCSVReader = () => {
    this.setState({
      data: []
    });
    if (document.getElementById("csv-reader")) {
      document.getElementById("csv-reader").reset();
    }
  };
  resetPhotoUploader = () => {
    this.setState({
      photos: {}
    });
    if (document.getElementById("photo-uploader")) {
      document.getElementById("photo-uploader").reset();
    }
  };
  parseCSV = input => {
    if (
      input.length < 2 ||
      input[0].length < Object.keys(fieldNameMapper).length
    ) {
      WarningToast.fire(
        "Please provide valid data with first row as column's name"
      );
      this.resetCSVReader();
      return;
    }
    let data = [];
    for (let i = 1; i <= input.length && input[i][0] !== ""; i++) {
      data.push(
        Object.assign(
          {},
          ...input[i]
            .map((fieldValue, idx) => {
              const fieldName =
                fieldNameMapper[
                  input[0][idx]
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z]/g, "")
                ];
              if (!fieldName) {
                return { "": "" };
              }
              let value;

              switch (fieldName) {
                case "name":
                  value = fieldValue.split("-").slice("1").join("").trim();
                  break;
                case "storeCategoryId":
                  value = fieldValue.split(",").map(str => str.trim());
                  break;
                case "giftCategoryId":
                  value = fieldValue.split(",").map(str => str.trim());
                  break;
                case "smallImage":
                  if (fieldValue.charAt(0) === "/") {
                    fieldValue = fieldValue.substr(1);
                  }
                  value = fieldValue;
                  break;
                case "thumbnail":
                  if (fieldValue.charAt(0) === "/") {
                    fieldValue = fieldValue.substr(1);
                  }
                  value = fieldValue;
                  break;
                case "photo":
                  if (fieldValue.charAt(0) === "/") {
                    fieldValue = fieldValue.substr(1);
                  }
                  value = fieldValue;
                  break;
                case "colors":
                  value = fieldValue
                    .split(/[,;][\s]*/)
                    .map(color => colorMapper[color.toLowerCase()] || null)
                    .filter(el => el !== null);
                  break;
                case "discountPrice":
                  if (fieldValue !== "") {
                    value = [parseFloat(fieldValue)];
                  } else {
                    value = [0];
                  }
                  break;
                case "merchantPrice":
                  value = fieldValue / 0.9;
                  break;
                case "price":
                  value = parseFloat(fieldValue);
                  break;
                case "weight":
                  value = parseFloat(fieldValue.replace(",", "."))*1000;
                  break;
                case "stock":
                  value = parseInt(fieldValue);
                  break;
                case "isEnable":
                  value = fieldValue === "Enabled";
                  break;
                case "width":
                  value = parseFloat(fieldValue.replace(",", "."));
                  break;
                case "height":
                  value = parseFloat(fieldValue.replace(",", "."));
                  break;
                case "length":
                  value = parseFloat(fieldValue.replace(",", "."));
                  break;
                default:
                  value = fieldValue;
                  break;
              }
              let data = { [fieldName]: value };
              return data;
            })
            .filter(field => Object.keys(field)[0] !== "")
        )
      );
    }
    let results = data.photosParser(data);
    // console.log(results);
    return results;
  };
  uploadProducts = () => {
    if (this.state.data.length === 0) {
      WarningToast.fire({ title: "CSV should not be empty" });
    }
    const { client } = this.props;
    const promises = this.state.data.map(({ colors, photos, ...datum }) =>
      client
        .mutate({
          mutation: MUTATION_ADD_PRODUCT_BY_CSV,
          variables: {
            input: datum
          },
          refetchQueries: [{ query: QUERY_GET_PRODUCTS }]
        })
        .then(({ data }) => {
          const productId = data.addProductByCSV;
          let secondaryPromises = [];
          photos.forEach((photo, idx) => {
            if (!Object.keys(this.state.photos).includes(photo)) {
              // TODO: push to array then give warning about this
              return;
            }
            const fileName =
              ~~(Date.now() / 1000) +
              "_" +
              idx +
              "_" +
              datum.name
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]/g, "")
                .replace(/[\s]+/g, "-");
            secondaryPromises.push(
              client
                .mutate({
                  mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                  variables: {
                    filename: fileName
                  }
                })
                .then(({ data }) =>
                  uploadPhoto(
                    data.createUploadToken.hash,
                    this.state.photos[photo].split(",")[1],
                    fileName,
                    data.createUploadToken.timestamp
                  )
                    .then(photoUrl => {
                      return client.mutate({
                        mutation: MUTATION_ADD_PHOTO,
                        variables: {
                          productId: productId,
                          productName: datum.name,
                          url: photoUrl
                        }
                      });
                    })
                    .catch(error => console.log(error.message || error))
                )
            );
          });
          Promise.all(secondaryPromises).then(() =>
            this.setState({
              progressLoading: this.state.progressLoading + 1
            })
          );
        })
    );
    this.setState({ progressLoading: 0 }, () =>
      Promise.all(promises)
        .then(() => (this.isReset = true))
        .catch(error => console.log(error.message || error))
    );
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size={this.state.progressLoading !== null ? "lg" : "xl"}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Import Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.progressLoading !== null ? (
            <div>
              <strong>Upload Progress</strong>
              <ProgressBar
                variant="success"
                animated
                now={
                  (this.state.progressLoading / this.state.data.length) * 100 ||
                  0
                }
                label={`${(this.state.progressLoading /
                  this.state.data.length) *
                  100 || 0}%`}
              />
              <div className="text-right">
                {this.state.progressLoading}/{this.state.data.length}
              </div>
            </div>
          ) : (
            <Container fluid id="tooltip">
              <FormText>To go back, click on the step's instruction</FormText>
              <Stepper
                defaultTitleOpacity="0.5"
                activeTitleOpacity="1"
                completeTitleOpacity="0.7"
                completeColor="#1956b3"
                activeStep={this.state.step}
                steps={[
                  {
                    title: "Select the CSV file",
                    onClick: () => {
                      this.setState({ step: 0 });
                      this.resetCSVReader();
                      this.resetPhotoUploader();
                    }
                  },
                  {
                    title: "Select all of your photos",
                    onClick: () => {
                      this.setState({ step: 1 });
                      this.resetPhotoUploader();
                    }
                  },
                  {
                    title: "Upload them!"
                  }
                ]}
              />

              <Row>
                <Col className="position-relative">
                  <Form id="csv-reader">
                    <CSVReader
                      onFileLoaded={input => {
                        this.setState({
                          data: this.parseCSV(input),
                          step: 1
                        });
                        this.resetPhotoUploader();
                      }}
                    />
                  </Form>
                  {this.state.step > 0 && (
                    <div
                      className="h-100 w-100 position-absolute fixed-top"
                      onClick={() => {
                        this.setState({ step: 0 });
                        this.resetCSVReader();
                        this.resetPhotoUploader();
                      }}
                    />
                  )}
                </Col>
                <Col>
                  {this.state.step >= 1 && (
                    <Row>
                      <Col lg={9}>
                        <Form id="photo-uploader">
                          <FileBase64
                            className="form-control"
                            accept="image/*"
                            multiple
                            onDone={photos => {
                              if (
                                photos.find(
                                  ({ type }) => !type.startsWith("image/")
                                )
                              ) {
                                WarningToast.fire(
                                  "Please upload image files only"
                                );
                                this.resetPhotoUploader();
                                return;
                              }
                              this.setState({
                                photos: Object.assign(
                                  {},
                                  ...photos.map(({ base64, name }) => ({
                                    [name]: base64
                                  }))
                                ),
                                step: 2
                              });
                            }}
                          />
                        </Form>
                      </Col>
                      <Col>
                        <Button
                          variant="outline-dark"
                          onClick={() => this.setState({ step: 2 })}
                        >
                          Skip
                        </Button>
                      </Col>
                    </Row>
                  )}

                  {this.state.step > 1 && (
                    <div
                      className="h-100 w-100 position-absolute fixed-top"
                      onClick={() => {
                        this.setState({ step: 1 });
                        this.resetPhotoUploader();
                      }}
                    />
                  )}
                </Col>
                <Col className="d-flex justify-content-center">
                  {this.state.step >= 2 && (
                    <Button
                      type="button"
                      className="w-50"
                      onClick={() => this.uploadProducts()}
                    >
                      Upload
                    </Button>
                  )}
                </Col>
              </Row>

              <UncontrolledTooltip placement="top" target="tooltip">
                <p>
                  Note: Make sure the photo's name you uploaded match the name
                  in CSV
                </p>
              </UncontrolledTooltip>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default withApollo(AddProductCSVModal);
