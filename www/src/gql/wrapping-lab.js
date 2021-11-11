import gql from "graphql-tag";

const QUERY_GET_RIBBONS = gql`
  query getRibbonTypes {
    getRibbonTypes {
      id
      name
      additionalInfo
      price
      thumbnail
      choices {
        id
        name
        url
      }
    }
  }
`;

const QUERY_GET_WRAPPERS = gql`
  query getWrapperTypes {
    getWrapperTypes {
      id
      name
      price
      thumbnail
      choices {
        id
        name
        url
      }
    }
  }
`;

const QUERY_GET_WRAPPING_LAB_PROPERTIES = gql`
  query getWrappingLabProperties {
    getWrapperTypes {
      id
      name
      price
      thumbnail
      choices {
        id
        name
        url
      }
    }
    getRibbonTypes {
      id
      name
      additionalInfo
      price
      thumbnail
      choices {
        id
        name
        url
      }
    }
  }
`;

export {
  QUERY_GET_RIBBONS,
  QUERY_GET_WRAPPERS,
  QUERY_GET_WRAPPING_LAB_PROPERTIES
};
