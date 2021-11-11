import gql from "graphql-tag";

const MUTATION_SET_TOKEN = gql`
  mutation setToken($token: String) {
    setToken(token: $token) @client
  }
`;

const MUTATION_SET_GOOGLE_TOKEN = gql`
  mutation setGoogleToken($token :String){
    setGoogleToken(token:$token) @client
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

const QUERY_GET_TOKEN_CART = gql`
  query getToken {
    getToken @client
    getCartLength @client

  }`;


const GENERATE_NEW_TOKEN = gql`
  mutation generatenewtoken($input:String){
    generatenewtoken(input:$input)
  }
`


export {
  MUTATION_SET_TOKEN,
  MUTATION_REMOVE_TOKEN,
  QUERY_GET_TOKEN,
  GENERATE_NEW_TOKEN,
  QUERY_GET_TOKEN_CART,
  MUTATION_SET_GOOGLE_TOKEN
};
