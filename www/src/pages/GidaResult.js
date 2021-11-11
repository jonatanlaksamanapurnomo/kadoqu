import React from "react";
import { Query, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Row, Col, Container } from "react-bootstrap";
import MediaQuery from "react-responsive";
import ProductItem from "../components/ProductItem";
import NavLink from "../components/NavLink";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./GidaResult.css";

const QUERY_GET_PRODUCTS = gql`
  query getGidaResults(
    $person: String
    $event: String
    $traits: [String]
    $limit: Int
    $offset: Int
  ) {
    getGidaResults(
      person: $person
      event: $event
      traits: $traits
      limit: $limit
      offset: $offset
    ) {
      id
      name
      merchant
      slug
      inStock
      price
      isFavorite
      photos {
        url
      }
      holidayCategories {
        name
        id
      }
      categories {
        name
        id

        children {
          name
          id
        }
        parent {
          name
        }
      }
    }
  }
`;
const QUERY_GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getCategories {
      name
      parentId
    }
    getHolidayCategories {
      name
    }
  }
`;

const MOBILE_PRODUCT_LIMIT = 8;
const DESKTOP_PRODUCT_LIMIT = 4;

class MobileResult extends React.Component {
  state = {
    slidingState: {
      startX: 0,
      currentScrollLeft: 0,
      isDown: false
    }
  };

  componentDidUpdate = () => {
    if (this.props.reset) {
      this.container.scrollLeft = 0;
      this.props.restartResetState();
    }
  };

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
        className="gida-result-mobile-container"
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
                isFavorite: product.isFavorite
              }}
              gidaOption={this.props.gidaOption}
              query={this.props.query}
            />
          );
        })}
      </div>
    );
  }
}

const Results = props => {
  const query = {
    query: QUERY_GET_PRODUCTS,
    variables: {
      person: localStorage.person,
      event: localStorage.event,
      traits: JSON.parse(localStorage.traits),
      offset: props.offset || 0,
      ...(props.isMobile && { limit: MOBILE_PRODUCT_LIMIT })
    }
  };
  return (
    <Query {...query}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data.getGidaResults.length === 0) {
          props.history.push("/gida-search-engine/not-found");
        }
        console.log(data);
        if (props.isMobile) {
          return (
            <MobileResult
              data={data.getGidaResults}
              reset={props.reset}
              restartResetState={props.restartResetState}
              gidaOption={props.history.location.state}
              query={query}
            />
          );
        }
        return (
          <Row>
            {data.getGidaResults.map(product => {
              let productCategories = [];
              product.categories.forEach(category => {
                productCategories.push(category.name);
              });
              console.log(productCategories);
              return (
                <Col xs={3} key={product.id}>
                  <ProductItem
                    details={{
                      id: product.id,
                      slug: product.slug,
                      merchant: product.merchant,
                      name: product.name,
                      photo: product.photos[0] ? product.photos[0].url : "",
                      price: product.price,
                      isFavorite: product.isFavorite
                    }}
                    gidaOption={props.history.location.state}
                    query={query}
                  />
                </Col>
              );
            })}
          </Row>
        );
      }}
    </Query>
  );
};

class GidaResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      tanyaGidaClicked: 0,
      resetSlider: false,
      storeCategories: {},
      holidayCategories: {}
    };
  }
  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_GET_ALL_CATEGORIES
      })
      .then(({ data }) => {
        let storeCategories = {};
        data.getCategories.forEach(categories => {
          storeCategories[categories.name] = 0;
        });
        let holidayCategories = {};
        data.getHolidayCategories.forEach(categories => {
          holidayCategories[categories.name] = 0;
        });
        this.setState({
          storeCategories: storeCategories,
          holidayCategories: holidayCategories
        });
      });
  };
  handleOnDragStart = e => e.preventDefault();
  render() {
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Container fluid>
            <div className={`d-flex flex-column${isDesktop ? "-reverse" : ""}`}>
              <h1 className="gida-result-title">
                Kata Mama sih itu kado yang cocok...
              </h1>
              <div
                className={`gida-result-products-${
                  isDesktop ? "desktop" : "mobile"
                }`}
              >
                <Results
                  offset={this.state.offset}
                  isMobile={!isDesktop}
                  history={this.props.history}
                  reset={this.state.resetSlider}
                  restartResetState={() =>
                    this.setState({ resetSlider: false })
                  }
                />
              </div>
            </div>
            <Row
              className={`justify-content-center m-auto${
                isDesktop ? " w-75" : ""
              }`}
            >
              {isDesktop && (
                <Col sm="4" className="d-flex">
                  <NavLink
                    href="/gida-search-engine/criteria"
                    className="p-0 m-auto"
                  >
                    <button className="kadoqu-primary-button short">
                      Tanya Ulang
                    </button>
                  </NavLink>
                </Col>
              )}
              <Col
                xs={isDesktop ? 4 : 5}
                className={`text-center ${
                  isDesktop ? "" : "gida-result-image-container"
                }`}
              >
                <img
                  className="result-image-container"
                  src={IMAGES["Mama GIdA"]["half"]}
                  alt="GIdA"
                />
              </Col>
              <Col
                xs={isDesktop ? 4 : 12}
                className={
                  "d-flex justify-content-center" +
                  (isDesktop ? "" : " gida-result-mobile-button-container")
                }
              >
                <div className="my-auto">
                  {(isDesktop || this.state.tanyaGidaClicked < 3) && (
                    <button
                      onClick={() => {
                        this.setState({
                          offset:
                            this.state.offset +
                            (isDesktop
                              ? DESKTOP_PRODUCT_LIMIT
                              : MOBILE_PRODUCT_LIMIT),
                          tanyaGidaClicked: this.state.tanyaGidaClicked + 1,
                          resetSlider: true
                        });
                      }}
                      className="kadoqu-primary-button short"
                    >
                      Cari Lagi
                    </button>
                  )}
                  {this.state.tanyaGidaClicked >= 3 && (
                    <NavLink
                      href="/gida-search-engine/not-found"
                      className="p-0"
                    >
                      <button
                        className={
                          "kadoqu-primary-button short" +
                          (isDesktop ? " mt-2" : "")
                        }
                      >
                        Kontak GIdA
                      </button>
                    </NavLink>
                  )}
                </div>
                {!isDesktop && (
                  <NavLink
                    href="/gida-search-engine/criteria"
                    className="p-0 my-auto ml-3"
                  >
                    <button className="kadoqu-primary-button short">
                      Tanya Ulang
                    </button>
                  </NavLink>
                )}
              </Col>
            </Row>
          </Container>
        )}
      </MediaQuery>
    );
  }
}

export default withApollo(GidaResult);
