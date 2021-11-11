import gql from "graphql-tag";

const QUERY_GET_GIDA_OPTIONS = gql`
  query getGidaOptions {
    getGidaRelationshipOptions {
      id
      value
    }
    getGidaEventOptions {
      id
      value
    }
    getGidaPersonalityOptions {
      id
      value
    }
  }
`;

const MUTATION_ADD_GIDA_OPTION = gql`
  mutation addGidaOption($category: String, $value: String) {
    addGidaOption(category: $category, value: $value)
  }
`;

const MUTATION_UPDATE_GIDA_OPTION = gql`
  mutation updateGidaOption($id: Int, $newValue: String) {
    updateGidaOption(id: $id, newValue: $newValue)
  }
`;

const MUTATION_DELETE_GIDA_OPTION = gql`
  mutation deleteGidaOption($id: Int) {
    deleteGidaOption(id: $id)
  }
`;

export {
  QUERY_GET_GIDA_OPTIONS,
  MUTATION_ADD_GIDA_OPTION,
  MUTATION_UPDATE_GIDA_OPTION,
  MUTATION_DELETE_GIDA_OPTION
};
