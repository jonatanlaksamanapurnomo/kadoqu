import React from "react";
import { Mutation } from "react-apollo";
import { DeleteProductCartConfirmation } from "./SweetAlerts";
import { MUTATION_DELETE_CART_PACKAGE } from "../gql/cart";
import { WRAPPING_SERVICE_FEE, GREETING_CARD_PRICE } from "../data/constants";
import "./CartWrappingDetail.css";
import IMAGES from "../data/images";

class CartWrappingDetail extends React.Component {
  state = {
    collapse: true
  };
  render() {
    const id = this.props.gift.id;
    const wrapper = this.props.gift.wrapper;
    const ribbon = this.props.gift.ribbon;
    const price =
      WRAPPING_SERVICE_FEE +
      wrapper.price +
      (ribbon && ribbon.price) +
      (this.props.gift.greetingCard && GREETING_CARD_PRICE);
    return (
      <div
        className={`kadoqu-primary-color cart-wrapping-detail ${
          this.props.index % 2 !== 0 ? "odd" : "even"
        }`}
      >
        <div className="cart-wrapping-detail-switch">
          <div>
            <div className="cart-package-number-container">
              <span className="fa-stack">
                <img
                  alt=""
                  src={IMAGES["Cart"]["gift-icon"]}
                  className="fa-stack-2x cart-package-gift-icon"
                />
                {/* <i className="fas fa-gift fa-stack-2x cart-package-number-holder"></i> */}
                <span className="fa-stack-1x cart-package-number">
                  {this.props.index}
                </span>
              </span>
            </div>
            Wrapping Lab {this.props.index}
          </div>
          <div>
            <span className="mr-2">Rp {price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</span>
            <i
              className={`fas fa-chevron-${
                this.state.collapse ? "down" : "up"
              } cart-package-menu`}
              onClick={() => this.setState({ collapse: !this.state.collapse })}
            />
            <Mutation mutation={MUTATION_DELETE_CART_PACKAGE}>
              {deleteCartPackage => (
                <i
                  className="fas fa-times cart-package-menu"
                  onClick={() =>
                    DeleteProductCartConfirmation(() =>
                      deleteCartPackage({
                        variables: { packageId: id },
                        refetchQueries: () => ["getCart","getToken","getCartLength","getSelectedCart"]
                      })
                    )
                  }
                />
              )}
            </Mutation>
          </div>
        </div>
        <div
          className={`cart-wrapping-detail-collapsible${
            this.state.collapse ? "" : " active"
          }`}
        >
          {!this.props.isMobile && (
            <div className="cart-package-number-container" />
          )}
          <div className="d-inline-flex">
            <img
              className="cart-wrapping-details-image"
              src={wrapper.image}
              alt="wrapper"
            />
            <div className="cart-wrapping-details-container">
              <div className="font-weight-bold">{wrapper.type}</div>
              <span>{wrapper.name}</span>
            </div>
          </div>
          {ribbon && (
            <div className="d-inline-flex ml-3">
              <img
                className="cart-wrapping-details-image"
                src={ribbon.image}
                alt="ribbon"
              />
              <div className="cart-wrapping-details-container">
                <div className="font-weight-bold">{ribbon.type}</div>
                <span>{ribbon.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CartWrappingDetail;
