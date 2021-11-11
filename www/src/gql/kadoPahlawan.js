import gql from "graphql-tag";

const QUERY_GET_KADO_PAHLAWAN_PRODUCTS = gql`
  query getKadoPahlawanProducts {
    getKadoPahlawanProducts {
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
      merchantData {
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
`;

const QUERY_GET_TOTAL_CARE_PACKAGES = gql`
  query getTotalCarePackages {
    getTotalCarePackages
  }
`;

export { QUERY_GET_KADO_PAHLAWAN_PRODUCTS, QUERY_GET_TOTAL_CARE_PACKAGES };
