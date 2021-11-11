import gql from "graphql-tag";

const MUTATION_ADD_EVENT_CATEGORY = gql`
  mutation addEventCategory($name: String, $parentId: String) {
    addCategory(name: $name, parentId: $parentId)
  }
`;



const MUTATION_DELETE_EVENT_CATEGORY = gql`
  mutation deleteEventCategory($id: String) {
    deleteCategory(categoryId: $id)
  }
`;

const QUERY_GET_EVENT_CATEGORIES = gql`
  query getEventCategories {
    getEventCategories {
      id
      name
    }
  }
`;


export {
  MUTATION_ADD_EVENT_CATEGORY,
  MUTATION_DELETE_EVENT_CATEGORY,
  QUERY_GET_EVENT_CATEGORIES
};
