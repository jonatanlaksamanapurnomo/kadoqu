import React from "react";
import { withRouter } from "react-router-dom";
import FavoriteStar from "./FavoriteStar";
import showTransformationsPhoto from "../library/ShowImageTransformation";
import { MUTATION_ADD_PRODUCT_CLICKED } from "../gql/tracker";
import { QUERY_GET_TOKEN } from "../gql/token";
import { Row, Col } from "react-bootstrap";
import { withApollo } from "react-apollo";
import jwt from "jsonwebtoken";

import "./ProductItem.css";

const OfferLabel = ({ label }) => (
  <div className={"product-offer-label product-offer-label-" + label}>
    {label}
  </div>
);
const SaleLabel = () => (
  <div className="product-offer-label product-offer-label-sale">
    <img
      src="https://ik.imagekit.io/nwiq66cx3pvsy/oie_1sJIbCQfFD4q.png"
      width="150%"
      alt="sale"
    ></img>
  </div>
);

class ProductItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPremium: false,
    };
  }

  render() {
    const {
      slug,
      photo,
      name,
      merchant,
      price,
      discountPrice,
      isPo,
      newToDate,
      id,
      kadoquDiscountUntil,
      merchantDiscountUntil,
    } = this.props.details;
    const isSale =
      (kadoquDiscountUntil || merchantDiscountUntil) &&
      (new Date(kadoquDiscountUntil) > new Date() ||
        new Date(merchantDiscountUntil) > new Date());

    let recommendedMerchant = this.props.details.recommendedMerchant || false;
    return (
      <>
        <div
          className="product-box cursor-pointer"
          onClick={() => {
            let search = this.props.history.location.state
              ? this.props.history.location.state.search
              : "";
            this.props.client
              .query({
                query: QUERY_GET_TOKEN,
              })
              .then(({ data }) => {
                let token = jwt.decode(data.getToken);
                let userId = token ? token.data : localStorage.guestId;
                this.props.client.mutate({
                  mutation: MUTATION_ADD_PRODUCT_CLICKED,
                  variables: {
                    userId: userId,
                    productId: id,
                    gidaOption: this.props.gidaOption
                      ? this.props.gidaOption
                      : null,
                    search: search
                  },
                });
              });

            if (this.props.gidaOption) {
              this.props.history.push({
                pathname: "/product/" + slug,
                state:{gidaOption:this.props.gidaOption,search:search}
              });
            } else {
              this.props.history.push({
                pathname: "/product/" + slug,
                state:{search:search}
              });
            }
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }}
        >
          <div className="product-image-container">
            <img
              className="product-image"
              src={showTransformationsPhoto(300, 300, photo)}
              alt={name}
            />
            {recommendedMerchant && (
              <div className="power-merchant">Rekomendasi GIdA</div>
            )}
            {/* <div className="power-merchant">Rekomendasi GIdA</div> */}
          </div>
          <div className="product-description">
            <div>
              {isPo && (
                <Row>
                  {" "}
                  <Col lg="auto" md="auto" xs={8}>
                    <div className="product-merchant">{merchant} </div>
                  </Col>{" "}
                  <Col lg={4} md="auto" xs={2}>
                    {isPo && <OfferLabel label="po" />}
                  </Col>
                </Row>
              )}
              {!isPo && (
                <Row>
                  {" "}
                  <Col lg="auto" md="auto" xs={12}>
                    <div className="product-merchant">{merchant} </div>
                  </Col>{" "}
                </Row>
              )}

              <h5 className="card-title product-title">{name}</h5>
              <div
                className={`${
                  !this.props.isMobile
                    ? "d-inline-flex align-items-baseline"
                    : "product-item-price"
                }`}
              >
                <div className="product-price-container">
                  <div className="product-price">
                    Rp{" "}
                    {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  </div>
                  {discountPrice && (
                    <div className="product-price-strikethrough" />
                  )}
                </div>
                {discountPrice && (
                  <div className="product-price product-price-discount">
                    {!this.props.isMobile ? <>&nbsp;</> : ""}Rp{" "}
                    {discountPrice
                      .toFixed(0)
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                  </div>
                )}
              </div>
            </div>
            <div className="ismob"></div>
            <FavoriteStar
              className="product-star"
              product={this.props.details}
              refetchQueries={[this.props.query]}
            />
          </div>
          {new Date(newToDate) > new Date() && <OfferLabel label="new" />}
        </div>
        <div>{isSale && <SaleLabel />}</div>
      </>
    );
  }
}

export default withApollo(withRouter(ProductItem));
