import React, {Component} from 'react';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {withApollo} from "react-apollo";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import {MUTATION_GET_USERID} from "../gql/user";
import {MUTATION_SENDING_EMAIL} from "../gql/email";

const emailChecker = gql`
  query emailChecker($email: String) {
    emailChecker(email: $email)
  }
`;

class EmailVerifyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  linkmaker = (token) => {
    return process.env.REACT_APP_KADOQU_URL + "/Forget-Password/" + token || "http://localhost:3000/Forget-Password/" + token;
  }

  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        centered
        dialogClassName="forgot-password-modal"
        backdropClassName="forgot-password-modal-backdrop"
      >
        <Modal.Body>
          <Container className="forgot-password-container">
            <Row className="align-items-center">
              <Col lg={3}>
                <Image
                  fluid
                  src="https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/gida-tanya-gida.png"
                  alt="Lupa password?"
                />
              </Col>
              <Col lg={9}>
                <Form className="forgot-password-form">
                  <Form.Group>
                    <h1>Lupa password?</h1>
                    <p>
                      Gak usah panik, GIdA bakal urus semuanya.
                      <br/>
                      Masukan email akun kamu
                    </p>
                  </Form.Group>
                  <Form.Group as={Row} controlId="forgotPasswordEmail">
                    <Col sm={7}>
                      <Form.Control type="email" onChange={(e) => {
                        this.setState({
                          email: e.target.value
                        })
                      }} value={
                        this.state.email
                      }/>
                    </Col>
                    <Col sm={4}>
                      <Button
                        variant="primary"
                        type="submit"
                        className="forgot-password-button"
                        onClick={(e) => {
                          e.preventDefault();
                          // console.log(this.props.props);
                          this.props.client
                            .query({
                              query: emailChecker,
                              variables: {
                                email: this.state.email
                              }
                            }).then(({data}) => {

                            if (data.emailChecker) {
                              this.props.client
                                .mutate({
                                  mutation: MUTATION_GET_USERID,
                                  variables: {
                                    email: this.state.email
                                  }
                                })
                                .then((token) => {

                                  let url = this.linkmaker(token.data.generateId.token)
                                  this.props.client
                                    .mutate({
                                      mutation: MUTATION_SENDING_EMAIL,
                                      variables: {
                                        email: this.state.email,
                                        link: url,
                                        nama: token.data.generateId.nama
                                      }

                                    })
                                });
                              Swal.fire({
                                type: 'success',
                                title: 'Berhasil',
                                text: 'Silahkan Check Email Kamu!',
                              });

                            } else {
                              Swal.fire({
                                type: 'error',
                                title: 'Oops...',
                                text: 'Email Tidak Terdaftar!',
                              })
                            }
                          })
                        }}
                      >
                        Kirim
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withApollo(EmailVerifyModal);
