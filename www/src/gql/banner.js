import gql from "graphql-tag";

const QUERY_GET_BANNER = gql`
  query getBanner($location: String) {
    getBanner(location: $location) {
      image
      rank
    }
  }
`;

const QUERY_GET_BANNERS = gql`
  query getBanners($location: String) {
    getBanners(location: $location) {
      id
      image
      rank
      url
    }
  }
`;

export {QUERY_GET_BANNER, QUERY_GET_BANNERS};
