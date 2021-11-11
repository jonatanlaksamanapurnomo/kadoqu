import gql from "graphql-tag";

const QUERY_GET_RIBBONS = gql`
  query getRibbonTypes {
    getRibbonTypes {
      id
      rank
      name
      additionalInfo
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

const MUTATION_ADD_RIBBON_TYPE = gql`
  mutation addRibbonType(
    $name: String
    $price: Float
    $image: String
    $info: String
    $rank: Int
  ) {
    addRibbonType(
      name: $name
      price: $price
      thumbnail: $image
      additionalInfo: $info
      rank: $rank
    )
  }
`;

const MUTATION_UPDATE_RIBBON_TYPE = gql`
  mutation updateRibbonType(
    $id: Int
    $rank: Int
    $name: String
    $price: Float
    $info: String
  ) {
    updateRibbonType(
      id: $id
      rank: $rank
      name: $name
      price: $price
      additionalInfo: $info
    )
  }
`;

const MUTATION_UPDATE_RIBBON_TYPE_THUMBNAIL = gql`
  mutation updateRibbonTypeThumbnail(
    $id: Int
    $image: String
    $currentUrl: String
  ) {
    updateRibbonTypeThumbnail(
      id: $id
      thumbnail: $image
      currentUrl: $currentUrl
    )
  }
`;

const MUTATION_DELETE_RIBBON_TYPE = gql`
  mutation deleteRibbonType($id: Int) {
    deleteRibbonType(id: $id)
  }
`;

const MUTATION_ADD_RIBBON_CHOICE = gql`
  mutation addRibbonChoice(
    $name: String
    $typeId: Int
    $image: String
    $rank: Int
  ) {
    addRibbonChoice(name: $name, typeId: $typeId, url: $image, rank: $rank)
  }
`;

const MUTATION_UPDATE_RIBBON_CHOICE = gql`
  mutation updateRibbonChoice($id: Int, $name: String, $rank: Int) {
    updateRibbonChoice(id: $id, name: $name, rank: $rank)
  }
`;

const MUTATION_DELETE_RIBBON_CHOICE = gql`
  mutation deleteRibbonChoice($id: Int) {
    deleteRibbonChoice(id: $id)
  }
`;

export {
  QUERY_GET_RIBBONS,
  MUTATION_ADD_RIBBON_TYPE,
  MUTATION_UPDATE_RIBBON_TYPE,
  MUTATION_UPDATE_RIBBON_TYPE_THUMBNAIL,
  MUTATION_DELETE_RIBBON_TYPE,
  MUTATION_ADD_RIBBON_CHOICE,
  MUTATION_UPDATE_RIBBON_CHOICE,
  MUTATION_DELETE_RIBBON_CHOICE
};
