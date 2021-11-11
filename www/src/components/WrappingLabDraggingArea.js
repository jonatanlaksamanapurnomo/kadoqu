import React from "react";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { PopUpEmptyCart } from "./SweetAlerts";
import WrappingLabProductItem from "./WrappingLabProductItem";
import { QUERY_GET_CART_ITEMS } from "../gql/cart";

import "./WrappingLabDraggingArea.css";

const subtractCart = (cart, subtraction) => {
  let subtractionObject = {};
  subtraction.forEach(item => {
    let key = item.customeOrderId;
    subtractionObject[key] = item.quantity;
  });
  let newCart = [];
  cart.forEach(item => {
    let key = item.customeOrderId;
    if (!subtractionObject[key]) {
      newCart.push({
        ...item,
        quantity: item.quantity
      });
    } else if (item.quantity - subtractionObject[key] > 0) {
      newCart.push({
        ...item,
        quantity: item.quantity - subtractionObject[key]
      });
    }
  });
  return newCart;
};

class WrappingLabDraggingArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unwrapped: {
        startX: 0,
        currentScrollLeft: 0,
        isDown: false,
        preventScroll: false
      },
      wrapped: {
        startX: 0,
        currentScrollLeft: 0,
        isDown: false,
        preventScroll: false
      }
    };
    this.dndAreaUnwrapped = React.createRef();
    this.dndAreaWrapped = React.createRef();
  }

  setUnwrappedState = newState => {
    this.setState({
      unwrapped: Object.assign(this.state.unwrapped, newState)
    });
  };
  setWrappedState = newState => {
    this.setState({
      wrapped: Object.assign(this.state.wrapped, newState)
    });
  };
  startSliding = (e, ref, states, setState) => {
    if (states.preventScroll) {
      return;
    }
    e.preventDefault();
    const slider = ref.current;
    slider.classList.add("active");
    setState({
      isDown: true,
      startX: e.pageX,
      currentScrollLeft: slider.scrollLeft
    });
  };
  stopSliding = (ref, setState) => {
    setState({ isDown: false });
    const slider = ref.current;
    slider.classList.remove("active");
  };
  onSliding = (e, ref, states) => {
    if (!states.isDown || states.preventScroll) {
      return;
    }
    const slider = ref.current;
    const walk = (e.pageX - states.startX) * 1.4;
    this.setState({}, () => {
      slider.scrollLeft = states.currentScrollLeft - walk;
    });
  };

  render() {
    const {
      isMobile,
      history,
      unwrap,
      wrap,
      toBeWrapped,
      setWrapStage,
      isWrapped
    } = this.props;
    const { unwrapped, wrapped } = this.state;
    return (
      <Query query={QUERY_GET_CART_ITEMS} fetchPolicy="network-only">
        {({ loading, error, data }) => {
          if (
            !isWrapped &&
            !(loading || error) &&
            data.getCartItems.length === 0
          ) {
            PopUpEmptyCart(() => {
              history.push("/1001-inspirasi-kado");
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            });
          }
          return (
            <div className="mb-5">
              <div className="wrapping-lab-section-title">
                Isi keranjang kamu
              </div>
              <div
                className="wrapping-lab-dropping-area"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  if (e.dataTransfer.getData("source") === "wrapped") {
                    unwrap(JSON.parse(e.dataTransfer.getData("itemDetail")));
                  }
                }}
              >
                {loading ? (
                  <div className="wrapping-lab-dragging-area-hint">
                    Loading...
                  </div>
                ) : error ? (
                  <div className="wrapping-lab-dragging-area-hint">
                    Error! {error.message || error}
                  </div>
                ) : data.getCartItems.length === 0 ? (
                  <div className="wrapping-lab-dragging-area-hint">
                    Cart kamu kosong...
                  </div>
                ) : (
                  <div
                    className="wrapping-lab-dragging-area"
                    ref={this.dndAreaUnwrapped}
                    onMouseDown={e => {
                      this.startSliding(
                        e,
                        this.dndAreaUnwrapped,
                        unwrapped,
                        this.setUnwrappedState
                      );
                    }}
                    onMouseLeave={() => {
                      this.stopSliding(
                        this.dndAreaUnwrapped,
                        this.setUnwrappedState
                      );
                    }}
                    onMouseUp={() => {
                      this.stopSliding(
                        this.dndAreaUnwrapped,
                        this.setUnwrappedState
                      );
                    }}
                    onMouseMove={e => {
                      this.onSliding(e, this.dndAreaUnwrapped, unwrapped);
                    }}
                  >
                    {console.log(data)}
                    {subtractCart(data.getCartItems, toBeWrapped).map(
                      (item, idx) => (
                        <WrappingLabProductItem
                          draggable={!item.minQty || item.minQty === 1}
                          key={idx}
                          item={item}
                          isMobile={isMobile}
                          source="unwrapped"
                          preventScroll={value =>
                            this.setUnwrappedState({ preventScroll: value })
                          }
                          handleWrap={wrap}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
              <h3
                className="wrapping-lab-section-title"
                onClick={() => (this.dndAreaUnwrapped.current.scrollLeft = 400)}
              >
                Apa saja yang mau dibungkus?
              </h3>
              <div
                className="wrapping-lab-dropping-area"
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  if (e.dataTransfer.getData("source") === "unwrapped") {
                    wrap(JSON.parse(e.dataTransfer.getData("itemDetail")));
                  }
                }}
              >
                {toBeWrapped.length > 0 ? (
                  <div
                    className="wrapping-lab-dragging-area"
                    ref={this.dndAreaWrapped}
                    onMouseDown={e => {
                      this.startSliding(
                        e,
                        this.dndAreaWrapped,
                        wrapped,
                        this.setWrappedState
                      );
                    }}
                    onMouseLeave={() => {
                      this.stopSliding(
                        this.dndAreaWrapped,
                        this.setWrappedState
                      );
                    }}
                    onMouseUp={() => {
                      this.stopSliding(
                        this.dndAreaWrapped,
                        this.setWrappedState
                      );
                    }}
                    onMouseMove={e => {
                      this.onSliding(e, this.dndAreaWrapped, wrapped);
                    }}
                  >
                    {toBeWrapped.map((item, idx) => (
                      <WrappingLabProductItem
                        draggable
                        key={idx}
                        item={item}
                        isMobile={isMobile}
                        source="wrapped"
                        preventScroll={value =>
                          this.setWrappedState({ preventScroll: value })
                        }
                        handleWrap={unwrap}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className="wrapping-lab-dragging-area-hint text-uppercase">
                    {isMobile
                      ? "Klik panah di bawah item belanjaan"
                      : "Tarik / drag belanjaan kamu ke sini"}{" "}
                    untuk dibungkus
                  </div>
                )}
              </div>
              <button
                className="kadoqu-primary-button long"
                onClick={() => toBeWrapped.length > 0 && setWrapStage(1)}
                disabled={toBeWrapped.length === 0}
              >
                {isMobile ? "Mulai" : "Mulai Bungkus"}
              </button>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(WrappingLabDraggingArea);
