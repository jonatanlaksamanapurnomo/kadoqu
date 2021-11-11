import React, {Component, Fragment} from "react";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Image,
  Alert
} from "react-bootstrap";
import {Helmet} from "react-helmet";
import NavLink from "../components/NavLink";
import "./LoginRegister.css";
import gql from "graphql-tag";
import MediaQuery from "react-responsive";
import {Mutation, Query, withApollo} from "react-apollo";
import {withRouter} from "react-router-dom";
import Recaptcha from "react-recaptcha";
import Loader from "react-loader-spinner";
import {
  MUTATION_SET_TOKEN,
  QUERY_GET_TOKEN
} from "../gql/token";
import {isNullOrUndefined} from "util";
import {MIN_DESKTOP_SIZE} from "../data/constants";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import {GET_USER} from "../gql/user";


const login = gql`
  mutation login($input: loginInput, $response: String) {
    login(input: $input, response: $response)
  }
`;


const emailChecker = gql`
  query emailChecker($email: String) {
    emailChecker(email: $email)
  }
`;

const MUTATION_UPDATE_SURVEY_LOG_USER_ID = gql`
  mutation updateSurveyLogUserId($guestId: String) {
    updateSurveyLogUserId(guestId: $guestId)
  }
`;

// define a variable to store the recaptcha instance
let recaptchaInstance;

class LoginError extends Component {
  render() {
    return (
      <div className="login-error">
        <i className="fas fa-exclamation-triangle p-4"/>
        {this.props.message}
      </div>
    );
  }
}

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    isHuman: false,
    captchaResponse: ""
  };

  isFormValid = (displayError = false) => {
    if (!this.state.email || !this.state.password) {
      displayError && this.props.setError("Lengkapi form dulu ya");
      return false;
    }
    if (!this.state.isHuman) {
      displayError && this.props.setError("Isi captcha dulu ya");
      return false;
    }
    return true;
  };

  render() {
    return (
      <Query
        query={emailChecker}
        variables={{email: this.state.email}}
        pollInterval={500}
      >
        {({loading, data}) => (
          <Mutation mutation={login}>
            {(login, {loading}) => (
              <Form
                className="login-form"
                onSubmit={e => {
                  e.preventDefault();
                  recaptchaInstance.reset();
                  if (!this.isFormValid(true)) {
                    return;
                  }
                  if (!data.emailChecker) {
                    this.props.setError("Email Tidak Terdaftar");
                    return;
                  }

                  login({
                    variables: {
                      input: {
                        email: this.state.email,
                        password: this.state.password
                      },
                      response: this.state.captchaResponse
                    }
                  })
                    .then(res => {

                      return this.props.client
                        .mutate({
                          mutation: MUTATION_SET_TOKEN,
                          variables: {
                            token: res.data.login
                          },
                          refetchQueries: [
                            {query: QUERY_GET_TOKEN},
                            {query: GET_USER}
                          ]
                        })
                        .then(() => {
                          if (!isNullOrUndefined(localStorage.guestId)) {
                            this.props.client
                              .mutate({
                                mutation: MUTATION_UPDATE_SURVEY_LOG_USER_ID,
                                variables: {
                                  guestId: localStorage.guestId
                                }
                              })
                              .catch(error => {
                                console.log("Error!: ", error);
                              });
                          }
                          this.props.history.push(this.props.redirectUrl);
                        });
                    })
                    .catch(error => {
                      this.props.setError(
                        error.message.replace(/GraphQL error:[\s]*/, "")
                      );
                      this.setState({
                        isHuman: false
                      });
                    });
                }}
              >
                <Form.Group>
                  {loading && (
                    <Loader
                      type="TailSpin"
                      color="#97cee3"
                      height="100"
                      width="100"
                    />
                  )}

                  <h1>Masuk</h1>
                </Form.Group>

                <Form.Group controlId="loginEmail" className="text-left">
                  <Form.Label>
                    <i className="login-fas fas fa-at"/>
                    Email
                  </Form.Label>

                  <Form.Control
                    required
                    autoComplete="off"
                    onChange={e =>
                      this.setState({
                        email: e.target.value
                      })
                    }
                    type="email"
                  />
                </Form.Group>

                <Form.Group controlId="loginPassword" className="text-left">
                  <Form.Label>
                    <i className="login-fas fas fa-lock"/>
                    Password
                  </Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    onChange={e =>
                      this.setState({
                        password: e.target.value
                      })
                    }
                    type="password"
                  />
                </Form.Group>

                <Form.Group>
                  <div>
                    Lupa password? Reset{" "}
                    <span
                      className="cursor-pointer kadoqu-primary-color"
                      onClick={() => this.props.showModal()}
                    >
                      di sini
                    </span>
                    !
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Recaptcha
                    ref={e => (recaptchaInstance = e)}
                    sitekey={process.env.REACT_APP_NOT_SITE_KEY}
                    render="explicit"
                    size="normal"
                    verifyCallback={response => {
                      // console.log(response);
                      if (response) {
                        this.setState({
                          isHuman: true,
                          captchaResponse: response
                        });
                      }
                    }}
                    onloadCallback={() => {
                      // console.log("loaded");
                      // console.log("Widht:", window.innerWidth);
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || !this.isFormValid()}
                  className="mt-3 kadoqu-primary-button login-button"
                >
                  Masuk
                </Button>
              </Form>
            )}
          </Mutation>
        )}
      </Query>
    );
  }
}

