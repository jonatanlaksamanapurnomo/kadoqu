/* eslint-disable no-extend-native  */
import React from "react";
import CSVReader from "react-csv-reader";
import {withApollo} from "react-apollo";
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
import Stepper from "react-stepper-horizontal";
import Swal from "sweetalert2";
import {MUTATION_ADD_MERCHANT} from "../gql/admin";

const WarningToast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 1500,
  type: "warning"
});

const fieldNameMapper = {
  MerchantCode: "code",
  Name: "name",
  UserName: "email",
  Password: "password",
  Phone: "phone"
};


class AddUsersModal extends React.Component {
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
    this.setState({data: [], photos: {}, progressLoading: null, step: 0});
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
    for (let i = 1; i <= input.length - 2; i++) {
      let inputUser = {};
      inputUser.email = input[i][3];
      inputUser.name = input[i][2];
      inputUser.password = input[i][4];
      inputUser.code = input[i][1];
      inputUser.phone = input[i][5].split("-").join("");
      inputUser.role = "merchant";
      data.push(inputUser);
    }

    return data;


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
          <Modal.Title>Add Merchant</Modal.Title>
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
                      this.setState({step: 0});
                      this.resetCSVReader();
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

                      }}
                    />
                  </Form>
                  {this.state.step > 0 && (
                    <div
                      className="h-100 w-100 position-absolute fixed-top"
                      onClick={() => {
                        this.setState({step: 0});
                        this.resetCSVReader();
                      }}
                    />
                  )}
                </Col>
                <Col>
                </Col>
                <Col className="d-flex justify-content-center">
                  {this.state.step >= 1 && (
                    <Button
                      type="button"
                      className="w-50"
                      onClick={(e) => {
                        e.preventDefault();
                        const {data} = this.state;
                        data.map(item => {
                          return this.props.client.mutate({
                            mutation: MUTATION_ADD_MERCHANT,
                            variables: {
                              input: item
                            }
                          }).then(e => {
                            console.log(e);
                          })

                        })
                      }}
                    >
                      Add Merchant
                    </Button>
                  )}
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default withApollo(AddUsersModal);
