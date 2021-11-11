import React, { Component } from "react";
import {
  Col,
  Container,
  Row,
  Modal,
  Button,
  Image,
  Form
} from "react-bootstrap";
import { Query, withApollo } from "react-apollo";
import {
  MUTATION_DELETE_CART_ITEM,
  MUTATION_DELETE_CART_PACKAGE_ITEM,
  MUTATION_UPDATE_CART_ITEM,
  MUTATION_UPDATE_CART_PACKAGE_ITEM,
  QUERY_GET_CART,
  QUERY_GET_SELECTED_CART
} from "../gql/cart";
import { QUERY_GET_TOKEN_CART } from "../gql/token";
import {
  QUERY_GET_PRODUCT_FAVORITE_STATE,
  QUERY_GET_PRODUCT_STOCK
} from "../gql/product";
import {
  DeleteProductCartConfirmation,
  DeleteProductCartConfirmation2,
  InsufficientStockAlert
} from "./SweetAlerts";
import "./CartProductItem.css";
import NavLink from "./NavLink";
import FavoriteStar from "./FavoriteStar";
import showTransformationsPhoto from "../library/ShowImageTransformation";
import {
  shortIndonesianDateMonthYearParser,
  dayEnToIn
} from "../utils/dateTimeFormatter";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";

class CartProductItem extends Component {
  constructor(props) {
    super(props);
    localStorage.setItem("selectedCart", localStorage.cart);
    this.state = {
      quantity: this.props.item.quantity,
      isshow: false
    };
  }

  deleteItemCart = () => {
    this.props.client
      .mutate({
        mutation: this.props.packageId
          ? MUTATION_DELETE_CART_PACKAGE_ITEM
          : MUTATION_DELETE_CART_ITEM,
        variables: {
          idProduct: this.props.item.idProduct,
          customeOrderId: this.props.item.customeOrderId,
          ...(this.props.packageId && { packageId: this.props.packageId })
        },
        refetchQueries: () => ["getCart","getToken","getCartLength","getSelectedCart"]
      })
      .then(() => this.setState({ lihat: false }));
  };

