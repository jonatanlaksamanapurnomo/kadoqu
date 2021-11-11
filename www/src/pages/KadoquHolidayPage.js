import React, {Component} from "react";
import MediaQuery from "react-responsive";
import queryString from "query-string";
import {Query} from "react-apollo";
import {Helmet} from "react-helmet";
import ProductHolidayList from "../components/ProductHolidayList";
import ProductListBanner from "../components/ProductListBanner";
import {QUERY_GET_HOLIDAY_CATEGORIES_IMAGES} from "../gql/category";
import {QUERY_GET_BANNER} from "../gql/banner";
import {MIN_DESKTOP_SIZE, BANNER_LOCATION} from "../data/constants";
import Loader from "react-loader-spinner";

class KadoquHolidayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appliedHolidayCategory: null
    };
  }

  componentDidMount = () => {
    const urlParams = queryString.parse(this.props.location.search);
    if (
      urlParams.filterHolidays &&
      typeof urlParams.filterHolidays === "string"
    )
      this.setState({appliedEvent: urlParams.filterHolidays});
  };

  componentDidUpdate = () => {
    const urlParams = queryString.parse(this.props.location.search);

    if (
      urlParams.filterHolidays &&
      typeof urlParams.filterHolidays === "string" &&
      this.state.appliedHolidayCategory !== urlParams.filterHolidays
    ) {
      this.setState({appliedHolidayCategory: urlParams.filterHolidays});
      return;
    }
    if (
      (!("filterHolidays" in urlParams) ||
        typeof urlParams.filterHolidays !== "string") &&
      this.state.appliedHolidayCategory !== null
    ) {
      this.setState({appliedHolidayCategory: null});
    }
  };

  render() {
    const pageName = "Kadoqu Holiday";
    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Query query={QUERY_GET_HOLIDAY_CATEGORIES_IMAGES}>
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

              const bannerImages = data.getHolidayCategories.map(category => ({
                name: category.name,
                image: category.images.default
              }));
              const mobileBanner = data.getHolidayCategories.map(category => ({
                name: category.name,
                image: category.images.mobile
              }));
              const mobileBanners = Object.assign(
                {},
                ...data.getHolidayCategories.map(category => ({
                  [category.name]: category.images.wide
                }))
              );
              const desktopBanners = Object.assign(
                {},
                ...data.getHolidayCategories.map(category => ({
                  [category.name]: category.images.filter_banner
                }))
              );

              return (
                <div id="product-list-page">
                  <Helmet>
                    <title>Kadoqu.com | Kadoqu Holiday</title>
                  </Helmet>
                  <Query
                    query={QUERY_GET_BANNER}
                    variables={{
                      location:
                        BANNER_LOCATION["kadoqu-holiday"].main[
                          isDesktop ? "desktop" : "mobile"
                          ]
                    }}
                  >
                    {({loading, error, data}) =>
                      !loading &&
                      !error && (
                        <ProductListBanner
                          pageName={pageName}
                          holiday={true}
                          mainImageSrc={
                            !isDesktop && this.state.appliedHolidayCategory
                              ? mobileBanners[this.state.appliedHolidayCategory]
                              : data.getBanner.image
                          }
                          data={isDesktop ? bannerImages : mobileBanner}
                          isMobile={!isDesktop}
                          setFilter={holiday => {
                            const urlParams = queryString.parse(
                              this.props.location.search
                            );
                            const searchParams = queryString.stringify({
                              ...urlParams,
                              filterHolidays: [holiday]
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
                  <ProductHolidayList
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                    pageName={pageName}
                    event={this.state.appliedHolidayCategory}
                    filterBanner={
                      desktopBanners[this.state.appliedHolidayCategory]
                    }
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

export default KadoquHolidayPage;
