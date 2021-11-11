import gql from "graphql-tag";

const MUTATION_GET_USERID = gql`
  mutation generateId($email: String) {
    generateId(email: $email)
  }
`;
const MUTATION_FORGOT_PASSWORD = gql`
  mutation forgotPassword($token: String, $newPassword: String) {
    forgotPassword(token: $token, newPassword: $newPassword)
  }
`;
const QUERY_GET_EMAIL = gql`
  query getEmailUsers($token: String) {
    getEmailUsers(token: $token)
  }
`;
const QUERY_GET_MERCHANT_LEVEL = gql`
  query getMerchantsLevel{
    getMerchantsLevel{
      name
    }
  }
`;
const MUTATION_UPDATE_EMAIL = gql`
  mutation changeEmail($input: updateEmailInput) {
    changeEmail(input: $input)
  }
`;

const MUTATION_CHANGE_DATA_DIRI = gql`
  mutation updateDataDiri($input: dataDiriInput) {
    updateDataDiri(input: $input)
  }
`;

const MUTATION_CHANGE_PASSWORD = gql`
  mutation changePassword($input: updatePasswordInput) {
    changePassword(input: $input)
  }
`;
const MUTATION_UPDATE_PHOTO_PROFILE = gql`
  mutation updatePhotoProfile($id: Int) {
    updatePhotoProfile(id: $id)
  }
`;
const SELECT_PRIMARY = gql`
  mutation selectPrimary($id: Int) {
    selectPrimary(id: $id) {
      id
      primaryAddress
    }
  }
`;
const GET_USER = gql`
  query me {
    me {
      phone
      email
      firstName
      lastName
      gender
      birthDate
      photo
    }
  }
`;
const MUTATION_VERIFY_USER = gql`
  mutation verifyUser($id:String){
    verifyUser(id:$id)
  }

`;
const MUTATION_RESEND_EMAIL = gql`
  mutation reSendEmailVerifikasi($token:String){
    reSendEmailVerifikasi(token:$token)
  }
`;

const Mutation_create_verify_Token = gql`
  mutation createVerifyToken($token:String){
    createVerifyToken(token:$token)
  }
`;

export {
  MUTATION_GET_USERID,
  MUTATION_FORGOT_PASSWORD,
  QUERY_GET_EMAIL,
  MUTATION_CHANGE_DATA_DIRI,
  MUTATION_CHANGE_PASSWORD,
  MUTATION_UPDATE_EMAIL,
  SELECT_PRIMARY,
  MUTATION_UPDATE_PHOTO_PROFILE,
  GET_USER,
  MUTATION_VERIFY_USER,
  MUTATION_RESEND_EMAIL,
  Mutation_create_verify_Token,
  QUERY_GET_MERCHANT_LEVEL
};
