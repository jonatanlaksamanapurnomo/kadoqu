import gql from "graphql-tag";

const MUTATION_ADD_PRODUCT_CLICKED = gql`
  mutation addProductClicked(
    $userId: String
    $productId: String
    $gidaOption: JSON
    $search: String
  ) {
    addProductClicked(
      userId: $userId
      productId: $productId
      gidaOption: $gidaOption
      search:$search
    )
  }
`;

const MUTATION_ADD_PRODUCT_ADDED_TO_CART = gql`
  mutation addProductAddedToCartTracker(
    $userId: String
    $productId: String
    $gidaOption: JSON
    $search: String
  ) {
    addProductAddedToCartTracker(
      userId: $userId
      productId: $productId
      gidaOption: $gidaOption
      search:$search
    )
  }
`;

const MUTATION_ADD_PRODUCT_CHECKOUT = gql`
  mutation addProductCheckoutTracker(
    $userId: String
    $productId: String
    $orderId: String
    $gidaOption: JSON
    $search: String
  ) {
    addProductCheckoutTracker(
      userId: $userId
      productId: $productId
      gidaOption: $gidaOption
      orderId: $orderId
      search:$search
    )
  }
`;
export {
  MUTATION_ADD_PRODUCT_CLICKED,
  MUTATION_ADD_PRODUCT_ADDED_TO_CART,
  MUTATION_ADD_PRODUCT_CHECKOUT,
};
