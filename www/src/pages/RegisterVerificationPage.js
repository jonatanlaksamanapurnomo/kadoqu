import React, {Component} from "react";
import {Helmet} from "react-helmet";
import MediaQuery from "react-responsive";
import {Row, Col, Image, Container, Button} from "react-bootstrap";
import IMAGES from "../data/images";
import {MIN_DESKTOP_SIZE} from "../data/constants";
import {withApollo} from "react-apollo";
import NavLink from "../components/NavLink";
import {isExpired} from "../utils/userChecker";
import jwt from "jsonwebtoken";
import {
  MUTATION_VERIFY_USER,
  MUTATION_RESEND_EMAIL,
  Mutation_create_verify_Token
} from "../gql/user";
import {MUTATION_SET_TOKEN, QUERY_GET_TOKEN} from "../gql/token";
import {GET_USER} from "../gql/user";
import Swal from "sweetalert2";
import "./ErrorPage.css";

const Error404Component = ({isMobile, status, email, token, client}) => (
  <Container
    fluid
    className="error-page bg-kadoqu-primary mb-5 text-center pt-5 pb-5"
  >
    <Row className={!isMobile && "d-flex align-items-center"}>
      <Col xs={isMobile ? 12 : {span: 3, offset: 2}} className="text-center">
        <Image
          className={isMobile ? "w-25" : "w-100"}
          src={
            status === "wait"
              ?
              IMAGES["Verifikasi"]["notyet"]
              : status === "sukses"
              ? IMAGES["Verifikasi"]["done"]

              : IMAGES["Verifikasi"]["notyet"]

          }
        />
      </Col>
      <Col
        xs={isMobile ? 12 : undefined}
        className={`text-${isMobile ? "center" : "left"}`}
      >
        <div
          className={`kadoqu-primary-color font-weight-bold mb-n2  display-${
            isMobile ? "4 verifikasi-text-mob" : "3 verifikasi-text"
          }`}
        >
          {status === "wait"
            ? "Verifikasi Akun"
            : status === "sukses"
              ? "Verifikasi Berhasil!"
              : "Akun Kamu Belum Terverifikasi"}
        </div>
        <h1 className="text-dark font-weight-bold mb-0 second-text-verifikasi">
          {status === "wait"
            ? "Sebelum kita mulai, verifikasi akun kamu dulu ya"
            : status === "sukses"
              ? "Horee Akun kamu sudah berhasil diverifikasi! Ayoo Belanja!"
              : "Waah sepertinya akun kamu belum terverifikasi"}
        </h1>
        <div
          className={
            " email-verifikasi font-weight-light" + (isMobile ? " d-inline clearfix" : "")
          }
        >
          {status === "wait"
            ? `Email verifikasi sudah dikirimkan email : ${email}`
            : status === "sukses"
              ? "GIdA tunggu orderannya ya!"
              : "Silahkan klik tombol dibawah ini untuk mengirim ulang email"}
        </div>
        <NavLink className="p-0">
          {status === "wait" ? (
            <Button
              onClick={event => window.location.href = "/"}
              className={`kadoqu-primary-button ${
                isMobile ? "long mt-3" : "short mt-5"
              }`}
            >
              Home
            </Button>
            //   <Button
            //   onClick={e => {
            //     e.preventDefault();
            //     client.client
            //       .mutate({
            //         mutation: MUTATION_RESEND_EMAIL,
            //         variables: {
            //           token: token
            //         }
            //       })
            //       .then(() =>
            //         Swal.fire({
            //           type: "success",
            //           title: "Re send Email Sukses",
            //           text: "Silahkan Check Email Kamu!"
            //         })
            //       );
            //   }}
            //   className={`kadoqu-primary-button ${
            //     isMobile ? "long mt-3" : "short mt-5"
            //   }`}
            // >
            //   Resend
            // </Button>

          ) : status === "sukses" ? (
            <Button
              onClick={e => {
                e.preventDefault();
                client.client
                  .mutate({
                    mutation: Mutation_create_verify_Token,
                    variables: {
                      token: token
                    }
                  })
                  .then(res => {
                    client.client
                      .mutate({
                        mutation: MUTATION_SET_TOKEN,
                        variables: {
                          token: res.data.createVerifyToken
                        },
                        refetchQueries: [
                          {query: QUERY_GET_TOKEN},
                          {query: GET_USER}
                        ]
                      })
                      .then(() => client.history.push("/"));
                  });
              }}
              className={`kadoqu-primary-button ${
                isMobile ? "long mt-3" : "short mt-5"
              }`}
            >
              Home
            </Button>
          ) : (
            <Button
              onClick={e => {
                e.preventDefault();
                client.client
                  .mutate({
                    mutation: MUTATION_RESEND_EMAIL,
                    variables: {
                      token: token
                    }
                  })
                  .then(() =>
                    Swal.fire({
                      type: "success",
                      title: "Re send Email Sukses",
                      text: "Silahkan Check Email Kamu!"
                    })
                  );
              }}
              className={`kadoqu-primary-button ${
                isMobile ? "long mt-3" : "short mt-5"
              }`}
            >
              Resend
            </Button>
          )}
        </NavLink>
      </Col>
    </Row>
  </Container>
);

class RegisterVerificationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: undefined
    };
  }

  componentDidMount() {
    // if (isNotVerfy()) {
    //   //only user that no verify yet that  can accses this page
    //   this.props.history.push("/");
    // }
    let status = jwt.decode(this.props.location.pathname.split("/")[2]);
    if (status && !isExpired()) {
      this.props.client
        .mutate({
          mutation: MUTATION_VERIFY_USER,
          variables: {
            id: status.data
          }
        })
        .then(() => {
          this.setState({
            token: this.props.location.pathname.split("/")[2]
          });
          this.props.history.push("/register-status/sukses");
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com | Register Validation</title>
        </Helmet>
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => (
            <Error404Component
              isMobile={!isDesktop}
              status={this.props.location.pathname.split("/")[2]}
              email={
                this.props.location.state === undefined
                  ? ""
                  : this.props.location.state.email
              }
              token={
                this.state.token === undefined
                  ? localStorage.token
                  : this.state.token
              }
              client={this.props}
            />
          )}
        </MediaQuery>
      </React.Fragment>
    );
  }
}

export default withApollo(RegisterVerificationPage);
