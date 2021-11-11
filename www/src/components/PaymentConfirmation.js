import React from "react";
import Recaptcha from "react-recaptcha";
import { Query, withApollo } from "react-apollo";
import {
  MUTATION_CONFIRM_PAYMENT,
  MUTATION_UPDATE_ORDER,
  QUERY_GET_ORDER_NUMBERS_BY_USER,
  GET_USERS_ORDERS
} from "../gql/order";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo.js";
import uploadPhoto from "../library/uploadfoto";
import { Alert, Col, Form, Image, Row } from "react-bootstrap";
import { validateNumeric } from "../utils/regexInputConverter";
import Swal from "sweetalert2";
import "./PaymentConfirmation.css";
import { maxDate } from "../utils/dateChecker";
import { numericToCurrency } from "../utils/formatter";
import { CloseLoadingAlert, LoadingAlert } from "./Loader";
import Resizer from "react-image-file-resizer";
import moment from "moment-timezone";
import { withRouter } from "react-router-dom";
import { getUserLogin } from "../utils/userChecker";

class PaymentConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        orderNumber: -1,
        orderId: "",
        accountName: "",
        bank: "",
        nominal: "",
        transferDate: "--", // yyyy-mm-dd
        transferTime: ":",
        receipt: ""
      },
      alert: {
        variant: null,
        message: null
      },
      status: "",
      banks: ["BCA", "BNI", "Mandiri"],
      isHuman: false,
      imagePreview: false,
      orderDetail: [],
      orderWrappingDetail: [],
      userDetail: null
    };
  }

  componentDidMount() {

    let order = {};
    if (this.props.location.pathname === "/payment-confirmation") {
      order = this.props.location.state.order;
    } else {
      order = this.props.order;
    }
    let orderDetail = [];
    let detailProduct = [];
    order.orderProducts.forEach(item => {
      let obj = {};
      obj.productId = item.product.id;
      obj.productName = item.product.name;
      obj.productPrice = item.product.price;
      obj.productImage = item.product.image;
      obj.quantity = item.quantity;
      obj.merchant = item.product.merchant;
      detailProduct.push(obj);
    });
    orderDetail.push(detailProduct);
    orderDetail.push(order.orderWrappings);
    this.setState({
      orderDetail: orderDetail,
      userDetail: getUserLogin()
    });
    this.setFormData({
      orderNumber: order.number,
      nominal: order.total,
      orderId: order.id
    });
  }

  setFormData = (newData, callback) => {
    this.setState(
      { formData: { ...this.state.formData, ...newData } },
      callback
    );
  };

  setAlert = ({ variant, message }, callback) => {
    this.setState(
      {
        alert: {
          variant: variant,
          message: message
        }
      },
      callback
    );
  };

  resetAlert = () => {
    this.setState({
      alert: {
        variant: null,
        message: null
      }
    });
  };

  setDate = (
    {
      d = this.state.formData.transferDate.split("-")[2],
      m = this.state.formData.transferDate.split("-")[1],
      y = this.state.formData.transferDate.split("-")[0]
    },
    callback
  ) => {
    this.setFormData({ transferDate: [y, m, d].join("-") }, callback);
  };

  setTime = (
    {
      h = this.state.formData.transferTime.split(":")[0],
      m = this.state.formData.transferTime.split(":")[1]
    },
    callback
  ) => {
    this.setFormData({ transferTime: [h, m].join(":") }, callback);
  };

  previewFile = () => {
    let preview = {};
    var input = document.querySelector("input[type=file].img-uploader");
    var file = input.files[0];
    let base64 = {};
    let notif = {};
    if (file) {
      if (file.size <= 10000000) {
        if (file.size > 50000) {
          LoadingAlert("Menambahkan foto ...");
        }
        this.setState(
          {
            imagePreview: true
          },
          Resizer.imageFileResizer(
            file,
            1280,
            960,
            "JPEG",
            75,
            0,
            uri => {
              preview = document.querySelector("img.preview");
              preview.src = uri;
              base64 = {
                base64: uri,
                file: file,
                name: file.name,
                size: Math.round(file.size / 1e3) + " kB",
                type: file.type
              };

              this.setFormData({
                receipt: base64
              });
              CloseLoadingAlert();
            },
            "base64"
          )
        );
      } else {
        preview.src = "";
        this.setState({
          imagePreview: false
        });

        this.setFormData({
          receipt: ""
        });
        document.getElementById("img-uploader").value = "";
        notif = {
          status: false,
          message: "Ukuran foto lebih besar dari 10 MB!"
        };
        this.swalNotif(notif);
      }
    } else {
      this.setState({
        imagePreview: false
      });

      this.setFormData({
        receipt: ""
      });
      document.getElementById("img-uploader").value = "";
      notif = {
        status: true,
        message: "Foto berhasil dihapus!"
      };
      this.swalNotif(notif);
    }
  };
  isFormValid = () => {
    const keys = Object.keys(this.state.formData);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      switch (key) {
        case "orderNumber":
          if (this.state.formData[key] === -1) {
            return false;
          }
          break;
        case "receipt":
          if (this.state.formData[key] === "") {
            return false;
          }
          break;
        case "transferDate":
          if (this.state.formData[key] === "--") {
            return false;
          }
          break;
        case "accountName ":
          if (this.state.formData[key] === "") {
            return false;
          }
          break;
        case "bank":
          if (this.state.formData[key] === "") {
            return false;
          }
          break;

        case "transferTime":
          if (this.state.formData[key] === ":") {
            return false;
          }
          break;
        default:
          if (this.state.formData[key] === "") {
            return false;
          }
          break;
      }
    }
    return true;
  };

  swalDesktop = () => {
    Swal.fire(
      {
        icon: "success",
        title: "Konfirmasi Pembayaran Berhasil",
        timer: 2000,
        showCancelButton: false,
        showConfirmButton: false
      },
      setTimeout(() => {
        this.props.back();
      }, 2000)
    );
  };

  swalMobile = () => {
    Swal.fire({
      icon: "success",
      title: "Konfirmasi Pembayaran Berhasil",
      timer: 2000,
      showCancelButton: false,
      showConfirmButton: false
    });
  };

  swalNotif = param => {
    Swal.fire({
      icon: param.status ? "success" : "error",
      title: param.message,
      timer: 1000,
      showCancelButton: false,
      showConfirmButton: false
    });
  };

  render() {
    this.props.client
      .query({
        query: QUERY_GET_ORDER_NUMBERS_BY_USER,
        variables: { orderStatus: 1 }
      })
      .then(({ data }) => {
      });
    return (
      <Query
        query={QUERY_GET_ORDER_NUMBERS_BY_USER}
        variables={{ orderStatus: 1 }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading...</p>;
          }
          if (error) {
            return <p>Oops! {error.message || error}</p>;
          }
          return (
            <React.Fragment>
              <Alert
                show={this.state.alert.message !== null}
                dismissible
                variant={this.state.alert.variant}
                onClose={() => this.resetAlert()}
              >
                {this.state.alert.message}
              </Alert>
              <div className="payment-confirmation-container mx-0">
                <div className="text-center">
                  <div className="payment-confirmation-title">
                    Konfirmasi Pembayaran
                  </div>
                  <div className="font-weight-light thank-you-text">
                    Terima kasih telah berbelanja di kadoqu.com
                    <br/>
                    Untuk memproses pesanan Anda, silakan konfirmasi pembayaran
                    dengan mengisi kolom di bawah ini.
                  </div>
                </div>
                <Form
                  onSubmit={e => {
                    e.preventDefault();
                    let notif = {};
                    if (!this.isFormValid()) {
                      notif = {
                        status: false,
                        message: "Lengkapi Form Terlebih Dahulu!"
                      };
                      this.swalNotif(notif);
                      [
                        "nama",
                        "payment-confirmation-day",
                        "payment-confirmation-month",
                        "payment-confirmation-year",
                        "payment-confirmation-hour",
                        "payment-confirmation-minute",
                        "bank-choice-BCA",
                        "bank-choice-BNI",
                        "bank-choice-Mandiri"
                      ].forEach(field => {
                        if (!e.target[field]) {
                          return;
                        }
                        if (e.target[field].value === "") {
                          e.target[field].classList.add(
                            "payment-confirmation-form-field-error"
                          );
                          e.target[field].classList.remove(
                            "payment-confirmation-form-field"
                          );
                        }
                        if (field.includes("bank-choice")) {
                          document
                            .getElementById("bank")
                            .classList.remove(
                            "payment-confirmation-form-field"
                          );
                          document
                            .getElementById("bank")
                            .classList.add(
                            "payment-confirmation-form-field-error"
                          );
                        }
                      });
                    } else {
                      if (!this.state.isHuman) {
                        notif = {
                          status: false,
                          message: "Isi Captcha Terlebih Dahulu!"
                        };
                        this.swalNotif(notif);
                      } else {
                        const timezone = moment.tz.guess();
                        const timeZoneChecker = moment.tz.zone(timezone);
                        // console.log(timeZoneChecker.name);
                        const offset = timeZoneChecker.parse(new Date());
                        const hourAdd = offset / -60;
                        // console.log(hourAdd);
                        const dateInput = `${this.state.formData.transferDate} ${this.state.formData.transferTime}:00`;
                        const date = moment(
                          dateInput,
                          "YYYY-MM-DD HH:mm:ss"
                        ).tz(timezone);

                        const input = new Date(date.format()).getTime();
                        let orderDate = this.props.order
                          ? this.props.order.orderTracks[0].date
                          : this.props.location.state.order.orderTracks[0].date;
                        // console.log(
                        //   "order date:",
                        //   moment(orderDate, "YYYY-MM-DD HH:mm:ss")
                        //     .add(hourAdd, "hours")
                        //     .tz(timezone)
                        //     .format()
                        // );
                        // console.log(
                        //   "now:",
                        //   moment(new Date())
                        //     .tz(timezone)
                        //     .format()
                        // );
                        orderDate = new Date(
                          moment(orderDate, "YYYY-MM-DD HH:mm:ss")
                            .add(hourAdd, "hours")
                            .tz(timezone)
                            .format()
                        ).getTime();
                        const now = new Date(
                          moment(new Date())
                            .tz(timezone)
                            .format()
                        ).getTime();
                        // console.log(dateInput);
                        // console.log(date.format());
                        // console.log("input:", input);
                        // console.log("orderdate:", orderDate);
                        // console.log("now:", now);
                        if (
                          (input >= orderDate || orderDate - input < 60000) &&
                          input <= now
                        ) {
                          LoadingAlert("Mengupload Bukti Pembayaran..");
                          const { client } = this.props;
                          document.body.style.cursor = "progress";
                          const fileName =
                            ~~(Date.now() / 1000) +
                            "_payment_" +
                            this.state.formData.orderNumber;

                          client
                            .mutate({
                              mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                              variables: { filename: fileName }
                            })
                            .then(hash => {
                              uploadPhoto(
                                hash.data.createUploadToken.hash,
                                this.state.formData.receipt.base64.split(
                                  ","
                                )[1],
                                fileName,
                                hash.data.createUploadToken.timestamp,
                                "payment_receipt"
                              ).then(url => {
                                client
                                  .mutate({
                                    mutation: MUTATION_CONFIRM_PAYMENT,
                                    variables: {
                                      orderNumber: parseInt(
                                        this.state.formData.orderNumber
                                      ),
                                      input: {
                                        accountName: this.state.formData
                                          .accountName,
                                        bank: this.state.formData.bank,
                                        nominal: parseFloat(
                                          this.state.formData.nominal
                                        ),
                                        transferTime:
                                          new Date(
                                            `${this.state.formData.transferDate} ${this.state.formData.transferTime}`
                                          ).getTime() / 1000,
                                        receipt: url
                                      }
                                    }
                                  })
                                  .then(() => {
                                    client
                                      .mutate({
                                        mutation: MUTATION_UPDATE_ORDER,
                                        variables: {
                                          statusId: 2,
                                          id: this.state.formData.orderId,
                                          orderProducts: JSON.stringify(this.state.orderDetail),
                                          userDetail: JSON.stringify(this.state.userDetail)
                                        },
                                        refetchQueries: [
                                          {
                                            query: GET_USERS_ORDERS,
                                            variables: {
                                              orderStatus: this.props
                                                .orderStatus
                                                ? this.props.orderStatus
                                                : null,
                                              limit: this.props.limit
                                                ? this.props.limit
                                                : 5,
                                              offset: this.props.offset
                                                ? this.props.offset
                                                : 0
                                            }
                                          }
                                        ]
                                      })
                                      .then(() => {
                                        CloseLoadingAlert();
                                        document.body.style.cursor = "auto";
                                        this.props.back
                                          ? this.swalDesktop()
                                          : this.swalMobile();
                                        if (!this.props.order) {
                                          setTimeout(() => {
                                            this.props.history.push(
                                              "/profile/my-cart"
                                            );
                                          }, 2000);
                                        }
                                      });
                                  });
                              });
                            })
                            .catch(error => {
                              CloseLoadingAlert();
                              notif = {
                                status: false,
                                message: error.message || error
                              };
                              this.swalNotif(notif);
                            });
                        } else {
                          notif = {
                            status: false,
                            message: "Tanggal & jam transfer tidak valid!"
                          };

                          [
                            "payment-confirmation-day",
                            "payment-confirmation-month",
                            "payment-confirmation-year",
                            "payment-confirmation-hour",
                            "payment-confirmation-minute"
                          ].forEach(field => {
                            if (!e.target[field]) {
                              return;
                            }
                            e.target[field].classList.add(
                              "payment-confirmation-form-field-error"
                            );
                            e.target[field].classList.remove(
                              "payment-confirmation-form-field"
                            );
                          });
                          this.swalNotif(notif);
                        }
                      }
                    }
                  }}
                >
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Nomor order
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className="payment-confirmation-form-field"
                      readOnly
                      defaultValue={JSON.stringify({
                        number: this.state.formData.orderNumber,
                        id: this.state.formData.orderId
                      })}
                    >
                      <option
                        disabled
                        value={JSON.stringify({
                          number: -1,
                          id: ""
                        })}
                      >
                        Silakan pilih nomor order...
                      </option>
                      {data.getUserOrders.orders.map(({ number, id }) => (
                        <option
                          disabled
                          key={number}
                          value={JSON.stringify({ number, id })}
                        >
                          #{number}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Bank pilihan
                    </Form.Label>
                    <Row
                      className="pl-4 kadoqu-radio-button payment-confirmation-form-field"
                      id="bank"
                      noGutters
                    >
                      {this.state.banks.map(bank => (
                        <Form.Check
                          key={bank}
                          name="paymentBank"
                          className="col"
                          type="radio"
                          inline
                          label={bank}
                          value={bank}
                          id={`bank-choice-${bank}`}
                          onChange={e => {
                            document
                              .getElementById("bank")
                              .classList.add("payment-confirmation-form-field");
                            document
                              .getElementById("bank")
                              .classList.remove(
                              "payment-confirmation-form-field-error"
                            );
                            this.setFormData({ bank: e.target.value });
                          }}
                        />
                      ))}
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Rekening atas nama
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="nama"
                      className="payment-confirmation-form-field"
                      value={this.state.formData.accountName}
                      onChange={e => {
                        this.setFormData({ accountName: e.target.value });
                        e.target.classList.add(
                          "payment-confirmation-form-field"
                        );
                        e.target.classList.remove(
                          "payment-confirmation-form-field-error"
                        );
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Nominal transfer
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="payment-confirmation-form-field"
                      readOnly
                      defaultValue={
                        this.state.formData.nominal
                          ? numericToCurrency(this.state.formData.nominal)
                          : ""
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Tanggal & jam transfer
                      <small>(Contoh format : 30/11/2019 13:40)</small>
                    </Form.Label>
                    <Row className="payment-confirmation-date-time-container">
                      <Col xs={7} sm={7} className="d-flex align-items-center ">
                        <Form.Control
                          type="text"
                          maxLength={2}
                          className="payment-confirmation-form-field dd"
                          placeholder="dd"
                          id="payment-confirmation-day"
                          autoComplete="off"
                          value={this.state.formData.transferDate.split("-")[2]}
                          onChange={e => {
                            const date = e.target.value;
                            e.target.classList.add(
                              "payment-confirmation-form-field"
                            );
                            e.target.classList.remove(
                              "payment-confirmation-form-field-error"
                            );
                            if (date.length < 2) {
                              this.setDate({ d: validateNumeric(date) });
                              return;
                            }
                            const month = parseInt(
                              this.state.formData.transferDate.split("-")[1]
                            );
                            const year = parseInt(
                              this.state.formData.transferDate.split("-")[0]
                            );
                            this.setDate(
                              {
                                d:
                                  parseInt(date) > maxDate(month, year)
                                    ? maxDate(month, year)
                                    : parseInt(date) < 1
                                    ? 1
                                    : validateNumeric(date)
                              },
                              () =>
                                document
                                  .getElementById("payment-confirmation-month")
                                  .focus()
                            );
                          }}
                        />
                        /
                        <Form.Control
                          type="text"
                          maxLength={2}
                          autoComplete="off"
                          className="payment-confirmation-form-field mm"
                          id="payment-confirmation-month"
                          placeholder="mm"
                          value={this.state.formData.transferDate.split("-")[1]}
                          onChange={e => {
                            e.target.classList.add(
                              "payment-confirmation-form-field"
                            );
                            e.target.classList.remove(
                              "payment-confirmation-form-field-error"
                            );
                            e.target.value.length < 2
                              ? this.setDate({
                                m: validateNumeric(e.target.value)
                              })
                              : this.setDate(
                              {
                                m:
                                  parseInt(e.target.value) > 12
                                    ? 12
                                    : parseInt(e.target.value) < 1
                                    ? 1
                                    : validateNumeric(e.target.value)
                              },
                              () =>
                                document
                                  .getElementById(
                                    "payment-confirmation-year"
                                  )
                                  .focus()
                              );
                          }}
                        />
                        /
                        <Form.Control
                          type="text"
                          maxLength={4}
                          autoComplete="off"
                          className="payment-confirmation-form-field yyyy"
                          id="payment-confirmation-year"
                          placeholder="yyyy"
                          value={this.state.formData.transferDate.split("-")[0]}
                          onChange={e => {
                            e.target.classList.add(
                              "payment-confirmation-form-field"
                            );
                            e.target.classList.remove(
                              "payment-confirmation-form-field-error"
                            );
                            this.setDate(
                              {
                                y: parseInt(e.target.value) || ""
                              },
                              e.target.value.length === 4
                                ? () =>
                                  document
                                    .getElementById(
                                      "payment-confirmation-hour"
                                    )
                                    .focus()
                                : null
                            );
                          }}
                        />
                      </Col>
                      <Col
                        xs={5}
                        sm={5}
                        className="d-flex align-items-center pl-4"
                      >
                        <Form.Control
                          type="text"
                          maxLength={2}
                          autoComplete="off"
                          className="hh payment-confirmation-form-field"
                          id="payment-confirmation-hour"
                          placeholder="hh"
                          value={this.state.formData.transferTime.split(":")[0]}
                          onChange={e => {
                            e.target.classList.add(
                              "payment-confirmation-form-field"
                            );
                            e.target.classList.remove(
                              "payment-confirmation-form-field-error"
                            );

                            e.target.value.length < 2
                              ? this.setTime({
                                h: validateNumeric(e.target.value)
                              })
                              : this.setTime(
                              {
                                h:
                                  parseInt(e.target.value) > 23
                                    ? 23
                                    : validateNumeric(e.target.value)
                              },
                              () =>
                                document
                                  .getElementById(
                                    "payment-confirmation-minute"
                                  )
                                  .focus()
                              );
                          }}
                        />
                        :
                        <Form.Control
                          type="text"
                          maxLength={2}
                          autoComplete="off"
                          className="hh payment-confirmation-form-field"
                          id="payment-confirmation-minute"
                          placeholder="mm"
                          value={this.state.formData.transferTime.split(":")[1]}
                          onChange={e => {
                            e.target.classList.add(
                              "payment-confirmation-form-field"
                            );
                            e.target.classList.remove(
                              "payment-confirmation-form-field-error"
                            );
                            this.setTime({
                              m:
                                e.target.value.length < 2
                                  ? validateNumeric(e.target.value)
                                  : parseInt(e.target.value) > 59
                                  ? 59
                                  : validateNumeric(e.target.value)
                            });
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="font-weight-bold">
                      Upload bukti transfer{" "}
                      <small>(ukuran maksimal foto 10 MB)</small>
                    </Form.Label>
                    <div>
                      <Form.Control
                        className="img-uploader"
                        id="img-uploader"
                        type="file"
                        onChange={this.previewFile}
                        accept=".jpeg,.jpg,.png"
                      />
                      {this.state.imagePreview ? (
                        <div className="mt-5">
                          <p className="preview-foto-payment">
                            Preview foto{" "}
                            <small className="preview-foto-payment">
                              (Klik / Tap foto untuk menghapus foto)
                            </small>
                          </p>
                          <Image
                            className="preview"
                            src=""
                            height="200"
                            alt="Image preview..."
                            onClick={() => {
                              this.setState({
                                imagePreview: false
                              });

                              this.setFormData({
                                receipt: ""
                              });
                              document.getElementById("img-uploader").value =
                                "";
                              const notif = {
                                status: true,
                                message: "Foto berhasil dihapus!"
                              };
                              this.swalNotif(notif);
                            }}
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </Form.Group>
                  <div className="d-flex justify-content-center mb-4">
                    <Recaptcha
                      sitekey={process.env.REACT_APP_NOT_SITE_KEY}
                      render="explicit"
                      onloadCallback={() => {
                      }}
                      verifyCallback={res => {
                        if (res) {
                          this.setState({
                            isHuman: true
                          });
                        }
                      }}
                    />
                  </div>
                  <Row className="justify-content-center">
                    <Col xs={6}>
                      <button
                        className="w-100 kadoqu-primary-button"
                        type="submit"
                      >
                        Konfirmasi
                      </button>
                    </Col>
                    {this.props.back ? (
                      <Col xs={6}>
                        <button
                          className="kadoqu-grey-button w-100"
                          type="button"
                          onClick={this.props.back}
                        >
                          Kembali
                        </button>
                      </Col>
                    ) : (
                      ""
                    )}
                  </Row>
                </Form>
              </div>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(withRouter(PaymentConfirmation));
