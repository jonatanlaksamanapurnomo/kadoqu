import gql from "graphql-tag";

const QUERY_GET_WRAPPERS = gql`
  query getWrapperTypes {
    getWrapperTypes {
      id
      rank
      name
      price
      thumbnail
      choices {
        id
        rank
        name
        url
      }
    }
  }
`;

const MUTATION_ADD_WRAPPER_TYPE = gql`
  mutation addWrapperType(
    $name: String
    $price: Float
    $image: String
    $rank: Int
  ) {
    addWrapperType(name: $name, price: $price, thumbnail: $image, rank: $rank)
  }
`;

const MUTATION_UPDATE_WRAPPER_TYPE = gql`
  mutation updateWrapperType(
    $id: Int
    $rank: Int
    $name: String
    $price: Float
  ) {
    updateWrapperType(id: $id, rank: $rank, name: $name, price: $price)
  }
`;

const MUTATION_UPDATE_WRAPPER_TYPE_THUMBNAIL = gql`
  mutation updateWrapperTypeThumbnail(
    $id: Int
    $image: String
    $currentUrl: String
  ) {
    updateWrapperTypeThumbnail(
      id: $id
      thumbnail: $image
      currentUrl: $currentUrl
    )
  }
`;

const MUTATION_DELETE_WRAPPER_TYPE = gql`
  mutation deleteWrapperType($id: Int) {
    deleteWrapperType(id: $id)
  }
`;

const MUTATION_ADD_WRAPPER_CHOICE = gql`
  mutation addWrapperChoice(
    $name: String
    $typeId: Int
    $image: String
    $rank: Int
  ) {
    addWrapperChoice(name: $name, typeId: $typeId, url: $image, rank: $rank)
  }
`;

const MUTATION_UPDATE_WRAPPER_CHOICE = gql`
  mutation updateWrapperChoice($id: Int, $name: String, $rank: Int) {
    updateWrapperChoice(id: $id, name: $name, rank: $rank)
  }
`;

const MUTATION_DELETE_WRAPPER_CHOICE = gql`
  mutation deleteWrapperChoice($id: Int) {
    deleteWrapperChoice(id: $id)
  }
`;

export {
  QUERY_GET_WRAPPERS,
  MUTATION_ADD_WRAPPER_TYPE,
  MUTATION_UPDATE_WRAPPER_TYPE,
  MUTATION_UPDATE_WRAPPER_TYPE_THUMBNAIL,
  MUTATION_DELETE_WRAPPER_TYPE,
  MUTATION_ADD_WRAPPER_CHOICE,
  MUTATION_UPDATE_WRAPPER_CHOICE,
  MUTATION_DELETE_WRAPPER_CHOICE
};
