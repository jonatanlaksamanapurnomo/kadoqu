import React from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { Mutation, Query } from "react-apollo";
import { withApollo } from "react-apollo";
import MediaQuery from "react-responsive";
import { Helmet } from "react-helmet";
import {
  PopUpCart,
  InsufficientStockAlert,
  Toast,
  WrappingLabAlert
} from "../components/SweetAlerts";
import { PhotosUploader } from "../components/PhotosUploader";
import gql from "graphql-tag";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";
import ProductItem from "../components/ProductItem";
import ProductDetailImageSelector from "../components/ProductDetailImageSelector";
import { MUTATION_ADD_CART_ITEM, QUERY_GET_CART } from "../gql/cart";
import { QUERY_GET_TOKEN_CART } from "../gql/token";
import FavoriteStar from "../components/FavoriteStar";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import "./ProductDetail.css";
import Input from "reactstrap/es/Input";
import DropdownWithSearch from "../components/DropdownWithSearch";
import uuid from "react-uuid";
import {
  indonesianDateMonthYearParser,
  dayEnToIn
} from "../utils/dateTimeFormatter";
import { MUTATION_ADD_PRODUCT_ADDED_TO_CART } from "../gql/tracker";
import { QUERY_GET_TOKEN } from "../gql/token";
import jwt from "jsonwebtoken";

import { QUERY_GET_PRODUCT_BY_SLUG } from "../gql/product";

const QUERY_GET_SIMILAR_PRODUCTS = gql`
  query getSimiliarProduct($id: String) {
    getSimiliarProduct(id: $id) {
      id
      name
      merchant
      inStock
      price
      slug
      isFavorite
      photos {
        url
      }
    }
  }
`;

const QUERY_CHECK_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($slug: String) {
    getProductBySlug(slug: $slug) {
      id
    }
  }
