import React from "react";
import { Card, Row, Col, Modal, Button, OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import PaymentConfirmation from "./PaymentConfirmation";
import FavoriteStar from "./FavoriteStar";
import OrderTrack from "./OrderTrack";
import { withRouter, Link } from "react-router-dom";
import { Query } from "react-apollo";
// import MediaQuery from "react-responsive";
import {
  WRAPPING_SERVICE_FEE,
  GREETING_CARD_PRICE
  // MIN_DESKTOP_SIZE
} from "../data/constants";
import gql from "graphql-tag";
import "./OrderCard.css";
import showTransformationsPhoto from "../library/ShowImageTransformation";

const QUERY_GET_PRODUCT = gql`
  query getProduct($id: String) {
    getProduct(id: $id) {
      id
      name
      merchant
      shortDescription
      longDescription
      shipmentDescription
      price
      kadoquDiscount
      kadoquDiscountUntil
      merchantDiscount
      merchantDiscountUntil
      inStock
      slug
      isEnable
      isPo
      stock
      weight
      photos {
        caption
        url
      }
      length
      width
      height
      isFavorite
    }
  }
`;

class WrappingDetail extends React.Component {
  handlePopOver = e => {
    e.stopPropagation();
  };

  render() {
    const wrapper = this.props.gift.wrapper;
    const ribbon = this.props.gift.ribbon;
    return (
      <>
        <OverlayTrigger
          rootClose
          trigger={this.props.isMobile ? "click" : ["hover", "click"]}
          overlay={
            <Popover className="pop-over-wrapping">
              <div className="pop-over-title">Wrapping Lab</div>
              <div
                onMouseOver={this.props.onMouseOver}
                onMouseLeave={this.props.onMouseLeave}
                className="d-inline-flex "
              >
                {wrapper ? (
                  <div className="d-inline-flex">
                    <img
                      className="wrap-details-image"
                      src={showTransformationsPhoto(250, 250, wrapper.image)}
                      alt="wrapper"
                    />
                    <div className="wrap-details-container">
                      <div className="font-weight-bold">{wrapper.type}</div>
                      {wrapper.name ? <span>({wrapper.name})</span> : ""}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {ribbon ? (
                  <div className="d-inline-flex">
                    <img
                      className="wrap-details-image"
                      src={showTransformationsPhoto(250, 250, ribbon.image)}
                      alt="ribbon"
                    />
                    <div className="wrap-details-container">
                      <div className="font-weight-bold">{ribbon.type}</div>
                      {ribbon.name ? <span>({ribbon.name})</span> : ""}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </Popover>
          }
        >
          <div
            className={`fa-stack wrap-ribbon-${this.props.order}`}
            onClick={this.handlePopOver}
          >
            <img
              className="fa-stack-2x wrap-number-holder"
              src="https://ik.imagekit.io/nwiq66cx3pvsy/Icon_Kado.svg"
              alt="icon kado"
            />
            <span className="fa-stack-1x wrap-package-number">1</span>
          </div>
        </OverlayTrigger>
      </>
    );
  }
}

const AlamatContainer = props => {
  if (props.method === "courier") {
    const alamat =
      props.address.street +
      ", " +
      props.address.subdistrict +
      ", " +
      props.address.city +
      ", " +
      props.address.province +
      " " +
      props.address.postCode;
    return (
      <>
        <div className="order-card-address-alias">{props.address.alias}</div>
        <div className="order-card-address-name">{props.address.name}</div>
        <div className="order-card-address">{alamat}</div>
        <div className="order-card-address-phone">{props.address.phone}</div>
        <div className="order-card-address-kurir">
          Kurir Pengiriman:
          <span className="black">{" " + props.courier.toUpperCase()}</span>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="order-card-address-alias">Warehouse Kadoqu</div>
        <div className="order-card-address-name">Kadoqu Store</div>
        <div className="order-card-address">
          Jl.Prof. Eyckman 28 Pavilliun Kota Bandung, Jawa Barat
        </div>
      </>
    );
  }
};

const OrderStatusCard = props => {
  let className = "";
  if (props.status.status === 6) {
    className = "h-100";
  } else {
    className = "order-card-h";
  }

  return (
    <Col sm={3} xs={3} md={4} lg={4} className={"order-" + props.status.status}>
      <div className="h-100 order-card-status-section">
        <div
          className={
            props.status.dropDown
              ? className +
                " order-card-status d-flex align-items-center justify-content-center"
              : "h-100 order-card-status d-flex align-items-center justify-content-center"
          }
        >
          <div className="text-center">
            {props.icon}
            <br />
            <p className="mt-1 order-card-status-message">{props.msg}</p>
          </div>
        </div>
        {props.status.dropDown && props.status.status !== 6 && (
          <div className="order-card-address-section">
            <small>Alamat Pengiriman</small>
            <AlamatContainer
              method={props.status.method}
              address={props.status.alamat}
              courier={props.status.courier}
            />
          </div>
        )}
        <div className="order-card-buttons">
          {props.status.dropDown && props.status.status === 1 ? (
            <div className="order-card-address-section">
              <div>
                {" "}
                <small>Rekening Pembayaran :</small>
                <Col xs="12" md="8" className="order-thank-you-pembayaran">
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    <span>BCA</span> No. Rekening: <br></br>
                    <span>517 033 7435</span>
                  </p>
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    Atas Nama: <span>Frigard Harjono</span>
                  </p>
                </Col>
                <Col xs="12" md="8" className="order-thank-you-pembayaran">
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    <span>Mandiri</span> No. Rekening:<br></br>
                    <span>131 001 409 3902</span>
                  </p>
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    Atas Nama: <span>Frigard Harjono</span>
                  </p>
                </Col>
                <Col xs="8" md="8" className="order-thank-you-pembayaran">
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    <span>BNI</span> No. Rekening: <br></br>
                    <span>041 968 6981</span>
                  </p>
                  <p className="order-thank-you-pembayaran-caption atm-order-card">
                    Atas Nama: <span>Frigard Harjono</span>
                  </p>
                </Col>
              </div>
              <Button
                className="order-card-button"
                onClick={
                  props.isDesktop
                    ? props.handleOpenModal1
                    : props.redirectToPayment
                }
              >
                Konfirmasi Pembayaran
              </Button>
            </div>
          ) : (
            ""
          )}
          {props.status.dropDown && props.status.status !== 6 ? (
            <div className="order-card-address-section">
              <Button
                className="order-card-button"
                onClick={
                  props.isDesktop
                    ? props.handleOpenModal2
                    : props.redirectToOrderTrack
                }
              >
                Lacak Pesanan
              </Button>
            </div>
          ) : (
            ""
          )}
          {props.status.dropDown && props.status.status === 5 ? (
            <div className="order-card-address-section">
              <Link
                className="btn btn-primary order-card-button"
                to={"/rating/" + props.orderId}
              >
                Beri Rating
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Col>
  );
};

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown: false,
      preventDropDown: false,
      showModal1: false,
      showModal2: false
    };
  }

  handleDropdown = () => {
    if (!this.state.dropDown) {
      this.setState({ dropDown: true });
    } else {
      this.setState({ dropDown: false });
    }
  };

  handleOpenModal1 = e => {
    e.stopPropagation();
    this.setState({ showModal1: true });
  };

  handleOpenModal2 = e => {
    e.stopPropagation();
    this.setState({ showModal2: true });
  };

  handleCloseModal1 = () => {
    this.setState({ showModal1: false });
  };

  handleCloseModal2 = () => {
    this.setState({ showModal2: false });
  };

  redirectToPayment = () => {
    this.props.history.push("/profile/payment-confirmation", {
      page: this.props.match.url,
      order: this.props.order
    });
  };

  redirectToOrderTrack = () => {
    this.props.history.push("/profile/track-order", {
      page: this.props.match.url,
      order: this.props.order
    });
  };

  ModalPayment = props => {
    return (
      <Modal
        size="lg"
        show={this.state.showModal1}
        onHide={this.handleCloseModal1}
        centered="true"
        className="modal-payment"
      >
        <Modal.Body className="order-card-modal-payment p-0">
          <PaymentConfirmation
            back={this.handleCloseModal1}
            order={props.order}
            orderStatus={props.orderStatus}
            limit={props.limit}
            offset={props.offset}
          />
        </Modal.Body>
      </Modal>
    );
  };

  ModalTrack = props => {
    return (
      <Modal
        size="md"
        show={this.state.showModal2}
        onHide={this.handleCloseModal2}
        centered="true"
        className="modal-payment"
      >
        <Modal.Body className="order-card-modal-payment p-0">
          <OrderTrack
            order={props.order}
            isDesktop={props.isDesktop}
            back={this.handleCloseModal2}
          />
        </Modal.Body>
      </Modal>
    );
  };

  convertRupiah(input) {
    return input.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  TotalContainer = props => {
    return (
      <Row className={"order-card-bill-detail mb-1 " + props.bold}>
        <Col className=" " sm={4} xs={4} md={4} lg={4} />
        <Col className="pl-0" sm={5} xs={5} md={5} lg={5}>
          {props.text}
        </Col>
        <Col
          className={"pl-0 order-card-price " + props.warna}
          sm={3}
          xs={3}
          md={3}
          lg={3}
        >
          <small
            className={props.bold ? props.bold : "order-card-total-price "}
          >
            Rp {" " + this.convertRupiah(props.price)}
          </small>
        </Col>
      </Row>
    );
  };

  ProductRow = props => {
    const query = {
      query: QUERY_GET_PRODUCT,
      variables: { id: props.products.product.id }
    };
    return (
      <>
        <Row className="order-card-item" key={props.products.id}>
          <Col
            className="order-card-favorite-star vertical-center "
            sm={1}
            xs={1}
            md={1}
            lg={1}
          >
            <Query {...query}>
              {({ loading, error, data }) => (
                <FavoriteStar
                  className=""
                  product={loading || error ? {} : data.getProduct}
                  refetchQueries={[query]}
                />
              )}
            </Query>
          </Col>
          <Col
            className="order-card-product-image-container vertical-center "
            sm={1}
            xs={1}
            md={2}
            lg={2}
          >
            <img
              className="order-card-product-image"
              src={showTransformationsPhoto(
                250,
                250,
                props.products.product.image
              )}
              alt="img"
            ></img>
          </Col>
          <Col
            className="order-card-product-merchant-and-name vertical-center pr-1"
            sm={7}
            xs={6}
            md={6}
            lg={6}
          >
            <small className="order-card-product-merchant">
              {props.products.product.merchant + " x" + props.products.quantity}
            </small>
            <p className="order-card-product-name">
              {props.products.product.name}{" "}
            </p>
          </Col>

          {this.state.dropDown ? (
            <Col
              className="order-card-product-price vertical-center py-0"
              sm={3}
              xs={3}
              md={3}
              lg={3}
            >
              <div className="cart-product-item-price-container">
                {props.products.product.merchantDiscount === 0 &&
                  props.products.product.kadoquDiscount === 0 && (
                    <small className="">
                      Rp{" "}
                      {" " +
                        this.convertRupiah(
                          props.products.product.price * props.products.quantity
                        )}
                    </small>
                  )}
                {props.products.product.merchantDiscount > 0 && (
                  <>
                    <small className="cart-product-item-strikethrough">
                      Rp{" "}
                      {" " +
                        this.convertRupiah(
                          props.products.product.price * props.products.quantity
                        )}
                    </small>
                    <br />
                    <small className="red">
                      Rp{" "}
                      {" " +
                        this.convertRupiah(
                          props.products.product.merchantDiscount *
                            // 1.2 *
                            props.products.quantity
                        )}
                    </small>
                  </>
                )}
                {props.products.product.kadoquDiscount > 0 && (
                  <>
                    <small className="order-card-item-strikethrough">
                      Rp{" "}
                      {" " +
                        this.convertRupiah(
                          props.products.product.price * props.products.quantity
                        )}
                    </small>
                    <br />
                    <small className="red">
                      Rp{" "}
                      {" " +
                        this.convertRupiah(
                          props.products.product.kadoquDiscount *
                            // 1.2 *
                            props.products.quantity
                        )}
                    </small>
                  </>
                )}
              </div>
            </Col>
          ) : (
            ""
          )}
        </Row>
      </>
    );
  };

  OrderStatus = props => {
    let prop = props;
    if (props.status === 1) {
      let icon = (
        <>
          <span className="fa-stack icon">
            <i className="fas fa-circle fa-stack-2x icon-background-1"></i>
            <i className="fas fa-file-invoice-dollar fa-stack-1x icon-1"></i>
          </span>
        </>
      );
      return (
        <OrderStatusCard
          msg="Menunggu Pembayaran"
          icon={icon}
          status={prop}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    } else if (props.status === 2) {
      let icon = (
        <>
          <span className="fa-stack icon">
            <i className="fas fa-circle fa-stack-2x icon-background-2"></i>
            <i className="fas fa-clock fa-stack-1x icon-2"></i>
          </span>
        </>
      );
      return (
        <OrderStatusCard
          msg="Proses Verifikasi Pembayaran"
          icon={icon}
          status={prop}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    } else if (props.status === 3) {
      let icon = (
        <>
          <span className="fa-stack icon">
            <i className="fas fa-circle fa-stack-2x icon-background-3"></i>
            <i className="fas fa-receipt fa-stack-1x icon-3"></i>
          </span>
        </>
      );

      return (
        <OrderStatusCard
          msg="Pesanan Diproses"
          icon={icon}
          status={prop}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    } else if (props.status === 4) {
      let icon =
        props.method === "warehouse" ? (
          <>
            <span className="fa-stack icon">
              <i className="fas fa-circle fa-stack-2x icon-background-4"></i>
              <i className="fas fa-check fa-stack-1x icon-4"></i>
            </span>
          </>
        ) : (
          <>
            <span className="fa-stack icon">
              <i className="fas fa-circle fa-stack-2x icon-background-4"></i>
              <i className="fas fa-truck fa-stack-1x icon-4"></i>
            </span>
          </>
        );
      return (
        <OrderStatusCard
          msg={
            props.method === "warehouse"
              ? "Pesanan Siap Diambil"
              : "Pesanan Telah Dikirim"
          }
          icon={icon}
          status={prop}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    } else if (props.status === 5) {
      let icon = (
        <>
          <span className="fa-stack icon">
            <i className="fas fa-circle fa-stack-2x icon-background-5"></i>
            <i className="fas fa-box-open fa-stack-1x icon-5"></i>
          </span>
        </>
      );
      return (
        <OrderStatusCard
          msg={
            props.method === "warehouse"
              ? "Pesanan Sudah Diambil"
              : "Pesanan Sampai"
          }
          icon={icon}
          status={prop}
          orderId={props.orderId}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    } else if (prop.status === 6) {
      let icon = (
        <>
          <span className="fa-stack icon">
            <i className="fas fa-circle fa-stack-2x icon-background-6"></i>
            <i className="fas fa-times fa-stack-1x icon-6"></i>
          </span>
        </>
      );
      return (
        <OrderStatusCard
          msg="Pesanan Dibatalkan"
          icon={icon}
          status={prop}
          isDesktop={props.isDesktop}
          handleOpenModal1={this.handleOpenModal1}
          redirectToPayment={this.redirectToPayment}
          handleOpenModal2={this.handleOpenModal2}
          redirectToOrderTrack={this.redirectToOrderTrack}
        />
      );
    }
    return "";
  };

  render() {
    const {
      order,
      onClick,
      isDesktop,
      orderStatus,
      limit,
      offset
    } = this.props;
    let totalWrap = 0;
    // console.log(orderStatus, limit, offset);
    if (order.orderWrappings.length >= 1) {
      order.orderWrappings.forEach(
        wrapped =>
          (totalWrap +=
            WRAPPING_SERVICE_FEE +
            wrapped.wrapper.price +
            (wrapped.ribbon && wrapped.ribbon.price) +
            (wrapped.greetingCard && GREETING_CARD_PRICE))
      );
    }

    return (
      <React.Fragment>
        <Card
          onClick={this.handleDropdown}
          className={
            this.state.dropDown
              ? `order-card-drop ${this.props.className}`
              : `order-card  ${this.props.className}`
          }
        >
          <Row className="order-card-left-side" onClick={onClick}>
            <Col className="pr-0" sm={9} xs={9} md={8} lg={8}>
              <div className="order-card-ordered-items-list">
                <div className="order-card-order-number-container">
                  <p className="order-card-order-number">
                    No. Order: #{order.number}
                  </p>
                </div>
                {order.orderWrappings.length >= 1 && !this.state.dropDown ? (
                  <React.Fragment>
                    <WrappingDetail
                      index={1}
                      gift={order.orderWrappings[0]}
                      isMobile={false}
                      order={"first"}
                    />
                    <div className={`wrapped-item-first`}>
                      <this.ProductRow
                        products={order.orderWrappings[0].items[0]}
                        key={order.orderWrappings[0].items[0].product.id}
                      />
                    </div>
                  </React.Fragment>
                ) : (
                  ""
                )}
                {order.orderWrappings.length >= 1 && this.state.dropDown
                  ? order.orderWrappings.map((wrapped, index) => {
                      return (
                        <React.Fragment key={wrapped.id}>
                          <WrappingDetail
                            index={index + 1}
                            gift={wrapped}
                            isMobile={false}
                            order={index === 0 ? "first" : "any"}
                          />
                          <div
                            className={`wrapped-item-${
                              index === 0 ? "first" : "any"
                            }`}
                          >
                            {wrapped.items.map(item => (
                              <this.ProductRow
                                products={item}
                                key={item.product.id}
                              />
                            ))}
                          </div>
                        </React.Fragment>
                      );
                    })
                  : ""}
                {!this.state.dropDown &&
                !order.orderWrappings.length >= 1 &&
                order.orderProducts.length > 0 ? (
                  <this.ProductRow
                    products={order.orderProducts[0]}
                    key={order.orderProducts[0].id}
                  />
                ) : (
                  ""
                )}
                {this.state.dropDown &&
                  order.orderProducts.map(products => (
                    <this.ProductRow products={products} key={products.id} />
                  ))}
              </div>

              {this.state.dropDown ? (
                <>
                  <Row className="order-card-hr"></Row>
                  <this.TotalContainer
                    text="Total Barang"
                    price={order.productTotal - totalWrap}
                    warna="black"
                    bold=""
                  />
                  <this.TotalContainer
                    text="Total Diskon"
                    price={order.productDiscount}
                    warna="red"
                    bold=""
                  />
                  <this.TotalContainer
                    text="Discount Voucher"
                    price={order.voucherDiscount ? order.voucherDiscount : 0}
                    warna="red"
                    bold=""
                  />
                  <this.TotalContainer
                    text="Ongkos Kirim"
                    price={order.shippingFee ? order.shippingFee : 0}
                    warna="black"
                    bold=""
                  />
                  {order.donation && (
                    <this.TotalContainer
                      text="Donation"
                      price={order.donation}
                      warna="black"
                      bold=""
                    />
                  )}
                  {order.orderWrappings.length >= 1
                    ? order.orderWrappings.map((wrapped, index) => (
                        <this.TotalContainer
                          key={index}
                          text={"Wrapping Lab " + (index + 1)}
                          price={
                            WRAPPING_SERVICE_FEE +
                            wrapped.wrapper.price +
                            (wrapped.ribbon && wrapped.ribbon.price) +
                            (wrapped.greetingCard && GREETING_CARD_PRICE)
                          }
                          warna="black"
                          bold=""
                        />
                      ))
                    : ""}
                  <Row>
                    <Col sm={4} xs={4} lg={4} md={4}>
                      <span></span>
                    </Col>
                    <Col
                      className="order-card-hr-grand-total"
                      sm={8}
                      xs={8}
                      lg={8}
                      md={8}
                    ></Col>
                  </Row>
                  <this.TotalContainer
                    text="Grand Total"
                    price={order.total}
                    warna="black"
                    bold="order-card-grand-total"
                  />
                </>
              ) : (
                ""
              )}
            </Col>

            <this.OrderStatus
              status={order.orderStatusId}
              dropDown={this.state.dropDown}
              alamat={order.shippingAddress}
              method={order.shippingMethod}
              courier={order.courierCode + " " + order.courierService}
              orderId={order.id}
              isDesktop={this.props.isDesktop}
            />
          </Row>
        </Card>
        {isDesktop ? (
          <this.ModalPayment
            order={order}
            orderStatus={orderStatus}
            limit={limit}
            offset={offset}
          />
        ) : (
          ""
        )}
        {isDesktop ? (
          <this.ModalTrack order={order} isDesktop={isDesktop} />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(OrderCard);
