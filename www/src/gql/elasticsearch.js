import gql from "graphql-tag";

const QUERY_GET_PRODUCTS = gql`
  query searchProducts($filter: SearchInput) {
    searchProducts(filter: $filter) {
      length
      products {
        id
        name
        slug
        merchant
        inStock
        price
        capitalPrice
        discountPrice
        isFavorite
        isPo
        newToDate
        merchantDiscountUntil
        kadoquDiscountUntil
        merchantData{
          merchantLevel
        }
        photos {
          url
        }
        colors {
          name
        }
      }
    }
  }
`;

const QUERY_GET_HOLIDAY_PRODUCTS = gql`
  query searchHolidayProducts($filter: SearchInput) {
    searchHolidayProducts(filter: $filter) {
      length
      products {
        id
        name
        slug
        merchant
        inStock
        price
        capitalPrice
        discountPrice
        isFavorite
        isPo
        newToDate
        merchantDiscountUntil
        kadoquDiscountUntil
        photos {
          url
        }
        colors {
          name
        }
      }
    }
  }
`;

const QUERY_SEARCH_PRODUCT = gql`
  query searchProductHeader($query: String) {
    searchProductHeader(query: $query) {
      name
      merchant
      storeCategories
      holidayCategories
      categories
    }
  }
`;

const QUERY_ALL_PRODUCT = gql`
  query allProducts {
    products {
      id
      name
      merchant
      price
      isEnable
      storeCategories
      holidayCategories
      categories
    }
  }
`;

export {
  QUERY_GET_PRODUCTS,
  QUERY_SEARCH_PRODUCT,
  QUERY_ALL_PRODUCT,
  QUERY_GET_HOLIDAY_PRODUCTS
};
