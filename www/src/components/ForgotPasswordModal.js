import React, {Component} from 'react';
import {Button, Col, Container, Form, Image, Modal, Row} from "react-bootstrap";
import {withApollo} from "react-apollo";
import gql from "graphql-tag";
import Swal from "sweetalert2";
import {MUTATION_GET_USERID} from "../gql/user";
import {MUTATION_SENDING_EMAIL} from "../gql/email";
import MediaQuery from "react-responsive";
import {
  MIN_DESKTOP_SIZE
} from "../data/constants";

const emailChecker = gql`
  query emailChecker($email: String) {
    emailChecker(email: $email)
  }
`;


class ForgotPasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:""
    };
  }
  linkmaker=(token)=>{
    return process.env.REACT_APP_KADOQU_URL + "/Forget-Password/" + token || "http://localhost:3000/Forget-Password/" + token;
  }
  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {isDesktop => (

      <Modal
        {...this.props}
        size={isDesktop ? "lg" :"xs" }
        centered
        dialogClassName={isDesktop ?"forgot-password-modal" :"forgot-password-modal-mob"}
        backdropClassName="forgot-password-modal-backdrop"
      >
        <Modal.Body>
          <Container className={isDesktop ?"forgot-password-container" :"forgot-password-container-mob"}>
            <Row className="align-items-center">
              <Col xs={4}lg={3}>
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
                      <br />
                      Masukan email akun kamu
                    </p>
                  </Form.Group>
                  <Form.Group as={Row} controlId="forgotPasswordEmail">
                    <Col sm={7}>
                      <Form.Control type="email"  onChange={(e) => {
                        this.setState({
                          email:e.target.value
                        })
                      }}  value={
                        this.state.email
                      } />
                    </Col>
                    <Col sm={4}>
                      <br/>
                      <Button
                        variant="primary"
                        type="submit"
                        className={isDesktop ?"forgot-password-button" :"forgot-password-button-mob"}
                        onClick={(e) => {
                          e.preventDefault();
                          // console.log(this.props.props);
                          this.props.client
                            .query({
                              query:emailChecker,
                            variables:{
                              email:this.state.email
                            }
                          }).then(({data}) => {

                            if(data.emailChecker){
                                  this.props.client
                                  .mutate({
                                    mutation: MUTATION_GET_USERID,
                                    variables:{
                                      email:this.state.email
                                    }
                                  })
                                  .then((token)=>{

                                  let url = this.linkmaker(token.data.generateId.token)
                                  this.props.client
                                  .mutate({
                                    mutation: MUTATION_SENDING_EMAIL,
                                    variables:{
                                      email:this.state.email,
                                      link:url,
                                      nama:token.data.generateId.nama
                                    }

                                  })
                                  });
                              Swal.fire({
                                type: 'success',
                                title: 'Berhasil',
                                text: 'Silahkan Check Email Kamu!',
                              });

                            }
                            else{
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
          
      )}
      </MediaQuery>
    );
  }
}

export default withApollo(ForgotPasswordModal);
