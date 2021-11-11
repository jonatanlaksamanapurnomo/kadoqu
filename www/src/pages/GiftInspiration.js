import React, {Component} from "react";
import MediaQuery from "react-responsive";
import queryString from "query-string";
import {Query} from "react-apollo";
import {Helmet} from "react-helmet";
import ProductList from "../components/ProductList";
import ProductListBanner from "../components/ProductListBanner";
import {QUERY_GET_STORE_CATEGORIES_IMAGES} from "../gql/category";
import {QUERY_GET_BANNER} from "../gql/banner";
import {MIN_DESKTOP_SIZE, BANNER_LOCATION} from "../data/constants";
import Loader from "react-loader-spinner";


class GiftInspiration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedEvent: null
    };
  }

  componentDidMount = () => {
    const urlParams = queryString.parse(this.props.location.search);
    if (urlParams.filterEvents && typeof urlParams.filterEvents === "string")
      this.setState({appliedEvent: urlParams.filterEvents});
  };

  componentDidUpdate = () => {
    const urlParams = queryString.parse(this.props.location.search);

    if (
      urlParams.filterEvents &&
      typeof urlParams.filterEvents === "string" &&
      this.state.appliedEvent !== urlParams.filterEvents
    ) {
      this.setState({appliedEvent: urlParams.filterEvents});
      return;
    }
    if (
      (!("filterEvents" in urlParams) ||
        typeof urlParams.filterEvents !== "string") &&
      this.state.appliedEvent !== null
    ) {
      this.setState({appliedEvent: null});
    }
  };

  render() {
    const pageName = "1001 Inspirasi Kado";
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Query query={QUERY_GET_STORE_CATEGORIES_IMAGES}>
            {({loading, data, error}) => {
              if (loading) {
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
              const bannerImages = data.getStoreCategories.map(category => ({
                name: category.name,
                image: category.images.default
              }));
              const mobileBanners = Object.assign(
                {},
                ...data.getStoreCategories.map(category => ({
                  [category.name]: category.images.wide
                }))
              );
              const desktopBanners = Object.assign(
                {},
                ...data.getStoreCategories.map(category => ({
                  [category.name]: category.images.default
                }))
              );
              return (
                <div id="product-list-page">
                  <Helmet>
                    <title>Kadoqu.com | 1001 Inspirasi Kado</title>
                  </Helmet>
                  <Query
                    query={QUERY_GET_BANNER}
                    variables={{
                      location:
                        BANNER_LOCATION["1001-inspirasi-kado"].main[
                          isDesktop ? "desktop" : "mobile"
                          ]
                    }}
                  >
                    {({loading, error, data}) => 
                      !loading &&
                      !error && (
                        <ProductListBanner
                          pageName={pageName}
                          mainImageSrc={
                            !isDesktop && this.state.appliedEvent
                              ? mobileBanners[this.state.appliedEvent]
                              : data.getBanner.image
                          }
                          data={bannerImages}
                          isMobile={!isDesktop}
                          setFilter={event => {
                            const urlParams = queryString.parse(
                              this.props.location.search
                            );
                            const searchParams = queryString.stringify({
                              ...urlParams,
                              filterEvents: [event]
                            });
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
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                    pageName={pageName}
                    event={this.state.appliedEvent}
                    filterBanner={desktopBanners[this.state.appliedEvent]}
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

export default GiftInspiration;