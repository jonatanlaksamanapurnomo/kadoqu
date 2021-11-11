import gql from "graphql-tag";

const MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS = gql`
  mutation addProductShippingSupport(
    $productId: String
    $shippingSupport: String
  ) {
    addShippingSupport(productId: $productId, shippingSupport: $shippingSupport)
  }
`;

const MUTATION_DELETE_PRODUCT_SHIPPING_SUPPORTS = gql`
  mutation deleteProductShippingSupport(
    $productId: String
    $shippingSupport: String
  ) {
    deleteShippingSupport(
      productId: $productId
      shippingSupport: $shippingSupport
    )
  }
`;

export {
  MUTATION_ADD_PRODUCT_SHIPPING_SUPPORTS,
  MUTATION_DELETE_PRODUCT_SHIPPING_SUPPORTS
};
