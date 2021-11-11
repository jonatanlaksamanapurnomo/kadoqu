import React, { Component } from "react";
import MediaQuery from "react-responsive";
import queryString from "query-string";
import { Query } from "react-apollo";
import { Helmet } from "react-helmet";
import ProductList from "../components/ProductList";
import ProductListBanner from "../components/ProductListBanner";
import { QUERY_GET_GIFT_CATEGORIES_IMAGES } from "../gql/category";
import { QUERY_GET_BANNER } from "../gql/banner";
import { MIN_DESKTOP_SIZE, BANNER_LOCATION } from "../data/constants";
import Loader from "react-loader-spinner";

class KadoquGift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedCategory: null
    };
  }

  componentDidMount = () => {
    const urlParams = queryString.parse(this.props.location.search);
    if (
      urlParams.filterCategories &&
      typeof urlParams.filterCategories === "string"
    )
      this.setState({ appliedEvent: urlParams.filterCategories });
  };

  componentDidUpdate = () => {
    const urlParams = queryString.parse(this.props.location.search);
    console.log(typeof urlParams.filterCategories === "string");
    if (
      urlParams.filterCategories &&
      typeof urlParams.filterCategories === "string" &&
      this.state.appliedCategory !== urlParams.filterCategories
    ) {
      this.setState({ appliedCategory: urlParams.filterCategories });
      return;
    }
    if (
      (!("filterCategories" in urlParams) ||
        typeof urlParams.filterCategories !== "string") &&
      this.state.appliedCategory !== null
    ) {
      this.setState({ appliedCategory: null });
    }
  };

  render() {
    const pageName = "Kadoqu Gift";
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Query query={QUERY_GET_GIFT_CATEGORIES_IMAGES}>
            {({ loading, data, error }) => {
              if (loading){
                return (
                  <Loader
                    type="TailSpin"
                    color="#97cee3"
                    height="100"
                    width="100"
                  />
                );
              }
              if (error)
                return (
                  <div className="text-center">
                    Error! {error.message || error}
                  </div>
                );
              const bannerImages = data.getParentCategories.map(category => ({
                name: category.name,
                image: category.images.default
              }));
              const mobileBanners = Object.assign(
                {},
                ...data.getParentCategories.map(category => ({
                  [category.name]: category.images.wide
                }))
              );
              const desktopBanners = Object.assign(
                {},
                ...data.getParentCategories.map(category => ({
                  [category.name]: category.images.default
                }))
              );
              return (
                <div id="product-list-page">
                  <Helmet>
                    <title>Kadoqu.com | Kadoqu Gift</title>
                  </Helmet>
                  <Query
                    query={QUERY_GET_BANNER}
                    variables={{
                      location:
                        BANNER_LOCATION["kadoqu-gift"].main[
                          isDesktop ? "desktop" : "mobile"
                        ]
                    }}
                  >
                    {({ loading, error, data }) =>
                      !loading &&
                      !error && (
                        <ProductListBanner
                          pageName={pageName}
                          mainImageSrc={
                            !isDesktop && this.state.appliedCategory
                              ? mobileBanners[this.state.appliedCategory]
                              : data.getBanner.image
                          }
                          data={bannerImages}
                          isMobile={!isDesktop}
                          setFilter={category => {
                            const urlParams = queryString.parse(
                              this.props.location.search
                            );
                            const searchParams = queryString.stringify({
                              ...urlParams,
                              filterCategories: category
                            });
                            delete searchParams["filterSubcategories"];
                            this.props.history.push({
                              pathname: `/${pageName
                                .toLowerCase()
                                .split(" ")
                                .join("-")}/1`,
                              search: searchParams
                            });
                          }}
                        />
                      )
                    }
                  </Query>
                  <ProductList
                    resetBanner={() => this.setState({ appliedCategory: null })}
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                    pageName={pageName}
                    category={this.state.appliedCategory}
                    setAppliedCategory={category =>
                      this.setState({ appliedCategory: category })
                    }
                    filterBanner={desktopBanners[this.state.appliedCategory]}
                    isMobile={!isDesktop}
                  />
                </div>
              );
            }}
          </Query>
        )}
      </MediaQuery>
    );
  }
}

export default KadoquGift;
