import gql from "graphql-tag";

const MUTATION_ADD_PRODUCT_COLOR = gql`
  mutation addProductColor($productId: String, $color: String) {
    addProductColor(productId: $productId, color: $color)
  }
`;

const MUTATION_DELETE_PRODUCT_COLOR = gql`
  mutation deleteProductColor($productId: String, $color: String) {
    deleteProductColor(productId: $productId, color: $color)
  }
`;

export { MUTATION_ADD_PRODUCT_COLOR, MUTATION_DELETE_PRODUCT_COLOR };
