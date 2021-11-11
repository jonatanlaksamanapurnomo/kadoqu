/* eslint-disable */
import React, { Component } from "react";
import {
  Container,
  Card,
  Button,
  Form,
  Row,
  Col,
  Image
} from "react-bootstrap";
import { Helmet } from "react-helmet";
import NavLink from "../components/NavLink";
import gql from "graphql-tag";
import Recaptcha from "react-recaptcha";
import { Mutation, Query, withApollo } from "react-apollo";
import { MUTATION_SET_TOKEN, QUERY_GET_TOKEN } from "../gql/token";
import { GET_USER } from "../gql/user";

const register = gql`
  mutation register($input: UserInput, $response: String) {
    register(input: $input, response: $response)
  }
`;
const emailChecker = gql`
  query emailChecker($email: String) {
    emailChecker(email: $email)
  }
`;
let recaptchaInstance;

class RegisterError extends Component {
  render() {
    return (
      <div className="register-error ">
        <i className="fas fa-exclamation-triangle p-4" />
        {this.props.message}
      </div>
    );
  }
}

class Register extends Component {
  state = {
    showError: false,
    name: "",
    email: "",
    password: "",
    secPassword: "",
    phone: "",
    errMessage: "Email yang kamu masukan sudah terdaftar!",
    isHuman: false,
    response: "",
    phoneStatus: false,
    passStatus: false
  };
  validate = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(text);
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com | Register</title>
        </Helmet>
        <Container className="d-flex justify-content-center text-center register-container">
          <Card className="register-card">
            <Row noGutters>
              <Col lg="7">
                <Row className="h-100 align-items-center" noGutters>
                  <Col className="position-absolute  align-self-start">
                    {this.state.showError ? (
                      <RegisterError message={this.state.errMessage} />
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col>
                    <Query
                      query={emailChecker}
                      variables={{ email: this.state.email }}
                    >
                      {({ loading, data }) => {
                        return (
                          <Mutation mutation={register}>
                            {(register, { loading }) => (
                              <Form
                                className="register-form"
                                onSubmit={e => {
                                  e.preventDefault();
                                  recaptchaInstance.reset();
                                  if (this.state.isHuman) {
                                    if (!data.emailChecker) {
                                      if (this.validate(this.state.email)) {
                                        if (this.state.passStatus) {
                                          if (
                                            this.state.password ===
                                              this.state.secPassword &&
                                            this.state.password !== ""
                                          ) {
                                            let phoneNum = "62";
                                            for (
                                              let i = 1;
                                              i < this.state.phone.length;
                                              i++
                                            ) {
                                              phoneNum += this.state.phone.charAt(
                                                i
                                              );
                                            }
                                            let name = this.state.name.split(
                                              " "
                                            );
                                            let firstName = "";
                                            let lastName = "";
                                            if (name.length === 1) {
                                              firstName = name[0];
                                            } else if (name.length > 1) {
                                              firstName = name[0];
                                              let k = 0;
                                              for (
                                                let index = 1;
                                                index < name.length;
                                                index++
                                              ) {
                                                lastName += name[index];
                                                k = index + 1;
                                                if (k < name.length) {
                                                  lastName += " ";
                                                }
                                              }
                                            }
                                            let UserInput = {
                                              phone: phoneNum,
                                              email: this.state.email,
                                              password: this.state.password,
                                              firstName: firstName,
                                              lastName: lastName
                                            };
                                            register({
                                              variables: {
                                                input: UserInput,
                                                response: this.state.response
                                              }
                                              // ,
                                              // refetchQueries: [{ query: getUsers }]
                                            }).then(res => {
                                              this.props.client
                                                .mutate({
                                                  mutation: MUTATION_SET_TOKEN,
                                                  variables: {
                                                    token: res.data.register
                                                  },
                                                  refetchQueries: [
                                                    { query: QUERY_GET_TOKEN },
                                                    { query: GET_USER }
                                                  ]
                                                })
                                                .then(res =>
                                                  // this.props.history.push({
                                                  //   pathname: "/register-status/wait",
                                                  //   state: {email: UserInput.email}
                                                  // })
                                                  this.props.history.push({
                                                    pathname: "/profile"
                                                  })
                                                );
                                            });
                                          } else {
                                            this.setState({
                                              showError: true,
                                              errMessage: "password tidak sama"
                                            });
                                          }
                                          // let phoneNum = "62";
                                          // for (
                                          //   let i = 1;
                                          //   i < this.state.phone.length;
                                          //   i++
                                          // ) {
                                          //   phoneNum += this.state.phone.charAt(i);
                                          // }
                                          // let name = this.state.name.split(" ");
                                          // let firstName = "";
                                          // let lastName = "";
                                          // if (name.length === 1) {
                                          //   firstName = name[0];
                                          // } else if (name.length > 1) {
                                          //   firstName = name[0];
                                          //   let k = 0;
                                          //   for (
                                          //     let index = 1;
                                          //     index < name.length;
                                          //     index++
                                          //   ) {
                                          //     lastName += name[index];
                                          //     k = index + 1;
                                          //     if (k < name.length) {
                                          //       lastName += " ";
                                          //     }
                                          //   }
                                          // }
                                          // let UserInput = {
                                          //   phone: phoneNum,
                                          //   email: this.state.email,
                                          //   password: this.state.password,
                                          //   firstName: firstName,
                                          //   lastName: lastName
                                          // };
                                          // register({
                                          //   variables: {
                                          //     input: UserInput,
                                          //     response: this.state.response
                                          //   }
                                          //   // ,
                                          //   // refetchQueries: [{ query: getUsers }]
                                          // }).then((res) => {

                                          //   this.props.client
                                          //     .mutate({
                                          //       mutation: MUTATION_SET_TOKEN,
                                          //       variables: {
                                          //         token: res.data.register
                                          //       },
                                          //       refetchQueries: [
                                          //         {query: QUERY_GET_TOKEN},
                                          //         {query: GET_USER}
                                          //       ]
                                          //     })
                                          //     .then(() =>
                                          //       this.props.history.push({
                                          //         pathname: "/"
                                          //       })
                                          //     );
                                          // });
                                        } else {
                                          this.setState({
                                            showError: true,
                                            errMessage:
                                              "password terlalu pendek(minimal 6 huruf/angka)"
                                          });
                                        }
                                      } else {
                                        this.setState({
                                          showError: true,
                                          isHuman: false,
                                          errMessage:
                                            "Email yang kamu masukan belum terdaftar"
                                        });
                                      }
                                    } else {
                                      this.setState({
                                        showError: true,
                                        isHuman: false,
                                        errMessage:
                                          "Email yang Kamu masukan sudah terdaftar!"
                                      });
                                    }
                                  } else {
                                    this.setState({
                                      errMessage: "Isi Dulu Captcha nyaa!!!",
                                      showError: true
                                    });
                                  }
                                }}
                              >
                                {this.state.showError ? (
                                  ""
                                ) : (
                                  <Form.Group>
                                    <h1>Daftar</h1>
                                  </Form.Group>
                                )}

                                <Form.Group
                                  controlId="registerName"
                                  className="text-left mt-4"
                                >
                                  <Form.Label>
                                    <i className="register-fas fas fa-user" />
                                    Nama Lengkap
                                  </Form.Label>
                                  <Form.Control
                                    autoComplete="off"
                                    required
                                    onChange={e => {
                                      this.setState({
                                        name: e.target.value
                                      });
                                    }}
                                    value={this.state.name}
                                    type="name"
                                  />
                                </Form.Group>

                                <Form.Group
                                  controlId="registerEmail"
                                  className="text-left"
                                >
                                  <Form.Label>
                                    <i className="register-fas fas fa-at" />
                                    Email
                                  </Form.Label>
                                  <Form.Control
                                    autoComplete="off"
                                    required
                                    onChange={e =>
                                      this.setState({ email: e.target.value })
                                    }
                                    type="email"
                                  />
                                </Form.Group>
                                <Form.Group
                                  controlId="registerEmail1"
                                  className="text-left"
                                >
                                  <Form.Label>
                                    <i className="register-fas fas fa-at" />
                                    Phone Number
                                  </Form.Label>
                                  {/*web*/}
                                  <Form.Control
                                    autoComplete="off"
                                    required
                                    onChange={e => {
                                      const re = /^0\d*$/;
                                      if (
                                        re.test(e.target.value) ||
                                        e.target.value == ""
                                      ) {
                                        this.setState({
                                          phone: e.target.value
                                        });
                                      }
                                    }}
                                    onKeyUp={() => {
                                      //use this
                                      const re = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
                                      this.setState({
                                        phoneStatus: re.test(this.state.phone)
                                      });
                                    }}
                                    value={this.state.phone}
                                    type="text"
                                  />
                                  {this.state.phoneStatus && (
                                    <i
                                      className="fa fa-check-circle"
                                      style={{ color: "green" }}
                                    >
                                      <span style={{ fontFamily: "gotham" }}>
                                        Nomor berhasil di vertifikasi
                                      </span>
                                    </i>
                                  )}
                                  {!this.state.phoneStatus &&
                                    this.state.phone.length > 0 && (
                                      <i
                                        className="fa fa-times-circle"
                                        style={{ color: "red" }}
                                      >
                                        <span style={{ fontFamily: "gotham" }}>
                                          Nomor Tidak Valid
                                        </span>
                                      </i>
                                    )}
                                </Form.Group>

                                <Form.Group
                                  controlId="registerPassword"
                                  className="text-left"
                                >
                                  <Form.Label>
                                    <i className="register-fas fas fa-lock" />
                                    Password
                                  </Form.Label>
                                  <Form.Control
                                    autoComplete="off"
                                    required
                                    onKeyUp={e => {
                                      this.setState({
                                        password: e.target.value,
                                        passStatus: e.target.value.length >= 6
                                      });
                                    }}
                                    type="password"
                                  />
                                </Form.Group>

                                <Form.Group
                                  controlId="registerConfirmPassword"
                                  className="text-left"
                                >
                                  <Form.Label>
                                    <i className="register-fas fas fa-lock" />
                                    Konfirmasi Password
                                  </Form.Label>
                                  <Form.Control
                                    autoComplete="off"
                                    required
                                    onChange={e =>
                                      this.setState({
                                        secPassword: e.target.value
                                      })
                                    }
                                    type="password"
                                  />
                                </Form.Group>
                                {window.innerWidth > 960 && (
                                  <Recaptcha
                                    ref={e => (recaptchaInstance = e)}
                                    sitekey={process.env.REACT_APP_NOT_SITE_KEY}
                                    render="explicit"
                                    verifyCallback={response => {
                                      if (response) {
                                        this.setState({
                                          isHuman: true,
                                          response: response
                                        });
                                      }
                                    }}
                                    onloadCallback={() => {
                                      // console.log("loaded");
                                    }}
                                  />
                                )}
                                {!this.state.isHuman ||
                                !this.state.phoneStatus ? (
                                  <Button
                                    variant="primary"
                                    type="submit"
                                    disabled
                                    className={"disabled mt-3 register-button"}
                                  >
                                    Daftar
                                  </Button>
                                ) : (
                                  <Button
                                    variant="primary"
                                    type="submit"
                                    className={" mt-3 register-button"}
                                  >
                                    Daftar
                                  </Button>
                                )}
                              </Form>
                            )}
                          </Mutation>
                        );
                      }}
                    </Query>
                  </Col>
                </Row>
              </Col>
              <Col lg="5">
                <Row className="align-items-center" noGutters>
                  <Col className="register-card-fore">
                    <Image
                      fluid
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/register-01_r1C7JW5OE.png"
                      alt="Login"
                    />
                  </Col>
                  <Col className="position-absolute">
                    <Image
                      fluid
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/gida-register-01_Hkbzjec_N.svg"
                      alt="GIdA"
                    />
                    <div className="p-2">
                      <h2>Hello!</h2>
                    </div>
                    <div>
                      Sudah punya akun?
                      <br />
                      Yuk masuk disini
                    </div>
                    <div className="p-3">
                      <NavLink href="/login">
                        <Button className="register-button">Masuk</Button>
                      </NavLink>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
          <Card className="login-card-mob">
            <Row className="h-100 align-items-center" noGutters>
              <Col className="position-absolute  align-self-start">
                {this.state.showError ? (
                  <RegisterError message={this.state.errMessage} />
                ) : (
                  ""
                )}
              </Col>
              <Col>
                <Query
                  query={emailChecker}
                  variables={{ email: this.state.email }}
                >
                  {({ loading, data }) => {
                    return (
                      <Mutation mutation={register}>
                        {(register, { loading }) => (
                          <Form
                            className="register-form-mob"
                            onSubmit={e => {
                              e.preventDefault();
                              recaptchaInstance.reset();
                              if (this.state.isHuman) {
                                if (!data.emailChecker) {
                                  if (this.validate(this.state.email)) {
                                    if (
                                      this.state.password ===
                                        this.state.secPassword &&
                                      this.state.password !== ""
                                    ) {
                                      let phoneNum = "62";
                                      for (
                                        let i = 1;
                                        i < this.state.phone.length;
                                        i++
                                      ) {
                                        phoneNum += this.state.phone.charAt(i);
                                      }
                                      let name = this.state.name.split(" ");
                                      let firstName = "";
                                      let lastName = "";
                                      if (name.length === 1) {
                                        firstName = name[0];
                                      } else if (name.length > 1) {
                                        firstName = name[0];
                                        let k = 0;
                                        for (
                                          let index = 1;
                                          index < name.length;
                                          index++
                                        ) {
                                          lastName += name[index];
                                          k = index + 1;
                                          if (k < name.length) {
                                            lastName += " ";
                                          }
                                        }
                                      }

                                      let UserInput = {
                                        phone: phoneNum,
                                        email: this.state.email,
                                        password: this.state.password,
                                        firstName: firstName,
                                        lastName: lastName
                                      };
                                      register({
                                        variables: {
                                          input: UserInput,
                                          response: this.state.response
                                        }
                                      }).then(res => {
                                        this.props.client
                                          .mutate({
                                            mutation: MUTATION_SET_TOKEN,
                                            variables: {
                                              token: res.data.register
                                            },
                                            refetchQueries: [
                                              { query: QUERY_GET_TOKEN },
                                              { query: GET_USER }
                                            ]
                                          })
                                          .then(res =>
                                            this.props.history.push({
                                              pathname: "/profile/data-diri"
                                            })
                                          );
                                      });
                                    } else {
                                      this.setState({
                                        showError: true,
                                        errMessage: "password tidak sama"
                                      });
                                    }
                                  } else {
                                    this.setState({
                                      showError: true,
                                      isHuman: false,
                                      errMessage:
                                        "email yang kamu masukan belum terdaftar"
                                    });
                                  }
                                } else {
                                  this.setState({
                                    showError: true,
                                    isHuman: false,
                                    errMessage:
                                      "Email yang Kamu masukan sudah terdaftar!"
                                  });
                                }
                              } else {
                                this.setState({
                                  errMessage: "Isi Dulu Captcha nyaa!!!",
                                  showError: true
                                });
                              }
                            }}
                          >
                            <div className="mobile-form-group">
                              {this.state.showError ? (
                                ""
                              ) : (
                                <Form.Group>
                                  <h1>Daftar</h1>
                                </Form.Group>
                              )}

                              <Form.Group
                                controlId="registerName1"
                                className="text-left mt-4"
                              >
                                <Form.Label>
                                  <i className="register-fas fas fa-user" />
                                  Nama Lengkap
                                </Form.Label>
                                <Form.Control
                                  autoComplete="off"
                                  required
                                  onChange={e => {
                                    this.setState({
                                      name: e.target.value
                                    });
                                  }}
                                  value={this.state.name}
                                  type="name"
                                />
                              </Form.Group>

                              <Form.Group
                                controlId="registerEmail2"
                                className="text-left"
                              >
                                <Form.Label>
                                  <i className="register-fas fas fa-at" />
                                  Email
                                </Form.Label>
                                <Form.Control
                                  required
                                  autoComplete="off"
                                  onChange={e =>
                                    this.setState({ email: e.target.value })
                                  }
                                  type="email"
                                />
                              </Form.Group>
                              <Form.Group
                                controlId="registerEmail3"
                                className="text-left"
                              >
                                <Form.Label>
                                  <i className="register-fas fas fa-at" />
                                  Phone Number
                                </Form.Label>
                                <Form.Control
                                  required
                                  autoComplete="off"
                                  onChange={e => {
                                    const re = /^0\d*$/;
                                    if (
                                      re.test(e.target.value) ||
                                      e.target.value == ""
                                    ) {
                                      this.setState({ phone: e.target.value });
                                    }
                                  }}
                                  onKeyUp={() => {
                                    //use this
                                    const re = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
                                    this.setState({
                                      phoneStatus: re.test(this.state.phone)
                                    });
                                  }}
                                  value={this.state.phone}
                                  type="text"
                                />
                                {this.state.phoneStatus && (
                                  <i
                                    className="fa fa-check-circle"
                                    style={{ color: "green" }}
                                  >
                                    <span style={{ fontFamily: "gotham" }}>
                                      Nomor berhasil di vertifikasi
                                    </span>
                                  </i>
                                )}
                                {!this.state.phoneStatus &&
                                  this.state.phone.length > 0 && (
                                    <i
                                      className="fa fa-times-circle"
                                      style={{ color: "red" }}
                                    >
                                      <span style={{ fontFamily: "gotham" }}>
                                        Nomor Tidak Valid
                                      </span>
                                    </i>
                                  )}
                              </Form.Group>

                              <Form.Group
                                controlId="registerPassword1"
                                className="text-left"
                              >
                                <Form.Label>
                                  <i className="register-fas fas fa-lock" />
                                  Password
                                </Form.Label>
                                <Form.Control
                                  required
                                  autoComplete="off"
                                  // onChange={e =>
                                  //   this.setState({ password: e.target.value })
                                  // }
                                  onKeyUp={e => {
                                    this.setState({
                                      password: e.target.value,
                                      passStatus: e.target.value.length >= 6
                                    });
                                  }}
                                  type="password"
                                />
                              </Form.Group>

                              <Form.Group
                                controlId="registerConfirmPassword1"
                                className="text-left"
                              >
                                <Form.Label>
                                  <i className="register-fas fas fa-lock" />
                                  Konfirmasi Password
                                </Form.Label>
                                <Form.Control
                                  required
                                  autoComplete="off"
                                  onChange={e =>
                                    this.setState({
                                      secPassword: e.target.value
                                    })
                                  }
                                  type="password"
                                />
                              </Form.Group>
                              {window.innerWidth <= 960 && (
                                <Recaptcha
                                  ref={e => (recaptchaInstance = e)}
                                  sitekey={process.env.REACT_APP_NOT_SITE_KEY}
                                  render="explicit"
                                  verifyCallback={response => {
                                    if (response) {
                                      this.setState({
                                        isHuman: true,
                                        response: response
                                      });
                                    }
                                  }}
                                  onloadCallback={() => {
                                    // console.log("loaded");
                                  }}
                                />
                              )}
                              {!this.state.isHuman ||
                              !this.state.phoneStatus ? (
                                <Button
                                  variant="primary"
                                  type="submit"
                                  disabled
                                  className={"disabled mt-3 register-button"}
                                >
                                  Sign In
                                </Button>
                              ) : (
                                <Button
                                  variant="primary"
                                  type="submit"
                                  className={" mt-3 register-button"}
                                >
                                  Sign In
                                </Button>
                              )}
                            </div>
                          </Form>
                        )}
                      </Mutation>
                    );
                  }}
                </Query>
              </Col>
            </Row>
            <Row className="align-items-center" noGutters>
              <Col className="login-card-fore-mobile">
                <Image
                  fluid
                  src="https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/register-01_r1C7JW5OE.png"
                  alt="Login"
                />
              </Col>
              <Col className="position-absolute mobile-gida">
                <Image
                  fluid
                  src="https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/gida-register-01_Hkbzjec_N.svg"
                  alt="GIdA"
                />
              </Col>
              <Col className="position-absolute text-mobile">
                <h2 className="Hello-mobile">Hello!</h2>

                <div className="textblm-mobile">
                  Sudah punya akun? Yuk masuk disini
                </div>
                <div className="p-3">
                  <NavLink href="/login">
                    <Button className="login-button-mob">Masuk</Button>
                  </NavLink>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </React.Fragment>
    );
  }
}

export default withApollo(Register);
