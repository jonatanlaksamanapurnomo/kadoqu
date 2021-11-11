import React, { Component } from "react";
import { withApollo, Query } from "react-apollo";
import queryString from "query-string";
import { Button, Col, Form, Row, Tab, Nav, Container } from "react-bootstrap";
import ReactPlaceholder from "react-placeholder";
import { RectShape } from "react-placeholder/lib/placeholders";
import NavLink from "./NavLink";
import ProductItem from "./ProductItem";
import ProductNotFoundNotice from "./ProductNotFoundNotice";
import PaginationButtons from "./PaginationButtons";
import { QUERY_GET_PROMOTION_PRODUCTS_BY_SLUG } from "../gql/promotion";
import { QUERY_GET_MERCHANT_LEVEL } from "../gql/user";

import "./ProductList.css";
import "./ProductFilter.css";
import "react-placeholder/lib/reactPlaceholder.css";

/*
List of sorting method available

Key  would represent choice displayed in front end
Value present "<field_name> <int>"
  where <int> represent whether if sort should be applied ascending (1) or descending (2)
*/
const SORTING_CHOICE = {
  "A-Z": {
    sortingField: "name",
    isAscending: true
  },
  "Z-A": {
    sortingField: "name",
    isAscending: false
  },
  "Harga Termurah": {
    sortingField: "price",
    isAscending: true
  }
};

const PRODUCT_LIMIT = 16;

const awesomePlaceholder = (
  <Row className="my-awesome-placeholder">
    {Array(PRODUCT_LIMIT)
      .fill()
      .map((item, index) => (
        <Col xs={6} lg={3} key={index}>
          <RectShape
            color="lightgray"
            style={{ width: "100%", height: 320, marginBottom: "1rem" }}
          />
        </Col>
      ))}
  </Row>
);

const ListOfProducts = props => {
  let products = [];
  let Topproducts = [];
  props.products.forEach(item => {
    props.recommendedMerchant.forEach(merchant => {
      if (merchant.name === item.merchant) {
        item.recommendedMerchant = true;
      }
    });
    if (item.recommendedMerchant === true) {
      Topproducts.push(item);
    } else {
      products.push(item);
    }
  });
  products = Topproducts.concat(products);
  return (
    <Row>
      {products.map(product => {
        return (
          <Col xs={6} lg={3} key={product.id}>
            <ProductItem
              details={{
                ...product,
                photo: product.photos[0] ? product.photos[0].url : ""
              }}
              query={props.query}
              isMobile={props.isMobile}
            />
          </Col>
        );
      })}
    </Row>
  );
};

