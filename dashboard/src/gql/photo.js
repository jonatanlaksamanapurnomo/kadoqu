import gql from "graphql-tag";

const MUTATION_UPDATE_PHOTO_CAPTION = gql`
  mutation updatePhotoCaption(
    $productId: String
    $url: String
    $newCaption: String
  ) {
    updatePhotoCaption(
      productId: $productId
      url: $url
      newCaption: $newCaption
    )
  }
`;

const MUTATION_PHOTO_UPLOAD_TOKEN = gql`
  mutation createUploadToken($filename: String) {
    createUploadToken(filename: $filename) {
      hash
      timestamp
    }
  }
`;

const MUTATION_ADD_PHOTO = gql`
  mutation addPhoto($productId: String, $productName: String, $url: String) {
    addPhoto(productId: $productId, productName: $productName, url: $url)
  }
`;

const MUTATION_DELETE_PHOTO = gql`
  mutation deletePhoto($productId: String, $url: String) {
    deletePhoto(productId: $productId, url: $url)
  }
`;

const MUTATION_DELETE_RECEIPT_PHOTO = gql`
  mutation deleteReceiptPhoto($url: String) {
    deleteReceiptPhoto(url: $url)
  }
`;

const MUTATION_SET_RANK_TO_ZERO = gql`
  mutation setRankToZero($productId: String) {
    setRankToZero(productId: $productId)
  }
`;
const MUTATION_UPDATE_RANK_BY_URL = gql`
  mutation updateRankByUrl($url: String, $rank: Int) {
    updateRankByUrl(url: $url, rank: $rank)
  }
`;

export {
  MUTATION_UPDATE_PHOTO_CAPTION,
  MUTATION_PHOTO_UPLOAD_TOKEN,
  MUTATION_ADD_PHOTO,
  MUTATION_DELETE_PHOTO,
  MUTATION_DELETE_RECEIPT_PHOTO,
  MUTATION_SET_RANK_TO_ZERO,
  MUTATION_UPDATE_RANK_BY_URL
};
