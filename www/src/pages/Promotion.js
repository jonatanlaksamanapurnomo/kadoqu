import React, { Component } from "react";
import MediaQuery from "react-responsive";
import { Query } from "react-apollo";
import { Helmet } from "react-helmet";
import { Image } from "react-bootstrap";
import ProductList from "../components/ProductList2";
import { QUERY_GET_PROMOTION_BY_SLUG } from "../gql/promotion";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import Loader from "react-loader-spinner";

class Promotion extends Component {
  render() {
    const slug = this.props.match.params.slug;

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop => (
          <Query query={QUERY_GET_PROMOTION_BY_SLUG} variables={{ slug: slug }}>
            {({ loading, data, error }) => {
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
              const { name, banner } = data.getPromotionBySlug;
              const pageName = "Promosi - " + name;
              return (
                <div id="product-list-page">
                  <Helmet>
                    <title>Kadoqu.com | {pageName}</title>
                  </Helmet>
                  <Image
                    id="product-list-banner-image"
                    className="kids-party-banner"
                    fluid
                    src={banner}
                    alt="Gallery Banner"
                  />
                  <ProductList
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                    pageName={pageName}
                    isMobile={!isDesktop}
                    slug={slug}
                    url={"promotion/" + slug}
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

export default Promotion;
