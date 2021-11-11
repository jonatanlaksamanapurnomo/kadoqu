import React, { Component } from "react";
import { withApollo, Query } from "react-apollo";
// import gql from "graphql-tag";
import queryString from "query-string";
import { Button, Col, Form, Row } from "react-bootstrap";
import NavLink from "./NavLink";
import ProductFilter from "./ProductFilter";
import ProductItem from "./ProductItem";
import ProductFilterMob from "./ProductFilterMob";
import ProductNotFoundNotice from "./ProductNotFoundNotice";
import PaginationButtons from "./PaginationButtons";
import { QUERY_GET_FILTERS } from "../gql/filter";
import { QUERY_GET_HOLIDAY_PRODUCTS } from "../gql/elasticsearch";
import { KADOQU_NAME_AS_MERCHANT } from "../data/constants";
import ReactPlaceholder from "react-placeholder";
import "./ProductList.css";
import "react-placeholder/lib/reactPlaceholder.css";
import { RectShape } from "react-placeholder/lib/placeholders";
import "./ProductList.css";

const SORTING_CHOICE = {
  "Produk Terbaru": {
    sortingField: "created_at",
    isAscending: false
  },
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

const PRODUCT_LIMIT = 12;

const awesomePlaceholderMOB = (
  <div className='my-awesome-placeholder placeholder-product-list'>
    {Array(4)
      .fill()
      .map((item, index) => (
        <>
          <Row key={index}>
            <Col>
              <RectShape color="lightgray" style={{ width: 150, height: 170 }}
                         rows={5}/>
            </Col>
            <Col>
              <RectShape color="lightgray" style={{ width: 150, height: 170 }}
                         rows={5}/>
            </Col>


          </Row>
          <br/>
        </>
      ))}

  </div>
);
const awesomePlaceholder = (
  <div className='my-awesome-placeholder placeholder-product-list'>
    {Array(4)
      .fill()
      .map((item, index) => (
        <>
          <Row key={index}>
            <Col>
              <RectShape color="lightgray" style={{ width: 280, height: 320 }}
                         rows={1}/>
            </Col>
            <Col>
              <RectShape color="lightgray" style={{ width: 280, height: 320 }}
                         rows={1}/>
            </Col>
            <Col>
              <RectShape color="lightgray" style={{ width: 280, height: 320 }}
                         rows={1}/>
            </Col>

          </Row>
          <br/>
        </>
      ))}

  </div>
);
const filterplaceholder = (
  <div className='mb-5 filter-placeholder'>

    <RectShape color="lightgray" style={{ width: 320, height: 1090 }} rows={3}/>


    <br/>


  </div>
);


const ListOfProducts = props => (
  <Row>
    {props.products.map(product => (
      <Col xs={6} lg={4} key={product.id}>
        <ProductItem
          details={{
            ...product,
            photo: product.photos[0] ? product.photos[0].url : ""
          }}
          query={props.query}
          isMobile={props.isMobile}
        />
      </Col>
    ))}
  </Row>
);

class ProductHolidayList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileFilter: false,
      currentPage: 1,
      sortMethod: 0,
      tanda: false,
      ready: true,
      appliedFilters: {
        events: new Set(),
        categories: new Set(),
        holidays: new Set(),
        subcategories: new Set(),
        price: [0, 25000000],
        offers: new Set(),
        colors: new Set(),
        shippingSupports: new Set(),
        brands: new Set()
      },
      currentSearchParam: ""
    };
  }

  updateStateByUrl = () => {
    const urlParams = queryString.parse(this.props.location.search);

    if (
      urlParams.filterCategories &&
      urlParams.filterSubcategories &&
      urlParams.filterSubcategories.length > 0
    ) {
      this.props.setAppliedCategory(
        typeof urlParams.filterCategories === "string"
          ? urlParams.filterCategories
          : urlParams.filterCategories[0]
      );
    }

    let filters = {};

    if (urlParams.filterMinPrice) {
      filters["price"] = [
        parseInt(urlParams.filterMinPrice),
        parseInt(urlParams.filterMaxPrice)
      ];
    }
    Object.entries(urlParams).forEach(([key, value]) => {
      if (key === "sortBy" || key.includes("Price")) {
        return;
      }
      filters[key.charAt(6).toLowerCase() + key.slice(7)] = new Set(
        typeof value === "string" ? [value] : value
      );
    });
    this.setState({
      currentSearchParam: this.props.location.search,
      currentPage: parseInt(this.props.match.params.page, 10),
      sortMethod: urlParams.sortBy ? urlParams.sortBy : this.state.sortMethod,
      appliedFilters: {
        events: new Set(),
        categories: new Set(),
        holidays: new Set(),
        subcategories: new Set(),
        price: [0, 25000000],
        offers: new Set(),
        colors: new Set(),
        shippingSupports: new Set(),
        brands: new Set(),
        ...filters
      }
    });
  };

  componentDidMount = () => {
    this.updateStateByUrl();
    if (this.state.ready === true) {
      this.setState({ ready: false });
      setTimeout(function() {
        this.setState({ ready: true });
      }.bind(this), 2000);  // wait 5 seconds, then reset to false
    }

  };


  componentDidUpdate = () => {
    if (this.state.ready === true && this.state.tanda === true) {
      this.setState({ ready: false });
      setTimeout(function() {
        this.setState({ ready: true });
      }.bind(this), 2000);  // wait 5 seconds, then reset to false
      this.setState({ tanda: false });

    }
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
      pathname: `/${this.props.pageName
        .toLowerCase()
        .split(" ")
        .join("-")}/${page}`,
      search: this.props.location.search
    });
    this.setState({ tanda: true });

  };

  selectSortingMethod = e => {
    const urlParams = queryString.parse(this.props.location.search);
    const searchParams = queryString.stringify({
      ...urlParams,
      sortBy: e.target.value
    });
    this.props.history.push({
      pathname: `/${this.props.pageName
        .toLowerCase()
        .split(" ")
        .join("-")}/1`,
      search: searchParams
    });
  };

  applyFilter = () => {
    const urlParams = queryString.parse(this.props.location.search);
    let filterParams = {};
    if (
      this.state.appliedFilters.price[0] > this.state.appliedFilters.price[1]
    ) {
      filterParams["filterMinPrice"] = this.state.appliedFilters.price[1];
      filterParams["filterMaxPrice"] = this.state.appliedFilters.price[0];
    } else {
      filterParams["filterMinPrice"] = this.state.appliedFilters.price[0];
      filterParams["filterMaxPrice"] = this.state.appliedFilters.price[1];
    }
    Object.entries(this.state.appliedFilters).forEach(([key, filterValues]) => {
      if (key === "price") {
        return;
      }
      filterParams[`filter${key.charAt(0).toUpperCase() + key.slice(1)}`] =
        typeof filterValues === "string"
          ? filterValues
          : Array.from(filterValues);
    });
    const searchParams = queryString.stringify({
      ...filterParams,
      sortBy: urlParams.sortBy
    });
    this.props.history.push({
      pathname: `/${this.props.pageName
        .toLowerCase()
        .split(" ")
        .join("-")}/1`,
      search: searchParams
    });
  };

  resetFilter = () => {
    const urlParams = queryString.parse(this.props.location.search);

    this.props.history.push({
      pathname: `/${this.props.pageName
        .toLowerCase()
        .split(" ")
        .join("-")}/1`,
      search: queryString.stringify({
        sortBy: urlParams.sortBy
      })
    });
  };

  render() {

    const urlParams = queryString.parse(this.props.location.search);
    // let pathName = this.props.location.pathname;

    const sortingChoice = urlParams.sortBy
      ? urlParams.sortBy
      : Object.keys(SORTING_CHOICE)[0];
    const { sortingField, isAscending } = SORTING_CHOICE[sortingChoice];
    let filter = {
      from: this.state.currentPage - 1,
      storeCategories: urlParams.filterEvents || [],
      holidayCategories: urlParams.filterHolidays || [],
      categories: urlParams.filterCategories
        ? urlParams.filterSubcategories || urlParams.filterCategories
        : [],
      price:
        urlParams.filterMinPrice && urlParams.filterMaxPrice
          ? [
            parseInt(urlParams.filterMinPrice),
            parseInt(urlParams.filterMaxPrice)
          ]
          : [],
      merchant: urlParams.filterBrands || [],
      others: urlParams.others || [],
      productName: urlParams.productName
    };
    switch (sortingField) {
      case "sortByNameDesc":
        filter.sortByNameDesc = !isAscending;
        break;
      case "sortByPriceDesc":
        filter.sortByPriceDesc = !isAscending;
        break;
      default:
        //do nothing
        break;
    }
    const query = {
      query: QUERY_GET_HOLIDAY_PRODUCTS,
      variables: {
        filter: filter
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
          <Query query={QUERY_GET_FILTERS} variables={{
            query: ""
          }}>
            {resFilters => {
              const availableFilters = {
                events:
                  (resFilters.data.getStoreCategories &&
                    resFilters.data.getStoreCategories.map(
                      ({ name }) => name
                    )) ||
                  [],
                holidays:
                  (resFilters.data.getHolidayCategories &&
                    resFilters.data.getHolidayCategories.map(
                      ({ name }) => name
                    )) ||
                  [],
                categories:
                  (resFilters.data.getParentCategories &&
                    resFilters.data.getParentCategories.map(
                      ({ name }) => name
                    )) ||
                  [],
                subcategories:
                  (resFilters.data.getParentCategories &&
                    this.props.category &&
                    (
                      resFilters.data.getParentCategories.find(
                        ({ name }) => name === this.props.category
                      ) || { children: [] }
                    ).children.map(({ name }) => name)) ||
                  [],
                price: [0, 25000000],
                offers: ["Sale", "New", "Pre-Order"],
                brands:
                  (resFilters.data.getMerchants &&
                    [KADOQU_NAME_AS_MERCHANT].concat(
                      resFilters.data.getMerchants.map(({ name }) => name)
                    )) ||
                  []
              };
              return (
                <div className="position-relative">
                  {this.props.isMobile && (
                    <ProductFilterMob
                      available={availableFilters}
                      applied={this.state.appliedFilters}
                      setFilter={newFilters =>
                        this.setState({ appliedFilters: newFilters })
                      }
                      applyFilter={this.applyFilter}
                      appliedEvent={this.props.event}
                      appliedCategory={this.props.category}
                      resetFilter={this.resetFilter}
                      filterStore={
                        this.props.pageName === "1001 Inspirasi Kado"
                      }
                      filterHoliday={this.props.pageName === "Kadoqu Holiday"}
                      sortMethod={this.state.sortMethod}
                      selectSortingMethod={this.selectSortingMethod}
                      hideFilter={() =>
                        this.setState({ showMobileFilter: false })
                      }
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
                                      document
                                        .getElementById(
                                          "product-list-banner-mob"
                                        )
                                        .classList.add("d-none");
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
                                  : resProducts.data.searchHolidayProducts
                                    .length}{" "}
                                Produk
                              </div>
                            </div>
                          ) : (
                            <div className={"row mx-0 mt-3"}>
                              <div
                                className="col-6 font-weight-light text-left d-flex align-items-center">
                                <NavLink
                                  href="/"
                                  className="d-inline p-0 text-dark"
                                >
                                  <span className="fas fa-home pr-2"/>
                                  Home
                                </NavLink>
                                <span className="mx-1">></span>
                                {this.props.pageName}
                              </div>
                              <div className="col-6 text-right">
                                Atur Berdasarkan
                                <Form.Group
                                  className="d-inline-block ml-2 mb-0">
                                  <Form.Control
                                    as="select"
                                    value={this.state.sortMethod}
                                    onChange={this.selectSortingMethod}
                                  >
                                    {Object.keys(SORTING_CHOICE).map(
                                      (value, idx) => {
                                        return (
                                          <option key={idx} value={value}>
                                            {value}
                                          </option>
                                        );
                                      }
                                    )}
                                  </Form.Control>
                                </Form.Group>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="row justify-content-center m-0">
                          {!this.props.isMobile && (
                            <div className="col-3 product-list-box-filter">
                              <ReactPlaceholder showLoadingAnimation
                                                type='media'
                                                customPlaceholder={filterplaceholder}
                                                ready={this.state.ready}>

                                <ProductFilter
                                  available={availableFilters}
                                  applied={this.state.appliedFilters}
                                  filterBanner={this.props.filterBanner}
                                  setFilter={newFilters =>
                                    this.setState({ appliedFilters: newFilters })
                                  }
                                  applyFilter={this.applyFilter}
                                  appliedEvent={this.props.event}
                                  appliedCategory={this.props.category}
                                  resetFilter={this.resetFilter}
                                  filterStore={
                                    this.props.pageName === "1001 Inspirasi Kado"
                                  }
                                  filterHoliday={
                                    this.props.pageName === "Kadoqu Holiday"
                                  }
                                />
                              </ReactPlaceholder>

                              {this.props.mamaGidaBox && (
                                <div className="product-list-box-under-filter">
                                  Placeholder
                                </div>
                              )}
                            </div>
                          )}
                          {resProducts.loading && !this.props.isMobile &&
                          <ReactPlaceholder showLoadingAnimation type='media'
                                            rows={20}
                                            customPlaceholder={awesomePlaceholder}
                                            ready={this.state.ready}>
                            <p className="placeholder-test"></p>

                          </ReactPlaceholder>}
                          {resProducts.loading && this.props.isMobile &&
                          <ReactPlaceholder showLoadingAnimation type='media'
                                            rows={20}
                                            customPlaceholder={awesomePlaceholderMOB}
                                            ready={this.state.ready}>
                            <p className="placeholder-test"></p>

                          </ReactPlaceholder>} {resProducts.error && resProducts.error.message}
                          {!resProducts.loading && !resProducts.error && (
                            <Col
                              xs={this.props.isMobile ? "12" : "9"}
                              className="container-fluid mb-3"
                            >
                              {resProducts.data.searchHolidayProducts
                                .products.length === 0 ? (
                                <ProductNotFoundNotice/>
                              ) : (
                                <React.Fragment>
                                  {!this.props.isMobile ?
                                    <ReactPlaceholder showLoadingAnimation
                                                      type='media' rows={20}
                                                      customPlaceholder={awesomePlaceholder}
                                                      ready={this.state.ready}>

                                      <ListOfProducts
                                        products={
                                          resProducts.data.searchHolidayProducts
                                            .products
                                        }
                                        query={query}
                                        isMobile={this.props.isMobile}
                                      />
                                    </ReactPlaceholder> : <ListOfProducts
                                      products={
                                        resProducts.data.searchHolidayProducts
                                          .products
                                      }
                                      query={query}
                                      isMobile={this.props.isMobile}
                                    />}
                                </React.Fragment>
                              )}
                              <PaginationButtons
                                paginationByUrl
                                currentPage={this.state.currentPage}
                                setPage={this.setPage}
                                itemsLength={
                                  resProducts.data.searchHolidayProducts
                                    .length * 100
                                }
                                limitPerPage={PRODUCT_LIMIT}
                                match={this.props.match}
                              />
                            </Col>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  )}
                </div>
              );
            }}
          </Query>
        )}
      </Query>
    );
  }
}

export default withApollo(ProductHolidayList);
