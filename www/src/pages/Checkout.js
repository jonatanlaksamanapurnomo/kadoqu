import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { Mutation, Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import MediaQuery from "react-responsive";
import AddressCard from "../components/AddressCard";
import AddressForm, { GET_USER_ADDRESSES } from "../components/AddressForm";
import BoxVoucher from "../components/BoxVoucher";
import FlashMessage from "../components/FlashMessage";
import {
  GREETING_CARD_PRICE,
  MIN_DESKTOP_SIZE,
  WRAPPING_SERVICE_FEE,
} from "../data/constants";
import IMAGES from "../data/images";
import {
  MUTATION_EMPTY_SELECTED_CART,
  QUERY_GET_SELECTED_CART,
} from "../gql/cart";

import { MUTATION_ADD_PRODUCT_CHECKOUT } from "../gql/tracker";
import {
  MUTATION_ADD_ORDER,
  // MUTATION_ADD_ORDER_PRODUCT,
  MUTATION_ADD_ORDER_TRACK,
  MUTATION_ADD_ORDER_CUSTOME,
  // MUTATION_ADD_ORDER_WRAPPING
} from "../gql/order";
import { InsufficientStockAlert } from "../components/SweetAlerts";
import { QUERY_GET_TOKEN_CART } from "../gql/token";
import Swal from "sweetalert2";
import ReactGA from "react-ga";
import CustomeAccordion from "../components/CustomeAccordion";
import "./Checkout.css";
import { MUTATION_PHOTO_UPLOAD_TOKEN } from "../gql/photo";
import uploadPhoto from "../library/uploadfoto";
import { getUserLoginName } from "../utils/userChecker";
import {
  shortIndonesianDateMonthYearParser,
  dayEnToIn,
} from "../utils/dateTimeFormatter";
import { QUERY_GET_TOKEN } from "../gql/token";
import jwt from "jsonwebtoken";

const GET_COST = gql`
  query GetCost(
    $destination: String
    $weight: Int
    $courier: String
    $length: Float
    $width: Float
    $height: Float
  ) {
    getCost(
      destination: $destination
      weight: $weight
      courier: $courier
      length: $length
      width: $width
      height: $height
    ) {
      code
      name
      costs {
        service
        cost {
          value
          etd
        }
      }
    }
  }
`;

const SAVE_ORDER_DETAIL = gql`
  mutation SaveOrderDetail(
    $id: String
    $no: Int
    $total: Float
    $paymentMethod: String
    $orderStatusId: Int
    $createdAt: String
    $updatedAt: String
  ) {
    saveOrderDetail(
      id: $id
      no: $no
      total: $total
      paymentMethod: $paymentMethod
      orderStatusId: $orderStatus
      createdAt: $createdAt
      updatedAt: $updatedAt
    ) @client
  }
`;

const BANK = IMAGES["Bank Logo"];

const SHIPPING_METHOD = {
  1: "warehouse",
  2: "ojek online",
  3: "courier",
  4: "no_shipping",
};

const OrderWrappingLabItem = (props) => (
  <div className="checkout-order-detail-item kadoqu-primary-color">
    <div className="checkout-order-detail-item-name font-weight-normal">
      {props.name}
    </div>
    <div
      className={
        "checkout-order-detail-item-price text-right font-weight-normal"
      }
    >
      {"Rp " +
        (
          WRAPPING_SERVICE_FEE +
          props.wrapper.price +
          (props.ribbon && props.ribbon.price) +
          (props.greetingCard && GREETING_CARD_PRICE)
        )
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
    </div>
  </div>
);

const OrderDetailItem = (props) => (
  <div className="checkout-order-detail-item">
    <div className="checkout-order-detail-item-product">
      <div className="checkout-order-detail-item-vendor">
        {props.item.merchant} X{props.item.quantity}
      </div>
      <div className={"checkout-order-detail-item-name font-weight-normal"}>
        {props.item.productName}
        {props.item.isCustomeOrder === true &&
          (props.item.isiUcapan !== "" || props.item.customeColor !== "") && (
            <CustomeAccordion
              clickMessage="See Details"
              cartItem={props.item}
            />
          )}
        {props.item.date && (
          <div className="checkout-order-detail-item-note">
            Tanggal : {shortIndonesianDateMonthYearParser(props.item.date.from)}{" "}
            - {shortIndonesianDateMonthYearParser(props.item.date.to)}
          </div>
        )}
        {props.item.day && (
          <div className="checkout-order-detail-item-note">
            Hari : {dayEnToIn(props.item.day)}
          </div>
        )}
      </div>
    </div>
    <div
      className={
        "checkout-order-detail-item-price text-right font-weight-normal"
      }
    >
      {"Rp " +
        (props.item.price * props.item.quantity)
          .toFixed(0)
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
    </div>
  </div>
);

const ShippingDetail = (props) => {
  const BillingAddress = () => {
    if (props.billingAddress) {
      return (
        <AddressCard address={props.billingAddress}>
          <AddressCard.Link onClick={props.chooseBillingAddress}>
            Pilih alamat lain
          </AddressCard.Link>
          <AddressCard.Button
            onClick={props.toggleShipToBillingAddress}
            active={props.isShippingToBillingAddress}
          >
            <Fragment>
              {props.isShippingToBillingAddress ? (
                <div className="shipping-detail-checkbox checked">
                  <i className="fa fa-check" />
                </div>
              ) : (
                <div className="shipping-detail-checkbox" />
              )}
              Kirim ke alamat ini
            </Fragment>
          </AddressCard.Button>
        </AddressCard>
      );
    }
    return (
      <div
        className="checkout-bold-text kadoqu-primary-color cursor-pointer"
        onClick={props.chooseBillingAddress}
      >
        <AddAddressButton className="d-md-none" />
        <span className="d-none d-md-inline">Tambah Alamat</span>
      </div>
    );
  };

  const ShippingAddress = () => {
    if (!props.billingAddress) return "";
    if (props.shippingAddress && !props.isShippingToBillingAddress) {
      return (
        <AddressCard address={props.shippingAddress}>
          <AddressCard.Link onClick={props.chooseShippingAddress}>
            Pilih alamat lain
          </AddressCard.Link>
        </AddressCard>
      );
    }
    if (props.isShippingToBillingAddress) {
      return (
        <div
          className="checkout-bold-text kadoqu-primary-color cursor-pointer shipping-detail-shipping-address-other"
          onClick={props.chooseShippingAddress}
        >
          Kirim ke alamat berbeda
        </div>
      );
    }
    if (!props.shippingAddress) {
      let className = "checkout-bold-text kadoqu-primary-color";
      let onClickAction = null;
      if (props.isShippingAddressRequired) {
        className += " cursor-pointer";
        onClickAction = props.chooseShippingAddress;
      }
      return (
        <div className={className} onClick={onClickAction}>
          <AddAddressButton />
        </div>
      );
    }
    return "";
  };

  return (
    <Row noGutters className="shipping-detail">
      <Col xs={1} className="shipping-detail-icon">
        <i
          className={
            "far fa-user-circle fa-2x kadoqu-primary-color " +
            (props.billingAddress &&
            (props.shippingAddress || !props.isShippingAddressRequired)
              ? ""
              : "grayscale")
          }
        />
      </Col>
      <Col xs={11} className="pl-4">
        <Row>
          <Col xs={12}>
            <span className="shipping-detail-title kadoqu-page-title">
              Shipping Detail
            </span>
            {props.billingAddress &&
            (props.shippingAddress || !props.isShippingAddressRequired) ? (
              ""
            ) : (
              <>
                {!props.isDesktop && <br />}
                <small className={`${props.isDesktop ? "ml-3" : ""} red`}>
                  (Pilih alamat pengiriman terlebih dahulu!)
                </small>
              </>
            )}
          </Col>
          <Col xs={12} md={6} className="my-1">
            <div className="shipping-detail-subtitle">Billing Address</div>
            <BillingAddress />
          </Col>
          <Col
            xs={12}
            md={6}
            className={
              "my-1" +
              (props.billingAddress && props.isShippingAddressRequired
                ? ""
                : " shipping-detail-shipping-address-off")
            }
          >
            <div className="shipping-detail-subtitle">Shipping Address</div>
            <ShippingAddress />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
const ShippingMethods = (props) => {
  const handleShippingMethodChange = (event) => {
    if (props.shippingAddress) {
      if (event.target.value === "warehouse") {
        // if (props.isDigital) {
        //   props.setPageState({
        //     shippingMethod: event.target.value,
        //     shippingPrice: null,
        //     courierType: null,
        //     courierCode: null,
        //     courierService: null
        //   });
        // } else {
        document.getElementById(
          "checkout-shipping-method-warehouse"
        ).checked = false;
        props.setPageState({
          shippingMethod: null,
          shippingPrice: null,
          courierType: null,
          courierCode: null,
          courierService: null,
        });
        Swal.fire({
          icon: "error",
          title: "Pengambilan Barang di Warehouse Kadoqu.com Tidak Tersedia !!",
          text: `Demi menjaga kesehatan pelanggan dan pegawai Kadoqu.com, pengambilan barang di warehouse diberhentikan untuk sementara waktu.`,
          confirmButtonText: "OK",
        });
        // }
        // props.setPageState({
        //   shippingMethod: event.target.value,
        //   shippingPrice: null,
        //   courierType: null,
        //   courierCode: null,
        //   courierService: null
        // });
      } else if (event.target.value === "courier") {
        if (props.isGojekOnly) {
          document.getElementById(
            "checkout-shipping-method-courier"
          ).checked = false;
          props.setPageState({
            shippingMethod: null,
            shippingPrice: null,
            courierType: null,
            courierCode: null,
            courierService: null,
          });
          let gojekOnlyItem = "";
          const items = props.gojekOnlyItem;
          for (let i = 0; i < items.length; i++) {
            if (items.length <= 1) {
              gojekOnlyItem += items[i];
            } else {
              if (i !== items.length - 1) {
                gojekOnlyItem += items[i] + ", ";
              } else {
                gojekOnlyItem += "dan " + items[i];
              }
            }
          }
          Swal.fire({
            icon: "error",
            title: "Metode Pengiriman Tidak Tersedia",
            text: `${gojekOnlyItem} hanya dapat dikirim dengan ojek online..`,
            confirmButtonText: "OK",
          });
        } else {
          props.setPageState({
            shippingMethod: event.target.value,
            shippingPrice: null,
            courierType: null,
            courierCode: null,
            courierService: null,
          });
        }
      } else {
        const city = props.shippingAddress.city;
        if (!props.isCourierOnly) {
          if (city === "Kota Bandung") {
            props.setPageState({
              shippingMethod: "Ojek Online",
              shippingPrice: 35000,
              courierType: "Ojek Online",
              courierCode: "Ojek Online",
              courierService: "Ojek Online",
            });
          } else {
            document.getElementById(
              "checkout-shipping-method-ojek"
            ).checked = false;
            props.setPageState({
              shippingMethod: null,
              shippingPrice: null,
              courierType: null,
              courierCode: null,
              courierService: null,
            });
            Swal.fire({
              icon: "error",
              title: "Metode Pengiriman Tidak Tersedia",
              text: `Pengiriman dengan metode ojek online hanya tersedia untuk Kota Bandung`,
              confirmButtonText: "OK",
            });
          }
        } else {
          document.getElementById(
            "checkout-shipping-method-ojek"
          ).checked = false;
          props.setPageState({
            shippingMethod: null,
            shippingPrice: null,
            courierType: null,
            courierCode: null,
            courierService: null,
          });
          let courierOnlyItem = "";
          const items = props.courierOnlyItem;
          for (let i = 0; i < items.length; i++) {
            if (items.length <= 1) {
              courierOnlyItem += items[i];
            } else {
              if (i !== items.length - 1) {
                courierOnlyItem += items[i] + ", ";
              } else {
                courierOnlyItem += "dan " + items[i];
              }
            }
          }
          Swal.fire({
            icon: "error",
            title: "Metode Pengiriman Tidak Tersedia",
            text: `${courierOnlyItem} hanya dapat dikirim dengan jasa pengiriman..`,
            confirmButtonText: "OK",
          });
        }
      }
    } else {
      document.getElementById(
        "checkout-shipping-method-warehouse"
      ).checked = false;
      document.getElementById("checkout-shipping-method-ojek").checked = false;
      document.getElementById(
        "checkout-shipping-method-courier"
      ).checked = false;
      props.setPageState({
        shippingMethod: null,
        shippingPrice: null,
        courierType: null,
        courierCode: null,
        courierService: null,
      });
      Swal.fire({
        icon: "error",
        title: `Pilih Alamat Terlebih Dahulu`,
        timer: 1000,
        showCancelButton: false,
        showConfirmButton: false,
      });
    }
  };
  const CourierChoice = () => (
    <Form.Group className="mb-0">
      <Form.Control
        as="select"
        id="checkout-courier-selection"
        className="col-10 col-sm-8"
        value={props.courierType || ""}
        onChange={props.chooseCourierType}
      >
        {props.shippingAddress ? (
          <Query
            query={GET_COST}
            variables={{
              destination: props.shippingAddress.subdistrictId,
              weight: Math.max(
                Math.ceil((props.length * props.width * props.height) / 6),
                Math.ceil(props.weight)
              ),
              courier: "jne:jnt",
            }}
          >
            {({ loading, error, data }) => {
              if (loading) return <option value="">Pilih salah satu</option>;
              if (error) {
                return <option value="">Error</option>;
              }
              return (
                <React.Fragment>
                  <option value="">Pilih salah satu</option>
                  {data.getCost.map((courier) =>
                    courier.costs.map((costs) => {
                      // console.log(props.availableCourier);
                      // console.log(courier.code);
                      // console.log(costs)
                      if (
                        props.availableCourier[3] === 0 &&
                        courier.code === "J&T"
                      )
                        return "";
                      if (
                        props.availableCourier[0] === 0 &&
                        (costs.service === "OKE" || costs.service === "CTC")
                      )
                        return "";
                      if (
                        props.availableCourier[1] === 0 &&
                        (costs.service === "REG" || costs.service === "CTCREG")
                      )
                        return "";
                      if (
                        props.availableCourier[2] === 0 &&
                        (costs.service === "YES" || costs.service === "CTCYES")
                      )
                        return "";
                      return (
                        <option
                          key={courier.code.toUpperCase() + " " + costs.service}
                          value={
                            courier.code.toUpperCase() + " " + costs.service
                          }
                          data-cost={costs.cost[0].value}
                          data-code={courier.code}
                          data-service={costs.service}
                          data-etd={costs.cost[0].etd}
                        >
                          {courier.code.toUpperCase()} {costs.service}{" "}
                          {costs.cost[0].etd &&
                            "(" + costs.cost[0].etd + " hari)"}{" "}
                          -{" "}
                          {"Rp " +
                            costs.cost[0].value
                              .toFixed(0)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                        </option>
                      );
                    })
                  )}
                </React.Fragment>
              );
            }}
          </Query>
        ) : (
          <option value="">Pilih alamat pengiriman</option>
        )}
      </Form.Control>
    </Form.Group>
  );
  return (
    <Row noGutters className="shipping-methods">
      <Col xs={1} className="shipping-methods-icon">
        <i
          className={
            "fas fa-truck fa-2x kadoqu-primary-color " +
            (!props.shippingMethod ||
            (props.shippingMethod === SHIPPING_METHOD[3] && !props.courierType)
              ? "grayscale"
              : "")
          }
        />
      </Col>
      <Col xs={11} className="pl-4">
        <Row>
          <Col xs={12}>
            <span className="shipping-methods-title kadoqu-page-title">
              Shipping Methods
            </span>
            {(!props.shippingMethod ||
              (props.shippingMethod === SHIPPING_METHOD[3] &&
                !props.courierType)) && (
              <>
                {!props.isDesktop && <br />}
                <small className={`${props.isDesktop ? "ml-3" : ""} red`}>
                  (Pilih metode pengiriman terlebih dahulu !)
                </small>
              </>
            )}
          </Col>
          <Col xs={12} className="my-1 pt-1">
            <Form.Group className="kadoqu-radio-button mb-0">
              <Form.Check
                //disabled={props.shippingAddress}
                name="shippingMethod"
                label="Ambil di warehouse kadoqu.com"
                type="radio"
                id="checkout-shipping-method-warehouse"
                value={SHIPPING_METHOD[1]}
                onChange={handleShippingMethodChange}
              />
              {/* {handleDisableOjek() ? ( */}
              <Form.Check
                name="shippingMethod"
                label="Kirim via kurir ojek online"
                type="radio"
                id="checkout-shipping-method-ojek"
                value={SHIPPING_METHOD[2]}
                onChange={handleShippingMethodChange}
              />
              {/* ) : (
                <Form.Check
                  name="shippingMethod"
                  label="Kirim via kurir ojek online"
                  type="radio"
                  id="checkout-shipping-method-ojek-disabled"
                  value=""
                  onClick={onClickDisabled}
                />
              )} */}
              <Form.Check
                name="shippingMethod"
                label="Kirim via jasa pengiriman"
                type="radio"
                id="checkout-shipping-method-courier"
                value={SHIPPING_METHOD[3]}
                onChange={handleShippingMethodChange}
              />
            </Form.Group>
            {props.shippingMethod === SHIPPING_METHOD[3] && <CourierChoice />}
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const Sumbangan = (props) => {
  const handleSumbangan = (event) => {
    props.setPageState({
      donation: event.target.checked,
    });
  };

  return (
    <React.Fragment>
      <Row noGutters className="payment-methods">
        <Col xs={1} className="payment-methods-icon">
          <i
            className={
              "fas fa-money-bill-wave fa-2x kadoqu-primary-color" +
              (props.donation ? "" : " grayscale")
            }
          />
        </Col>
        <Col xs={11} className="pl-4">
          <Row>
            <Col xs={12}>
              <span className="payment-methods-title kadoqu-page-title">
                Donation
              </span>
              {!props.isDesktop && <br />}
              <small className={`${props.isDesktop ? "ml-3" : ""} red`}>
                (Donasi ini akan masuk ke dalam program Dapur Kadoqu)
              </small>
            </Col>
            <Col xs={12} className="my-1">
              <Form.Group className="kadoqu-checkbox-button">
                <Form.Check
                  custom
                  className="payment-methods-choice kadoqu-box-shadow my-2 col-12 col-lg-10"
                  type="checkbox"
                  id="checkout-payment-donation"
                >
                  <Form.Check.Input
                    name="donation"
                    type="checkbox"
                    data-label="Sumbangan"
                    onChange={handleSumbangan}
                  />
                  <Form.Check.Label className="d-flex justify-content-between">
                    <span>Rp 5.000</span>
                  </Form.Check.Label>
                </Form.Check>
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const PaymentMethods = (props) => {
  const handlePaymentMethodChange = (event) => {
    props.setPageState({
      paymentMethod: event.target.value,
    });
  };

  return (
    <React.Fragment>
      <Row noGutters className="payment-methods">
        <Col xs={1} className="payment-methods-icon">
          <i
            className={
              "far fa-credit-card fa-2x kadoqu-primary-color" +
              (props.paymentMethod != null ? "" : " grayscale")
            }
          />
        </Col>
        <Col xs={11} className="pl-4">
          <Row>
            <Col xs={12}>
              <span className="payment-methods-title kadoqu-page-title">
                Payment Methods
              </span>
              {props.paymentMethod === null && (
                <>
                  {!props.isDesktop && <br />}
                  <small className={`${props.isDesktop ? "ml-3" : ""} red`}>
                    (Pilih metode pembayaran terlebih dahulu!)
                  </small>
                </>
              )}
            </Col>
            <Col xs={12} className="my-1">
              <Form.Group className="kadoqu-radio-button">
                <Form.Check
                  className="payment-methods-choice kadoqu-box-shadow my-2 col-12 col-lg-10"
                  type="radio"
                  id="checkout-payment-method-bank"
                >
                  <Form.Check.Input
                    name="paymentMethod"
                    type="radio"
                    value={"bank"}
                    data-label="Bank Transfer"
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check.Label className="d-flex justify-content-between">
                    <span>Bank Transfer</span>
                    <span className="text-right">
                      {Object.entries(BANK).map(([bank, src], idx) => {
                        return (
                          <Image
                            className="ml-2"
                            src={src}
                            key={idx}
                            alt={bank}
                          />
                        );
                      })}
                    </span>
                  </Form.Check.Label>
                </Form.Check>
                {/* <Form.Check
                  className="payment-methods-choice kadoqu-box-shadow my-2 col-12 col-lg-10"
                  type="radio"
                  id="checkout-payment-method-gopay"
                >
                  <Form.Check.Input
                    name="paymentMethod"
                    type="radio"
                    value={"gopay"}
                    data-label="Go-Pay"
                    onChange={handlePaymentMethodChange}
                  />
                  <Form.Check.Label>Go-Pay</Form.Check.Label>
                </Form.Check> */}
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
};

const AddAddressButton = (props) => (
  <div
    className={
      "checkout-add-address-button d-flex cursor-pointer " + props.className
    }
    onClick={props.onClick}
  >
    <div className="rounded-circle">
      <span>+</span>
    </div>
    Tambah Alamat
  </div>
);

class ModalAddressChoice extends Component {
  state = {
    selected: null,
    showError: false,
  };

  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={() => {
          this.setState({
            selected: null,
          });
          this.props.onHide();
        }}
        size="lg"
        className="checkout-modal"
        centered
      >
        <Modal.Header>
          <Modal.Title>Pilih Alamat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Query query={GET_USER_ADDRESSES}>
              {({ loading, error, data }) => {
                if (loading) return <Col lg={6}>Loading...</Col>;
                if (error) {
                  console.log(`Error! ${error.message}`);
                  return "";
                }
                if (!data.me.addresses) return "";
                return data.me.addresses.map((address, idx) => {
                  let isCurrent =
                    this.props.currentAddress &&
                    address.id === this.props.currentAddress.id;
                  let isSelected =
                    this.state.selected &&
                    address.id === this.state.selected.id;
                  return (
                    <Col md={6} key={idx}>
                      <AddressCard
                        address={address}
                        onClick={() => {
                          this.setState(
                            {
                              selected: address,
                              showError: false,
                            },
                            () => {
                              if (
                                this.props.currentAddress ||
                                this.state.selected
                              ) {
                                if (this.state.selected) {
                                  if (
                                    this.props.shippingMethod === "Ojek Online"
                                  ) {
                                    document.getElementById(
                                      "checkout-shipping-method-ojek"
                                    ).checked = false;
                                    this.props.setPageState({
                                      shippingMethod: null,
                                      shippingPrice: null,
                                      courierType: null,
                                      courierCode: null,
                                      courierService: null,
                                    });
                                  }
                                  // else {
                                  //   if (
                                  //     this.props.shippingMethod ===
                                  //     "Ojek Online"
                                  //   ) {
                                  //     console.log("ok");
                                  //     this.props.setPageState({
                                  //       shippingMethod: "Ojek Online",
                                  //       shippingPrice: 35000,
                                  //       courierType: "Ojek Online",
                                  //       courierCode: "Ojek Online",
                                  //       courierService: "Ojek Online"
                                  //     });
                                  //   }
                                  // }
                                  this.props.submit(this.state.selected);
                                }
                                this.props.onHide();
                              } else {
                                this.setState({ showError: true });
                              }
                            }
                          );
                        }}
                        className={
                          "checkout-modal-address-card " +
                          (isSelected || (!this.state.selected && isCurrent)
                            ? "checkout-address-card-chosen"
                            : "cursor-pointer")
                        }
                      />
                    </Col>
                  );
                });
              }}
            </Query>
            <Col md={6}>
              <AddAddressButton onClick={this.props.addAddress} />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="flex-column">
          {this.state.showError && (
            <div className="checkout-modal-error">
              Pilih atau tambah alamat untuk melanjutkan
            </div>
          )}
          {/* <Button
            className="kadoqu-primary-button col-6 col-sm-4"
            onClick={() => {
              if (this.props.currentAddress || this.state.selected) {
                if (this.state.selected) {
                  this.props.submit(this.state.selected);
                }
                this.props.onHide();
              } else {
                this.setState({ showError: true });
              }
            }}
          >
            Pilih Alamat
          </Button> */}
        </Modal.Footer>
      </Modal>
    );
  }
}

const ModalAddAddress = (props) => (
  <Modal
    {...props}
    size="lg"
    className="checkout-modal checkout-modal-add-address"
    centered
  >
    <Modal.Header>
      <Modal.Title>Tambah Alamat</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <AddressForm onDismiss={props.onHide} />
    </Modal.Body>
  </Modal>
);

class Checkout extends Component {
  state = {
    loading: true,
    billingAddress: null,
    shippingAddress: null,
    isShippingToBillingAddress: true,
    shippingMethod: null,
    shippingPrice: null,
    finishCheckout:false,
    courierType: null,
    courierCode: null,
    courierService: null,
    paymentMethod: null,
    discountVoucher: 0,
    voucherCode: null,
    voucherId: null,
    checkoutSucceed: null,
    displayModalCheckoutStatus: false,
    displayModalShippingAddress: false,
    displayModalBillingAddress: false,
    displayModalAddAddress: false,
    displayFlashMessage: false,
    errorMessage: null,
    message: "",
    isError: false,
    totalWeight: 1,
    length: 1,
    width: 1,
    height: 1,
    category: "Order",
    action: "Checkout",
    label: "",
    donation: null,
  };

  componentDidMount() {
    ReactGA.initialize("UA-153573254-1");

    this.props.client
      .query({
        query: QUERY_GET_SELECTED_CART,
        fetchPolicy: "network-only",
      })
      .then(({ data }) => {
        if (
          !data.getSelectedCart ||
          ((data.getSelectedCart.items || []).length === 0 &&
            (data.getSelectedCart.packages || []).length === 0)
        ) {
          this.props.history.push("/cart");
        }

        let cart = data.getSelectedCart;
        let totalWeight = 0;
        let totalHeight = 0;
        let length = 0;
        let width = 0;
        let isBunga = false;
        let isDigital = true;
        cart.items.forEach((item) => {
          const { quantity } = item;
          item.categories.forEach((category) => {
            if (category.name.includes("Bunga")) {
              isBunga = true;
            }
          });
          totalHeight += item.height * quantity;
          // width += (item.width + (isBunga ? 10 : 5)) * quantity;
          if (item.width + (isBunga ? 5 : 2) > width) {
            width = item.width + (isBunga ? 5 : 2);
          }
          if (item.length + (isBunga ? 5 : 2) > length) {
            length = item.length + (isBunga ? 5 : 2);
          }
          totalWeight += item.weight * quantity;
          isDigital = isDigital && item.isDigital;
        });
        cart.packages.forEach((paket) => {
          paket.items.forEach((item) => {
            const { quantity } = item;
            item.categories.forEach((category) => {
              if (category.name.includes("Bunga")) {
                isBunga = true;
              }
            });
            totalHeight += item.height * quantity;
            // width += (item.width + (isBunga ? 10 : 5)) * quantity;
            if (item.width + (isBunga ? 5 : 2) > width) {
              width = item.width + (isBunga ? 5 : 2);
            }
            if (item.length + (isBunga ? 5 : 2) > length) {
              length = item.length + (isBunga ? 5 : 2);
            }
            totalWeight += item.weight * quantity;
            isDigital = isDigital && item.isDigital;
          });
        });
        totalHeight += isBunga ? 5 : 2;

        this.setState({
          totalWeight: totalWeight || 1,
          height: totalHeight || 1,
          width: width || 1,
          length: length || 1,
          ...(isDigital && { shippingMethod: SHIPPING_METHOD[4] }),
        });
      });

    this.props.client
      .query({
        query: GET_USER_ADDRESSES,
      })
      .then((res) => {
        let primaryAddress = res.data.me.addresses.find(
          (e) => e.primaryAddress
        );
        if (primaryAddress) {
          this.setState({
            billingAddress: primaryAddress,
            shippingAddress: primaryAddress,
            isShippingToBillingAddress: true,
          });
        }
      });
  }

  changeAddress = (newAddress) => {
    if (this.state.displayModalBillingAddress) {
      if (this.state.isShippingToBillingAddress) {
        this.setState({
          billingAddress: newAddress,
          shippingAddress: newAddress,
          shippingPrice: null,
          courierType: null,
          courierCode: null,
          courierService: null,
        });
      } else {
        this.setState({
          billingAddress: newAddress,
          isShippingToBillingAddress:
            this.state.shippingAddress &&
            newAddress.id === this.state.shippingAddress.id,
        });
      }
    }
    if (this.state.displayModalShippingAddress) {
      this.setState({
        shippingAddress: newAddress,
        shippingPrice: null,
        courierType: null,
        courierCode: null,
        courierService: null,
        isShippingToBillingAddress:
          this.state.billingAddress &&
          newAddress.id === this.state.billingAddress.id,
      });
    }
    return;
  };

  toggleShipToBillingAddress = () => {
    document.getElementById(
      "checkout-shipping-method-warehouse"
    ).checked = false;
    document.getElementById("checkout-shipping-method-ojek").checked = false;
    document.getElementById("checkout-shipping-method-courier").checked = false;
    if (!this.state.isShippingToBillingAddress) {
      this.setState({
        shippingAddress: this.state.billingAddress,
        shippingPrice: null,
        shippingMethod: null,
        courierType: null,
        courierCode: null,
        courierService: null,
        isShippingToBillingAddress: true,
      });
    } else {
      this.setState({
        shippingAddress: null,
        shippingMethod: null,
        shippingPrice: null,
        courierType: null,
        courierCode: null,
        courierService: null,
        isShippingToBillingAddress: false,
      });
    }
    return;
  };

  chooseCourierType = (event) => {
    this.setState({
      courierType: event.target.value,
      courierCode: event.target.options[
        event.target.selectedIndex
      ].getAttribute("data-code"),
      courierService: event.target.options[
        event.target.selectedIndex
      ].getAttribute("data-service"),
      shippingPrice: event.target.options[
        event.target.selectedIndex
      ].getAttribute("data-cost"),
    });
  };

  setPageState = (newState) => {
    this.setState({ ...this.state, ...newState });
  };

  totalDiscount = (cart) => {
    if (!cart) return 0;
    let disc = 0;
    cart.packages &&
      cart.packages.forEach((wrappedItem) => {
        wrappedItem.items.forEach((item) => {
          item.discountPrice &&
            (disc += item.quantity * (item.price - item.discountPrice));
        });
      });
    cart.items &&
      cart.items.forEach((item) => {
        item.discountPrice &&
          (disc += item.quantity * (item.price - item.discountPrice));
      });
    return disc;
  };

  totalPayment = (cart) => {
    if (!cart) return 0;
    let payment = 0;
    cart.packages &&
      cart.packages.forEach((wrappedItem) => {
        payment +=
          WRAPPING_SERVICE_FEE +
          wrappedItem.wrapper.price +
          (wrappedItem.ribbon && wrappedItem.ribbon.price) +
          (wrappedItem.greetingCard && GREETING_CARD_PRICE);
        wrappedItem.items.forEach((item) => {
          payment += item.quantity * item.price;
        });
      });
    cart.items &&
      cart.items.forEach((item) => {
        payment += item.quantity * item.price;
      });
    return payment;
  };

  grandTotalPrice = (cart) => {
    let donation = 0;
    if (this.state.donation) {
      donation = 5000;
    }
    let shippingPrice =
      !this.state.shippingAddress ||
      !this.state.shippingMethod === SHIPPING_METHOD[3] ||
      !this.state.courierType
        ? 0
        : this.state.shippingPrice;
    let total =
      this.totalPayment(cart) -
      this.totalDiscount(cart) -
      this.state.discountVoucher +
      donation +
      parseInt(shippingPrice);
    return total > 0 ? total : 0;
  };

  renderShippingPriceSection = () => {
    if (
      !this.state.shippingAddress ||
      !this.state.shippingMethod === SHIPPING_METHOD[3] ||
      !this.state.courierType
    ) {
      return;
    }
    return (
      <div className="checkout-order-detail-item">
        <div>Biaya kirim</div>
        <div>
          Rp{" "}
          {parseFloat(this.state.shippingPrice)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
        </div>
      </div>
    );
  };

  renderShippingInfoSection = () => {
    if (
      !this.state.shippingAddress &&
      this.state.shippingMethod !== SHIPPING_METHOD[1]
    ) {
      return;
    }
    if (this.state.shippingMethod === SHIPPING_METHOD[1]) {
      return (
        <div className="checkout-bold-text">
          Barang akan diambil di warehouse kadoqu
        </div>
      );
    }
    const address = this.state.shippingAddress;
    return (
      <div>
        <div className="checkout-bold-text">Dikirimkan kepada:</div>
        {address.name} <br />
        {address.street + ", " + address.subdistrict + ","} <br />
        {address.city + ", " + address.province + " " + address.postCode} <br />
        {address.phone} <br />
      </div>
    );
  };

  renderShippingCourierSection = () => {
    if (this.state.courierType) {
      return (
        <div className="checkout-info-container">
          <span className="checkout-bold-text">Dikirimkan menggunakan: </span>
          {this.state.courierType}
        </div>
      );
    }
    return;
  };

  renderPaymentTypeSection = () => {
    if (!this.state.paymentMethod) {
      return;
    }
    let paymentType = document
      .getElementById("checkout-payment-method-" + this.state.paymentMethod)
      .getAttribute("data-label");
    return (
      <div className="checkout-info-container">
        <span className="checkout-bold-text">{"Pembayaran dengan: "}</span>
        {paymentType}
      </div>
    );
  };

  renderCheckoutStatus = () => {
    if (this.state.checkoutSucceed == null) {
      return;
    }
    if (this.state.checkoutSucceed) {
      return (
        <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
          {(isDesktop) =>
            isDesktop ? (
              <div className="checkout-success-status succeed d-none d-md-flex">
                <i className="fas fa-check-circle" />
                Checkout berhasil!
              </div>
            ) : (
              <Modal
                size="sm"
                show={this.state.displayModalCheckoutStatus}
                onHide={() =>
                  this.setState({ displayModalCheckoutStatus: false })
                }
                className="checkout-success-status-modal succeed d-block d-md-none"
                centered
              >
                <Modal.Body>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-check-circle mb-2" />
                    Checkout berhasil!
                  </div>
                </Modal.Body>
              </Modal>
            )
          }
        </MediaQuery>
      );
    }

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {(isDesktop) =>
          isDesktop ? (
            <div className="checkout-success-status failed d-none d-md-flex">
              <i className="fas fa-times-circle" />
              {this.state.errorMessage ||
                "Checkout tidak berhasil! Silakan hubungi CS kami"}
            </div>
          ) : (
            <Modal
              size="sm"
              show={this.state.displayModalCheckoutStatus}
              onHide={() => {
                this.setState({ displayModalCheckoutStatus: false });
              }}
              className="checkout-success-status-modal failed d-block d-md-none"
              centered
            >
              <Modal.Body>
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <i className="fas fa-times-circle mb-2" />
                  {this.state.errorMessage || (
                    <React.Fragment>
                      Checkout tidak berhasil!
                      <small>Silakan hubungi CS kami</small>
                    </React.Fragment>
                  )}
                </div>
              </Modal.Body>
            </Modal>
          )
        }
      </MediaQuery>
    );
  };

  sendEvent = (event) => {
    // event.preventDefault();
    ReactGA.event(this.state);
    this.setState({
      category: "Order",
      action: "Checkout",
      label: "",
    });
  };

  render() {
    const enableCheckout =
      this.state.paymentMethod && // chose payment method
      (this.state.shippingMethod === SHIPPING_METHOD[4] || // no shipping
        (this.state.billingAddress && // filled in billing address
          this.state.shippingMethod)) && // chose shipping method
      (this.state.shippingMethod !== SHIPPING_METHOD[3] ||
        this.state.courierType) && // chose courier type for ship by courier
      (this.state.shippingAddress || // filled in shipping address if item shipped
        [SHIPPING_METHOD[1], SHIPPING_METHOD[4]].includes(
          this.state.shippingMethod
        )) && !this.state.finishCheckout;
    const AddOrder = (props) => (
      <Mutation mutation={MUTATION_ADD_ORDER}>
        {(addOrder, { loading }) => (
          <div>
            <form
              onSubmit={(e) => {
                this.setState({
                  finishCheckout:true
                })
                e.preventDefault();
                this.sendEvent();
                const cartItems = props.cart.items;
                const cartPackages = props.cart.packages;
                const orderWrappings = cartPackages.map((item) => ({
                  wrapperTypeId: item.wrapper.typeId,
                  ...(item.wrapper.wrapperId && {
                    wrapperChoiceId: item.wrapper.wrapperId,
                  }),
                  ...(item.ribbon && {
                    ribbonTypeId: item.ribbon.typeId,
                    ...(item.ribbon.ribbonId && {
                      ribbonChoiceId: item.ribbon.ribbonId,
                    }),
                  }),
                  ...(item.greetingCard && { greetingCard: item.greetingCard }),

                  items: item.items.map((item) => ({
                    productId: item.idProduct,
                    productName: item.productName,
                    productPrice: item.price,
                    productImage: item.image,
                    quantity: item.quantity,
                    ...(item.date && { date: item.date }),
                    ...(item.day && { day: item.day }),
                  })),
                }));
                const orderProducts = cartItems.map((item) => ({
                  productId: item.idProduct,
                  productName: item.productName,
                  productPrice: item.price,
                  productImage: item.image,
                  quantity: item.quantity,
                  ...(item.date && { date: item.date }),
                  ...(item.day && { day: item.day }),
                }));

                let allProductsOrdered = [];
                const duplicatedProducts = orderProducts.concat(
                  [].concat.apply(
                    [],
                    orderWrappings.map(({ items }) => items)
                  )
                );
                duplicatedProducts.forEach((product) => {
                  const foundIndex = allProductsOrdered.findIndex(
                    (item) => item.productId === product.productId
                  );
                  if (foundIndex === -1) {
                    allProductsOrdered.push(Object.assign({}, product));
                    return;
                  }
                  allProductsOrdered[foundIndex].quantity += product.quantity;
                });

                const orderInput = {
                  billingAddress: this.state.billingAddress
                    ? this.state.billingAddress
                    : null,
                  shippingAddress: this.state.shippingAddress
                    ? this.state.shippingAddress
                    : null,
                  shippingMethod: this.state.shippingMethod,
                  courierCode: this.state.courierCode,
                  courierService: this.state.courierService,
                  voucherCode: this.state.voucherCode,
                  paymentMethod: this.state.paymentMethod,
                  orderProducts: allProductsOrdered,
                  totalWrapperPrice: cartPackages.reduce(
                    (sum, cartPackage) =>
                      sum +
                      WRAPPING_SERVICE_FEE +
                      cartPackage.wrapper.price +
                      (cartPackage.ribbon && cartPackage.ribbon.price) +
                      (cartPackage.greetingCard && GREETING_CARD_PRICE),
                    0
                  ),
                  donation: this.state.donation,
                };

                this.setState(
                  { errorMessage: null, checkoutSucceed: null },
                  () =>
                    addOrder({
                      variables: {
                        input: orderInput,
                        orderProducts: orderProducts,
                        orderWrappings: orderWrappings,
                      },
                    })
                      .then((res) => {
                        window.scrollTo(0, 0);
                        let order = res.data.addOrder;
                        let itemPhotos = [];
                        let photoPromises = [];
                        let uploadPhotoPromises = [];
                        cartItems.forEach((item) => {
                          if (item.isCustomeOrder === true) {
                            if (item.photos.image.length > 0) {
                              item.photos.image.forEach((photoBase64, idx) => {
                                const fileName =
                                  ~~(Date.now() / 1000) +
                                  "_custome_photo_" +
                                  getUserLoginName() +
                                  " " +
                                  idx;
                                photoPromises.push(
                                  this.props.client
                                    .mutate({
                                      mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                                      variables: { filename: fileName },
                                    })
                                    .then(({ data }) => {
                                      uploadPhotoPromises.push(
                                        uploadPhoto(
                                          data.createUploadToken.hash,
                                          photoBase64.split(",")[1],
                                          fileName,
                                          data.createUploadToken.timestamp,
                                          "custome_photos"
                                        ).then((url) => {
                                          itemPhotos.push(url);
                                        })
                                      );
                                    })
                                );
                              });
                            }
                            Promise.all(photoPromises).then(() => {
                              Promise.all(uploadPhotoPromises).then(() => {
                                item.photos.image = itemPhotos;
                                let input = null;
                                if (item.magicalMomentData) {
                                  input = item.magicalMomentData;
                                  input.photos = item.photos.image;
                                }
                                this.props.client.mutate({
                                  mutation: MUTATION_ADD_ORDER_CUSTOME,
                                  variables: {
                                    orderId: order.id,
                                    photos: JSON.stringify(item.photos),
                                    isiUcapan: item.isiUcapan,
                                    customerNotes: item.customerNotes,
                                    products: item,
                                    productColor: item.customeColor,
                                    input: item.magicalMomentData,
                                  },
                                });
                              });
                            });
                          }
                        });
                        cartPackages.forEach((pacakage) => {
                          pacakage.items.forEach((item) => {
                            if (item.isCustomeOrder === true) {
                              if (item.photos.image.length > 0) {
                                item.photos.image.forEach(
                                  (photoBase64, idx) => {
                                    const fileName =
                                      ~~(Date.now() / 1000) +
                                      "_custome_photo_" +
                                      getUserLoginName() +
                                      " " +
                                      idx;
                                    photoPromises.push(
                                      this.props.client
                                        .mutate({
                                          mutation: MUTATION_PHOTO_UPLOAD_TOKEN,
                                          variables: { filename: fileName },
                                        })
                                        .then(({ data }) => {
                                          uploadPhotoPromises.push(
                                            uploadPhoto(
                                              data.createUploadToken.hash,
                                              photoBase64.split(",")[1],
                                              fileName,
                                              data.createUploadToken.timestamp,
                                              "custome_photos"
                                            ).then((url) => {
                                              itemPhotos.push(url);
                                            })
                                          );
                                        })
                                    );
                                  }
                                );
                              }
                              Promise.all(photoPromises).then(() => {
                                Promise.all(uploadPhotoPromises).then(() => {
                                  item.photos.image = itemPhotos;
                                  this.props.client.mutate({
                                    mutation: MUTATION_ADD_ORDER_CUSTOME,
                                    variables: {
                                      orderId: order.id,
                                      photos: JSON.stringify(item.photos),
                                      isiUcapan: item.isiUcapan,
                                      customerNotes: item.customerNotes,
                                      products: item,
                                    },
                                  });
                                });
                              });
                            }
                          });
                        });
                        document.body.classList.add("waiting");
                        // const promises = orderProducts
                        //   .map(orderProduct =>
                        //     this.props.client.mutate({
                        //       mutation: MUTATION_ADD_ORDER_PRODUCT,
                        //       variables: {
                        //         orderId: order.id,
                        //         orderProduct: { ...orderProduct }
                        //       }
                        //     })
                        //   )
                        //   .concat(
                        //     orderWrappings.map(orderWrapping => {
                        //       const {
                        //         items,
                        //         ...wrappingDetails
                        //       } = orderWrapping;
                        //       return this.props.client
                        //         .mutate({
                        //           mutation: MUTATION_ADD_ORDER_WRAPPING,
                        //           variables: {
                        //             orderId: order.id,
                        //             orderWrapping: { ...wrappingDetails }
                        //           }
                        //         })
                        //         .then(({ data }) => {
                        //           let wrappingItemPromises = items.map(
                        //             orderProduct =>
                        //               this.props.client.mutate({
                        //                 mutation: MUTATION_ADD_ORDER_PRODUCT,
                        //                 variables: {
                        //                   orderId: order.id,
                        //                   wrappingId: data.addOrderWrapping,
                        //                   orderProduct: orderProduct
                        //                 }
                        //               })
                        //           );
                        //           return Promise.all(wrappingItemPromises);
                        //         });
                        //     }),
                        //     this.state.voucherId &&
                        //       this.props.client.mutate({
                        //         mutation: MUTATION_ADD_VOUCHER_USAGE,
                        //         variables: {
                        //           input: {
                        //             voucherId: this.state.voucherId,
                        //             orderId: order.id
                        //           }
                        //         }
                        //       })
                        //   );
                        // Promise.all(promises).then(() =>
                        this.props.client
                          .mutate({
                            mutation: SAVE_ORDER_DETAIL,
                            variables: {
                              id: order.id,
                              no: order.number,
                              total: order.total,
                              paymentMethod: order.paymentMethod,
                              orderStatusId: order.orderStatusId,
                              createdAt: order.createdAt,
                              updatedAt: order.updatedAt,
                            },
                          })
                          .then((result) => {
                            this.setState({
                              checkoutSucceed: true,
                              displayModalCheckoutStatus: true,
                            });
                            this.props.client.mutate({
                              mutation: MUTATION_ADD_ORDER_TRACK,
                              variables: {
                                orderId: order.id,
                              },
                              refetchQueries: ["getOrderTracks"],
                            });
                            this.props.client
                              .query({
                                query: QUERY_GET_TOKEN,
                              })
                              .then(({ data }) => {
                                let token = jwt.decode(data.getToken);
                                let userId = token
                                  ? token.data
                                  : localStorage.guestId;
                                let trackerPromise = [];
                                trackerPromise.push(
                                  cartItems.forEach((item) => {
                                    const gidaOption=(item.gidaOption?item.gidaOption:null);
                                    const search=(item.search?item.search:null);
                                    this.props.client
                                      .mutate({
                                        mutation: MUTATION_ADD_PRODUCT_CHECKOUT,
                                        variables: {
                                          userId: userId,
                                          productId: item.idProduct,
                                          gidaOption:gidaOption,
                                          orderId: order.id,
                                          search:search,
                                        },
                                      })
                                      .then()
                                      .catch((e) => {
                                        console.log(e);
                                      });
                                  })
                                );
                                trackerPromise.push(
                                  cartPackages.forEach((item) => {
                                    item.items.forEach((res) => {
                                      const gidaOption=(res.gidaOption?res.gidaOption:null);
                                      const search=(res.search?res.search:null);
                                      this.props.client
                                        .mutate({
                                          mutation: MUTATION_ADD_PRODUCT_CHECKOUT,
                                          variables: {
                                            userId: userId,
                                            productId: res.idProduct,
                                            gidaOption: gidaOption
                                              ? gidaOption
                                              : null,
                                            orderId: order.id,
                                            search:search,
                                          },
                                        })
                                        .then()
                                        .catch((e) => {
                                          console.log(e);
                                        });
                                    });
                                  })
                                );

                                Promise.all(trackerPromise);
                              });
                            this.props.client.mutate({
                              mutation: MUTATION_EMPTY_SELECTED_CART,
                              refetchQueries: [
                                { query: QUERY_GET_SELECTED_CART },
                                { query: QUERY_GET_TOKEN_CART },
                              ],
                            });
                            setTimeout(() => {
                              this.props.history.push({
                                pathname: `/thank-you/${order.number}`,
                              });
                              document.body.classList.remove("waiting");
                            }, 1000);

                            return result;
                          });
                        // );
                      })
                      .catch((error) => {
                        window.scrollTo(0, 0);
                        const errorMessage = error.message
                          ? error.message
                              .replace("GraphQL error: ", "")
                              .split("|")[0]
                          : error;
                        const setErrorState = (callback = () => {}) =>
                          this.setState(
                            {
                              checkoutSucceed: false,
                              displayModalCheckoutStatus: true,
                              errorMessage: errorMessage || null,
                            },
                            callback
                          );
                        if (!errorMessage.includes("stok")) {
                          setErrorState();
                          return;
                        }
                        InsufficientStockAlert(() =>
                          setErrorState(() =>
                            setTimeout(() => {
                              this.props.history.push({
                                pathname: "/cart",
                              });
                            }, 1200)
                          )
                        );
                      })
                );
              }}
            >
              <div className="checkout-button-wrapper d-flex justify-content-center mt-4">
                <Button
                  type={enableCheckout ? "submit" : "button"}
                  className="checkout-button kadoqu-primary-button"
                  disabled={!enableCheckout || loading}
                >
                  Proses Checkout
                </Button>
              </div>
            </form>
            {loading && <p>Harap tunggu...</p>}
          </div>
        )}
      </Mutation>
    );
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {(isDesktop) => (
          <React.Fragment>
            <Helmet>
              <title>Kadoqu.com | Checkout</title>
            </Helmet>
            {this.renderCheckoutStatus()}
            <Container fluid className="checkout-container">
              <Row>
                <Col xs={{ span: 11, offset: 1 }} className="pl-2 mb-5">
                  <div className="kadoqu-page-title checkout-title">
                    Checkout
                  </div>
                </Col>
                <Query
                  query={QUERY_GET_SELECTED_CART}
                  fetchPolicy="network-only"
                >
                  {({ loading, data, error }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Oops! {error.message || error}</p>;
                    console.log(data.getSelectedCart)
                    const cartItems = data.getSelectedCart.items || [];
                    const cartPackages = data.getSelectedCart.packages || [];
                    const cart = {
                      items: cartItems,
                      packages: cartPackages,
                      isGojekOnly: false,
                      isCourierOnly: false,
                      gojekOnlyItem: [],
                      courierOnlyItem: [],
                    };
                    // console.log(cartPackages)
                    // console.log(cart);
                    // let gojek = false;
                    // let shipping = false;
                    let availableCourier = [0, 0, 0, 0];
                    let items = cart.items;
                    let packages = [];
                    cartPackages.forEach((items) => {
                      items.items.forEach((item) => {
                        packages.push(item);
                      });
                    });
                    let concatedItems = items.concat(packages);
                    concatedItems.forEach((items) => {
                      let gojek = false;
                      let courier = false;
                      items.shippingSupports.forEach((res) => {
                        if (res.name === "Go-Send") {
                          gojek = true;
                        } else {
                          if (res.name === "JNE OKE") {
                            availableCourier[0] += concatedItems.length;
                          } else if (res.name === "JNE Reguler") {
                            availableCourier[1] += concatedItems.length;
                          } else if (res.name === "JNE YES") {
                            availableCourier[2] += concatedItems.length;
                          } else {
                            availableCourier[3] += concatedItems.length;
                          }
                          courier = true;
                        }
                      });
                      if (gojek && !courier) {
                        if (!cart.isGojekOnly) {
                          cart.isGojekOnly = true;
                        }
                        cart.gojekOnlyItem.push(items.productName);
                      }
                      if (!gojek && courier) {
                        if (!cart.isCourierOnly) {
                          cart.isCourierOnly = true;
                        }
                        cart.courierOnlyItem.push(items.productName);
                      }
                    });
                    for (
                      let index = 0;
                      index < availableCourier.length;
                      index++
                    ) {
                      availableCourier[index] = parseInt(
                        availableCourier[index] / concatedItems.length
                      );
                    }

                    return (
                      <React.Fragment>
                        <Col
                          xs={12}
                          lg={7}
                          xl={8}
                          className="checkout-left-section mb-5"
                        >
                          {this.state.shippingMethod !== SHIPPING_METHOD[4] && (
                            <>
                              <ShippingDetail
                                billingAddress={this.state.billingAddress}
                                shippingAddress={this.state.shippingAddress}
                                isDesktop={isDesktop}
                                chooseBillingAddress={() =>
                                  this.setState({
                                    displayModalBillingAddress: true,
                                  })
                                }
                                chooseShippingAddress={() =>
                                  this.setState({
                                    displayModalShippingAddress: true,
                                  })
                                }
                                isShippingToBillingAddress={
                                  this.state.isShippingToBillingAddress
                                }
                                toggleShipToBillingAddress={
                                  this.toggleShipToBillingAddress
                                }
                                setPageState={this.setPageState}
                                isShippingAddressRequired={
                                  !(
                                    this.state.shippingMethod ===
                                    SHIPPING_METHOD[1]
                                  )
                                }
                              />
                              <hr />
                              <ShippingMethods
                                shippingMethod={this.state.shippingMethod}
                                isGojekOnly={cart.isGojekOnly}
                                isCourierOnly={cart.isCourierOnly}
                                courierOnlyItem={cart.courierOnlyItem}
                                availableCourier={availableCourier}
                                gojekOnlyItem={cart.gojekOnlyItem}
                                courierType={this.state.courierType}
                                shippingAddress={this.state.shippingAddress}
                                setPageState={this.setPageState}
                                chooseCourierType={this.chooseCourierType}
                                weight={this.state.totalWeight}
                                height={this.state.height}
                                width={this.state.width}
                                length={this.state.length}
                                isDesktop={isDesktop}
                              />
                              <hr />
                            </>
                          )}
                          <PaymentMethods
                            paymentMethod={this.state.paymentMethod}
                            setPageState={this.setPageState}
                            isDesktop={isDesktop}
                          />
                          <hr />
                          <Sumbangan
                            setPageState={this.setPageState}
                            donation={this.state.donation}
                            isDesktop={isDesktop}
                          />
                        </Col>
                        <Col
                          xs={12}
                          lg={5}
                          xl={4}
                          className="checkout-right-section mb-5"
                        >
                          <div className="checkout-voucher position-relative">
                            {this.state.displayFlashMessage ? (
                              <FlashMessage
                                className="checkout-voucher-message"
                                isError={this.state.isError}
                                message={this.state.message}
                              />
                            ) : (
                              ""
                            )}
                            <BoxVoucher
                              totalPayment={
                                this.totalPayment(cart) -
                                this.totalDiscount(cart)
                              }
                              success={(voucher) => {
                                this.setState({
                                  discountVoucher: voucher.discount,
                                  message: "Voucher Berhasil Digunakan",
                                  displayFlashMessage: true,
                                  isError: false,
                                  voucherCode: voucher.code,
                                  voucherId: voucher.id,
                                });
                              }}
                              failed={(message) => {
                                this.setState({
                                  discountVoucher: 0,
                                  message: message,
                                  displayFlashMessage: true,
                                  isError: true,
                                  voucherCode: null,
                                  voucherId: null,
                                });
                              }}
                            />
                          </div>
                          <div className="checkout-order-detail-container p-4">
                            <div className="checkout-bold-text text-uppercase lead">
                              Rincian Pesanan
                            </div>
                            {cartItems.length === 0 &&
                              cartPackages.length === 0 &&
                              "Keranjang kosong"}
                            {cartItems.map((item, idx) => (
                              <OrderDetailItem item={item} key={idx} />
                            ))}
                            {cartPackages.map((wrappedItem, idx) => (
                              <React.Fragment key={idx}>
                                <OrderWrappingLabItem
                                  name={`Wrapping Lab ${idx + 1}`}
                                  wrapper={wrappedItem.wrapper}
                                  ribbon={wrappedItem.ribbon}
                                  greetingCard={wrappedItem.greetingCard}
                                />
                                {wrappedItem.items.map((item, idx) => (
                                  <OrderDetailItem item={item} key={idx} />
                                ))}
                              </React.Fragment>
                            ))}
                            {this.totalPayment(cart) -
                              this.totalDiscount(cart) >=
                              150000 && (
                              <div className="checkout-order-detail-item">
                                <div className="checkout-order-detail-item-product">
                                  <div className="checkout-order-detail-item-vendor">
                                    Kadoqu X1
                                  </div>
                                  <div
                                    className={
                                      "checkout-order-detail-item-name font-weight-normal"
                                    }
                                  >
                                    Free Hand Sanitizer
                                  </div>
                                </div>
                                <div
                                  className={
                                    "checkout-order-detail-item-price text-right font-weight-normal"
                                  }
                                >
                                  Rp 0
                                </div>
                              </div>
                            )}
                            <hr />
                            <div className="checkout-order-detail-item">
                              <div>Total barang</div>
                              <div>
                                Rp{" "}
                                {this.totalPayment(cart)
                                  .toFixed(0)
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                              </div>
                            </div>
                            {this.totalDiscount(cart) !== 0 && (
                              <div className="checkout-order-detail-item">
                                <div>Diskon promo</div>
                                <div className="checkout-order-discount-price">
                                  Rp{" "}
                                  {this.totalDiscount(cart)
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              </div>
                            )}
                            {this.state.discountVoucher !== 0 && (
                              <div className="checkout-order-detail-item">
                                <div>Diskon voucher</div>
                                <div className="checkout-order-discount-price">
                                  Rp{" "}
                                  {this.state.discountVoucher
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              </div>
                            )}
                            {this.renderShippingPriceSection()}
                            {this.state.donation && (
                              <div className="checkout-order-detail-item">
                                <div>Donation</div>
                                <div>Rp 5.000</div>
                              </div>
                            )}
                            <hr />
                            <div className="checkout-order-detail-item checkout-bold-text">
                              <div>Grand Total</div>
                              <div>
                                Rp{" "}
                                {this.grandTotalPrice(cart)
                                  .toFixed(0)
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                              </div>
                            </div>
                            {this.state.shippingAddress ||
                            this.state.shippingMethod === SHIPPING_METHOD[1] ||
                            this.state.courierType ||
                            this.state.paymentMethod ? (
                              <hr className="checkout-info-hr" />
                            ) : (
                              ""
                            )}
                            {this.renderShippingInfoSection()}
                            {this.renderShippingCourierSection()}
                            {this.renderPaymentTypeSection()}
                            <AddOrder cart={cart} />
                          </div>
                        </Col>
                      </React.Fragment>
                    );
                  }}
                </Query>
                <ModalAddressChoice
                  show={this.state.displayModalBillingAddress}
                  onHide={() => {
                    this.setState({ displayModalBillingAddress: false });
                  }}
                  submit={this.changeAddress}
                  currentAddress={this.state.billingAddress}
                  shippingMethod={this.state.shippingMethod}
                  setPageState={this.setPageState}
                  addAddress={() => {
                    this.setState({ displayModalAddAddress: true });
                  }}
                />
                <ModalAddressChoice
                  show={this.state.displayModalShippingAddress}
                  onHide={() => {
                    this.setState({ displayModalShippingAddress: false });
                  }}
                  submit={this.changeAddress}
                  currentAddress={this.state.shippingAddress}
                  shippingMethod={this.state.shippingMethod}
                  setPageState={this.setPageState}
                  addAddress={() => {
                    this.setState({ displayModalAddAddress: true });
                  }}
                />
                <ModalAddAddress
                  show={this.state.displayModalAddAddress}
                  onHide={() => {
                    this.setState({ displayModalAddAddress: false });
                  }}
                />
              </Row>
            </Container>
          </React.Fragment>
        )}
      </MediaQuery>
    );
  }
}

export default withApollo(Checkout);
