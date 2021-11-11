import {
  Container,
  Jumbotron,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Modal,
  Row,
  Col
} from "react-bootstrap";

import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import PaymentConfirmation from "./PaymentConfirmation";
import OrderTrack from "./OrderTrack";
import { withRouter } from "react-router-dom";
import "./UserprofileContent.css";
import "./ProfileSider.css";
import Orders from "../components/Orders";
import FavoriteList from "../components/FavoriteList";
import React, { Component, Fragment } from "react";
import { Query, Mutation, withApollo } from "react-apollo";
import { MUTATION_SET_TOKEN, QUERY_GET_TOKEN } from "../gql/token";
import { validateNumeric } from "../utils/regexInputConverter";
import { maxDate } from "../utils/dateChecker";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import { GET_USER_ADDRESSES } from "../components/AddressForm";
import NavLink from "../components/NavLink";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import ForgotPassword from "../components/ForgotPasswordMobile";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import EditPhoto from "../components/EditPhoto";
import {
  MUTATION_UPDATE_EMAIL,
  MUTATION_CHANGE_DATA_DIRI,
  MUTATION_CHANGE_PASSWORD,
  SELECT_PRIMARY,
  GET_USER
} from "../gql/user";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import gql from "graphql-tag";

const emailChecker = gql`
  query emailChecker($email: String) {
    emailChecker(email: $email)
  }
`;