const ProductFilterMob = props => {
  const hideFilterPane = () => {
    // document
    //   .getElementById("product-list-banner-mob")
    //   .classList.remove("d-none");
    document.getElementById("filternav").style.width = "0";
    document.getElementById("filternav").style.height = "0";
    document
      .getElementById("product-list-page")
      .classList.remove("filter-active");
    props.hideFilter();
  };

  return (
    <div id="filternav" className="filternav">
      <Container>
        <Row className="filter-mob-row mb-3 align-items-center">
          <Col xs={7} className="filter-name-event">
            Filter
          </Col>
          <Col xs={5} className="text-right">
            <Button
              onClick={hideFilterPane}
              variant="link"
              className="keluarbtn-mob"
            >
              Kembali
            </Button>
          </Col>
        </Row>
        <Tab.Container id="left-tabs-example" defaultActiveKey="sort">
          <Row>
            <Col xs={5} className="menu-filter-mob">
              <Nav className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="sort">Urutan</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col xs={7} className="product-filter-mob-content">
              <Tab.Content>
                <Tab.Pane eventKey="sort">
                  <Form.Group>
                    {Object.keys(props.sortingChoices).map((value, idx) => {
                      return (
                        <Form.Check
                          custom
                          value={value}
                          key={idx}
                          label={value}
                          name="sort"
                          type="radio"
                          className="kadoqu-checkbox-button product-filter-mob-choice"
                          checked={
                            (idx === 0 && !props.sortMethod) ||
                            props.sortMethod === value
                          }
                          id={
                            "product-filter-choice-" +
                            "sort" +
                            "-" +
                            value
                              .toLowerCase()
                              .split(" ")
                              .join("-")
                          }
                          onChange={e => {
                            props.selectSortingMethod(e);
                            hideFilterPane();
                          }}
                        />
                      );
                    })}
                  </Form.Group>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileFilter: false,
      currentPage: 1,
      sortMethod: 0,
      currentSearchParam: "",
      recommendedMerchant: []
    };
  }

  handlepaginationpage(productLength) {
    if (productLength < PRODUCT_LIMIT) {
      return productLength;
    } else {
      return 1000000;
    }
  }

  updateStateByUrl = () => {
    const urlParams = queryString.parse(this.props.location.search);
    this.setState({
      currentSearchParam: this.props.location.search,
      currentPage: parseInt(this.props.match.params.page, 10),
      sortMethod: urlParams.sortBy ? urlParams.sortBy : this.state.sortMethod
    });
  };

  componentDidMount = () => {
    this.updateStateByUrl();
    this.props.client
      .query({
        query: QUERY_GET_MERCHANT_LEVEL
      })
      .then(({ data }) => {
        this.setState({
          recommendedMerchant: data.getMerchantsLevel
        });
      });
  };

  componentDidUpdate = () => {
    if (this.state.currentPage !== parseInt(this.props.match.params.page, 10)) {
      // console.log(document.getElementById("product-list-breadcrumb").offsetTop);
      window.scrollTo(
        0,
        document.getElementById("product-list-breadcrumb")
          ? document
              .getElementById("product-list-breadcrumb")
              .getBoundingClientRect().top + window.scrollY
          : 0
      );
      this.setState({
        currentPage: parseInt(this.props.match.params.page, 10)
      });
    }

    if (this.state.currentSearchParam !== this.props.location.search) {
      window.scrollTo(
        0,
        document.getElementById("product-list-breadcrumb")
          ? document
              .getElementById("product-list-breadcrumb")
              .getBoundingClientRect().top + window.scrollY
          : 0
      );
      this.updateStateByUrl();
    }
  };

  setPage = page => {
    this.props.history.push({
      pathname: `/${this.props.url
        .toLowerCase()
        .split(" ")
        .join("-")}/${page}`,
      search: this.props.location.search
    });
  };

  selectSortingMethod = e => {
    const urlParams = queryString.parse(this.props.location.search);
    const searchParams = queryString.stringify({
      ...urlParams,
      sortBy: e.target.value
    });
    this.props.history.push({
      pathname: `/${this.props.url
        .toLowerCase()
        .split(" ")
        .join("-")}/1`,
      search: searchParams
    });
  };

  render() {
    const urlParams = queryString.parse(this.props.location.search);
    const sortingChoice = urlParams.sortBy
      ? urlParams.sortBy
      : Object.keys(SORTING_CHOICE)[0];
    const { sortingField, isAscending } = SORTING_CHOICE[sortingChoice];
    const query = {
      query: QUERY_GET_PROMOTION_PRODUCTS_BY_SLUG,
      variables: {
        slug: this.props.slug,
        sortingField: sortingField,
        isAscending: isAscending,
        limit: PRODUCT_LIMIT,
        offset: this.state.currentPage - 1
      }
    };
    if (this.props.isMobile) {
      document.body.style.backgroundImage = "none";
      document.body.style.backgroundColor = "#f9f9f9";
    } else {
      document.body.style.backgroundImage =
        "-webkit-linear-gradient(172deg, #d1eff7 0%, #d1eff7 50%, #f9f9f9 50%, #f9f9f9 50%)";
    }

    return (
      <Query fetchPolicy="network-only" {...query}>
        {resProducts => (
          <div className="position-relative">
            {this.props.isMobile && (
              <ProductFilterMob
                applied={this.state.appliedFilters}
                setFilter={newFilters =>
                  this.setState({ appliedFilters: newFilters })
                }
                sortMethod={this.state.sortMethod}
                selectSortingMethod={this.selectSortingMethod}
                hideFilter={() => this.setState({ showMobileFilter: false })}
                sortingChoices={SORTING_CHOICE}
              />
            )}
            {!this.state.showMobileFilter && (
              <React.Fragment>
                <div className="product-list-container">
                  <div id="product-list-breadcrumb" className="mb-2">
                    {this.props.isMobile ? (
                      <div
                        className={
                          "d-flex justify-content-between align-items-center mx-3"
                        }
                      >
                        <div className="d-inline-block">
                          <div className="button-filter-mob">
                            <Button
                              className="btn-mob-filter"
                              variant="link"
                              onClick={() => {
                                // document
                                //   .getElementById("product-list-banner-mob")
                                //   .classList.add("d-none");
                                document
                                  .getElementById("product-list-page")
                                  .classList.add("filter-active");
                                this.setState(
                                  { showMobileFilter: true },
                                  () => {
                                    document.getElementById(
                                      "filternav"
                                    ).style.width = "100%";
                                    document.getElementById(
                                      "filternav"
                                    ).style.height = `calc(100vh - ${
                                      document.getElementById(
                                        "product-list-banner-image"
                                      ).offsetHeight
                                    }px)`;
                                  }
                                );
                              }}
                            >
                              Atur Filter & Urutan
                            </Button>
                          </div>
                        </div>
                        <div className="d-inline-block">
                          {resProducts.error || resProducts.loading
                            ? 0
                            : resProducts.data.getPromotionProductsBySlug
                                .length}{" "}
                          Produk
                        </div>
                      </div>
                    ) : (
                      <div className={"row mx-0 mt-3"}>
                        <div className="col-6 font-weight-light text-left d-flex align-items-center">
                          <NavLink href="/" className="d-inline p-0 text-dark">
                            <span className="fas fa-home pr-2" />
                            Home
                          </NavLink>
                          <span className="mx-1">></span>
                          {this.props.pageName}
                        </div>
                        <div className="col-6 text-right">
                          Atur Berdasarkan
                          <Form.Group className="d-inline-block ml-2 mb-0">
                            <Form.Control
                              as="select"
                              value={this.state.sortMethod}
                              onChange={this.selectSortingMethod}
                            >
                              {Object.keys(SORTING_CHOICE).map((value, idx) => {
                                return (
                                  <option key={idx} value={value}>
                                    {value}
                                  </option>
                                );
                              })}
                            </Form.Control>
                          </Form.Group>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row justify-content-center m-0">
                    {resProducts.error && resProducts.error.message}
                    <Col xs="12" className="container-fluid mb-3">
                      <ReactPlaceholder
                        showLoadingAnimation
                        type="media"
                        rows={20}
                        customPlaceholder={awesomePlaceholder}
                        ready={!(resProducts.loading || resProducts.error)}
                      >
                        {!(resProducts.loading || resProducts.error) &&
                          (resProducts.data.getPromotionProductsBySlug
                            .length === 0 ? (
                            <ProductNotFoundNotice />
                          ) : (
                            <>
                              <ListOfProducts
                                products={
                                  resProducts.data.getPromotionProductsBySlug
                                    .products
                                }
                                query={query}
                                recommendedMerchant={
                                  this.state.recommendedMerchant
                                }
                                isMobile={this.props.isMobile}
                              />
                              <PaginationButtons
                                paginationByUrl
                                currentPage={this.state.currentPage}
                                setPage={this.setPage}
                                itemsLength={this.handlepaginationpage(
                                  resProducts.data.getPromotionProductsBySlug
                                    .products.length
                                )}
                                limitPerPage={PRODUCT_LIMIT}
                                match={this.props.match}
                              />
                            </>
                          ))}
                      </ReactPlaceholder>
                    </Col>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </Query>
    );
  }
}

export default withApollo(ProductList);
