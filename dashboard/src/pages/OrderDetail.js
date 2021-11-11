/*eslint-disable */
import React from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Accordion,
} from "react-bootstrap";
import PhotosCustomeAccordion from "../components/PhotosCustomeAccordion";
import BootstrapTable from "react-bootstrap-table-next";
import { Mutation, Query, withApollo } from "react-apollo";
import Swal from "sweetalert2";
import "./Home.css";
import { isAdmin } from "../utils/userChecker";
import {
  MUTATION_CANCEL_ORDER_PRODUCT,
  MUTATION_EDIT_ORDER_SHIPPING_FEE,
  MUTATION_UPDATE_ORDER,
  QUERY_GET_ORDER,
  GET_USERS_ORDERS,
} from "../gql/order";
import { getFullDate, getTime } from "../utils/dateTimeFormatter";
import AddressCard from "../components/AddressCard";
import Invoice from "../components/react-pdf/Invoice";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { MUTATION_SEND_EMAIL } from "../gql/mail";
import emailBuilder from "../library/emailBuilder";
import TrackingShipmentModal from "../components/TrackingShipmentModal";
import CustomerDetail from "../components/CustomerDetail";
import { rpFormat } from "../utils/currencyFormatter";
import { indonesianDateParser } from "../utils/dateTimeFormatter";
import MediaQuery from "react-responsive";

const getFullDateIndo = (int) => {
  const date = new Date(int);
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  date.setHours(date.getHours());
  return (
    ("0" + date.getDate()).substr(-2, 2) +
    " " +
    bulan[date.getMonth()] +
    " " +
    date.getFullYear() +
    " " +
    ("0" + date.getHours()).substr(-2, 2) +
    "." +
    ("0" + date.getMinutes()).substr(-2, 2)
  );
};

const moneyFormat = (value) =>
  !value || isNaN(value)
    ? 0
    : value.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

const DetailItem = (props) => (
  <Row>
    <Col xs={props.fieldNameSize || 8}>{props.fieldName}</Col>
    <Col className="font-weight-bold">{props.value}</Col>
  </Row>
);

const ProductTable = ({ data, createdAt }) => (
  <BootstrapTable
    keyField="id"
    data={data}
    wrapperClasses="table-responsive"
    classes="bg-white"
    columns={[
      {
        dataField: "id",
        hidden: true,
      },
      {
        dataField: "product.name",
        text: "Product",
        formatter: (cell) => <strong>{cell}</strong>,
      },
      {
        dataField: "product.sku",
        text: "SKU",
      },
      {
        dataField: "product.merchantPrice",
        text: "Merchant Price",
        formatter: (cell) => rpFormat(cell),
      },
      {
        dataField: "product",
        text: "Kadoqu Buying Price",
        formatter: (cell) => {
          return cell.capitalPrice
            ? rpFormat(cell.capitalPrice)
            : rpFormat(cell.merchantPrice * 0.9);
        },
      },
      {
        dataField: "product.price",
        text: "Kadoqu Selling Price",
        formatter: (cell) => rpFormat(cell),
        hidden: !isAdmin(),
      },
      {
        dataField: "product",
        text: "Digital Marketing",
        formatter: (cell) => {
          let kadoquDiscount = 0;
          if (
            cell.kadoquDiscountUntil &&
            new Date(cell.kadoquDiscountUntil) > new Date(createdAt)
          ) {
            kadoquDiscount = cell.price - cell.kadoquDiscount;
          }

          return rpFormat(kadoquDiscount);
        },
        hidden: !isAdmin(),
      },
      {
        dataField: "product",
        text: "Merchant Discount Price",
        formatter: (cell) => {
          let merchantDiscount = 0;
          if (
            cell.merchantDiscountUntil &&
            new Date(cell.merchantDiscountUntil) > new Date(createdAt)
          ) {
            merchantDiscount = cell.merchantDiscount;
          }

          return rpFormat(merchantDiscount);
        },
      },
      {
        dataField: "",
        text: "Subtotal",
        isDummyField: true,
        formatter: (cell, row) =>
          rpFormat(
            (row.product.kadoquDiscountUntil &&
              new Date(row.product.kadoquDiscountUntil) > new Date(createdAt) &&
              row.product.kadoquDiscount) ||
              (row.product.merchantDiscountUntil &&
                new Date(row.product.merchantDiscountUntil) >
                  new Date(createdAt) &&
                row.product.merchantDiscount) ||
              row.product.price
          ),
      },
      {
        dataField: "quantity",
        text: "Qty",
      },
      {
        dataField: "",
        text: "Total",
        isDummyField: true,
        formatter: (cell, row) =>
          rpFormat(
            ((row.product.kadoquDiscountUntil &&
              new Date(row.product.kadoquDiscountUntil) > new Date(createdAt) &&
              row.product.kadoquDiscount) ||
              (row.product.merchantDiscountUntil &&
                new Date(row.product.merchantDiscountUntil) >
                  new Date(createdAt) &&
                row.product.merchantDiscount) ||
              row.product.price) * row.quantity
          ),
      },
      {
        dataField: "orderHoliday.dateFrom",
        text: "Date From",
        formatter: (cell) => (cell ? indonesianDateParser(cell) : "-"),
      },
    ]}
  />
);

