import gql from "graphql-tag";

const QUERY_GET_GIDA_OPTIONS = gql`
  query getGidaOptions {
    getGidaRelationshipOptions {
      value
    }
    getGidaEventOptions {
      value
    }
    getGidaPersonalityOptions {
      value
    }
  }
`;

export { QUERY_GET_GIDA_OPTIONS };
