import gql from "graphql-tag";

const MUTATION_ADD_MERCHANT = gql`
  mutation addAdmin($input: AddAdminInput) {
    addAdmin(input: $input)
  }
`;

const QUERY_CHECK_EMAIL_VALID = gql`
  query usernameChecker($username: String) {
    usernameChecker(username: $username)
  }
`;

const QUERY_CHECK_PASSWORD = gql`
  query passwordChecker($password: String) {
    passwordChecker(password: $password)
  }
`;

const QUERY_ADMIN_LOGIN = gql`
  query adminLogin {
    adminLogin {
      email2
    }
  }
`;

const MUTATION_UPDATE_EMAIL = gql`
  mutation editEmailAdmin($newEmail: String) {
    editEmailAdmin(newEmail: $newEmail)
  }
`;

const QUERY_GET_ADMINS = gql`
  query getAdmins {
    getAdmins {
      id
      name
      code
      email
      phone
      role
      merchantLevel
      createdAt
      badgePhotoUrl
    }
  }
`;

const MUTATE_DELETE_ADMIN = gql`
  mutation deleteAdmin($id: String) {
    deleteAdmin(userId: $id)
  }
`;

export {
  MUTATION_ADD_MERCHANT,
  QUERY_CHECK_EMAIL_VALID,
  QUERY_CHECK_PASSWORD,
  QUERY_ADMIN_LOGIN,
  MUTATION_UPDATE_EMAIL,
  QUERY_GET_ADMINS,
  MUTATE_DELETE_ADMIN
};
