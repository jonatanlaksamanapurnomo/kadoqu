import gql from "graphql-tag";

const MUTATION_DELETE_DOCUMENT = gql`
  mutation deleteDocument($id:String) {
    deleteDocument(id:$id)
  }
`;

const MUTATION_ADD_DOCUMENT = gql`
  mutation addDocument($data: [JSON]) {
    addDocument(data:$data)
  }
`;
const MUTATION_DELETE_ALL_DOCUMENT = gql`
  mutation deleteAllDocument{
    deleteAllDocument
  }
`;

const MUTATION_ADD_ALL_DOCUMENT = gql`
  mutation addAllDocument($data: [JSON]) {
    addAllDocument(data:$data)
  }
`;
export {
  MUTATION_DELETE_DOCUMENT,
  MUTATION_ADD_DOCUMENT,
  MUTATION_DELETE_ALL_DOCUMENT,
  MUTATION_ADD_ALL_DOCUMENT
};