class OrderDetail extends React.Component {
  state = {
    alert: {
      message: "",
      variant: undefined,
    },
    finish: false,
    swalStatus: false,
    ongkir: "",
    order: {},
    show: false,
    pdf: false,
  };

  componentDidMount() {
    this.props.client
      .query({
        query: QUERY_GET_ORDER,
        variables: {
          id: this.props.match.params.id,
        },
      })
      .then((res) => {
        this.setState({
          order: res.data.getOrder,
        });
      });
  }

  componentWillReceiveProps() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    const img = this.refs.image;
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      ctx.font = "40px Courier";
      ctx.fillText(this.props.text, 210, 75);
    };
  }

  setAlert = ({ message, variant }) => {
    this.setState(
      {
        alert: {
          message: message,
          variant: variant,
        },
      },
      () => window.scrollTo(0, 0)
    );
  };
  resetAlert = () => {
    this.setState({
      alert: {
        message: "",
        variant: undefined,
      },
      isShow: false,
    });
  };

  render() {
    const orderId = this.props.match.params.id;
    const query = {
      query: QUERY_GET_ORDER,
      variables: {
        id: orderId,
      },
    };

    const refetchQueries = [
      {
        query: QUERY_GET_ORDER,
        variables: {
          id: orderId,
        },
      },
      {
        query: GET_USERS_ORDERS,
        variables: {
          orderStatus: null,
          limit: 5,
          offset: 0,
        },
      },
    ];

    return (
      <MediaQuery minWidth={992}>
        {(isDesktop) => {
          return (
            <Query {...query}>
              {({ loading, error, data }) => {
                if (loading) {
                  return <p>Loading ...</p>;
                }
                if (error) {
                  return <p>{error.message || error}</p>;
                }

                if (!error && !loading) {
                  const orderDetail = data.getOrder;
                  let userDetail = {};
                  userDetail.name = orderDetail.user.firstName;
                  userDetail.email = orderDetail.user.email;
                  userDetail.phone = orderDetail.user.phone;
                  let products = [];
                  orderDetail.orderProducts.forEach((element) => {
                    let test = {
                      quantity: element.quantity,
                      product: {
                        sku: element.product.sku,
                        price: moneyFormat(element.product.price),
                        capitalPrice: moneyFormat(element.product.capitalPrice),
                        merchantPrice: moneyFormat(
                          element.product.merchantPrice
                        ),
                        merchantDiscount: moneyFormat(
                          element.product.merchantDiscountUntil &&
                            new Date(element.product.merchantDiscountUntil) >
                              new Date(orderDetail.createdAt)
                            ? element.product.merchantDiscount
                            : 0
                        ),
                        kadoquDiscount: moneyFormat(
                          element.product.kadoquDiscountUntil &&
                            new Date(element.product.kadoquDiscountUntil) >
                              new Date(orderDetail.createdAt)
                            ? element.product.price -
                                element.product.kadoquDiscount
                            : 0
                        ),
                        merchantDiscountUntil:
                          element.product.merchantDiscountUntil,
                        kadoquDiscountUntil:
                          element.product.kadoquDiscountUntil,
                        name: element.product.name,
                        priceForCust: moneyFormat(
                          (element.product.kadoquDiscountUntil &&
                            new Date(element.product.kadoquDiscountUntil) >
                              new Date(orderDetail.createdAt) &&
                            element.product.kadoquDiscount) ||
                            (element.product.merchantDiscountUntil &&
                              new Date(element.product.merchantDiscountUntil) >
                                new Date(orderDetail.createdAt) &&
                              element.product.merchantDiscount) ||
                            element.product.price
                        ),
                        subtotal: moneyFormat(
                          ((element.product.kadoquDiscountUntil &&
                            new Date(element.product.kadoquDiscountUntil) >
                              new Date(orderDetail.createdAt) &&
                            element.product.kadoquDiscount) ||
                            (element.product.merchantDiscountUntil &&
                              new Date(element.product.merchantDiscountUntil) >
                                new Date(orderDetail.createdAt) &&
                              element.product.merchantDiscount) ||
                            element.product.price) * element.quantity
                        ),
                      },
                    };
                    products.push(test);
                  });
                  let wrappingFee = 0;
                  let wrappingLab = [];
                  orderDetail.orderWrappings.forEach((item, index) => {
                    wrappingFee +=
                      (item.greetingCard ? 5000 : 0) +
                      item.wrapper.price +
                      (item.ribbon ? item.ribbon.price : 0);
                    let wrappingItem = {
                      products: [],
                      wrappingData: {
                        id: `Wrapping Lab #${index + 1}`,
                        wrapper: item.wrapper,
                        ribbon: item.ribbon,
                        greetingCard: item.greetingCard,
                        fee: moneyFormat(
                          (item.greetingCard ? 5000 : 0) +
                            item.wrapper.price +
                            (item.ribbon ? item.ribbon.price : 0)
                        ),
                      },
                    };
                    item.items.forEach((element) => {
                      let test = {
                        quantity: element.quantity,
                        product: {
                          sku: element.product.sku,
                          price: moneyFormat(element.product.price),
                          capitalPrice: moneyFormat(
                            element.product.capitalPrice
                              ? element.product.capitalPrice
                              : element.product.merchantPrice * 0.9
                          ),
                          merchantPrice: moneyFormat(
                            element.product.merchantPrice
                          ),
                          merchantDiscount: moneyFormat(
                            element.product.merchantDiscountUntil &&
                              new Date(element.product.merchantDiscountUntil) >
                                new Date(orderDetail.createdAt)
                              ? element.product.merchantDiscount
                              : 0
                          ),
                          kadoquDiscount: moneyFormat(
                            element.product.kadoquDiscountUntil &&
                              new Date(element.product.kadoquDiscountUntil) >
                                new Date(orderDetail.createdAt)
                              ? element.product.price -
                                  element.product.kadoquDiscount
                              : 0
                          ),
                          name: element.product.name,
                          priceForCust: moneyFormat(
                            (element.product.kadoquDiscountUntil &&
                              new Date(element.product.kadoquDiscountUntil) >
                                new Date(orderDetail.createdAt) &&
                              element.product.kadoquDiscount) ||
                              (element.product.merchantDiscountUntil &&
                                new Date(
                                  element.product.merchantDiscountUntil
                                ) > new Date(orderDetail.createdAt) &&
                                element.product.merchantDiscount) ||
                              element.product.price
                          ),
                          subtotal: moneyFormat(
                            ((element.product.kadoquDiscountUntil &&
                              new Date(element.product.kadoquDiscountUntil) >
                                new Date(orderDetail.createdAt) &&
                              element.product.kadoquDiscount) ||
                              (element.product.merchantDiscountUntil &&
                                new Date(
                                  element.product.merchantDiscountUntil
                                ) > new Date(orderDetail.createdAt) &&
                                element.product.merchantDiscount) ||
                              element.product.price) * element.quantity
                          ),
                        },
                      };
                      wrappingItem.products.push(test);
                      products.push(test);
                    });
                    wrappingLab.push(wrappingItem);
                  });
                  let view = {
                    number: orderDetail.number,
                    createdAt:
                      getFullDate(orderDetail.createdAt) +
                      " " +
                      getTime(orderDetail.createdAt),
                    billingAddress: orderDetail.billingAddress,
                    paymentConfirmationData: {
                      status: orderDetail.paymentConfirmationData
                        ? true
                        : false,
                      accountName: orderDetail.paymentConfirmationData
                        ? orderDetail.paymentConfirmationData.accountName
                        : "",
                      bank: orderDetail.paymentConfirmationData
                        ? orderDetail.paymentConfirmationData.bank
                        : "",
                      nominal: orderDetail.paymentConfirmationData
                        ? orderDetail.paymentConfirmationData.nominal
                        : "",
                      transferTime: orderDetail.paymentConfirmationData
                        ? getFullDateIndo(orderDetail.orderTracks[1].createdAt)
                        : "",
                    },
                    paymentMethod: orderDetail.paymentConfirmationData
                      ? orderDetail.paymentMethod
                      : "-",
                    products: products,
                    wrappingLab: wrappingLab,
                    productTotal: moneyFormat(
                      orderDetail.productTotal - wrappingFee
                    ),
                    shippingFee: moneyFormat(orderDetail.shippingFee),
                    total: moneyFormat(orderDetail.total),
                    wrappingFee: moneyFormat(wrappingFee),
                    productDiscount: moneyFormat(
                      orderDetail.productDiscount
                        ? orderDetail.productDiscount
                        : 0
                    ),
                    voucherDiscount: moneyFormat(
                      orderDetail.voucherDiscount
                        ? orderDetail.voucherDiscount
                        : 0
                    ),
                    shippingMethod:
                      orderDetail.shippingMethod === "courier"
                        ? orderDetail.courierCode +
                          " " +
                          orderDetail.courierService
                        : orderDetail.shippingMethod === "warehouse"
                        ? "Ambil di Warehouse"
                        : orderDetail.shippingMethod === "no_shipping"
                        ? "No Shipping"
                        : "Ojek Online",
                    shippingAddress: {
                      name: orderDetail.shippingAddress
                        ? orderDetail.shippingAddress.name
                        : "",
                      street: orderDetail.shippingAddress
                        ? orderDetail.shippingAddress.street
                        : "",
                      country: orderDetail.shippingAddress
                        ? `${`${orderDetail.shippingAddress.subdistrict}, ${orderDetail.billingAddress.city}, ${orderDetail.billingAddress.province}`}`
                        : "",
                      postCode: orderDetail.shippingAddress
                        ? orderDetail.shippingAddress.postCode
                        : "",
                      phone: orderDetail.shippingAddress
                        ? orderDetail.shippingAddress.phone
                        : "",
                    },
                    donation: moneyFormat(orderDetail.donation),
                  };
                  return (
                    <div className="mb-3" key={"custom-1"}>
                      <Alert
                        show={this.state.alert.message !== ""}
                        variant={this.state.alert.variant}
                        onClose={this.resetAlert}
                        dismissible
                      >
                        {this.state.alert.message}
                      </Alert>

                      {isDesktop ? (
                        <div
                          key={"custom-2"}
                          className="d-flex justify-content-between border-bottom pt-2 pb-2"
                        >
                          <h4 className="d-flex align-items-center m-0">
                            <i
                              className="icon-arrow-left-circle mr-3 cursor-pointer"
                              onClick={() => this.props.history.goBack()}
                            />
                            <span>
                              Order <strong># {orderDetail.number}</strong>
                            </span>
                          </h4>
                          <div className="d-flex align-items-center">
                            ordered by{" "}
                            {`${[
                              orderDetail.user.firstName || "",
                              orderDetail.user.lastName || "",
                            ].join(" ")} (${orderDetail.user.email})`}{" "}
                            |{" "}
                            {getFullDate(orderDetail.createdAt) +
                              " " +
                              getTime(orderDetail.createdAt)}
                          </div>
                        </div>
                      ) : (
                        <div key={"custom-3"}>
                          <h4 className="d-flex align-items-center m-0">
                            <i
                              className="icon-arrow-left-circle mr-3 cursor-pointer"
                              onClick={() => this.props.history.goBack()}
                            />
                            <span>
                              Order <strong># {orderDetail.number}</strong>
                            </span>
                          </h4>
                          <br />
                          <div className="d-flex align-items-center">
                            ordered by{" "}
                            {`${[
                              orderDetail.user.firstName || "",
                              orderDetail.user.lastName || "",
                            ].join(" ")} (${orderDetail.user.email})`}{" "}
                            |{" "}
                            {getFullDate(orderDetail.createdAt) +
                              " " +
                              getTime(orderDetail.createdAt)}
                          </div>
                        </div>
                      )}

                      <Mutation mutation={MUTATION_UPDATE_ORDER}>
                        {(updateOrder) => {
                          let detailProduct = [];
                          orderDetail.orderProducts.forEach((item) => {
                            let obj = {};
                            obj.productId = item.product.id;
                            obj.productName = item.product.name;
                            obj.productPrice = item.product.price;
                            obj.productImage = item.product.image;
                            obj.quantity = item.quantity;
                            obj.merchant = item.product.merchant;
                            detailProduct.push(obj);
                          });
                          const updateOrderStatus = (newStatusId) => {
                            updateOrder({
                              variables: {
                                id: orderId,
                                statusId:
                                  newStatusId || orderDetail.orderStatusId++,
                                orderProducts: JSON.stringify(detailProduct),
                                userDetail: JSON.stringify(userDetail),
                              },
                              refetchQueries: refetchQueries,
                            })
                              .then(({ data }) =>
                                this.setAlert({
                                  variant: "success",
                                  message: `Success! Order status is now ${data.updateOrder.orderStatus.status}`,
                                })
                              )
                              .catch((error) =>
                                this.setAlert({
                                  variant: "danger",
                                  message: `Oops! ${error.message || error}`,
                                })
                              );
                          };
                          const addResi = (resi, newStatusId) => {
                            updateOrder({
                              variables: {
                                id: orderId,
                                statusId:
                                  newStatusId || orderDetail.orderStatusId++,
                                orderProducts: JSON.stringify(detailProduct),
                                userDetail: JSON.stringify(userDetail),
                                resi: resi,
                              },
                              refetchQueries: refetchQueries,
                            })
                              .then(({ data }) =>
                                this.setAlert({
                                  variant: "success",
                                  message: `Success! Resi is set as ${data.updateOrder.resi}`,
                                })
                              )
                              .catch((error) =>
                                this.setAlert({
                                  variant: "danger",
                                  message: `Oops! ${error.message || error}`,
                                })
                              );
                          };
                          return (
                            <React.Fragment>
                              <div
                                key={"custom-5"}
                                className="d-flex justify-content-between mt-1 mb-1"
                              >
                                <div className="d-flex align-items-center w-50">
                                  <p className="lead">
                                    {orderDetail.orderStatus.id > 1 &&
                                    orderDetail.orderStatus.id < 6 &&
                                    orderDetail.total -
                                      (orderDetail.shippingFee || 0) >=
                                      150000 &&
                                    new Date(orderDetail.createdAt) >=
                                      new Date("2020/03/23") ? (
                                      <p style={{ color: "#00998D" }}>
                                        Order Ini Mendapatkan Hand Sanitizer
                                      </p>
                                    ) : (
                                      ""
                                    )}
                                    <p>
                                      Status: {orderDetail.orderStatus.status}
                                    </p>
                                  </p>
                                </div>
                                <div className="text-right w-50">
                                  {orderDetail.shippingMethod ===
                                    "ojek online" &&
                                    orderDetail.orderStatus.id <= 2 && (
                                      <Button
                                        variant="warning"
                                        className="mr-1"
                                        onClick={() => {
                                          this.setState({
                                            isResendEmailModalShow: true,
                                          });
                                        }}
                                      >
                                        Notify Postal Fee
                                      </Button>
                                    )}

                                  {/* Only appear when user already sent the payment confirmation (from order status "payment_review" to "processing") */}
                                  {orderDetail.orderStatus.id === 2 &&
                                    isAdmin() && (
                                      <Button
                                        variant="primary"
                                        onClick={() => updateOrderStatus(3)}
                                      >
                                        Proceed
                                      </Button>
                                    )}

                                  {/* Display modal upon clicking to receive resi from admin */}
                                  {orderDetail.orderStatus.id === 3 &&
                                    isAdmin() && (
                                      <Button
                                        variant="primary"
                                        onClick={() =>
                                          ["warehouse", "no_shipping"].includes(
                                            orderDetail.shippingMethod.toLowerCase()
                                          )
                                            ? updateOrderStatus(4)
                                            : Swal.fire({
                                                title: "Input shipping resi",
                                                input: "text",
                                                showCancelButton: true,
                                                inputValidator: (value) => {
                                                  if (!value) {
                                                    return "You have to input the resi first!";
                                                  }
                                                },
                                              }).then((res) => {
                                                addResi(res.value, 4);
                                                localStorage.setItem(
                                                  "resi",
                                                  res.value
                                                );
                                              })
                                        }
                                      >
                                        Ship
                                      </Button>
                                    )}

                                  {orderDetail.orderStatus.id === 4 &&
                                    isAdmin() && (
                                      <Button
                                        variant="success"
                                        onClick={() => updateOrderStatus(5)}
                                      >
                                        Complete
                                      </Button>
                                    )}

                                  {orderDetail.orderStatus.id !== 6 && (
                                    <>
                                      <div className="mt-2">
                                        <Button
                                          variant="success"
                                          onClick={() => {
                                            console.log("wtf");
                                            this.setState({
                                              pdf: true,
                                            });
                                          }}
                                        >
                                          Generate PDF
                                        </Button>

                                        {this.state.pdf && (
                                          <>
                                            <PDFDownloadLink
                                              document={
                                                <Invoice
                                                  view={view}
                                                  type="admin"
                                                />
                                              }
                                              fileName={`Admin's-Invoice-Order-#${view.number}.pdf`}
                                            >
                                              {({
                                                blob,
                                                url,
                                                loading,
                                                error,
                                              }) =>
                                                loading ? (
                                                  "Loading document..."
                                                ) : (
                                                  <Button
                                                    variant="success"
                                                    className="ml-2"
                                                  >
                                                    Download Admin's Invoice
                                                  </Button>
                                                )
                                              }
                                            </PDFDownloadLink>
                                            <PDFDownloadLink
                                              document={
                                                <Invoice
                                                  view={view}
                                                  type="customer"
                                                />
                                              }
                                              fileName={`Customer's-Invoice-Order-#${view.number}.pdf`}
                                            >
                                              {({
                                                blob,
                                                url,
                                                loading,
                                                error,
                                              }) =>
                                                loading ? (
                                                  "Loading document..."
                                                ) : (
                                                  <Button
                                                    variant="success"
                                                    className="ml-2"
                                                  >
                                                    Download Customer's Invoice
                                                  </Button>
                                                )
                                              }
                                            </PDFDownloadLink>
                                          </>
                                        )}
                                      </div>
                                      <div className="mt-2">
                                        {isAdmin() && (
                                          <Button
                                            variant="outline-danger"
                                            className="ml-1"
                                            onClick={() => {
                                              const promises = orderDetail.orderProducts.map(
                                                (orderProduct) =>
                                                  this.props.client.mutate({
                                                    mutation: MUTATION_CANCEL_ORDER_PRODUCT,
                                                    variables: {
                                                      productId:
                                                        orderProduct.product.id,
                                                      quantity:
                                                        orderProduct.quantity,
                                                    },
                                                    refetchQueries: refetchQueries,
                                                  })
                                              );
                                              Promise.all(promises).then(() =>
                                                updateOrderStatus(6)
                                              );
                                            }}
                                          >
                                            Cancel
                                          </Button>
                                        )}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>

                              <Container fluid={true}>
                                {isAdmin() && (
                                  <Row>
                                    <Col>
                                      <CustomerDetail
                                        title="Ordered By"
                                        orderDetail={orderDetail}
                                      />
                                    </Col>
                                    {orderDetail.shippingMethod !==
                                      "warehouse" &&
                                      orderDetail.shippingMethod !==
                                        "no_shipping" && (
                                        <>
                                          <Col>
                                            <AddressCard
                                              title="Billing"
                                              address={
                                                orderDetail.billingAddress
                                              }
                                            />
                                          </Col>
                                          <Col>
                                            <AddressCard
                                              as={Col}
                                              title="Shipping"
                                              address={
                                                orderDetail.shippingAddress
                                              }
                                            />
                                          </Col>
                                        </>
                                      )}
                                  </Row>
                                )}
                                {isAdmin() && (
                                  <Row>
                                    <Col xs={12}>
                                      <Card>
                                        <Card.Header>
                                          Payment Details
                                        </Card.Header>
                                        <Card.Body>
                                          <DetailItem
                                            fieldName="Payment method"
                                            value={orderDetail.paymentMethod}
                                          />
                                          <DetailItem
                                            fieldName="Grand total"
                                            value={rpFormat(orderDetail.total)}
                                          />

                                          {!orderDetail.paymentConfirmationData ? (
                                            <DetailItem
                                              fieldName="Payment status"
                                              value="Waiting for user confirmation"
                                            />
                                          ) : (
                                            <React.Fragment>
                                              <DetailItem
                                                fieldName="Payment status"
                                                value="PAID"
                                              />
                                              <DetailItem
                                                fieldName="Details"
                                                value={
                                                  <span className="font-weight-normal">
                                                    <strong>
                                                      {rpFormat(
                                                        parseInt(
                                                          orderDetail
                                                            .paymentConfirmationData
                                                            .nominal
                                                        )
                                                      )}
                                                    </strong>{" "}
                                                    was paid via{" "}
                                                    <strong>
                                                      {
                                                        orderDetail
                                                          .paymentConfirmationData
                                                          .bank
                                                      }
                                                    </strong>{" "}
                                                    by{" "}
                                                    <strong>
                                                      {
                                                        orderDetail
                                                          .paymentConfirmationData
                                                          .accountName
                                                      }
                                                    </strong>{" "}
                                                    on{" "}
                                                    <strong>
                                                      {new Date(
                                                        new Date(
                                                          orderDetail.orderTracks[1].createdAt
                                                        ).getTime()
                                                      ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                          year: "numeric",
                                                          month: "long",
                                                          day: "numeric",
                                                          hour: "numeric",
                                                          minute: "numeric",
                                                        }
                                                      )}
                                                    </strong>
                                                  </span>
                                                }
                                              />
                                              <Button
                                                className="mt-2"
                                                onClick={() =>
                                                  Swal.fire({
                                                    customClass:
                                                      "max-vh-100 max-vw-100",
                                                    text: `Receipt for order #${orderDetail.number}`,
                                                    imageUrl:
                                                      orderDetail
                                                        .paymentConfirmationData
                                                        .receipt,
                                                    // imageClass: "h-100",
                                                    imageAlt: "Receipt",
                                                    animation: false,
                                                  })
                                                }
                                              >
                                                <i className="fa fa-file-photo-o mr-1" />
                                                See receipt
                                              </Button>
                                            </React.Fragment>
                                          )}
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                    <Col xs={12}>
                                      <Card>
                                        <Card.Header>
                                          Shipping Details
                                        </Card.Header>
                                        <Card.Body>
                                          <DetailItem
                                            fieldName="Shipping method"
                                            value={
                                              orderDetail.shippingMethod.toLowerCase() ===
                                              "courier"
                                                ? `${orderDetail.courierCode} ${orderDetail.courierService}`
                                                : orderDetail.shippingMethod
                                            }
                                          />
                                          {!orderDetail.resi ? null : (
                                            <DetailItem
                                              fieldName="Resi"
                                              value={orderDetail.resi}
                                            />
                                          )}
                                          <DetailItem
                                            fieldName="Load weight"
                                            value={orderDetail.orderProducts
                                              .map(
                                                (orderProduct) =>
                                                  orderProduct.quantity *
                                                  orderProduct.product.weight
                                              )
                                              .reduce(
                                                (sum, weight) => sum + weight,
                                                0
                                              )}
                                          />
                                          {orderDetail.waybillTrack && (
                                            <Button
                                              className="mt-2"
                                              onClick={() =>
                                                this.setState({ show: true })
                                              }
                                            >
                                              <i className="fa fa-truck mr-1" />
                                              Tracking Shipment
                                            </Button>
                                          )}
                                        </Card.Body>
                                      </Card>
                                    </Col>
                                  </Row>
                                )}
                                <Card>
                                  <Card.Header>
                                    Purchased Product
                                    {orderDetail.orderProducts
                                      .map(
                                        (orderProduct) => orderProduct.quantity
                                      )
                                      .reduce(
                                        (sum, quantity) => sum + quantity,
                                        0
                                      ) > 1 && "s"}
                                  </Card.Header>
                                  <Card.Body>
                                    {orderDetail.orderWrappings.map(
                                      (orderWrapping, idx) => (
                                        <Container
                                          fluid
                                          key={idx}
                                          className="px-2 pt-2 mb-2 rounded border border-secondary"
                                          style={{
                                            backgroundColor:
                                              idx % 2 === 0
                                                ? "seashell"
                                                : "mistyrose",
                                          }}
                                        >
                                          {isAdmin() && (
                                            <Row>
                                              <Col className="font-weight-bold mb-2 h4">
                                                Wrapping Lab #{idx + 1}
                                              </Col>
                                              <Col className="text-right">
                                                Wrapping Fee:{" "}
                                                <span className="font-weight-bold">
                                                  {rpFormat(
                                                    // 10000 +
                                                    (orderWrapping.greetingCard
                                                      ? 5000
                                                      : 0) +
                                                      orderWrapping.wrapper
                                                        .price +
                                                      (orderWrapping.ribbon
                                                        ? orderWrapping.ribbon
                                                            .price
                                                        : 0)
                                                  )}
                                                </span>
                                              </Col>
                                            </Row>
                                          )}

                                          {isAdmin() && (
                                            <Row>
                                              <Col>
                                                <Row
                                                  className="cursor-pointer"
                                                  onClick={() =>
                                                    Swal.fire({
                                                      customClass:
                                                        "max-vh-100 max-vw-100",
                                                      text:
                                                        orderWrapping.wrapper
                                                          .name ||
                                                        orderWrapping.wrapper
                                                          .type,
                                                      imageUrl:
                                                        orderWrapping.wrapper
                                                          .image,
                                                      imageAlt:
                                                        "Chosen wrapper",
                                                      animation: false,
                                                    })
                                                  }
                                                >
                                                  <Col
                                                    className="font-weight-bold"
                                                    xs="2"
                                                  >
                                                    Wrapper
                                                  </Col>
                                                  <Col xs="10">
                                                    :{" "}
                                                    {orderWrapping.wrapper.type}
                                                    {orderWrapping.wrapper
                                                      .name &&
                                                      ` - ${orderWrapping.wrapper.name}`}
                                                  </Col>
                                                </Row>
                                                {orderWrapping.ribbon && (
                                                  <Row
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                      Swal.fire({
                                                        customClass:
                                                          "max-vh-100 max-vw-100",
                                                        text:
                                                          orderWrapping.ribbon
                                                            .name ||
                                                          orderWrapping.ribbon
                                                            .type,
                                                        imageUrl:
                                                          orderWrapping.ribbon
                                                            .image,
                                                        imageAlt:
                                                          "Chosen wrapper",
                                                        animation: false,
                                                      })
                                                    }
                                                  >
                                                    <Col
                                                      className="font-weight-bold"
                                                      xs="2"
                                                    >
                                                      Ribbon
                                                    </Col>
                                                    <Col xs="10">
                                                      :{" "}
                                                      {
                                                        orderWrapping.ribbon
                                                          .type
                                                      }
                                                      {orderWrapping.ribbon
                                                        .name &&
                                                        ` - ${orderWrapping.ribbon.name}`}
                                                    </Col>
                                                  </Row>
                                                )}
                                              </Col>
                                              {!orderWrapping.greetingCard ? (
                                                <Col className="text-secondary">
                                                  No greeting card
                                                </Col>
                                              ) : (
                                                <Col className="mb-2">
                                                  <div>
                                                    Greeting Card for{" "}
                                                    <span className="font-weight-bold">
                                                      {
                                                        orderWrapping
                                                          .greetingCard.event
                                                      }
                                                    </span>
                                                    :
                                                  </div>
                                                  <div className="mr-2 d-inline-block">
                                                    <i
                                                      className="fa fa-clipboard cursor-pointer text-info"
                                                      onClick={() => {
                                                        const el = document.createElement(
                                                          "input"
                                                        );
                                                        el.value =
                                                          orderWrapping.greetingCard.greetings;
                                                        el.id = "greetings";
                                                        document.body.appendChild(
                                                          el
                                                        );
                                                        el.select();
                                                        document.execCommand(
                                                          "copy"
                                                        );
                                                        el.remove();
                                                        Swal.fire({
                                                          toast: true,
                                                          position: "center",
                                                          showConfirmButton: false,
                                                          timer: 1500,
                                                          title:
                                                            "Greetings content copied to clipboard",
                                                          type: "success",
                                                        });
                                                      }}
                                                    />
                                                  </div>
                                                  <div className="d-inline-block font-italic">
                                                    {
                                                      orderWrapping.greetingCard
                                                        .greetings
                                                    }
                                                  </div>
                                                </Col>
                                              )}
                                            </Row>
                                          )}
                                          <ProductTable
                                            data={orderWrapping.items}
                                            createdAt={orderDetail.createdAt}
                                          />
                                        </Container>
                                      )
                                    )}
                                    <ProductTable
                                      data={orderDetail.orderProducts}
                                      createdAt={orderDetail.createdAt}
                                    />
                                  </Card.Body>
                                </Card>
                                <Row>
                                  <Col xs={12}>
                                    <Card>
                                      <Card.Header>Order Custom</Card.Header>
                                      <Card.Body>
                                        {orderDetail.orderCustome.map(
                                          (item, idx) => {
                                            let { magicalMomentForm } = item;
                                            if (!item.magicalMomentForm) {
                                              return (
                                                <Accordion
                                                  key={idx}
                                                  defaultActiveKey={`${idx}`}
                                                >
                                                  <Card>
                                                    <Card.Header>
                                                      <Accordion.Toggle
                                                        as={Button}
                                                        variant="link"
                                                        eventKey={`${idx}`}
                                                        key={idx}
                                                      >
                                                        {
                                                          item.products
                                                            .productName
                                                        }
                                                      </Accordion.Toggle>
                                                    </Card.Header>
                                                    <Accordion.Collapse
                                                      eventKey={`${idx}`}
                                                    >
                                                      <Card.Body>
                                                        <table
                                                          style={{
                                                            backgroundColor:
                                                              idx % 2 === 0
                                                                ? "seashell"
                                                                : "mistyrose",
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <tr>
                                                            <td>
                                                              Product Name
                                                            </td>
                                                            <td>
                                                              :
                                                              {
                                                                item.products
                                                                  .productName
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Quantity</td>
                                                            <td>
                                                              :
                                                              {
                                                                item.products
                                                                  .quantity
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Isi Ucapan</td>
                                                            <td>
                                                              :
                                                              {
                                                                item.products
                                                                  .isiUcapan
                                                              }
                                                            </td>
                                                          </tr>
                                                          <tr>
                                                            <td>Warna</td>
                                                            <td>
                                                              :
                                                              {
                                                                item.products
                                                                  .customeColor
                                                              }
                                                            </td>
                                                          </tr>
                                                        </table>

                                                        {item.photos.image
                                                          .length > 0 && (
                                                          <PhotosCustomeAccordion
                                                            photos={
                                                              item.photos.image
                                                            }
                                                          />
                                                        )}
                                                      </Card.Body>
                                                    </Accordion.Collapse>
                                                  </Card>
                                                </Accordion>
                                              );
                                            } else {
                                              return (
                                                <div>
                                                  <DetailItem
                                                    fieldName="Nama"
                                                    value={
                                                      magicalMomentForm.name
                                                    }
                                                  />
                                                  <DetailItem
                                                    fieldName="Perayaan"
                                                    value={
                                                      magicalMomentForm.perayaan
                                                    }
                                                  />
                                                  <DetailItem
                                                    fieldName="Venue"
                                                    value={
                                                      magicalMomentForm.venueAcara
                                                    }
                                                  />
                                                  <DetailItem
                                                    fieldName="Tema"
                                                    value={
                                                      magicalMomentForm.temaAcara
                                                    }
                                                  />
                                                  <DetailItem
                                                    fieldName="Waktu"
                                                    value={
                                                      magicalMomentForm.waktuAcara.split(
                                                        "T"
                                                      )[0]
                                                    }
                                                  />
                                                  {item.photos.image.length >
                                                    0 && (
                                                    <PhotosCustomeAccordion
                                                      photos={item.photos.image}
                                                    />
                                                  )}
                                                </div>
                                              );
                                            }
                                          }
                                        )}
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                  <Col xs={12}>
                                    <Card>
                                      <Card.Header>Order Totals</Card.Header>
                                      <Card.Body>
                                        <DetailItem
                                          fieldNameSize={8}
                                          fieldName="Total"
                                          value={
                                            <div className="text-right">
                                              {rpFormat(
                                                orderDetail.productTotal
                                              )}
                                            </div>
                                          }
                                        />
                                        {!orderDetail.shippingFee ? null : (
                                          <DetailItem
                                            fieldNameSize={8}
                                            fieldName="Shipping Fee"
                                            value={
                                              <div className="text-right">
                                                {rpFormat(
                                                  orderDetail.shippingFee
                                                )}
                                              </div>
                                            }
                                          />
                                        )}
                                        {!orderDetail.productDiscount ? null : (
                                          <DetailItem
                                            fieldNameSize={8}
                                            fieldName="Discount"
                                            value={
                                              <div className="text-right text-danger">
                                                {rpFormat(
                                                  orderDetail.productDiscount
                                                )}
                                              </div>
                                            }
                                          />
                                        )}
                                        {!orderDetail.voucherDiscount ? null : (
                                          <DetailItem
                                            fieldNameSize={8}
                                            fieldName={`Voucher (${orderDetail.voucherCode})`}
                                            value={
                                              <div className="text-right text-danger">
                                                {rpFormat(
                                                  orderDetail.voucherDiscount
                                                )}
                                              </div>
                                            }
                                          />
                                        )}
                                        {orderDetail.donation && (
                                          <DetailItem
                                            fieldNameSize={8}
                                            fieldName="Donation"
                                            value={
                                              <div className="text-right">
                                                {rpFormat(orderDetail.donation)}
                                              </div>
                                            }
                                          />
                                        )}
                                        <hr />
                                        <DetailItem
                                          fieldNameSize={8}
                                          fieldName={
                                            <strong>Grand Total</strong>
                                          }
                                          value={
                                            <div className="text-right text-success">
                                              {rpFormat(orderDetail.total)}
                                            </div>
                                          }
                                        />
                                      </Card.Body>
                                    </Card>
                                  </Col>
                                </Row>
                              </Container>
                            </React.Fragment>
                          );
                        }}
                      </Mutation>

                      <Modal show={this.state.isResendEmailModalShow}>
                        <Modal.Header>
                          <Modal.Title>
                            Re-Send Email with New Postal Fee
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <InputGroup className="mb-3">
                            <FormControl
                              placeholder="Total Ongkir"
                              onChange={(e) => {
                                this.setState({
                                  ongkir: e.target.value,
                                });
                              }}
                            />
                            <InputGroup.Append>
                              <InputGroup.Text id="basic-addon2">
                                Ongkir
                              </InputGroup.Text>
                            </InputGroup.Append>
                          </InputGroup>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            onClick={() => {
                              this.props.client
                                .mutate({
                                  mutation: MUTATION_EDIT_ORDER_SHIPPING_FEE,
                                  variables: {
                                    id: this.state.order.id,
                                    fee: parseFloat(this.state.ongkir),
                                  },
                                })
                                .then(() => {
                                  let html = emailBuilder(
                                    this.state.order,
                                    parseFloat(this.state.ongkir)
                                  );
                                  this.props.client
                                    .mutate({
                                      mutation: MUTATION_SEND_EMAIL,
                                      variables: {
                                        to: this.state.order.user.email,
                                        html: html,
                                      },
                                    })
                                    .then(() => {
                                      Swal.fire({
                                        title: "Email Resend success",
                                        text:
                                          "Email to customer has been re-send!",
                                        type: "success",
                                        confirmButtonText: "close it!",
                                      }).then(() => {
                                        this.setState({
                                          isResendEmailModalShow: false,
                                        });
                                      });
                                    });
                                });
                            }}
                            variant="primary"
                          >
                            Re-send Email
                          </Button>
                          <Button
                            onClick={() => {
                              this.setState({
                                isResendEmailModalShow: false,
                              });
                            }}
                            variant="secondary"
                          >
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                      {orderDetail.waybillTrack && (
                        <TrackingShipmentModal
                          show={this.state.show}
                          onHide={() => this.setState({ show: false })}
                          waybillTrack={orderDetail.waybillTrack}
                        />
                      )}
                    </div>
                  );
                }
              }}
            </Query>
          );
        }}
      </MediaQuery>
    );
  }
}

export default withApollo(OrderDetail);
