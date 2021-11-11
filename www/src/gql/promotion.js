import gql from "graphql-tag";

const QUERY_GET_PROMOTION_BY_SLUG = gql`
  query getPromotionBySlug($slug: String) {
    getPromotionBySlug(slug: $slug) {
      name
      description
      banner
    }
  }
`;

const QUERY_GET_PROMOTION_PRODUCTS_BY_SLUG = gql`
  query getPromotionProductsBySlug(
    $slug: String
    $sortingField: String
    $isAscending: Boolean
    $filters: FiltersInput
    $limit: Int
    $offset: Int
  ) {
    getPromotionProductsBySlug(
      slug: $slug
      sortingField: $sortingField
      isAscending: $isAscending
      filters: $filters
      limit: $limit
      offset: $offset
    ) {
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
  }
`;

export { QUERY_GET_PROMOTION_BY_SLUG, QUERY_GET_PROMOTION_PRODUCTS_BY_SLUG };
