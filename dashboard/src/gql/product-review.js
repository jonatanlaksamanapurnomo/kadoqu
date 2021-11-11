import gql from "graphql-tag";

const QUERY_GET_UNREAD_PRODUCT_REVIEWS_COUNT = gql`
  query getUnreadProductReviewsCount {
    getUnreadProductReviewsCount
  }
`;

const QUERY_GET_GROUPED_PRODUCT_REVIEWS = gql`
  query getProductReviewsGroupedByMerchant {
    getProductReviewsGroupedByMerchant {
      count
      merchant {
        id
        name
      }
    }
  }
`;

const QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT = gql`
  query getProductReviewsByMerchant($merchantId: String) {
    getProductReviewsByMerchant(merchantId: $merchantId) {
      id
      rejectionMessage
      isReviewed
      productId
      product {
        id
        name
        merchant
        sku
        slug
        shortDescription
        longDescription
        shipmentDescription
        price
        stock
        capitalPrice
        merchantPrice
        merchantDiscount
        merchantDiscountUntil
        kadoquDiscountUntil
        kadoquDiscount
        isEnable
        isPo
        isCustomeOrder
        isCustomePhoto
        isCustomeColor
        newToDate
        stock
        weight
        length
        width
        height
        score
        date
        poNotes
        categories {
          name
        }
        storeCategories {
          name
        }
        photos {
          url
          caption
        }
        colors {
          name
        }
        shippingSupports {
          name
        }
        holidayCategories {
          id
          name
        }
      }
    }
  }
`;

const QUERY_GET_REJECTED_PRODUCT_REVIEWS = gql`
  query getRejectedProductReviews {
    getRejectedProductReviews {
      id
      rejectionMessage
      isReviewed
      productId
      product {
        name
        photos {
          url
        }
      }
    }
  }
`;

const QUERY_GET_REJECTED_PRODUCT_REVIEW = gql`
  query getRejectedProductReview($productId: String) {
    getRejectedProductReview(productId: $productId) {
      rejectionMessage
    }
  }
`;

const MUTATION_ADD_PRODUCT_REVIEW = gql`
  mutation addProductReview($productId: String) {
    addProductReview(productId: $productId)
  }
`;

const MUTATION_UPDATE_PRODUCT_REVIEW = gql`
  mutation updateProductReview($id: Int, $rejectionMessage: String) {
    updateProductReview(id: $id, rejectionMessage: $rejectionMessage)
  }
`;

const MUTATION_DELETE_PRODUCT_REVIEW = gql`
  mutation deleteProductReview($id: Int) {
    deleteProductReview(id: $id)
  }
`;
const MUTATION_SET_PRODUCT_REVIEWS_STATUS = gql`
  mutation setIsReviewStatus($status:Boolean , $productId:String){
    setIsReviewStatus(status:$status,productId:$productId)
  }
`;

export {
  QUERY_GET_UNREAD_PRODUCT_REVIEWS_COUNT,
  QUERY_GET_GROUPED_PRODUCT_REVIEWS,
  QUERY_GET_PRODUCT_REVIEWS_BY_MERCHANT,
  QUERY_GET_REJECTED_PRODUCT_REVIEWS,
  QUERY_GET_REJECTED_PRODUCT_REVIEW,
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_UPDATE_PRODUCT_REVIEW,
  MUTATION_DELETE_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
};
