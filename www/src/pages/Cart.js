import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { Col, Row, Button, Container } from "react-bootstrap";
import { Query, withApollo } from "react-apollo";
import MediaQuery from "react-responsive";
import CartProductItem from "../components/CartProductItem";
import CartWrappingDetail from "../components/CartWrappingDetail";
import {
  QUERY_GET_CART,
  MUTATION_ADD_CART_SERVER,
  // QUERY_GET_CART_BY_ID
} from "../gql/cart";
import {
  WRAPPING_SERVICE_FEE,
  GREETING_CARD_PRICE,
  MIN_DESKTOP_SIZE
} from "../data/constants";
import "./Cart.css";
import ReactGA from "react-ga";
import Swal from "sweetalert2";
import { getLoginId } from "../utils/userChecker";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.sendEvent = this.sendEvent.bind(this);
    this.state = {
      show: false,
      totalPrice: 0,
      diskonVoucher: 0,
      category: "Order",
      action: "Checkout",
      label: ""
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  isCartEmpty() {
    if (this.state.totalPrice - this.state.diskonVoucher <= 0) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    ReactGA.initialize("UA-153573254-1");
    // let cart = JSON.parse(localStorage.cart);
    // if (cart.items.length <= 0 && cart.packages.length <= 0) {
    //   this.props.client.query({
    //     query: QUERY_GET_CART_BY_ID,
    //     variables: {
    //       idUser: getLoginId()
    //     }
    //   }).then(({ data: { getCartById } }) => {
    //     localStorage.cart = JSON.stringify(getCartById.cart);
    //   });
    // } else {
    //   this.props.client.query({
    //     query: QUERY_GET_CART_BY_ID,
    //     variables: {
    //       idUser: getLoginId()
    //     }
    //   }).then(({ data: { getCartById } }) => {
    //     let oldCart = JSON.parse(localStorage.cart);
    //     let newCart = getCartById.cart;
    //     console.log(newCart);
    //     oldCart.items = oldCart.items.concat(newCart.items);
    //     oldCart.packages = oldCart.packages.concat(newCart.packages);
    //     localStorage.cart = null;
    //     localStorage.cart = JSON.stringify(oldCart);
    //   });
    // }


  }


  sendEvent(event) {
    // event.preventDefault();
    ReactGA.event(this.state);
    let selectedCart = JSON.parse(localStorage.selectedCart);
    if (selectedCart.items.length > 0 || selectedCart.packages.length > 0) {
      this.setState({
        category: "Order",
        action: "Cart",
        label: ""
      }, () => {
        this.props.history.push("/checkout");
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda Harus Memilih Barang Belanjaan anda silahkan, checklist barang yang ingin anda beli "
      });
    }

  }

  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          if (isDesktop) {
            document.body.style.backgroundImage =
              "-webkit-linear-gradient(-90deg, #d1eff7 0vh, #d1eff7 50vh, #f9f9f9 50vh, #f9f9f9 70vh)";
          } else {
            document.body.style.backgroundImage = "none";
            document.body.style.backgroundColor = "#f9f9f9";
          }
          const isMobile = !isDesktop;
          return (
            <Container
              fluid
              className={"cart-container" + (isDesktop ? "" : " px-0 pt-0")}
            >
              <Helmet>
                <title>Kadoqu.com | Cart</title>
              </Helmet>
              <Row noGutters={isMobile}>
                <Col
                  xs={isMobile ? 12 : { span: 11, offset: 1 }}
                  className={
                    isMobile ? "bg-kadoqu-primary cart-mob-title" : "mb-5"
                  }
                >
                  <div className="kadoqu-page-title cart-title">
                    {isMobile && (
                      <i
                        className="kadoqu-primary-color fas fa-shopping-basket mr-2"/>
                    )}
                    Isi Keranjang
                  </div>
                </Col>
                <Query query={QUERY_GET_CART} fetchPolicy="network-only"
                       pollInterval={100}>
                  {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Oops! {error.message || error}</p>;
                    const cartItems = data.getCart.items || [];
                    const cartPackages = data.getCart.packages || [];
                    const totalPrice =
                      cartPackages.reduce(
                        (totalSum, cartPackage) =>
                          totalSum +
                          cartPackage.items.reduce(
                            (sum, cartProduct) =>
                              sum +
                              cartProduct.quantity *
                              (cartProduct.discountPrice ||
                                cartProduct.price),
                            0
                          ),
                        0
                      ) +
                      cartItems.reduce(
                        (sum, cartProduct) =>
                          sum +
                          cartProduct.quantity *
                          (cartProduct.discountPrice || cartProduct.price),
                        0
                      );
                    const wrappingFee = cartPackages.reduce(
                      (totalSum, cartPackage) =>
                        totalSum +
                        WRAPPING_SERVICE_FEE +
                        cartPackage.wrapper.price +
                        (cartPackage.ribbon && cartPackage.ribbon.price) +
                        (cartPackage.greetingCard && GREETING_CARD_PRICE),
                      0
                    );
                    this.props.client.mutate({
                      mutation: MUTATION_ADD_CART_SERVER,
                      variables: {
                        idUser: getLoginId(),
                        cart: data.getCart
                      }
                    });
                    return (
                      <React.Fragment>
                        <Col
                          xl={{ span: 8, offset: 1 }}
                          lg={{ span: 7, offset: 1 }}
                          xs={12}
                        >
                          {cartPackages.map((gift, packageIndex) => (
                            <div className="cart-items-container" key={gift.id}>
                              <CartWrappingDetail
                                index={packageIndex + 1}
                                gift={gift}
                                isMobile={isMobile}
                              />
                              {gift.items.map((item, idx) => (
                                <React.Fragment key={idx}>
                                  {idx !== 0 && <hr className="my-1 w-95"/>}
                                  <CartProductItem
                                    giftDetail={gift}
                                    packageId={gift.id}
                                    item={item}
                                    isMobile={isMobile}
                                    quantityFromOtherSet={cartPackages
                                      .concat([{ items: cartItems }])
                                      .reduce((sum, currentPackage) => {
                                        if (currentPackage.id === gift.id)
                                          return sum + 0;
                                        const target = currentPackage.items.find(
                                          element =>
                                            element.idProduct === item.idProduct
                                        );
                                        return (
                                          sum + (target ? target.quantity : 0)
                                        );
                                      }, 0)}
                                  />
                                </React.Fragment>
                              ))}
                              <p
                                className={
                                  isMobile ? "Free-handsan-mob" : "Free-handsan"
                                }
                              >
                                Dapatkan free hand sanitizer dengan minimal
                                belanja Rp. 150.000
                              </p>
                            </div>
                          ))}
                          <div className="cart-items-container">
                            {cartItems.map((item, idx) => (
                              <React.Fragment key={idx}>
                                {idx !== 0 && <hr className="my-1 w-95"/>}
                                <CartProductItem
                                  item={item}
                                  isMobile={isMobile}
                                  quantityFromOtherSet={cartPackages.reduce(
                                    (sum, currentPackage) => {
                                      const target = currentPackage.items.find(
                                        element =>
                                          element.idProduct === item.idProduct
                                      );
                                      return (
                                        sum + (target ? target.quantity : 0)
                                      );
                                    },
                                    0
                                  )}
                                />
                              </React.Fragment>
                            ))}
                            <p
                              className={
                                isMobile ? "Free-handsan-mob" : "Free-handsan"
                              }
                            >
                              Dapatkan free hand sanitizer dengan minimal
                              belanja Rp. 150.000
                            </p>
                          </div>
                        </Col>
                        {isDesktop ? (
                          <Col xl={3} lg={4} xs={0} className="leftcol">
                            <div className="cart-estimation-box p-4">
                              <div
                                className="text-uppercase font-weight-bold mb-3">
                                Estimasi Pesanan
                              </div>
                              <div className="cart-price-detail-item">
                                <div>Total barang</div>
                                <div>
                                  Rp{" "}
                                  {totalPrice
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              </div>
                              {!wrappingFee ? null : (
                                <div className="cart-price-detail-item">
                                  <div>
                                    Wrapping{cartPackages.length > 1 && "s"} Fee
                                  </div>
                                  <div>
                                    Rp{" "}
                                    {wrappingFee
                                      .toFixed(0)
                                      .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        "$1."
                                      )}
                                  </div>
                                </div>
                              )}
                              <div className="cart-price-detail-item">
                                <div>Diskon voucher</div>
                                <div className="cart-red-text">
                                  Rp{" "}
                                  {this.state.diskonVoucher
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              </div>
                              <hr/>
                              <div
                                className="cart-price-detail-item font-weight-bold">
                                <div>Grand total</div>
                                <div>
                                  Rp{" "}
                                  {(
                                    totalPrice +
                                    wrappingFee -
                                    this.state.diskonVoucher
                                  )
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={this.sendEvent}
                              className="kadoqu-primary-button long mt-5 mw-100"
                              disabled={
                                cartItems.length === 0 &&
                                cartPackages.length === 0
                              }
                            >
                              Proses Checkout
                            </Button>
                          </Col>
                        ) : (
                          <div className="cart-mobile-price-container">
                            <div className="font-weight-bold">
                              Total
                              <span className="nowrap cart-red-text ml-4">
                                Rp{" "}
                                {(
                                  totalPrice +
                                  wrappingFee -
                                  this.state.diskonVoucher
                                )
                                  .toFixed(0)
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                              </span>
                            </div>
                            <Button
                              onClick={this.sendEvent}
                              className="kadoqu-primary-button mw-100"
                              disabled={
                                cartItems.length === 0 &&
                                cartPackages.length === 0
                              }
                            >
                              Proses Checkout
                            </Button>

                          </div>
                        )}
                      </React.Fragment>
                    );
                  }}
                </Query>
              </Row>
            </Container>
          );
        }}
      </MediaQuery>
    );
  }
}

export default withApollo(Cart);
