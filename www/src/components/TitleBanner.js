import React from "react";
import { Query } from "react-apollo";
import MediaQuery from "react-responsive";
import { QUERY_GET_BANNER } from "../gql/banner";
import { BANNER_LOCATION, MIN_DESKTOP_SIZE } from "../data/constants";

const TitleBanner = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop => (
      <Query
        query={QUERY_GET_BANNER}
        variables={{
          location:
            BANNER_LOCATION[props.route].title[isDesktop ? "desktop" : "mobile"]
        }}
      >
        {({ loading, error, data }) =>
          loading ? (
            <div className="empty-banner">Loading...</div>
          ) : error ? (
            <div className="empty-banner" />
          ) : (
            <div className={props.className}>
              <img
                src={data.getBanner.image}
                alt={props.alt}
                className="w-100"
              />
            </div>
          )
        }
      </Query>
    )}
  </MediaQuery>
);

export default TitleBanner;