class UserprofileContent extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow2 = this.handleShow2.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleShow3 = this.handleShow3.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.state = {
      show: false,
      show2: false,
      show3: false,
      showModal: false,
      isSuccess: false,
      email: "",
      oldEmail: "",
      newEmail: "",
      password: "",
      oldPassword: "",
      newPassword: "",
      passStatus: false,
      confirmationPassword: "",
      name: "",
      phone: "",
      gender: 0,
      birthDate: "--",
      phoneStatus: false,
      photo: 6
    };
  }

  Addresses = props => {
    const isDesktop = props.isDesktop;
    return (
      <Container className="margin-left-address mt-4">
        <Row className={isDesktop ? "" : "d-flex justify-content-center"}>
          <Query query={GET_USER_ADDRESSES} fetchPolicy="cache-and-network">
            {({ loading, error, data }) => {
              if (loading) return <Col lg={6}>Loading...</Col>;
              if (!data.me.addresses) return "";
              if (data.me.addresses.length < 1) {
                return (
                  <div
                    className={
                      isDesktop
                        ? ""
                        : "no-item-list d-flex justify-content-center"
                    }
                  >
                    <div className="px-2">
                      <div className="no-item-large text-center">
                        Kelihatannya kamu belum pernah menambahkan alamat nih
                      </div>
                      <div className="no-item-small text-center">
                        ayo mulai tambah alamat !
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <React.Fragment>
                  {data.me.addresses.map(address => (
                    <Mutation mutation={SELECT_PRIMARY} key={address.id}>
                      {selectPrimary => (
                        <Col
                          lg={6}
                          sm={12}
                          className={isDesktop ? "margin-right-address" : ""}
                        >
                          <AddressCard
                            address={address}
                            onClick={() => {
                              this.props.history.push("/profile/edit-address", {
                                address: address
                              });
                            }}
                            className="mb-3 card"
                          >
                            {address.primaryAddress ? (
                              <AddressCard.Button
                                active
                                className="cursor-default"
                              >
                                Alamat Utama
                              </AddressCard.Button>
                            ) : (
                              <Form
                                onSubmit={e => {
                                  e.preventDefault();

                                  selectPrimary({
                                    variables: { id: address.id }
                                  })
                                    .then(() => {
                                      Swal.fire({
                                        icon: "success",
                                        title: `${address.alias} - ${address.name} menjadi alamat utama!`,
                                        timer: 2000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      });
                                    })
                                    .catch(error => {
                                      Swal.fire({
                                        icon: "error",
                                        title: `Gagal menjadikan ${address.alias} - ${address.name} sebagai alamat utama!`,
                                        text: error.message.replace(
                                          /GraphQL error:[\s]*/,
                                          ""
                                        ),
                                        timer: 2000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      });
                                    });
                                }}
                              >
                                <AddressCard.Button type="submit">
                                  Jadikan Alamat Utama
                                </AddressCard.Button>
                              </Form>
                            )}
                          </AddressCard>
                        </Col>
                      )}
                    </Mutation>
                  ))}
                </React.Fragment>
              );
            }}
          </Query>
        </Row>
      </Container>
    );
  };
  componentDidMount = () => {
    const user = this.props.data;
    if (user.lastName) {
      this.setState({
        name: user.firstName + " " + user.lastName,
        phone: user.phone,
        gender: user.gender,
        birthDate: this.dateParser(user.birthDate),
        photo: user.photo,
        email: user.email,
        phoneStatus: true
      });
    } else {
      this.setState({
        name: user.firstName,
        phone: user.phone,
        gender: user.gender,
        birthDate: this.dateParser(user.birthDate),
        photo: user.photo,
        email: user.email,
        phoneStatus: true
      });
    }
  };

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }
  handleClose2() {
    this.setState({ show2: false });
  }

  handleShow2() {
    this.setState({ show2: true, errorPassword: false, errorMsg: "" });
  }

  redirectTambah = () => {
    this.props.history.push("/profile/add-address");
  };

  redirectAlamat = () => {
    this.props.history.push("/profile/address");
  };

  redirectTambahAlamat = () => {
    setTimeout(() => {
      this.props.history.push("/profile/address");
    }, 1);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Alamat berhasil ditambahkan!",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    }, 500);
  };

  redirectUbahAlamat = () => {
    setTimeout(() => {
      this.props.history.push("/profile/address");
    }, 1);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Alamat berhasil diubah!",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    }, 500);
  };

  redirectHapusAlamat = () => {
    setTimeout(() => {
      this.props.history.push("/profile/address");
    }, 1);

    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Alamat berhasil dihapus!",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      });
    }, 500);
  };

  redirectHistory = () => {
    this.props.history.push("/profile/history");
  };

  handleClose3() {
    this.setState({
      show3: false
    });
  }

  handleShow3() {
    this.setState({ show3: true, show2: false });
  }

  setDate = (
    {
      d = this.state.birthDate.split("-")[2],
      m = this.state.birthDate.split("-")[1],
      y = this.state.birthDate.split("-")[0]
    },
    callback
  ) => {
    this.setState({ birthDate: [y, m, d].join("-") }, callback);
  };

  redirectDataDiri = () => {
    this.props.history.push("/profile/data-diri");
  };

  redirectProfile = () => {
    this.props.history.push("/profile");
  };
  redirectMyCart = () => {
    this.props.history.push(this.props.history.location.state.page);
  };
  MobileBack = props => {
    return (
      <div className="d-flex pt-3 back-mobile pb-2">
        <Col className="mobile-title-vertical-center " sm={1} xs={1}>
          <NavLink className="user-profile-mobile-back" href={props.link}>
            <i className="fas fa-less-than green"></i>
          </NavLink>
        </Col>
        <Col className="mobile-title-vertical-center ml-3" sm={10} xs={10}>
          <FormLabel className="mobile-title-vertical-center mobile-title-page black">
            {props.title}
          </FormLabel>
        </Col>
      </div>
    );
  };

  dateParser = birthdate => {
    let d = new Date(parseInt(birthdate));

    let date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    return date;
  };

  convertPhoneNumber = number => {
    if (number.substring(0, 1) === "62") {
      return "0" + number.substring(2, number.length);
    }
    return number;
  };

  render() {
    let { render } = this.props;
    if (render === "DataDiri") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <Fragment>
                <Helmet>
                  <title>Kadoqu.com | Data Diri</title>
                </Helmet>
                {isDesktop ? (
                  <>
                    <div className="pl-3 pr-0 jumbo-size ">
                      <Jumbotron className="p-1 bg-color m-0 jumbo-size">
                        <Container className="pl-5 mx-0">
                          <h1
                            className={
                              this.state.showError
                                ? "h1-desktop"
                                : "h1-desktop mt-5 "
                            }
                          >
                            <p className="underline pb-1">Data Diri</p>
                          </h1>
                          <Mutation mutation={MUTATION_CHANGE_DATA_DIRI}>
                            {(updateDataDiri, { loading }) => {
                              if (loading) {
                                LoadingAlert("Mengubah Data Diri..");
                              }

                              return (
                                <Form
                                  className="mt-4"
                                  onSubmit={e => {
                                    e.preventDefault();
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
                                    if (this.state.phoneStatus) {
                                      let phoneNum = "62";
                                      let startFrom = 1;
                                      if (
                                        this.state.phone.substring(0, 2) ===
                                        "62"
                                      ) {
                                        startFrom = 2;
                                      }
                                      for (
                                        let i = startFrom;
                                        i < this.state.phone.length;
                                        i++
                                      ) {
                                        phoneNum += this.state.phone.charAt(i);
                                      }
                                      let input = {
                                        firstName: firstName,
                                        lastName: lastName,
                                        gender: parseInt(this.state.gender),
                                        phone: phoneNum,
                                        birthDate: this.state.birthDate
                                      };
                                      updateDataDiri({
                                        variables: {
                                          input: input
                                        }
                                      })
                                        .then(res => {
                                          this.props.client
                                            .mutate({
                                              mutation: MUTATION_SET_TOKEN,
                                              variables: {
                                                token: res.data.updateDataDiri
                                              },
                                              refetchQueries: [
                                                { query: GET_USER },
                                                { query: QUERY_GET_TOKEN }
                                              ]
                                            })
                                            .then(() => {
                                              CloseLoadingAlert();
                                              setTimeout(
                                                () =>
                                                  Swal.fire({
                                                    icon: "success",
                                                    title:
                                                      "Data diri berhasil dirubah!",
                                                    timer: 2000,
                                                    showCancelButton: false,
                                                    showConfirmButton: false
                                                  }),
                                                500
                                              );
                                            });
                                        })
                                        .catch(error => {
                                          CloseLoadingAlert();
                                          setTimeout(
                                            () =>
                                              Swal.fire({
                                                icon: "error",
                                                title:
                                                  "Data diri tidak berhasil dirubah!",
                                                text: error.message.replace(
                                                  /GraphQL error:[\s]*/,
                                                  ""
                                                ),
                                                timer: 3500,
                                                showCancelButton: false,
                                                showConfirmButton: false
                                              }),
                                            500
                                          );
                                        });
                                    } else {
                                      Swal.fire({
                                        icon: "error",
                                        title:
                                          "Data diri tidak berhasil dirubah!",
                                        text: "Nomor handphone tidak valid!",
                                        timer: 3500,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      });
                                    }
                                  }}
                                >
                                  <FormGroup controlId="name">
                                    <FormLabel className="h5 black mt-3">
                                      Nama Lengkap
                                    </FormLabel>
                                    <Form.Control
                                      autoComplete="off"
                                      type="text"
                                      className="form-field user-profile-data-diri-input"
                                      onChange={e =>
                                        this.setState({
                                          name: e.target.value
                                        })
                                      }
                                      value={this.state.name}
                                    />
                                  </FormGroup>
                                  <Row className="margin-top-form">
                                    <Col lg={8} md={8} xs={12} sm={12}>
                                      <b className="h5 black">Jenis Kelamin</b>
                                      <Form.Row className="kadoqu-radio-button ml-4 mt-3 ">
                                        {this.state.gender === 1 ? (
                                          <Form.Check
                                            name="gender"
                                            label="Perempuan"
                                            type="radio"
                                            inline
                                            className="h5 black font-light"
                                            id="edit-profile-gender-perempuan"
                                            value={1}
                                            defaultChecked
                                            onChange={e =>
                                              this.setState({
                                                gender: e.target.value
                                              })
                                            }
                                          />
                                        ) : (
                                          <Form.Check
                                            name="gender"
                                            label="Perempuan"
                                            type="radio"
                                            inline
                                            className="h5 black font-light"
                                            id="edit-profile-gender-perempuan"
                                            value={1}
                                            onChange={e =>
                                              this.setState({
                                                gender: e.target.value
                                              })
                                            }
                                          />
                                        )}

                                        {this.state.gender === 2 ? (
                                          <Form.Check
                                            name="gender"
                                            label="Laki-Laki"
                                            type="radio"
                                            inline
                                            defaultChecked
                                            className="h5 black ml-3 font-light margin-left-radio"
                                            id="edit-profile-gender-laki-laki"
                                            value={2}
                                            onChange={e =>
                                              this.setState({
                                                gender: e.target.value
                                              })
                                            }
                                          />
                                        ) : (
                                          <Form.Check
                                            name="gender"
                                            label="Laki-Laki"
                                            type="radio"
                                            inline
                                            className="h5 black ml-3 font-light margin-left-radio"
                                            id="edit-profile-gender-laki-laki"
                                            value={2}
                                            onChange={e =>
                                              this.setState({
                                                gender: e.target.value
                                              })
                                            }
                                          />
                                        )}
                                      </Form.Row>
                                    </Col>
                                    <Col
                                      lg={4}
                                      md={4}
                                      xs={12}
                                      sm={12}
                                      className="margin-left margin-top-form-mobile "
                                    >
                                      <b className="h5 black">Tanggal Lahir</b>

                                      <Row className="date-of-birth-container mt-1 ml-dof ">
                                        <Col
                                          xs={6}
                                          className="d-flex align-items-center justify-content-between"
                                        >
                                          <Form.Control
                                            autoComplete="off"
                                            type="text"
                                            id="birth-date-day"
                                            maxLength={2}
                                            className="form-field dd-mm-width "
                                            value={
                                              this.state.birthDate.split("-")[2]
                                            }
                                            onChange={e => {
                                              const date = e.target.value;
                                              if (date.length < 2) {
                                                this.setDate({
                                                  d: validateNumeric(date)
                                                });
                                                return;
                                              }
                                              const month = parseInt(
                                                this.state.birthDate.split(
                                                  "-"
                                                )[1]
                                              );
                                              const year = parseInt(
                                                this.state.birthDate.split(
                                                  "-"
                                                )[0]
                                              );
                                              this.setDate(
                                                {
                                                  d:
                                                    parseInt(date) >
                                                    maxDate(month, year)
                                                      ? maxDate(month, year)
                                                      : parseInt(date) < 1
                                                      ? 1
                                                      : validateNumeric(date)
                                                },
                                                () =>
                                                  document
                                                    .getElementById(
                                                      "birth-date-month"
                                                    )
                                                    .focus()
                                              );
                                            }}
                                          />
                                          /
                                          <Form.Control
                                            autoComplete="off"
                                            type="text"
                                            maxLength={2}
                                            className="form-field dd-mm-width"
                                            id="birth-date-month"
                                            value={
                                              this.state.birthDate.split("-")[1]
                                            }
                                            onChange={e =>
                                              e.target.value.length < 2
                                                ? this.setDate({
                                                    m: validateNumeric(
                                                      e.target.value
                                                    )
                                                  })
                                                : this.setDate(
                                                    {
                                                      m:
                                                        parseInt(
                                                          e.target.value
                                                        ) > 12
                                                          ? 12
                                                          : parseInt(
                                                              e.target.value
                                                            ) < 1
                                                          ? 1
                                                          : validateNumeric(
                                                              e.target.value
                                                            )
                                                    },
                                                    () =>
                                                      document
                                                        .getElementById(
                                                          "birth-date-year"
                                                        )
                                                        .focus()
                                                  )
                                            }
                                          />
                                          /
                                          <Form.Control
                                            autoComplete="off"
                                            type="text"
                                            maxLength={4}
                                            className="form-field yy-width"
                                            id="birth-date-year"
                                            value={
                                              this.state.birthDate.split("-")[0]
                                            }
                                            onChange={e => {
                                              let nowYear = new Date().getFullYear();
                                              this.setDate({
                                                y:
                                                  parseInt(e.target.value) >
                                                  nowYear
                                                    ? nowYear
                                                    : validateNumeric(
                                                        e.target.value
                                                      ) || ""
                                              });
                                            }}
                                          />
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                  <FormGroup
                                    className="margin-top-form"
                                    controlId="formBasicPassword"
                                  >
                                    <FormLabel className="h5 black">
                                      No. Handphone
                                    </FormLabel>
                                    <Form.Control
                                      autoComplete="off"
                                      className="form-field user-profile-data-diri-input"
                                      onChange={e => {
                                        const re = /^[0-9]*$/;
                                        if (
                                          re.test(e.target.value) ||
                                          e.target.value === ""
                                        ) {
                                          this.setState({
                                            phone: e.target.value
                                          });
                                        }
                                      }}
                                      onKeyUp={() => {
                                        const re = /^(^62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
                                        this.setState({
                                          phoneStatus: re.test(this.state.phone)
                                        });
                                      }}
                                      value={this.state.phone}
                                      type="text"
                                    />
                                  </FormGroup>
                                  {this.state.phoneStatus && (
                                    <i
                                      className="fa fa-check-circle"
                                      style={{ color: "green" }}
                                    >
                                      {" "}
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
                                        {" "}
                                        <span style={{ fontFamily: "gotham" }}>
                                          Nomor Tidak Valid
                                        </span>
                                      </i>
                                    )}
                                  <Row className="margin-top-form">
                                    <Col lg={12} md={12} xs={12}>
                                      <p className="h5 black">
                                        Alamat Email (
                                        <small
                                          onClick={this.handleShow}
                                          className="small-link green"
                                        >
                                          Ubah
                                        </small>
                                        ){" "}
                                      </p>
                                    </Col>
                                    <Col
                                      lg={12}
                                      md={12}
                                      xs={12}
                                      className="mt-1"
                                    >
                                      <p className="h5 font-light text-muted m-0">
                                        {this.state.email}
                                      </p>
                                    </Col>
                                    <Col
                                      lg={12}
                                      md={12}
                                      xs={12}
                                      className="margin-top-form"
                                    >
                                      <p className="h5 black">
                                        Password (
                                        <small
                                          onClick={this.handleShow2}
                                          className="small-link green"
                                        >
                                          Ubah
                                        </small>
                                        ){" "}
                                      </p>
                                    </Col>
                                  </Row>
                                  <Button
                                    size="lg"
                                    type="submit"
                                    className=" margin-bottom-mobile exitButton mt-5 kadoqu-primary-button-green"
                                  >
                                    Simpan
                                  </Button>
                                </Form>
                              );
                            }}
                          </Mutation>
                        </Container>
                      </Jumbotron>
                    </div>

                    {/*modal 1*/}
                    <Modal
                      size="lg"
                      centered="true"
                      className="user-profile-modal"
                      show={this.state.show}
                      onHide={this.handleClose}
                    >
                      <Helmet>
                        <title>Kadoqu.com | Alamat Email</title>
                      </Helmet>
                      <div className="modal-bg">
                        <Modal.Header>
                          <Modal.Title>
                            {" "}
                            <h1 className="modal-title">
                              Ubah Alamat Email
                            </h1>{" "}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="">
                          <Query
                            query={emailChecker}
                            variables={{ email: this.state.newEmail }}
                          >
                            {({ loading, data }) => {
                              return (
                                <Mutation mutation={MUTATION_UPDATE_EMAIL}>
                                  {(changeEmail, { loading }) => {
                                    if (loading) {
                                      LoadingAlert("Mengubah Email..");
                                    }
                                    return (
                                      <Form
                                        onSubmit={e => {
                                          e.preventDefault();
                                          let emailInput = {
                                            oldEmail: this.state.oldEmail,
                                            newEmail: this.state.newEmail,
                                            password: this.state.password
                                          };

                                          if (!data.emailChecker) {
                                            changeEmail({
                                              variables: {
                                                input: emailInput
                                              }
                                            })
                                              .then(res => {
                                                return this.props.client
                                                  .mutate({
                                                    mutation: MUTATION_SET_TOKEN,
                                                    variables: {
                                                      token:
                                                        res.data.changeEmail
                                                    },
                                                    refetchQueries: [
                                                      {
                                                        query: QUERY_GET_TOKEN
                                                      },
                                                      { query: GET_USER },
                                                      { query: emailChecker }
                                                    ]
                                                  })
                                                  .then(() => {
                                                    CloseLoadingAlert();
                                                    setTimeout(
                                                      () =>
                                                        Swal.fire({
                                                          icon: "success",
                                                          title:
                                                            "Email berhasil dirubah!",
                                                          timer: 2000,
                                                          showCancelButton: false,
                                                          showConfirmButton: false
                                                        }),
                                                      500
                                                    );
                                                  });
                                              })
                                              .catch(error => {
                                                CloseLoadingAlert();
                                                setTimeout(
                                                  () =>
                                                    Swal.fire({
                                                      icon: "error",
                                                      title:
                                                        "Email tidak berhasil dirubah!",
                                                      text: error.message.replace(
                                                        /GraphQL error:[\s]*/,
                                                        ""
                                                      ),
                                                      timer: 2000,
                                                      showCancelButton: false,
                                                      showConfirmButton: false
                                                    }),
                                                  500
                                                );
                                              });
                                          } else {
                                            CloseLoadingAlert();
                                            setTimeout(
                                              () =>
                                                Swal.fire({
                                                  icon: "error",
                                                  title:
                                                    "Email tidak berhasil dirubah!",
                                                  text:
                                                    "Email sudah terdaftar!",
                                                  timer: 2000,
                                                  showCancelButton: false,
                                                  showConfirmButton: false
                                                }),
                                              500
                                            );
                                          }
                                        }}
                                      >
                                        <FormGroup controlId="old-email">
                                          <FormLabel className="h6">
                                            Alamat Email Lama
                                          </FormLabel>
                                          <FormControl
                                            type="text"
                                            autoComplete="off"
                                            className="form-field modal-input-width"
                                            onChange={e =>
                                              this.setState({
                                                oldEmail: e.target.value
                                              })
                                            }
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="new-email">
                                          <FormLabel className="h6">
                                            Alamat Email Baru
                                          </FormLabel>
                                          <FormControl
                                            type="text"
                                            autoComplete="off"
                                            className="form-field modal-input-width"
                                            onChange={e => {
                                              this.setState({
                                                newEmail: e.target.value
                                              });
                                            }}
                                          />
                                        </FormGroup>
                                        <FormGroup controlId="password">
                                          <FormLabel className="h6">
                                            Password Akun Anda
                                          </FormLabel>
                                          <FormControl
                                            autoComplete="off"
                                            className="form-field modal-input-width"
                                            onChange={e =>
                                              this.setState({
                                                password: e.target.value
                                              })
                                            }
                                            required
                                            type="password"
                                          />
                                        </FormGroup>
                                        <div className="d-flex flex-row modal-btn-position">
                                          <div className="p-2">
                                            <Button
                                              size="sm"
                                              className="kadoqu-primary-button-green modal-btn-size"
                                              type="submit"
                                              onClick={this.handleClose}
                                            >
                                              Simpan
                                            </Button>
                                          </div>
                                          <div className="p-2">
                                            <Button
                                              size="md"
                                              className="modal-btn-color modal-btn-size"
                                              onClick={this.handleClose}
                                            >
                                              Batal
                                            </Button>
                                          </div>
                                        </div>
                                      </Form>
                                    );
                                  }}
                                </Mutation>
                              );
                            }}
                          </Query>
                        </Modal.Body>
                      </div>
                    </Modal>
                    {/*end of modal 1*/}
                    {/*modal 2*/}
                    <Modal
                      size="lg"
                      className="modal"
                      centered="true"
                      show={this.state.show2}
                      onHide={this.handleClose2}
                    >
                      <Helmet>
                        <title>Kadoqu.com | Password</title>
                      </Helmet>
                      <div className="modal-bg">
                        <Modal.Header>
                          <div className="row">
                            <div className=" col-lg-12">
                              <Modal.Title>
                                <h1 className="modal-title">Ubah Password</h1>
                              </Modal.Title>
                            </div>
                            <div className=" col-lg-12">
                              <p>
                                Lupa kata sandi? klik{" "}
                                <span
                                  className="cursor-pointer kadoqu-primary-color"
                                  onClick={() =>
                                    this.setState({ showModal: true })
                                  }
                                >
                                  di sini
                                </span>
                              </p>
                            </div>
                          </div>
                        </Modal.Header>

                        <Modal.Body>
                          <Mutation mutation={MUTATION_CHANGE_PASSWORD}>
                            {(changePassword, { loading }) => {
                              if (loading) {
                                LoadingAlert("Mengubah Password..");
                              }
                              return (
                                <Form
                                  onSubmit={e => {
                                    e.preventDefault();
                                    let pwdInput = {
                                      oldPassword: this.state.oldPassword,
                                      newPassword: this.state.newPassword,
                                      confirmationPassword: this.state
                                        .confirmationPassword
                                    };
                                    if (this.state.passStatus) {
                                      changePassword({
                                        variables: {
                                          input: pwdInput
                                        }
                                      })
                                        .then(res => {
                                          return this.props.client
                                            .mutate({
                                              mutation: MUTATION_SET_TOKEN,
                                              variables: {
                                                token: res.data.changePassword
                                              },
                                              refetchQueries: [
                                                { query: QUERY_GET_TOKEN },
                                                { query: GET_USER }
                                              ]
                                            })
                                            .then(() => {
                                              CloseLoadingAlert();
                                              this.handleClose2();
                                              setTimeout(
                                                () =>
                                                  Swal.fire({
                                                    icon: "success",
                                                    title:
                                                      "Password berhasil dirubah!",
                                                    timer: 2000,
                                                    showCancelButton: false,
                                                    showConfirmButton: false
                                                  }),
                                                500
                                              );
                                            });
                                        })
                                        .catch(error => {
                                          CloseLoadingAlert();
                                          setTimeout(
                                            () =>
                                              Swal.fire({
                                                icon: "error",
                                                title:
                                                  "Password tidak berhasil dirubah!",
                                                text: error.message.replace(
                                                  /GraphQL error:[\s]*/,
                                                  ""
                                                ),
                                                timer: 2000,
                                                showCancelButton: false,
                                                showConfirmButton: false
                                              }),
                                            500
                                          );
                                        });
                                    } else {
                                      CloseLoadingAlert();
                                      setTimeout(
                                        () =>
                                          Swal.fire({
                                            icon: "error",
                                            title:
                                              "Password tidak berhasil dirubah!",
                                            text:
                                              "Password terlalu pendek (minimal 6 huruf/angka)",
                                            timer: 2000,
                                            showCancelButton: false,
                                            showConfirmButton: false
                                          }),10
                                      );
                                    }
                                  }}
                                >
                                  <FormGroup controlId="old-password">
                                    <FormLabel className="h6">
                                      Password Lama
                                    </FormLabel>
                                    <FormControl
                                      autoComplete="off"
                                      className="form-field modal-input-width"
                                      onChange={e =>
                                        this.setState({
                                          oldPassword: e.target.value
                                        })
                                      }
                                      required
                                      type="password"
                                    />
                                  </FormGroup>
                                  <FormGroup controlId="new-password">
                                    <FormLabel className="h6">
                                      Password Baru
                                    </FormLabel>
                                    <FormControl
                                      autoComplete="off"
                                      className="form-field modal-input-width"
                                      onChange={e =>
                                        this.setState({
                                          newPassword: e.target.value,
                                          passStatus: e.target.value.length >= 6
                                        })
                                      }
                                      required
                                      type="password"
                                    />
                                  </FormGroup>
                                  <FormGroup controlId="confirm-password">
                                    <FormLabel className="h6">
                                      Tulis Ulang Password baru Anda
                                    </FormLabel>
                                    <FormControl
                                      autoComplete="off"
                                      className="form-field modal-input-width"
                                      onChange={e =>
                                        this.setState({
                                          confirmationPassword: e.target.value
                                        })
                                      }
                                      required
                                      type="password"
                                    />
                                  </FormGroup>
                                  <div className="d-flex flex-row modal-btn-position">
                                    <div className="p-2">
                                      {this.state.errorPassword ? (
                                        <Button
                                          size="sm"
                                          className="kadoqu-primary-button-green modal-btn-size"
                                          onClick={this.handleClose2}
                                          type="submit"
                                        >
                                          Simpan
                                        </Button>
                                      ) : (
                                        <Button
                                          size="sm"
                                          className="kadoqu-primary-button-green modal-btn-size"
                                          type="submit"
                                        >
                                          Simpan
                                        </Button>
                                      )}
                                    </div>
                                    <div className="p-2">
                                      <Button
                                        size="md"
                                        className="modal-btn-color modal-btn-size"
                                        onClick={this.handleClose2}
                                      >
                                        Batal
                                      </Button>
                                    </div>
                                  </div>
                                </Form>
                              );
                            }}
                          </Mutation>
                        </Modal.Body>
                      </div>
                    </Modal>
                    {/*end of modal 2*/}
                    {/*modal 3*/}
                    <ForgotPasswordModal
                      show={this.state.showModal}
                      props={this.props}
                      onHide={() => this.setState({ showModal: false })}
                    />
                  </>
                ) : (
                  <div className="pl-0 pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <div className="jumbo-component">
                        <this.MobileBack link="/profile" title="Data Diri" />
                        <Mutation mutation={MUTATION_CHANGE_DATA_DIRI}>
                          {(updateDataDiri, { loading }) => {
                            if (loading) {
                              LoadingAlert("Mengubah Data Diri..");
                            }
                            return (
                              <Form
                                className={
                                  isDesktop ? "mt-4" : "mt-4 align-middle"
                                }
                                onSubmit={e => {
                                  e.preventDefault();
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
                                  if (this.state.phoneStatus) {
                                    let phoneNum = "62";
                                    let startFrom = 1;
                                    if (
                                      this.state.phone.substring(0, 2) === "62"
                                    ) {
                                      startFrom = 2;
                                    }
                                    for (
                                      let i = startFrom;
                                      i < this.state.phone.length;
                                      i++
                                    ) {
                                      phoneNum += this.state.phone.charAt(i);
                                    }
                                    let input = {
                                      firstName: firstName,
                                      lastName: lastName,
                                      gender: parseInt(this.state.gender),
                                      phone: phoneNum,
                                      birthDate: this.state.birthDate
                                    };
                                    updateDataDiri({
                                      variables: {
                                        input: input
                                      }
                                    })
                                      .then(res => {
                                        this.props.client
                                          .mutate({
                                            mutation: MUTATION_SET_TOKEN,
                                            variables: {
                                              token: res.data.updateDataDiri
                                            },
                                            refetchQueries: [
                                              { query: GET_USER },
                                              { query: QUERY_GET_TOKEN }
                                            ]
                                          })
                                          .then(() => {
                                            CloseLoadingAlert();
                                            setTimeout(
                                              () =>
                                                Swal.fire({
                                                  icon: "success",
                                                  title:
                                                    "Data diri berhasil dirubah!",
                                                  timer: 2000,
                                                  showCancelButton: false,
                                                  showConfirmButton: false
                                                }),
                                              500
                                            );
                                          });
                                      })
                                      .catch(error => {
                                        CloseLoadingAlert();
                                        setTimeout(
                                          () =>
                                            Swal.fire({
                                              icon: "error",
                                              title:
                                                "Data diri tidak berhasil dirubah!",
                                              text: error.message.replace(
                                                /GraphQL error:[\s]*/,
                                                ""
                                              ),
                                              timer: 3500,
                                              showCancelButton: false,
                                              showConfirmButton: false
                                            }),
                                          500
                                        );
                                      });
                                  } else {
                                    Swal.fire({
                                      icon: "error",
                                      title:
                                        "Data diri tidak berhasil dirubah!",
                                      text: "Nomor handphone tidak valid!",
                                      timer: 3500,
                                      showCancelButton: false,
                                      showConfirmButton: false
                                    });
                                  }
                                }}
                              >
                                <div className={"padding-left-mob"}>
                                  <FormGroup controlId="name">
                                    <FormLabel className="h5 black">
                                      Nama Lengkap
                                    </FormLabel>
                                    <Form.Control
                                      autoComplete="off"
                                      type="text"
                                      className="form-field user-profile-data-diri-input"
                                      onChange={e =>
                                        this.setState({
                                          name: e.target.value
                                        })
                                      }
                                      value={this.state.name}
                                    />
                                  </FormGroup>
                                  <FormGroup
                                    controlId="name"
                                    className="margin-top-form"
                                  >
                                    <b className="h5 black">Jenis Kelamin</b>
                                    <div className="kadoqu-radio-button d-flex ml-4 mt-3 ">
                                      {this.state.gender === 1 ? (
                                        <Form.Check
                                          name="gender"
                                          label="Perempuan"
                                          type="radio"
                                          inline
                                          className="h5 black font-light"
                                          id="edit-profile-gender-perempuan"
                                          value={1}
                                          defaultChecked
                                          onChange={e =>
                                            this.setState({
                                              gender: e.target.value
                                            })
                                          }
                                        />
                                      ) : (
                                        <Form.Check
                                          name="gender"
                                          label="Perempuan"
                                          type="radio"
                                          inline
                                          className="h5 black font-light"
                                          id="edit-profile-gender-perempuan"
                                          value={1}
                                          onChange={e =>
                                            this.setState({
                                              gender: e.target.value
                                            })
                                          }
                                        />
                                      )}

                                      {this.state.gender === 2 ? (
                                        <Form.Check
                                          name="gender"
                                          label="Laki-Laki"
                                          type="radio"
                                          inline
                                          defaultChecked
                                          className="h5 black ml-3 font-light margin-left-radio"
                                          id="edit-profile-gender-laki-laki"
                                          value={2}
                                          onChange={e =>
                                            this.setState({
                                              gender: e.target.value
                                            })
                                          }
                                        />
                                      ) : (
                                        <Form.Check
                                          name="gender"
                                          label="Laki-Laki"
                                          type="radio"
                                          inline
                                          className="h5 black ml-3 font-light margin-left-radio"
                                          id="edit-profile-gender-laki-laki"
                                          value={2}
                                          onChange={e =>
                                            this.setState({
                                              gender: e.target.value
                                            })
                                          }
                                        />
                                      )}
                                    </div>
                                  </FormGroup>
                                  <Col
                                    lg={4}
                                    md={4}
                                    xs={12}
                                    sm={12}
                                    className="margin-left pl-0 pr-0 margin-top-form-mobile "
                                  >
                                    <b className="h5 black">Tanggal Lahir</b>

                                    <div className="date-of-birth-container d-flex mt-1 ml-dof ">
                                      <Col
                                        xs={6}
                                        className="d-flex align-items-center justify-content-between"
                                      >
                                        <Form.Control
                                          autoComplete="off"
                                          type="text"
                                          id="birth-date-day"
                                          maxLength={2}
                                          className="form-field dd-mm-width "
                                          value={
                                            this.state.birthDate.split("-")[2]
                                          }
                                          onChange={e => {
                                            const date = e.target.value;
                                            if (date.length < 2) {
                                              this.setDate({
                                                d: validateNumeric(date)
                                              });
                                              return;
                                            }
                                            const month = parseInt(
                                              this.state.birthDate.split("-")[1]
                                            );
                                            const year = parseInt(
                                              this.state.birthDate.split("-")[0]
                                            );
                                            this.setDate(
                                              {
                                                d:
                                                  parseInt(date) >
                                                  maxDate(month, year)
                                                    ? maxDate(month, year)
                                                    : parseInt(date) < 1
                                                    ? 1
                                                    : validateNumeric(date)
                                              },
                                              () =>
                                                document
                                                  .getElementById(
                                                    "birth-date-month"
                                                  )
                                                  .focus()
                                            );
                                          }}
                                        />
                                        /
                                        <Form.Control
                                          autoComplete="off"
                                          type="text"
                                          maxLength={2}
                                          className="form-field dd-mm-width"
                                          id="birth-date-month"
                                          value={
                                            this.state.birthDate.split("-")[1]
                                          }
                                          onChange={e =>
                                            e.target.value.length < 2
                                              ? this.setDate({
                                                  m: validateNumeric(
                                                    e.target.value
                                                  )
                                                })
                                              : this.setDate(
                                                  {
                                                    m:
                                                      parseInt(e.target.value) >
                                                      12
                                                        ? 12
                                                        : parseInt(
                                                            e.target.value
                                                          ) < 1
                                                        ? 1
                                                        : validateNumeric(
                                                            e.target.value
                                                          )
                                                  },
                                                  () =>
                                                    document
                                                      .getElementById(
                                                        "birth-date-year"
                                                      )
                                                      .focus()
                                                )
                                          }
                                        />
                                        /
                                        <Form.Control
                                          autoComplete="off"
                                          type="text"
                                          maxLength={4}
                                          className="form-field yy-width"
                                          id="birth-date-year"
                                          value={
                                            this.state.birthDate.split("-")[0]
                                          }
                                          onChange={e => {
                                            let nowYear = new Date().getFullYear();
                                            this.setDate({
                                              y:
                                                parseInt(e.target.value) >
                                                nowYear
                                                  ? nowYear
                                                  : validateNumeric(
                                                      e.target.value
                                                    ) || ""
                                            });
                                          }}
                                        />
                                      </Col>
                                    </div>
                                  </Col>
                                  <FormGroup
                                    className="margin-top-form"
                                    controlId="formBasicPassword"
                                  >
                                    <FormLabel className="h5 black">
                                      No. Handphone
                                    </FormLabel>
                                    <Form.Control
                                      autoComplete="off"
                                      className="form-field user-profile-data-diri-input"
                                      onChange={e => {
                                        const re = /^[0-9]*$/;
                                        if (
                                          re.test(e.target.value) ||
                                          e.target.value === ""
                                        ) {
                                          this.setState({
                                            phone: e.target.value
                                          });
                                        }
                                      }}
                                      onKeyUp={() => {
                                        const re = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;
                                        this.setState({
                                          phoneStatus: re.test(this.state.phone)
                                        });
                                      }}
                                      value={this.state.phone}
                                      type="number"
                                    />
                                    {this.state.phoneStatus && (
                                      <i
                                        className="fa fa-check-circle"
                                        style={{ color: "green" }}
                                      >
                                        {" "}
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
                                          {" "}
                                          <span
                                            style={{ fontFamily: "gotham" }}
                                          >
                                            Nomor Tidak Valid
                                          </span>
                                        </i>
                                      )}
                                  </FormGroup>
                                  <Col
                                    className="margin-top-form pl-0 pr-0"
                                    lg={12}
                                    md={12}
                                    xs={12}
                                  >
                                    <p className="h5 black">
                                      Alamat Email (
                                      <NavLink
                                        className="p-0 nav-link-user-profile"
                                        href="/profile/change-email"
                                      >
                                        <small className="green">Ubah</small>
                                      </NavLink>
                                      ){" "}
                                    </p>
                                  </Col>
                                  <Col
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    className="pr-0 pl-0 mt-1"
                                  >
                                    <p className="h5 font-light text-muted m-0">
                                      {this.state.email}
                                    </p>
                                  </Col>
                                  <Col
                                    lg={12}
                                    md={12}
                                    xs={12}
                                    className="pr-0 pl-0 margin-top-form"
                                  >
                                    <p className="h5 black">
                                      Password (
                                      <NavLink
                                        className="p-0 nav-link-user-profile"
                                        href="/profile/change-password"
                                      >
                                        <small className="green">Ubah</small>
                                      </NavLink>
                                      ){" "}
                                    </p>
                                  </Col>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <Button
                                    size="lg"
                                    type="submit"
                                    className=" margin-bottom-mobile exitButton mt-3 kadoqu-primary-button-green"
                                  >
                                    Simpan
                                  </Button>
                                </div>
                              </Form>
                            );
                          }}
                        </Mutation>
                      </div>
                    </Jumbotron>
                  </div>
                )}

                {/*end of modal 3*/}
              </Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "EditPhoto") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Edit Foto</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mx-0">
                        <h1 className="mt-5 h1-desktop">
                          <p className="pb-1">
                            <u>Edit Foto </u>{" "}
                          </p>
                        </h1>
                        <div>
                          <EditPhoto
                            isDesktop={isDesktop}
                            photo={this.state.photo}
                          />
                        </div>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack link="/profile" title="Edit Foto" />
                      <div className="pl-0 pr-0 d-flex justify-content-center">
                        <div className="w-100">
                          <EditPhoto
                            isDesktop={isDesktop}
                            photo={this.state.photo}
                          />
                        </div>
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "alamat") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Alamat</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mx-0">
                        <h1 className="mt-5 h1-desktop">
                          <p className="underline-alamat pb-1">Alamat</p>
                        </h1>
                        <div className="userprofile-scrollable">
                          <this.Addresses
                            isDesktop={isDesktop}
                            location={this.props.location}
                          />
                        </div>
                        <Button
                          size="lg"
                          type="button"
                          onClick={this.redirectTambah}
                          className=" margin-bottom-mobile exitButton mt-5 kadoqu-primary-button-green"
                        >
                          Tambah Alamat
                        </Button>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack link="/profile" title="Alamat" />
                      <div className="pl-0 pr-0 d-flex justify-content-center">
                        <div className="w-100">
                          <this.Addresses
                            isDesktop={isDesktop}
                            location={this.props.location}
                          />
                          <div className="d-flex justify-content-center">
                            <Button
                              size="lg"
                              type="button"
                              onClick={this.redirectTambah}
                              className=" margin-bottom-mobile exitButton mt-5 kadoqu-primary-button-green"
                            >
                              Tambah Alamat
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "password") {
      return (
        <React.Fragment>
          <Helmet>
            <title>Kadoqu.com | Password</title>
          </Helmet>
          <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
            <div className="mb-2 pl-0 pr-0">
              <this.MobileBack link="/profile/data-diri" title="Password" />
              <Mutation mutation={MUTATION_CHANGE_PASSWORD}>
                {(changePassword, { loading }) => {
                  if (loading) {
                    LoadingAlert("Mengubah Password..");
                  }

                  return (
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        let pwdInput = {
                          oldPassword: this.state.oldPassword,
                          newPassword: this.state.newPassword,
                          confirmationPassword: this.state.confirmationPassword
                        };
                        changePassword({
                          variables: {
                            input: pwdInput
                          }
                        })
                          .then(res => {
                            return this.props.client
                              .mutate({
                                mutation: MUTATION_SET_TOKEN,
                                variables: {
                                  token: res.data.changePassword
                                },
                                refetchQueries: [
                                  { query: QUERY_GET_TOKEN },
                                  { query: GET_USER }
                                ]
                              })
                              .then(() => {
                                CloseLoadingAlert();
                                setTimeout(
                                  () =>
                                    Swal.fire(
                                      {
                                        icon: "success",
                                        title: "Password berhasil dirubah!",
                                        timer: 2000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      },
                                      setTimeout(() => {
                                        this.props.history.push(
                                          "/profile/data-diri"
                                        );
                                      }, 1)
                                    ),
                                  500
                                );
                              });
                          })
                          .catch(error => {
                            CloseLoadingAlert();
                            setTimeout(
                              () =>
                                Swal.fire({
                                  icon: "error",
                                  title: "Password tidak berhasil dirubah!",
                                  text: error.message.replace(
                                    /GraphQL error:[\s]*/,
                                    ""
                                  ),
                                  timer: 2000,
                                  showCancelButton: false,
                                  showConfirmButton: false
                                }),
                              500
                            );
                          });
                      }}
                    >
                      <div className="padding-left-mob mb-5 mt-4">
                        <FormGroup controlId="old-password">
                          <FormLabel className="h6">Password Lama</FormLabel>
                          <FormControl
                            autoComplete="off"
                            className="form-field user-profile-data-diri-input"
                            onChange={e =>
                              this.setState({ oldPassword: e.target.value })
                            }
                            required
                            type="password"
                          />
                        </FormGroup>
                        <FormGroup controlId="new-password">
                          <FormLabel className="h6">Password Baru</FormLabel>
                          <FormControl
                            autoComplete="off"
                            className="form-field user-profile-data-diri-input"
                            onChange={e =>
                              this.setState({
                                newPassword: e.target.value,
                                passStatus: e.target.value.length >= 6
                              })
                            }
                            required
                            type="password"
                          />
                        </FormGroup>
                        <FormGroup controlId="confirm-password">
                          <FormLabel className="h6">
                            Tulis Ulang Password baru Anda
                          </FormLabel>
                          <FormControl
                            autoComplete="off"
                            className="form-field user-profile-data-diri-input"
                            onChange={e =>
                              this.setState({
                                confirmationPassword: e.target.value
                              })
                            }
                            required
                            type="password"
                          />
                        </FormGroup>
                      </div>
                      <div className="lupa-password-div padding-left-mob">
                        <small className="black font-light">
                          Lupa kata sandi? klik{" "}
                          <small
                            className="cursor-pointer kadoqu-primary-color"
                            onClick={() =>
                              this.props.history.push(
                                "/profile/forget-password"
                              )
                            }
                          >
                            di sini
                          </small>{" "}
                        </small>
                      </div>
                      <div className="d-flex justify-content-center">
                        <div className="p-2">
                          <Button
                            size="sm"
                            className="primary-button-green modal-btn-size"
                            type="submit"
                          >
                            Simpan
                          </Button>
                        </div>
                        <div className="p-2">
                          <Button
                            size="md"
                            className="modal-btn-color modal-btn-size"
                            onClick={this.redirectDataDiri}
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Mutation>
            </div>
          </Jumbotron>
        </React.Fragment>
      );
    } else if (render === "lupa-password") {
      return (
        <React.Fragment>
          <Helmet>
            <title>Kadoqu.com | Lupa Password</title>
          </Helmet>
          <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
            <Container className="mb-2 pl-0 pr-0">
              <this.MobileBack
                link="/profile/change-password"
                title="Lupa Password"
              />
              <ForgotPassword props={this.props} />
            </Container>
          </Jumbotron>
        </React.Fragment>
      );
    } else if (render === "payment") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Konfirmasi Pembayaran</title>
                </Helmet>
                <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                  <this.MobileBack
                    link={this.props.history.location.state.page}
                    title="Konfirmasi Pembayaran"
                  />
                  <PaymentConfirmation
                    back={this.redirectMyCart}
                    isDesktop={isDesktop}
                    order={this.props.history.location.state.order}
                  />
                </Jumbotron>
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "OrderTrack") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Lacak Pesanan</title>
                </Helmet>
                <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                  <this.MobileBack
                    link={this.props.history.location.state.page}
                    title="Lacak Pesanan"
                  />
                  <OrderTrack
                    order={this.props.history.location.state.order}
                    back={this.redirectMyCart}
                    isDesktop={isDesktop}
                  />
                </Jumbotron>
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "email") {
      return (
        <React.Fragment>
          <Helmet>
            <title>Kadoqu.com | Alamat Email</title>
          </Helmet>
          <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
            <div className="mb-2 pl-0 pr-0">
              <this.MobileBack link="/profile/data-diri" title="Alamat Email" />
              <Mutation mutation={MUTATION_UPDATE_EMAIL}>
                {(changeEmail, { loading }) => {
                  if (loading) {
                    LoadingAlert("Mengubah Email..");
                  }
                  return (
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        let emailInput = {
                          oldEmail: this.state.oldEmail,
                          newEmail: this.state.newEmail,
                          password: this.state.password
                        };
                        changeEmail({
                          variables: {
                            input: emailInput
                          }
                        })
                          .then(res => {
                            return this.props.client
                              .mutate({
                                mutation: MUTATION_SET_TOKEN,
                                variables: {
                                  token: res.data.changeEmail
                                },
                                refetchQueries: [
                                  { query: QUERY_GET_TOKEN },
                                  { query: GET_USER },
                                  { query: emailChecker }
                                ]
                              })
                              .then(() => {
                                CloseLoadingAlert();
                                setTimeout(
                                  () =>
                                    Swal.fire(
                                      {
                                        icon: "success",
                                        title: "Email berhasil dirubah!",
                                        timer: 2000,
                                        showCancelButton: false,
                                        showConfirmButton: false
                                      },
                                      setTimeout(() => {
                                        this.props.history.push(
                                          "/profile/data-diri"
                                        );
                                      }, 1)
                                    ),
                                  500
                                );
                              });
                          })
                          .catch(error => {
                            CloseLoadingAlert();
                            setTimeout(
                              () =>
                                Swal.fire({
                                  icon: "error",
                                  title: "Email tidak berhasil dirubah!",
                                  text: error.message.replace(
                                    /GraphQL error:[\s]*/,
                                    ""
                                  ),
                                  timer: 2000,
                                  showCancelButton: false,
                                  showConfirmButton: false
                                }),
                              500
                            );
                          });
                      }}
                    >
                      <div className="padding-left-mob mb-5 mt-4">
                        <FormGroup controlId="old-email">
                          <FormLabel className="h6">
                            Alamat Email Lama
                          </FormLabel>
                          <FormControl
                            autoComplete="off"
                            type="text"
                            className="form-field user-profile-data-diri-input"
                            onChange={e =>
                              this.setState({ oldEmail: e.target.value })
                            }
                          />
                        </FormGroup>
                        <FormGroup controlId="new-email">
                          <FormLabel className="h6">
                            Alamat Email Baru
                          </FormLabel>
                          <FormControl
                            autoComplete="off"
                            type="text"
                            className="form-field user-profile-data-diri-input"
                            onChange={e => {
                              this.setState({ newEmail: e.target.value });
                            }}
                          />
                        </FormGroup>
                        <FormGroup controlId="password">
                          <FormLabel className="h6">
                            Password Akun Anda
                          </FormLabel>
                          <FormControl
                            autoComplete="off"
                            className="form-field user-profile-data-diri-input"
                            onChange={e =>
                              this.setState({ password: e.target.value })
                            }
                            required
                            type="password"
                          />
                        </FormGroup>
                      </div>

                      <div className="d-flex justify-content-center margin-top-button">
                        <div className="p-2">
                          <Button
                            size="sm"
                            className="primary-button-green modal-btn-size"
                            type="submit"
                          >
                            Simpan
                          </Button>
                        </div>
                        <div className="p-2">
                          <Button
                            size="md"
                            className="modal-btn-color modal-btn-size"
                            onClick={this.redirectDataDiri}
                          >
                            Batal
                          </Button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Mutation>
            </div>
          </Jumbotron>
        </React.Fragment>
      );
    } else if (render === "tambahAlamat") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Tambah Alamat</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mb-5">
                        <h1 className="mt-5 h1-desktop">
                          <p className="underline-alamat pb-1">Alamat</p>
                        </h1>
                        <Row>
                          <Col lg={11}>
                            <AddressForm
                              isDesktop={isDesktop}
                              onBack={this.redirectAlamat}
                              onDismiss={this.redirectTambahAlamat}
                            />
                          </Col>
                        </Row>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack link="/profile/address" title="Alamat" />
                      <div className="pl-0 pr-0 pt-3">
                        <Col lg={11}>
                          <AddressForm
                            isDesktop={isDesktop}
                            onBack={this.redirectAlamat}
                            onDismiss={this.redirectTambahAlamat}
                          />
                        </Col>
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "editAlamat") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Edit Alamat</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mb-5">
                        <h1 className="mt-5 h1-desktop">
                          <p className="pb-1">
                            <u>
                              Edit Alamat -
                              {" " +
                                this.props.history.location.state.address
                                  .name}{" "}
                            </u>{" "}
                          </p>
                        </h1>
                        <Row>
                          <Col lg={11}>
                            <AddressForm
                              onDismiss={this.redirectUbahAlamat}
                              onBack={this.redirectAlamat}
                              onDelete={this.redirectHapusAlamat}
                              isDesktop={isDesktop}
                              address={
                                this.props.history.location.state.address
                              }
                            />
                          </Col>
                        </Row>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack
                        link="/profile/address"
                        title={
                          "Edit Alamat - " +
                          this.props.history.location.state.address.name
                        }
                      />
                      <div className="pl-0 pr-0 pt-3">
                        <Col lg={11}>
                          <AddressForm
                            onDismiss={this.redirectUbahAlamat}
                            onBack={this.redirectAlamat}
                            onDelete={this.redirectHapusAlamat}
                            isDesktop={isDesktop}
                            address={this.props.history.location.state.address}
                          />
                        </Col>
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "myCart") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Belanjaan Saya</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mb-5 mx-0">
                        <h1 className="mt-5 h1-desktop">
                          <p className="underline-belanjaan pb-1">
                            Belanjaan Saya
                          </p>
                        </h1>
                        <Orders
                          match={this.props.match}
                          pageUrl="/profile/my-cart"
                          isDesktop={isDesktop}
                        />

                        <div
                          className="history-div"
                          onClick={this.redirectHistory}
                        >
                          <h5 className="ml-3 ">Lihat Riwayat Belanja </h5>
                        </div>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack link="/profile" title="Belanjaan Saya" />
                      <div className="ml-3 mt-3 mb-2 green ">
                        <span
                          onClick={this.redirectHistory}
                          className="order-card-order-number"
                        >
                          Lihat Riwayat Belanja{" "}
                        </span>
                      </div>
                      <div className="d-flex px-2 justify-content-center">
                        <div className=" mt-2 margin-bottom-favorite-mobile">
                          <Orders
                            match={this.props.match}
                            pageUrl="/profile/my-cart"
                            isDesktop={isDesktop}
                          />
                        </div>
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else if (render === "history") {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Riwayat Belanja</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mb-5 mx-0">
                        <h1 className="mt-5 h1-desktop">
                          <p className="underline-history pb-1">
                            Riwayat Belanja
                          </p>
                        </h1>
                        <Orders
                          match={this.props.match}
                          orderStatus={5}
                          pageUrl="/profile/history"
                          isDesktop={isDesktop}
                        />
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack
                        link="/profile"
                        title="Riwayat Belanja"
                      />
                      <div className="pl-3 pr-3 mt-3 margin-bottom-favorite-mobile">
                        <Orders
                          match={this.props.match}
                          orderStatus={5}
                          pageUrl="/profile/history"
                          isDesktop={isDesktop}
                        />
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    } else {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {isDesktop => {
            return (
              <React.Fragment>
                <Helmet>
                  <title>Kadoqu.com | Favorit</title>
                </Helmet>
                {isDesktop ? (
                  <div className="pl-3 pr-0 jumbo-size ">
                    <Jumbotron className="p-1 bg-color m-0 jumbo-size ">
                      <Container className="pl-5 mb-5 mx-0 my-cart">
                        <h1 className="mt-5 h1-desktop">
                          <p className="underline-favorite pb-1">
                            Favorit Saya
                          </p>
                          <FavoriteList
                            match={this.props.match}
                            isDesktop={isDesktop}
                            pageUrl="/profile/favorite"
                          />
                        </h1>
                      </Container>
                    </Jumbotron>
                  </div>
                ) : (
                  <div className="pr-0 jumbo-size ">
                    <Jumbotron className="p-0 bg-color m-0 jumbo-size ">
                      <this.MobileBack link="/profile" title="Favorit" />
                      <div className="pl-0 pr-0 mt-3 margin-bottom-favorite-mobile">
                        <FavoriteList
                          isDesktop={isDesktop}
                          match={this.props.match}
                          pageUrl="/profile/favorite"
                        />
                      </div>
                    </Jumbotron>
                  </div>
                )}
              </React.Fragment>
            );
          }}
        </MediaQuery>
      );
    }
  }
}

export default withApollo(withRouter(UserprofileContent));
