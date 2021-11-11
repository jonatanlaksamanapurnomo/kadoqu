import gql from "graphql-tag";

const QUERY_GET_CATEGORIES = gql`
  query getCategories {
    getParentCategories {
      name
    }
  }
`;

const QUERY_GET_EVENTS = gql`
  query getEvents {
    getStoreCategories {
      name
    }
  }
`;

const QUERY_GET_BRANDS = gql`
  query getBrands {
    getMerchants {
      name
    }
  }
`;

export { QUERY_GET_CATEGORIES, QUERY_GET_EVENTS, QUERY_GET_BRANDS };
