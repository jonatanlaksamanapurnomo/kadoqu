import gql from "graphql-tag";

const QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES = gql`
  query getParentCategories {
    getParentCategories {
      name
      children {
        name
      }
    }
  }
`;

const QUERY_GET_GIFT_CATEGORIES_IMAGES = gql`
  query getParentCategories {
    getParentCategories {
      name
      images
    }
  }
`;

const QUERY_GET_STORE_CATEGORIES_IMAGES = gql`
  query getStoreCategories {
    getStoreCategories {
      name
      images
    }
  }
`;

const QUERY_GET_HOLIDAY_CATEGORIES_IMAGES = gql`
  query getHolidayCategories {
    getHolidayCategories {
      name
      images
    }
  }
`;

export {
  QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES,
  QUERY_GET_GIFT_CATEGORIES_IMAGES,
  QUERY_GET_STORE_CATEGORIES_IMAGES,
  QUERY_GET_HOLIDAY_CATEGORIES_IMAGES
};
