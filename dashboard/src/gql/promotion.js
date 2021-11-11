import gql from "graphql-tag";

const QUERY_GET_PROMOTIONS = gql`
  query getPromotions {
    getPromotions {
      id
      slug
      name
      description
      banner
      isEnable
      validFrom
      validTo
    }
  }
`;

const QUERY_GET_PROMOTION = gql`
  query getPromotion($id: String) {
    getPromotion(id: $id) {
      id
      slug
      name
      description
      banner
      isEnable
      validFrom
      validTo
      products
      merchants
    }
  }
`;

const MUTATION_ADD_PROMOTION = gql`
  mutation addPromotion($input: InputPromotion) {
    addPromotion(input: $input)
  }
`;

const MUTATION_EDIT_PROMOTION = gql`
  mutation editPromotion($id: String, $input: InputPromotion) {
    editPromotion(id: $id, input: $input)
  }
`;

const MUTATION_DELETE_PROMOTION = gql`
  mutation deletePromotion($id: String) {
    deletePromotion(id: $id)
  }
`;

export {
  QUERY_GET_PROMOTIONS,
  QUERY_GET_PROMOTION,
  MUTATION_ADD_PROMOTION,
  MUTATION_EDIT_PROMOTION,
  MUTATION_DELETE_PROMOTION
};