class Login extends Component {
  state = {
    email: "",
    password: "",
    showModal: false,
    errorMessage: null,
    isHuman: false,
    sitekey: "6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp",
    to: "/",
    logoutMessage: null
  };

  componentDidMount() {
    if (!this.props.location.state) return;
    if (this.props.location.state.logout) {
      this.setState({
        logoutMessage: "Selamat, kamu berhasil logout"
      });
      return;
    }
    this.setState({
      errorMessage: this.props.location.state.errMesage,
      to: this.props.location.state.from.pathname
    });
  }

  setError = message => {
    this.setState({errorMessage: message});
  };

  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Fragment>
            <Helmet>
              <title>Kadoqu.com | Login</title>
            </Helmet>
            {this.state.logoutMessage && (
              <Alert variant="success">{this.state.logoutMessage}</Alert>
            )}
            {!isDesktop && this.state.errorMessage && (
              <LoginError message={this.state.errorMessage}/>
            )}
            <Container
              className="d-flex justify-content-center text-center login-container">
              <ForgotPasswordModal
                show={this.state.showModal}
                props={this.props}
                onHide={() => this.setState({showModal: false})}
              />
              <Row
                noGutters
                className={isDesktop ? "login-card" : "login-card-mobile"}
              >
                <Col
                  xs={isDesktop ? {span: 7, order: 1} : 12}
                  className={isDesktop ? "bg-white" : "mb-5"}
                >
                  <Row className="h-100 align-items-center" noGutters>
                    <Col className="position-absolute align-self-start">
                      {isDesktop && this.state.errorMessage && (
                        <LoginError message={this.state.errorMessage}/>
                      )}
                    </Col>
                    <Col>
                      <LoginForm
                        setError={this.setError}
                        history={this.props.history}
                        client={this.props.client}
                        showModal={() => this.setState({showModal: true})}
                        redirectUrl={
                          this.props.location.state &&
                          this.props.location.state.from
                            ? this.props.location.state.from.pathname
                            : "/"
                        }
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={isDesktop ? 5 : 12}
                
                  className="shadow d-flex justify-content-center align-items-center login-card-fore px-2"
                >
                  <div className="login-card-fore-image-container">
                    <Image
                      fluid
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/gida-login-01_S1bfse5_V.svg"
                      alt="GIdA"
                    />
                  </div>
                  <div className={!isDesktop ? "text-left" : ""}>
                    <h2 className={isDesktop ? "p-2" : ""}>Selamat Datang!</h2>
                    <div>
                      Belum punya akun?
                      {isDesktop ? <br/> : " "}
                      Yuk daftar dulu
                    </div>
                    <div className={isDesktop ? "p-3" : "mt-3"}>
                      <NavLink
                        href="/register"
                        className={!isDesktop ? "p-0" : ""}
                      >
                        <Button className="kadoqu-primary-button login-button">
                          Daftar
                        </Button>
                      </NavLink>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <div className="batas-bawah-login"></div>
          </Fragment>
        )}
      </MediaQuery>
    );
  }
}

export default withApollo(withRouter(Login));
