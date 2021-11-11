import gql from "graphql-tag";

const MUTATION_ADD_FAVORITE_PRODUCT = gql`
  mutation addFavoriteProduct($id: String) {
    addFavoriteProduct(productId: $id)
  }
`;

const MUTATION_REMOVE_FAVORITE_PRODUCT = gql`
  mutation removeFavoriteProduct($id: String) {
    removeFavoriteProduct(productId: $id)
  }
`;

export { MUTATION_ADD_FAVORITE_PRODUCT, MUTATION_REMOVE_FAVORITE_PRODUCT };
