import gql from "graphql-tag";

const QUERY_GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      phone
      email
      firstName
      lastName
      birthDate
      isActive
      gender
      createdAt
    }
  }
`;

export { QUERY_GET_USERS };
