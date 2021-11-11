import gql from "graphql-tag";

const QUERY_GET_PRODUCT_STOCK = gql`
  query getProductStock($id: String) {
    getProduct(id: $id) {
      id
      stock
    }
  }
`;

const QUERY_GET_PRODUCT_FAVORITE_STATE = gql`
  query getProductFavoriteState($id: String) {
    getProduct(id: $id) {
      id
      name
      isFavorite
    }
  }
`;

const MUTATION_ADD_CUSTOME_ORDER = gql`
  mutation addOrderCustome(
    $orderId: String
    $photos: JSON
    $isiUcapan: String
    $customerNotes: String
  ) {
    addOrderCustome(
      orderId: $orderId
      photos: $photos
      isiUcapan: $isiUcapan
      customerNotes: $customerNotes
    )
  }
`;

const QUERY_GET_PRODUCT_BY_SLUG = gql`
  query getProductBySlug($slug: String) {
    getProductBySlug(slug: $slug) {
      id
      name
      merchant
      shortDescription
      longDescription
      shipmentDescription
      price
      discountPrice
      kadoquDiscount
      kadoquDiscountUntil
      merchantDiscount
      merchantDiscountUntil
      shippingSupports {
        name
      }
      inStock
      slug
      isEnable
      isPo
      poNotes
      stock
      capitalPrice
      weight
      photos {
        caption
        url
      }
      colors {
        name
      }
      length
      width
      height
      isFavorite
      isCustomeOrder
      isCustomePhoto
      newToDate
      magicalMoments {
        id
        name
      }
      categories {
        name
      }
      storeCategories {
        name
      }
      date
      minQty
      multipleQty
      isDigital
    }
  }
`;

export {
  QUERY_GET_PRODUCT_STOCK,
  QUERY_GET_PRODUCT_FAVORITE_STATE,
  MUTATION_ADD_CUSTOME_ORDER,
  QUERY_GET_PRODUCT_BY_SLUG
};
