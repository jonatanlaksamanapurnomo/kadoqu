import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Query, withApollo } from "react-apollo";
import { withRouter } from "react-router-dom";
import { addSurveyLog } from "../gql/survey";
import { Helmet } from "react-helmet";
import { QUERY_GET_ORDER_BY_ORDER_NUMBER } from "../gql/order";
import "./OrderThankYou.css";

class OrderThankYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      desk: ""
    };
  }

  componentDidMount() {
    this.props.client.mutate({ mutation: addSurveyLog });
  }

  formatRupiah = x => {
    return "Rp " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ",00";
  };

  getExpiryDate = (createdAt, orderProducts, orderWrappings) => {
    let isHoliday = false;
    orderProducts.forEach(products => {
      if (products.product.sku.includes("TRV")) {
        isHoliday = true;
        return;
      }
    });
    if (!isHoliday) {
      orderWrappings.forEach(wrapping => {
        wrapping.items.forEach(products => {
          if (products.product.sku.includes("TRV")) {
            isHoliday = true;
            return;
          }
        });
        if (isHoliday) return;
      });
    }
    var _24hr = 24 * 60 * 60 * 1000;
    var _1hr = 60 * 60 * 1000; //enable when kadoquHoliday on discount
    var created = new Date(createdAt);
    /*
    var expired = new Date(created.getTime() + _24hr ); // expiring in 24 hours
    */
    var expired = new Date(created.getTime() + (isHoliday ? _1hr : _24hr)); // expiring in 24 hours, enable when kadoquHoliday on discount

    var date = expired.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    var time = expired
      .toLocaleTimeString("id-ID", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short"
      })
      .replace(/\./g, ":");
    // Senin, 1 Juli 2019 11:34 WIB

    return date + " " + time;
  };

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com | Thank You</title>
        </Helmet>
        <Query
          query={QUERY_GET_ORDER_BY_ORDER_NUMBER}
          variables={{ no: parseInt(this.props.match.params.no) }}
        >
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) {
              console.log("Error!", error);
              return null;
            }
            const {
              orderProducts,
              orderWrappings,
              total,
              createdAt
            } = data.getOrderByOrderNumber;
            if (data.getOrderByOrderNumber) {
              return (
                <Container className="order-thank-you-container">
                  <h1 className="order-thank-you-title">
                    THANK YOU FOR YOUR ORDER
                  </h1>
                  <p className="order-thank-you-sub-title">
                    Pesanan kamu berhasil di-checkout dan akan segera diproses
                    setelah kamu melakukan pembayaran sebesar
                  </p>
                  <h1 className="order-thank-you-price">
                    {this.formatRupiah(total)}
                  </h1>
                  <p className="order-thank-you-sub-title">
                    Melalui bank transfer ke salah satu rekening di bawah ini
                  </p>
                  <Row
                    className="justify-content-center order-thank-you-pembayaran-container">
                    <Col xs="8" md="4" className="order-thank-you-pembayaran">
                      <img
                        src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/bca.png"
                        alt="bca"
                        width="100%"
                        className="order-thank-you-pembayaran-image"
                      />
                      <p className="order-thank-you-pembayaran-caption">
                        No. Rekening: <span>517 033 7435</span>
                      </p>
                      <p className="order-thank-you-pembayaran-caption">
                        Atas Nama: <span>Frigard Harjono</span>
                      </p>
                    </Col>
                    <Col xs="8" md="4" className="order-thank-you-pembayaran">
                      <img
                        src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/mandiri_r1-mxWTFON.png"
                        alt="mandiri"
                        width="100%"
                        className="order-thank-you-pembayaran-image"
                      />
                      <p className="order-thank-you-pembayaran-caption">
                        No. Rekening: <span>131 001 409 3902</span>
                      </p>
                      <p className="order-thank-you-pembayaran-caption">
                        Atas Nama: <span>Frigard Harjono</span>
                      </p>
                    </Col>
                    <Col xs="8" md="4" className="order-thank-you-pembayaran">
                      <img
                        src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/bni_HJgQlWatO4.png"
                        alt="bni"
                        width="100%"
                        className="order-thank-you-pembayaran-image"
                      />
                      <p className="order-thank-you-pembayaran-caption">
                        No. Rekening: <span>041 968 6981</span>
                      </p>
                      <p className="order-thank-you-pembayaran-caption">
                        Atas Nama: <span>Frigard Harjono</span>
                      </p>
                    </Col>
                  </Row>
                  <p className="order-thank-you-sub-title mt-5">
                    Hingga batas waktu sampai tanggal
                  </p>
                  <h2 className="order-thank-you-date">
                    {this.getExpiryDate(
                      createdAt,
                      orderProducts,
                      orderWrappings
                    )}
                  </h2>
                  <Row
                    className="justify-content-center order-thank-you-button-container"
                    noGutters
                  >

                    <Col xs="5" md="4" className="pl-1">
                      {/* <NavLink href="/profile/my-cart"> */}
                      <button
                        onClick={() => {
                          this.props.history.push("/payment-confirmation", {
                            order: data.getOrderByOrderNumber
                          });
                        }}
                        className="kadoqu-primary-button w-100"
                      >
                        Lanjut
                      </button>
                      {/* </NavLink> */}
                    </Col>
                  </Row>
                </Container>
              );
            }
            return null;
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withApollo(withRouter(OrderThankYou));
