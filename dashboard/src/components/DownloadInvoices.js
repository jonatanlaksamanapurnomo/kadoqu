import React from "react";
import { withApollo } from "react-apollo";
import { Button } from "react-bootstrap";
import { isAdmin } from "../utils/userChecker";
import { getFullDate, getTime } from "../utils/dateTimeFormatter";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./react-pdf/Invoice";
import { Row, Col, Spinner } from "react-bootstrap";
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

class DownloadInvoices extends React.Component {
  state = {
    status: false,
  };
  componentDidMount = () => {
    this.setState({
      status: false,
    });
  };

  render() {
    let { status } = this.state;
    let res = [];
    this.props.orders.forEach((orderDetail) => {
      let products = [];
      orderDetail.orderProducts.forEach((element) => {
        let test = {
          quantity: element.quantity,
          product: {
            sku: element.product.sku,
            price: moneyFormat(element.product.price),
            capitalPrice: moneyFormat(element.product.capitalPrice),
            merchantPrice: moneyFormat(element.product.merchantPrice),
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
                ? element.product.price - element.product.kadoquDiscount
                : 0
            ),
            merchantDiscountUntil: element.product.merchantDiscountUntil,
            kadoquDiscountUntil: element.product.kadoquDiscountUntil,
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
              merchantPrice: moneyFormat(element.product.merchantPrice),
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
                  ? element.product.price - element.product.kadoquDiscount
                  : 0
              ),
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
          wrappingItem.products.push(test);
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
          status: orderDetail.paymentConfirmationData ? true : false,
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
        productTotal: moneyFormat(orderDetail.productTotal - wrappingFee),
        shippingFee: moneyFormat(orderDetail.shippingFee),
        total: moneyFormat(orderDetail.total),
        wrappingFee: moneyFormat(wrappingFee),
        productDiscount: moneyFormat(
          orderDetail.productDiscount ? orderDetail.productDiscount : 0
        ),
        voucherDiscount: moneyFormat(
          orderDetail.voucherDiscount ? orderDetail.voucherDiscount : 0
        ),
        wrappingLab: wrappingLab,
        shippingMethod:
          orderDetail.shippingMethod === "courier"
            ? orderDetail.courierCode + " " + orderDetail.courierService
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
      res.push(view);
    });
    return (
      <>
        {!status && (
          <div className="mb-1">
            <Button
              onClick={() => {
                this.setState({
                  status: true,
                });
              }}
            >
              Generate PDF
            </Button>
          </div>
        )}
        {status && (
          <>
            <div className="mb-1">
              <PDFDownloadLink
                document={<Invoice view={res} type="customer" />}
                fileName={`Customer's-Invoices.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? (
                    <Row className="text-center">
                      <Col xs={12}>
                        <Spinner animation="border" />
                      </Col>
                      <Col xs={12} className="mt-2">
                        <p>Generating Customer PDF....</p>
                      </Col>
                    </Row>
                  ) : (
                    <Button>
                      Download {this.props.orders.length} Customer's Invoice
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </div>

            {isAdmin() && (
              <div>
                <PDFDownloadLink
                  document={<Invoice view={res} type="admin" />}
                  fileName={`Admin's-Invoices.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      <Row className="text-center">
                        <Col xs={12}>
                          <Spinner animation="border" />
                        </Col>
                        <Col xs={12} className="mt-2">
                          <p>Generating Admin PDF....</p>
                        </Col>
                      </Row>
                    ) : (
                      <Button>
                        Download {this.props.orders.length} Admin's Invoices
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default withApollo(DownloadInvoices);
