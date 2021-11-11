import gql from "graphql-tag";

const MUTATION_SET_TOKEN = gql`
  mutation setToken($token: String) {
    setToken(token: $token) @client
  }
`;

const MUTATION_REMOVE_TOKEN = gql`
  mutation removeToken {
    removeToken @client
  }
`;

const QUERY_GET_TOKEN = gql`
  query getToken {
    getToken @client
  }
`;

export { MUTATION_SET_TOKEN, MUTATION_REMOVE_TOKEN, QUERY_GET_TOKEN };