`;

class MobileList extends React.Component {
  state = {
    slidingState: {
      startX: 0,
      currentScrollLeft: 0,
      isDown: false
    }
  };

  componentDidMount = () => {
    this.container.scrollLeft = 0;
  };

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  startSliding = e => {
    e.preventDefault();
    const slider = this.container;
    slider.classList.add("active");
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: true,
        startX: e.pageX,
        currentScrollLeft: slider.scrollLeft
      })
    });
  };
  stopSliding = () => {
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: false
      })
    });
    const slider = this.container;
    slider.classList.remove("active");
  };
  onSliding = e => {
    if (!this.state.slidingState.isDown) {
      return;
    }
    const slider = this.container;
    const walk = (e.pageX - this.state.slidingState.startX) * 1.4;
    this.setState({}, () => {
      slider.scrollLeft = this.state.slidingState.currentScrollLeft - walk;
    });
  };

  render() {
    return (
      <div
        ref={el => (this.container = el)}
        className="product-detail-mobile-similar-products-container"
        onMouseDown={this.startSliding}
        onMouseLeave={this.stopSliding}
        onMouseUp={this.stopSliding}
        onMouseMove={this.onSliding}
      >
        {this.props.data.map(product => {
          return (
            <ProductItem
              key={product.id}
              details={{
                id: product.id,
                slug: product.slug,
                merchant: product.merchant,
                name: product.name,
                photo: product.photos[0] ? product.photos[0].url : "",
                price: product.price,
                discountPrice: product.discountPrice,
                isFavorite: product.isFavorite
              }}
              query={this.props.query}
            />
          );
        })}
      </div>
    );
  }
}

const SimilarProductList = props => {
  const query = {
    query: QUERY_GET_SIMILAR_PRODUCTS,
    variables: { id: props.id }
  };
  return (
    <Query {...query}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;

        if (props.isMobile) {
          return <MobileList data={data.getSimiliarProduct} query={query} />;
        }
        return (
          <div className="d-flex">
            {data.getSimiliarProduct
              .filter(product => product.inStock)
              .slice(0, 4)
              .map(product => {
                return (
                  <ProductItem
                    key={product.id}
                    details={{
                      id: product.id,
                      merchant: product.merchant,
                      slug: product.slug,
                      name: product.name,
                      photo: product.photos[0] ? product.photos[0].url : "",
                      price: product.price,
                      discountPrice: product.discountPrice,
                      isFavorite: product.isFavorite
                    }}
                    query={query}
                  />
                );
              })}
          </div>
        );
      }}
    </Query>
  );
};

const BuySection = props => {
  const productData = props.productData;
  if (props.state.isLoading)
    props.setState({
      isLoading: false,
      quantity: productData.minQty
    });
  const buy = (addCartItem, currentQuantity, callbackFunction) => {
    if (
      productData.date &&
      productData.date.dates.length > 0 &&
      !props.state.date
    ) {
      Toast.fire({
        title: "Pilih tanggal keberangkatan dulu ya!",
        icon: "error"
      });
      return;
    }
    if (currentQuantity + props.state.quantity > productData.stock) {
      InsufficientStockAlert(() =>
        props.setState({
          quantity: Math.max(
            productData.stock - currentQuantity,
            productData.minQty
          )
        })
      );
      return;
    }
    props.setState({
      buyButtonDisabled: true
    });
    const gidaOption = props.history.location.state.gidaOption
      ? props.history.location.state.gidaOption
      : null;
    const search = props.history.location.state.search
      ? props.history.location.state.search
      : null;
    const cartItem = {
      idProduct: productData.id,
      slug: productData.slug,
      quantity: props.state.quantity,
      productName: productData.name,
      merchant: productData.merchant,
      price: productData.price,
      capitalPrice: productData.capitalPrice,
      discountPrice: productData.discountPrice,
      image: productData.photos[0].url,
      weight: productData.weight,
      length: productData.length,
      width: productData.width,
      height: productData.height,
      categories: productData.categories,
      storeCategories: productData.storeCategories,
      shippingSupports: productData.shippingSupports,
      ...(props.state.date && { date: props.state.date }),
      ...(props.state.day && { day: props.state.day }),
      isiUcapan: props.state.isiUcapan,
      photos: { image: props.state.photos },
      customerNotes: props.state.customerNotes,
      customeColor: props.state.color,
      isCustomeOrder: productData.isCustomeOrder,
      customeOrderId: uuid(),
      minQty: productData.minQty,
      multipleQty: productData.multipleQty,
      isDigital: productData.isDigital,
      gidaOption: gidaOption,
      search: search
    };
    addCartItem({
      variables: cartItem
    }).then(() => {
      props.setState(
        {
          buyButtonDisabled: false
        },
        callbackFunction
      );
    });
  };

  return (
    <React.Fragment>
      <div
        className={`mb-3${
          props.mobile ? " mt-3 d-flex align-items-center" : ""
        }`}
      >
        <div>
          <div>Jumlah</div>
          <div
            className={`d-flex align-items-center font-weight-light mt-1 ${
              props.mobile ? "ml-2" : ""
            }`}
          >
            <div
              className={
                "product-detail-quantity-adjustor " +
                (props.state.quantity <= productData.minQty
                  ? "disabled cursor-default"
                  : "cursor-pointer")
              }
              onClick={() =>
                props.state.quantity > productData.minQty &&
                props.setItemQuantity(
                  props.state.quantity - productData.multipleQty,
                  productData.stock,
                  productData.minQty,
                  productData.multipleQty
                )
              }
            >
              -
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                props.setItemQuantity(
                  props.state.quantity,
                  productData.stock,
                  productData.minQty,
                  productData.multipleQty
                );
              }}
              onBlur={() =>
                props.setItemQuantity(
                  props.state.quantity,
                  productData.stock,
                  productData.minQty,
                  productData.multipleQty
                )
              }
            >
              <input
                type="text"
                className="product-detail-quantity"
                value={props.state.quantity}
                onChange={({ target: { value } }) => {
                  const newValue = value.replace(/\D/g, "");
                  props.setState({
                    quantity: parseInt(newValue) || ""
                  });
                }}
              />
            </form>
            <div
              className={
                "product-detail-quantity-adjustor " +
                (props.state.quantity >= productData.stock
                  ? "disabled cursor-default"
                  : "cursor-pointer")
              }
              onClick={() => {
                props.state.quantity < productData.stock &&
                  props.setItemQuantity(
                    props.state.quantity + productData.multipleQty,
                    productData.stock,
                    productData.minQty,
                    productData.multipleQty
                  );
              }}
            >
              +
            </div>
            <div className="product-detail-min-qty">
              Min. pembelian {productData.minQty} pcs
              {productData.multipleQty > 1 &&
                ` (Kelipatan ${productData.multipleQty} pcs)`}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`mb-3${
          props.mobile ? " mt-3 d-flex align-items-center" : ""
        }`}
      >
        {/*custome photo*/}
        {productData.isCustomeOrder === true && (
          <div>
            <div className="row">
              {productData.colors.length > 0 && (
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <DropdownWithSearch
                    selectedColor={e => {
                      props.setState({
                        color: e
                      });
                    }}
                    className="mt-3"
                    toggleMessage="Pilih Warna"
                    data={productData.colors}
                  />
                </div>
              )}

              {props.state.color !== "" && (
                <div className="col-lg-12 col-md-12 col-sm-12 ml-3 mt-2">
                  <div
                    className="color-input"
                    style={{ backgroundColor: props.state.color }}
                  />
                </div>
              )}
              <div className="col-lg-12 col-md-12 col-sm-6 mt-5">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-6 w-75">
                    <Input
                      autoFocus
                      type="text"
                      onChange={e => {
                        props.setState({
                          isiUcapan: e.target.value
                        });
                      }}
                      value={props.state.isiUcapan}
                      placeholder="Isi Ucapan mu disini..."
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div className="mt-2">
                      <Button
                        id="button"
                        className="unstyled-button"
                        onClick={() => {
                          props.setState({
                            isiUcapan: ""
                          });
                        }}
                        style={{ color: "#00998d" }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {productData.isCustomePhoto === true && (
                <div className="col-lg-12 col-md-12 col-xs-12 mt-5">
                  <PhotosUploader
                    isProductDetail
                    photos={props.state.photos}
                    handlePhotos={photos => {
                      let newPhotos = props.state.photos;
                      const inputPhotos = [];
                      photos.forEach(photo => {
                        if (photo.type.startsWith("image/")) {
                          inputPhotos.push(photo.base64);
                        }
                      });
                      newPhotos = newPhotos.concat(inputPhotos);
                      props.setState({
                        photos: newPhotos
                      });
                    }}
                    removePhoto={index => {
                      const newPhotos = props.state.photos;
                      newPhotos.splice(index, 1);
                      props.setState({
                        photos: newPhotos
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {props.mobile && (
        <>
          <div className="kadoqu-primary-color font-weight-light">
            Sisa Stok: {productData.stock}
          </div>
          {productData.isPo && (
            <p className="product-detail-po">
              PO: {productData.poNotes}
              {!isNaN(productData.poNotes) ? " Hari" : ""}
            </p>
          )}
        </>
      )}

      <Mutation
        mutation={MUTATION_ADD_CART_ITEM}
        refetchQueries={[
          { query: QUERY_GET_TOKEN_CART },
          { query: QUERY_GET_CART }
        ]}
      >
        {addCartItem => (
          <Query query={QUERY_GET_CART}>
            {({ data, loading, error }) => {
              const isMagicalMoment =
                productData.magicalMoments.length <= 0 ? false : true;

              if (loading || error) {
                return (
                  <React.Fragment>
                    <Button
                      className="product-detail-buy-button kadoqu-primary-button"
                      disabled
                    >
                      Beli
                    </Button>
                    {!(isMagicalMoment || productData.isDigital) && (
                      <Button
                        className="product-detail-buy-button kadoqu-secondary-button ml-3"
                        disabled
                      >
                        Bungkus
                      </Button>
                    )}
                  </React.Fragment>
                );
              }
              const currentCartUnwrapped = data.getCart.items.find(
                element => element.idProduct === productData.id
              );
              const currentUnwrappedQuantity = currentCartUnwrapped
                ? currentCartUnwrapped.quantity
                : 0;
              const currentWrappedQuantity = data.getCart.packages.reduce(
                (sum, currentPackage) => {
                  const item = currentPackage.items.find(
                    element => element.idProduct === productData.id
                  );
                  return sum + (item ? item.quantity : 0);
                },
                0
              );
              const currentQuantity =
                currentUnwrappedQuantity + currentWrappedQuantity;

              return (
                <React.Fragment>
                  <Button
                    className="product-detail-buy-button kadoqu-primary-button"
                    onClick={() => {
                      if (isMagicalMoment) {
                        return props.history.push(
                          `/MagicalMoment/form/${productData.slug}`
                        );
                      } else {
                        return buy(addCartItem, currentQuantity, () => {
                          props.trackAddToCart(
                            productData.id,
                            props.history.location.state
                          );
                          if (productData.isDigital) {
                            return props.history.push("/checkout");
                          }
                          return PopUpCart(props.history);
                        });
                      }
                    }}
                    disabled={props.state.buyButtonDisabled}
                  >
                    Beli
                  </Button>

                  {!(isMagicalMoment || productData.isDigital) && (
                    <Button
                      className="product-detail-buy-button kadoqu-secondary-button ml-3"
                      onClick={() => {
                        if (productData.minQty === 1)
                          buy(addCartItem, currentQuantity, () => {
                            props.trackAddToCart(
                              productData.id,
                              props.history.location.state
                            );
                            return props.history.push("/wrapping-lab");
                          });
                        else WrappingLabAlert();
                      }}
                      disabled={props.state.buyButtonDisabled}
                    >
                      Bungkus
                    </Button>
                  )}
                </React.Fragment>
              );
            }}
          </Query>
        )}
      </Mutation>
    </React.Fragment>
  );
};

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyButtonDisabled: false,
      isLoading: true,
      quantity: 1,
      value: "",
      customerNotes: "",
      photos: [],
      isiUcapan: "",
      url: [],
      color: "",
      customeOrderId: "",
      date: null,
      day: null
    };
  }

  setItemQuantity = (newQuantity, stock, minQty = 1, multipleQty = 1) => {
    if (!Number.isInteger(newQuantity)) newQuantity = minQty;
    if (newQuantity % multipleQty !== 0)
      newQuantity = ~~(newQuantity / multipleQty) * multipleQty;
    this.setState({ quantity: Math.max(Math.min(newQuantity, stock), minQty) });
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_CHECK_PRODUCT_BY_SLUG,
        variables: { slug: this.props.match.params.slug }
      })
      .then(() => {})
      .catch(e => {
        console.log(e);
        this.props.history.push("/404");
      });
  };

  render() {
    const query = {
      query: QUERY_GET_PRODUCT_BY_SLUG,
      variables: { slug: this.props.match.params.slug }
    };
    return (
      <Query {...query} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          const productData = data.getProductBySlug;
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | {productData.name}</title>
              </Helmet>
              <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
                {isDesktop => {
                  if (isDesktop) {
                    document.body.style.backgroundImage =
                      "-webkit-linear-gradient(-90deg, #d1eff7 0vh, #d1eff7 50vh, #f9f9f9 50vh, #f9f9f9 70vh)";
                  } else {
                    document.body.style.backgroundImage = "none";
                    document.body.style.backgroundColor = "#f9f9f9";
                  }
                  return (
                    <Container fluid={!isDesktop} id="product-detail-page">
                      <Row noGutters={!isDesktop}>
                        <Col
                          xs={isDesktop ? 5 : 12}
                          className="product-detail-image"
                        >
                          <div className="position-relative">
                            <ProductDetailImageSelector
                              details={{ photos: productData.photos }}
                            />
                            {isDesktop && (
                              <FavoriteStar
                                className="product-detail-top-left-star"
                                product={productData}
                                refetchQueries={[query]}
                              />
                            )}
                          </div>
                        </Col>
                        {isDesktop ? (
                          <Col
                            xs={isDesktop ? 7 : 12}
                            className="product-detail-content-padding"
                          >
                            <p className="product-detail-brand">
                              {productData.merchant}
                              {new Date(productData.newToDate) > new Date() && (
                                <sup className="product-detail-label product-detail-new-label">
                                  New
                                </sup>
                              )}
                              {productData.isPo && (
                                <sup className="product-detail-label product-detail-po-label">
                                  PO
                                </sup>
                              )}
                            </p>
                            <p className="product-detail-title">
                              {productData.name}
                            </p>
                            <p className="product-detail-stock">
                              Sisa Stok: {productData.stock}
                            </p>
                            {productData.isPo && (
                              <p className="product-detail-po">
                                PO: {productData.poNotes}
                                {!isNaN(productData.poNotes) ? " Hari" : ""}
                              </p>
                            )}
                            <hr align="left" className="product-detail-line" />
                            <p className="product-detail-desc">
                              {productData.shortDescription}
                            </p>
                            <div className="d-inline-flex align-items-baseline">
                              <div className="product-detail-price-container">
                                <div className="product-detail-price">
                                  Rp{" "}
                                  {productData.price
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                                {productData.discountPrice && (
                                  <div className="product-detail-price-strikethrough" />
                                )}
                              </div>
                              {productData.discountPrice && (
                                <div className="product-detail-price product-detail-price-discount">
                                  &nbsp;Rp{" "}
                                  {productData.discountPrice
                                    .toFixed(0)
                                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                                </div>
                              )}
                            </div>
                            {productData.date &&
                              productData.date.dates.length > 0 && (
                                <div>
                                  <div className="product-detail-price-keb">
                                    Tanggal Keberangkatan
                                  </div>
                                  <select
                                    onChange={e =>
                                      this.setState({
                                        date: JSON.parse(e.target.value)
                                      })
                                    }
                                    id="tanggal"
                                    className="keberangkatan-option"
                                    required
                                  >
                                    <option value="" disabled selected>
                                      Pilih tanggal
                                    </option>
                                    {productData.date.dates.map(element => {
                                      return (
                                        <option
                                          value={JSON.stringify({
                                            from: element.from,
                                            to: element.to
                                          })}
                                        >
                                          {indonesianDateMonthYearParser(
                                            element.from
                                          )}{" "}
                                          -{" "}
                                          {indonesianDateMonthYearParser(
                                            element.to
                                          )}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              )}
                            {productData.date &&
                              productData.date.days.length > 0 && (
                                <div>
                                  <div className="product-detail-price-keb">
                                    Hari Keberangkatan
                                  </div>
                                  <select
                                    onChange={e =>
                                      this.setState({ day: e.target.value })
                                    }
                                    id="hari"
                                    className="keberangkatan-option"
                                    required
                                  >
                                    <option value="" disabled selected>
                                      Pilih hari
                                    </option>
                                    {productData.date.days.map(element => {
                                      return (
                                        <option value={element}>
                                          {dayEnToIn(element)}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              )}
                            <BuySection
                              productData={productData}
                              state={this.state}
                              setState={(state, callback = () => {}) =>
                                this.setState(state, callback)
                              }
                              setItemQuantity={this.setItemQuantity}
                              history={this.props.history}
                              trackAddToCart={(productId, state) => {
                                this.props.client
                                  .query({
                                    query: QUERY_GET_TOKEN
                                  })
                                  .then(({ data }) => {
                                    let token = jwt.decode(data.getToken);
                                    let userId = token
                                      ? token.data
                                      : localStorage.guestId;
                                    this.props.client.mutate({
                                      mutation: MUTATION_ADD_PRODUCT_ADDED_TO_CART,
                                      variables: {
                                        userId: userId,
                                        productId: productId,
                                        gidaOption: state.gidaOption
                                          ? state.gidaOption
                                          : null,
                                        search: state.search
                                          ? state.search
                                          : null
                                      }
                                    });
                                  });
                              }}
                            />
                            <p className="product-detail-share-text mt-5">
                              Share with your friends!
                            </p>
                            <div className="product-detail-share-icon-group">
                              <FacebookShareButton
                                className="d-inline"
                                url="www.kadoqu.com"
                                quote="This is content"
                                hashtags={["Template", "For", "Hastag"]}
                              >
                                <img
                                  className="logo-share"
                                  width="10%"
                                  src="https://ik.imagekit.io/nwiq66cx3pvsy/iconfb.jpg"
                                  alt="Facebook Logo"
                                />
                              </FacebookShareButton>
                              <TwitterShareButton
                                className="d-inline"
                                url="www.kadoqu.com"
                                title="This is content placeholder"
                                hashtags={["Template", "For", "Hastag"]}
                                via="test"
                              >
                                <img
                                  className="logo-share"
                                  width="10%"
                                  src="https://ik.imagekit.io/nwiq66cx3pvsy/Twitter_Logo_Blue.png"
                                  alt="Twitter Logo"
                                />
                              </TwitterShareButton>
                              {/* <i className="fab fa-instagram product-detail-share-icon" /> */}
                              {/* Instagram Belum Bisa */}
                              <WhatsappShareButton
                                className="d-inline"
                                url="www.kadoqu.com"
                                title="This is content"
                              >
                                <img
                                  className="logo-share"
                                  width="10%"
                                  src="https://ik.imagekit.io/nwiq66cx3pvsy/iconwa.jpg"
                                  alt="Whatsapp Logo"
                                />
                              </WhatsappShareButton>
                              <i
                                className="fas fa-link product-detail-share-icon"
                                onClick={() => {
                                  const el = document.createElement("input");
                                  el.value = `Yuk beli ${productData.name} di Kadoqu.com!
                                  ${window.location.href}`;
                                  el.id = "url-input";
                                  document.body.appendChild(el);
                                  el.select();
                                  document.execCommand("copy");
                                  el.remove();
                                  Toast.fire({
                                    title:
                                      "Link-nya sudah ada di clipboard kamu!",
                                    icon: "success"
                                  });
                                }}
                              />
                            </div>
                          </Col>
                        ) : (
                          <React.Fragment>
                            <Col
                              xs={12}
                              className="product-detail-mob-title px-4 py-3"
                            >
                              <div>
                                <p className="product-detail-brand">
                                  {productData.merchant}
                                  {new Date(productData.newToDate) >
                                    new Date() && (
                                    <sup className="product-detail-label product-detail-new-label">
                                      New
                                    </sup>
                                  )}
                                  {productData.isPo && (
                                    <sup className="product-detail-label product-detail-po-label">
                                      PO
                                    </sup>
                                  )}
                                </p>
                                <p className="product-detail-title">
                                  {productData.name}
                                </p>
                                <div className="product-detail-price-container">
                                  <div className="product-detail-price">
                                    Rp{" "}
                                    {productData.price
                                      .toFixed(0)
                                      .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        "$1."
                                      )}
                                  </div>
                                  {productData.discountPrice && (
                                    <div className="product-detail-price-strikethrough" />
                                  )}
                                </div>
                                {productData.discountPrice && (
                                  <div className="product-detail-price product-detail-price-discount">
                                    Rp{" "}
                                    {productData.discountPrice
                                      .toFixed(0)
                                      .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        "$1."
                                      )}
                                  </div>
                                )}
                              </div>
                              <FavoriteStar
                                product={productData}
                                refetchQueries={[query]}
                              />
                            </Col>
                            {productData.date &&
                              productData.date.dates.length > 0 && (
                                <div className="detail-date">
                                  <div className="product-detail-price-keb">
                                    Tanggal Keberangkatan
                                  </div>
                                  <select
                                    onChange={e =>
                                      this.setState({
                                        date: JSON.parse(e.target.value)
                                      })
                                    }
                                    id="tanggal"
                                    className="keberangkatan-option"
                                    required
                                  >
                                    <option value="" disabled selected>
                                      Pilih tanggal
                                    </option>
                                    {productData.date.dates.map(element => {
                                      return (
                                        <option
                                          value={JSON.stringify({
                                            from: element.from,
                                            to: element.to
                                          })}
                                        >
                                          {indonesianDateMonthYearParser(
                                            element.from
                                          )}{" "}
                                          -{" "}
                                          {indonesianDateMonthYearParser(
                                            element.to
                                          )}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              )}
                            {productData.date &&
                              productData.date.days.length > 0 && (
                                <div className="detail-date">
                                  <div className="product-detail-price-keb">
                                    Hari Keberangkatan
                                  </div>
                                  <select
                                    onChange={e =>
                                      this.setState({ day: e.target.value })
                                    }
                                    id="hari"
                                    className="keberangkatan-option"
                                    required
                                  >
                                    <option value="" disabled selected>
                                      Pilih hari
                                    </option>
                                    {productData.date.days.map(element => {
                                      return (
                                        <option value={element}>
                                          {dayEnToIn(element)}
                                        </option>
                                      );
                                    })}
                                  </select>
                                </div>
                              )}
                            <Col xs={12} className="px-4">
                              <BuySection
                                productData={productData}
                                state={this.state}
                                setState={(state, callback = () => {}) =>
                                  this.setState(state, callback)
                                }
                                setItemQuantity={this.setItemQuantity}
                                history={this.props.history}
                                mobile
                                trackAddToCart={(productId, state) => {
                                  this.props.client
                                    .query({
                                      query: QUERY_GET_TOKEN
                                    })
                                    .then(({ data }) => {
                                      let token = jwt.decode(data.getToken);
                                      let userId = token
                                        ? token.data
                                        : localStorage.guestId;
                                      this.props.client.mutate({
                                        mutation: MUTATION_ADD_PRODUCT_ADDED_TO_CART,
                                        variables: {
                                          userId: userId,
                                          productId: productId,
                                          gidaOption: state.gidaOption
                                            ? state.gidaOption
                                            : null,
                                          search: state.search
                                            ? state.search
                                            : null
                                        }
                                      });
                                    });
                                }}
                              />
                            </Col>
                          </React.Fragment>
                        )}
                      </Row>
                      <div className={!isDesktop ? "px-4" : ""}>
                        <div className="product-detail-info-box descriptions">
                          <Tabs
                            defaultActiveKey={
                              isDesktop ? "detail" : "description"
                            }
                          >
                            {!isDesktop && (
                              <Tab eventKey="description" title="Deskripsi">
                                <div className="product-detail-short-description">
                                  {productData.shortDescription}
                                </div>
                              </Tab>
                            )}
                            <Tab eventKey="detail" title="Rincian">
                              <div className="product-detail-long-description">
                                {productData.longDescription}
                              </div>
                            </Tab>
                            <Tab eventKey="size" title="Ukuran">
                              <div>
                                <table>
                                  <tbody>
                                    <tr>
                                      <td>Panjang x Lebar x Tinggi</td>
                                      <td>:</td>
                                      <td>{`${productData.length}cm x ${productData.width}cm x ${productData.height}cm`}</td>
                                    </tr>
                                    <tr>
                                      <td>Berat</td>
                                      <td>:</td>
                                      <td>{`${productData.weight}gram`}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </Tab>
                            <Tab eventKey="shipment" title="Info Pengiriman">
                              <div className="product-detail-shipment-description">
                                {productData.shipmentDescription}
                              </div>
                            </Tab>
                            {/* {productData.isPo && (
                              <Tab eventKey="poNotes" title="PO Note">
                                <div className="product-detail-shipment-description">
                                  {productData.poNotes}
                                </div>
                              </Tab>
                            )} */}
                          </Tabs>
                        </div>

                        <div className="product-detail-info-box similar-products">
                          <Tabs defaultActiveKey="similarProducts">
                            <Tab
                              eventKey="similarProducts"
                              title="Produk Sejenis"
                              className="tab"
                            >
                              <SimilarProductList
                                id={productData.id}
                                isMobile={!isDesktop}
                              />
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </Container>
                  );
                }}
              </MediaQuery>
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(ProductDetail);
