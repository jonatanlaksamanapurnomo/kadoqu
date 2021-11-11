import gql from "graphql-tag";

const MUTATION_PHOTO_UPLOAD_TOKEN = gql`
  mutation mutateCreateUploadToken($filename: String) {
    createUploadToken(filename: $filename) {
      hash
      timestamp
    }
  }
`;

const MUTATION_DELETE_PHOTO = gql`
  mutation deletePhotoByUrl($url:String){
    deletePhotoByUrl(url:$url )
  }
`;
export { MUTATION_PHOTO_UPLOAD_TOKEN, MUTATION_DELETE_PHOTO };