  setItemQuantity = newQuantity => {
    const { quantity, minQty = 1, multipleQty = 1 } = this.props.item;
    if (
      !Number.isInteger(newQuantity) ||
      newQuantity <= 0 ||
      newQuantity < minQty
    ) {
      DeleteProductCartConfirmation2(
        () => this.deleteItemCart(),
        () => this.setState({ quantity: quantity }),
        minQty
      );
      return;
    }
    if (newQuantity % multipleQty !== 0) {
      newQuantity = ~~(newQuantity / multipleQty) * multipleQty;
      this.setState({ quantity: newQuantity });
    }
    this.props.client
      .query({
        query: QUERY_GET_PRODUCT_STOCK,
        variables: {
          id: this.props.item.idProduct
        }
      })
      .then(({ data: { getProduct: { stock } } }) => {
        if (newQuantity + this.props.quantityFromOtherSet > stock) {
          if (newQuantity >= this.props.item.quantity) {
            InsufficientStockAlert(() =>
              this.setState({ quantity: this.props.item.quantity })
            );
            return;
          }
          newQuantity = stock - this.props.quantityFromOtherSet;
        }
        this.setState({ quantity: newQuantity }, () => {
          this.props.client.mutate({
            mutation: this.props.packageId
              ? MUTATION_UPDATE_CART_PACKAGE_ITEM
              : MUTATION_UPDATE_CART_ITEM,
            variables: {
              idProduct: this.props.item.idProduct,
              quantity: newQuantity,
              customeOrderId: this.props.item.customeOrderId,
              ...(this.props.packageId && { packageId: this.props.packageId })
            },
            refetchQueries: [
              { query: QUERY_GET_CART },
              { query: QUERY_GET_TOKEN_CART },
              {query:QUERY_GET_SELECTED_CART}
            ]
          });
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const item = this.props.item;
    const query = {
      query: QUERY_GET_PRODUCT_FAVORITE_STATE,
      variables: {
        id: item.idProduct
      }
    };

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <div className="d-flex">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check defaultChecked={true} onChange={(e) => {
                let currentSelectedCart = JSON.parse(localStorage.selectedCart);
                if (e.target.checked) {
                  if (this.props.giftDetail) {
                    let selectedWrappingItem = this.props.giftDetail;
                    if (currentSelectedCart.packages.length > 0) {
                      let packages = currentSelectedCart.packages;
                      packages.forEach((paket) => {
                        if (paket.id === selectedWrappingItem.id) {
                          currentSelectedCart.packages.pop();
                          selectedWrappingItem.items.push(item);
                        } else {
                          selectedWrappingItem.items = [];
                          selectedWrappingItem.items.push(item);
                        }
                      });

                    } else {
                      selectedWrappingItem.items = [];
                      selectedWrappingItem.items.push(item);
                    }
                    currentSelectedCart.packages.push(selectedWrappingItem);
                    localStorage.setItem("selectedCart", JSON.stringify(currentSelectedCart));
                  } else {
                    currentSelectedCart.items.push(item);
                    localStorage.setItem("selectedCart", JSON.stringify(currentSelectedCart));
                  }
                } else {
                  if (this.props.giftDetail) {
                    let selectedWrappingItem = this.props.giftDetail;
                    currentSelectedCart.packages.forEach(paket => {
                      if (paket.id === selectedWrappingItem.id) {
                        paket.items = paket.items.filter(product => {
                          return product.idProduct !== item.idProduct;
                        });
                      }
                    });
                    currentSelectedCart.packages = currentSelectedCart.packages.filter(paket => paket.items.length > 0);
                    localStorage.setItem("selectedCart", JSON.stringify(currentSelectedCart));

                  } else {
                    currentSelectedCart.items = currentSelectedCart.items.filter(product => product.idProduct !== item.idProduct);
                    localStorage.setItem("selectedCart", JSON.stringify(currentSelectedCart));
                  }
                }

              }} className=" ml-4 mt-1" type="checkbox"/>
            </Form.Group>
            <Container fluid className="cart-product-item-container ">
              <Row className="h-100">
                <Col xs={1} className="my-auto">
                  <Query {...query}>
                    {({ loading, error, data }) => (
                      <FavoriteStar
                        className="cart-product-item-star"
                        product={loading || error ? {} : data.getProduct}
                        refetchQueries={[query]}
                      />
                    )}
                  </Query>
                </Col>
                <Col xs={2} className="my-auto image">
                  <NavLink className="p-0" href={"/product/" + item.slug}>
                    <img
                      alt=""
                      className="w-100"
                      src={showTransformationsPhoto(250, 250, item.image)}
                    />
                  </NavLink>
                </Col>
                <Col xs={3} className="my-auto description">
                  <div className="font-weight-light">{item.merchant}</div>
                  <div
                    className="cart-product-item-name">{item.productName}</div>
                  {!this.props.isMobile && <hr className="my-2"/>}
                  <div className="cart-product-item-price-container">
                <span className="cart-product-item-price">
                Rp{" "}
                  {item.price
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </span>
                    {item.discountPrice && (
                      <div className="cart-product-item-strikethrough"/>
                    )}
                  </div>
                  {item.discountPrice && (
                    <div className="cart-product-item-price discounted">
                      Rp{" "}
                      {item.discountPrice
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    </div>
                  )}
                  {item.isCustomeOrder === true && (
                    <div className="cart-product-item-detail">
                      {item.photos.image.length > 0 ? (
                        <>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              this.setState({
                                isshow: true
                              });
                            }}
                            className={
                              !isDesktop
                                ? "kadoqu-primary-button mob-custome-photos"
                                : "kadoqu-primary-button"
                            }
                          >
                            Custom
                          </Button>

                          <Modal show={this.state.isshow}>
                            <Modal.Header>
                              <Modal.Title>
                                <div
                                  className="text-uppercase font-weight-bold mb-3">
                                  Custom Photos and Notes
                                </div>
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <div>
                                {item.customeColor !== "" ? (
                                  <div>Tema Warna :{item.customeColor}</div>
                                ) : (
                                  ""
                                )}
                                {item.isiUcapan !== "" ? (
                                  <div>Notes : {item.isiUcapan}</div>
                                ) : (
                                  ""
                                )}
                                <div className="photo-uploader-preview row">
                                  <br/>

                                  {item.photos.image.map((item, idx) => {
                                    return (
                                      <div
                                        className={
                                          !isDesktop
                                            ? "px-0 mr-3 mt-3 col-2 ml-3"
                                            : "px-0 mr-3 mt-3 col-6 ml-3 custom-photos"
                                        }
                                        key={idx}
                                      >
                                        <Image
                                          src={item}
                                          fluid
                                          width="150%"
                                          className={
                                            !isDesktop ? "h-100" : "custom-photos"
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>

                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                onClick={() => {
                                  this.setState({
                                    isshow: false
                                  });
                                }}
                                className="kadoqu-primary-button"
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  )}
                  {item.date && (
                    <div className="cart-product-item-detail">
                      Tanggal :{" "}
                      {shortIndonesianDateMonthYearParser(item.date.from)} -{" "}
                      {shortIndonesianDateMonthYearParser(item.date.to)}
                    </div>
                  )}
                  {item.day && (
                    <div className="cart-product-item-detail">
                      Hari : {dayEnToIn(item.day)}
                    </div>
                  )}
                </Col>
                <Col xs={3} className="my-auto">
                  <div className="cart-product-item-quantity-container m-auto">
                    <i
                      className="fa fa-minus cart-product-item-button p-1"
                      onClick={() =>
                        this.setItemQuantity(this.state.quantity - 1)
                      }
                    />
                    <form
                      className="d-inline p-0"
                      onSubmit={e => {
                        e.preventDefault();
                        this.setItemQuantity(this.state.quantity);
                      }}
                      onBlur={() => this.setItemQuantity(this.state.quantity)}
                    >
                      <input
                        type="text"
                        className="text-center cart-product-item-quantity-input d-inline"
                        value={this.state.quantity}
                        onChange={({ target: { value } }) => {
                          const newValue = value.replace(/\D/g, "");
                          this.setState({
                            quantity: parseInt(newValue) || ""
                          });
                        }}
                      />
                    </form>
                    <i
                      className="fa fa-plus cart-product-item-button p-1"
                      onClick={() =>
                        this.setItemQuantity(this.state.quantity + 1)
                      }
                    />
                  </div>
                </Col>
                <Col xs={2} className="my-auto">
                  <div className="cart-product-item-price-container">
                <span className="cart-product-item-total">
                Rp{" "}
                  {(item.price * this.state.quantity)
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                </span>
                    {item.discountPrice && (
                      <span className="cart-product-item-total-strikethrough"/>
                    )}
                  </div>
                  {item.discountPrice && (
                    <div className="cart-product-item-total discounted">
                      Rp{" "}
                      {(item.discountPrice * this.state.quantity)
                        .toFixed(0)
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    </div>
                  )}
                </Col>
                <Col xs={1}>
                  <i
                    className="fas fa-times float-right pt-1 cart-product-item-button"
                    onClick={() => DeleteProductCartConfirmation(() => this.deleteItemCart())}
                  />
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </MediaQuery>
    );
  }
}

export default withApollo(CartProductItem);
