import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Col, Form, Row, Image } from "react-bootstrap";
import { Mutation, Query } from "react-apollo";
import { Helmet } from "react-helmet";

import WrappingLabDraggingArea from "../components/WrappingLabDraggingArea";
import WrappingLabOptionsSelector
  from "../components/WrappingLabOptionsSelector";
import WrappingLabGreetingCard from "../components/WrappingLabGreetingCard";
import WrappingLabProductItem from "../components/WrappingLabProductItem";
import { PopUpCart } from "../components/SweetAlerts";
import { numericToCurrency } from "../utils/formatter";
import {
  MUTATION_ADD_CART_PACKAGE,
  QUERY_GET_CART,
  QUERY_GET_CART_ITEMS
} from "../gql/cart";
import {
  MIN_DESKTOP_SIZE,
  GREETING_CARD_PRICE,
  WRAPPING_SERVICE_FEE
} from "../data/constants";

import "./WrappingLab.css";
import IMAGES from "../data/images";

class WrappingLab extends Component {
  state = {
    wrappedItems: [],
    wrapStage: 0,
    wrappingPaper: {
      type: {},
      instance: {}
    },
    wrappingRibbon: {
      type: {},
      instance: {}
    },
    withoutGreetingCard: false,
    greetingCard: {
      event: "",
      content: ""
    },
    mobilePages: [],
    prevYPositions: [],
    isWrapped: false
  };
  resetState = () => {
    this.setState({
      wrappedItems: [],
      wrapStage: 0,
      wrappingPaper: {
        type: {},
        instance: {}
      },
      wrappingRibbon: {
        type: {},
        instance: {}
      },
      withoutGreetingCard: false,
      greetingCard: {
        event: "",
        content: ""
      },
      mobilePages: [],
      prevYPositions: [],
      isWrapped: true
    });
  };
  wrapItem = item => {
    const { wrappedItems } = this.state;
    let flag = false;
    let tempArray = [];
    for (let i = 0; i < wrappedItems.length; i++) {
      let currentItem = wrappedItems[i];
      if (currentItem.customeOrderId === item.customeOrderId) {
        tempArray.push({
          ...currentItem,
          quantity: currentItem.quantity + 1
        });
        flag = true;
        continue;
      }
      tempArray.push(currentItem);
    }
    if (!flag) {
      tempArray.push({
        ...item,
        quantity: 1
      });
    }
    this.setState({ wrappedItems: tempArray });
  };
  unwrapItem = item => {
    const { wrappedItems } = this.state;
    let tempArray = [];
    for (let i = 0; i < wrappedItems.length; i++) {
      let currentItem = wrappedItems[i];
      if (currentItem.customeOrderId === item.customeOrderId) {
        if (currentItem.quantity - 1 > 0) {
          tempArray.push({
            ...currentItem,
            quantity: currentItem.quantity - 1
          });
        }
        continue;
      }
      tempArray.push(currentItem);
    }
    this.setState({ wrappedItems: tempArray });
    if (tempArray.length === 0) {
      this.setWrapStage(0);
    }
  };
  setWrapStage = stage => {
    this.setState({ wrapStage: stage });
  };

  setMobilePage = component => {
    const { mobilePages, prevYPositions } = this.state;
    if (!component) {
      const yPos = prevYPositions[0];
      this.setState(
        {
          mobilePages: [],
          prevYPositions: []
        },
        () => window.scrollTo(0, yPos)
      );
    }
    mobilePages.push(component);
    prevYPositions.push(window.scrollY);
    this.setState({
      mobilePages,
      prevYPositions
    });
  };

  goBackMobilePage = () => {
    const { mobilePages, prevYPositions } = this.state;
    const yPos = prevYPositions.pop();
    this.setState(
      {
        mobilePages: mobilePages.slice(0, mobilePages.length - 1),
        prevYPositions
      },
      () => window.scrollTo(0, yPos)
    );
  };

  backToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const {
      mobilePages,
      wrappedItems,
      wrapStage,
      withoutGreetingCard,
      greetingCard,
      wrappingPaper,
      wrappingRibbon
    } = this.state;
    const mobilePage = mobilePages[mobilePages.length - 1];
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => {
          if (!isDesktop && mobilePage) {
            this.backToTop();
            return mobilePage;
          }
          return (
            <React.Fragment>
              <Helmet>
                <title>Kadoqu.com | Wrapping Lab</title>
              </Helmet>
              {/* <TitleBanner route="wrapping-lab" /> */}
              <Image
                className="kids-party-banner"
                fluid
                src="https://ik.imagekit.io/nwiq66cx3pvsy/_DES__Banner_Wrapping_Lab_Tulisan.jpg"
                alt="Wrapping LB Banner"
              />
              <div className="wrapping-lab-container">
                <WrappingLabDraggingArea
                  toBeWrapped={wrappedItems}
                  wrap={this.wrapItem}
                  unwrap={this.unwrapItem}
                  setWrapStage={this.setWrapStage}
                  isMobile={!isDesktop}
                  isWrapped={this.state.isWrapped}
                />
                {wrapStage >= 1 && (
                  <React.Fragment>
                    <hr/>
                    <div className="mb-5">
                      <Form
                        onChange={() => this.setWrapStage(1)}
                        onSubmit={e => {
                          e.preventDefault();
                          if (
                            (!withoutGreetingCard && !greetingCard.event) ||
                            !wrappingPaper.type.id ||
                            !wrappingRibbon.type.id
                          )
                            return;
                          this.setWrapStage(2);
                          if (withoutGreetingCard) {
                            this.setState({
                              greetingCard: {
                                event: "",
                                content: ""
                              }
                            });
                          }
                        }}
                      >
                        <WrappingLabOptionsSelector
                          selectedWrapper={wrappingPaper}
                          selectedRibbon={wrappingRibbon}
                          setWrapper={newWrapper =>
                            this.setState({ wrappingPaper: newWrapper })
                          }
                          setRibbon={newRibbon =>
                            this.setState({ wrappingRibbon: newRibbon })
                          }
                          setMobilePage={this.setMobilePage}
                          goBack={this.goBackMobilePage}
                        />
                        <WrappingLabGreetingCard
                          setState={newState => this.setState(newState)}
                          greetingCard={greetingCard}
                          withoutGreetingCard={withoutGreetingCard}
                          setMobilePage={this.setMobilePage}
                          goBack={this.goBackMobilePage}
                        />
                        <button
                          className="kadoqu-primary-button long"
                          type="submit"
                          disabled={
                            (!withoutGreetingCard && !greetingCard.event) ||
                            !wrappingPaper.type.id ||
                            !wrappingRibbon.type.id
                          }
                        >
                          {isDesktop ? "Selesai Bungkus" : "Selesai"}
                        </button>
                      </Form>
                    </div>
                  </React.Fragment>
                )}
                {wrapStage >= 2 && (
                  <React.Fragment>
                    <hr/>
                    <div className="mb-5">
                      <div className="wrapping-lab-section-title">
                        Rincian Wrapping
                      </div>
                      <Row noGutters>
                        <Col xs={5} className="wrapping-lab-wrapped-container">
                          <Query query={QUERY_GET_CART}>
                            {({ loading, error, data }) => {
                              const giftNumber =
                                loading || error
                                  ? ""
                                  : data.getCart.packages.length + 1;
                              return (
                                <div
                                  className="wrapping-lab-wrapped-container-title">
                                  <span className="fa-stack">
                                    <img
                                      alt=""
                                      src={IMAGES["Cart"]["gift-icon"]}
                                      className="fa-stack-2x wrapping-lab-gift-icon"
                                    />
                                    <span
                                      className="fa-stack-1x wrapping-lab-gift-number">
                                      {giftNumber}
                                    </span>
                                  </span>
                                  {` Gift ${giftNumber}`}
                                </div>
                              );
                            }}
                          </Query>
                          <div
                            className="wrapping-lab-wrapped-products-container">
                            {wrappedItems.map((item, idx) => (
                              <WrappingLabProductItem key={idx} item={item}/>
                            ))}
                          </div>
                        </Col>
                        <Col xs={7} className="wrapping-lab-summary">
                          <table className="wrapping-lab-fee-details w-100">
                            <tbody>
                            <tr>
                              <td>{wrappingPaper.type.name}</td>
                              <td>
                                {"Rp " +
                                numericToCurrency(wrappingPaper.type.price)}
                              </td>
                            </tr>
                            <tr>
                              <td>{wrappingRibbon.type.name}</td>
                              <td>
                                {"Rp " +
                                numericToCurrency(
                                  wrappingRibbon.type.price
                                )}
                              </td>
                            </tr>
                            {withoutGreetingCard ? null : (
                              <tr>
                                <td>Kartu Ucapan</td>
                                <td>
                                  {"Rp " +
                                  numericToCurrency(GREETING_CARD_PRICE)}
                                </td>
                              </tr>
                            )}
                            <tr>
                              <td>Fee Bungkus</td>
                              <td>
                                {"Rp " +
                                numericToCurrency(WRAPPING_SERVICE_FEE)}
                              </td>
                            </tr>
                            <tr>
                              {!isDesktop && (
                                <td className="text-dark">Total</td>
                              )}
                              <td colSpan={isDesktop ? 2 : 1}>
                                {"Rp " +
                                numericToCurrency(
                                  wrappingPaper.type.price +
                                  wrappingRibbon.type.price +
                                  (!withoutGreetingCard &&
                                    GREETING_CARD_PRICE) +
                                  WRAPPING_SERVICE_FEE
                                )}
                              </td>
                            </tr>
                            </tbody>
                          </table>
                          <Mutation mutation={MUTATION_ADD_CART_PACKAGE}>
                            {addCartPackage => (
                              <button
                                className="kadoqu-primary-button long"
                                onClick={() =>
                                  addCartPackage({
                                    variables: {
                                      wrapper: wrappingPaper,
                                      ribbon:
                                        wrappingRibbon.type.id === -1
                                          ? {}
                                          : wrappingRibbon,
                                      greetingCard: withoutGreetingCard
                                        ? {}
                                        : greetingCard,
                                      items: wrappedItems
                                    },
                                    refetchQueries: [{ query: QUERY_GET_CART_ITEMS }]
                                  })
                                    .then(() => {
                                      window.scrollTo(0, 0);
                                      this.resetState();
                                      PopUpCart(this.props.history,
                                        () => {
                                        },
                                        "Wrapping berhasil dimasukkan",
                                        "Lanjut Bungkus Kado"
                                      );
                                    })
                                    .catch(error => console.log(error))
                                }
                              >
                                {isDesktop ? "Masukkan Keranjang" : "Bungkus"}
                              </button>
                            )}
                          </Mutation>
                        </Col>
                      </Row>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          );
        }}
      </MediaQuery>
    );
  }
}

export default WrappingLab;
