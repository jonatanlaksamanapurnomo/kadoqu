import React from "react";
import gql from "graphql-tag";
import UserForm from "../components/UserForm";
import { Query } from "react-apollo";

const MUTATION_EDIT_USER = gql`
  mutation editAdmin($input: AddAdminInput, $userId: String) {
    editAdmin(input: $input, userId: $userId)
  }
`;

const QUERY_GET_ADMIN = gql`
  query getAdmin($id: String) {
    getAdmin(userId: $id) {
      id
      name
      code
      email
      email2
      phone
      role
      badgePhotoUrl
      leagueId
      league{
        id
        name
        description
      }

    }
  }
`;

const EditUser = props => (
  <Query query={QUERY_GET_ADMIN} variables={{ id: props.match.params.id }}
         fetchPolicy="network-only">
    {({ loading, error, data }) =>
      loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>Error! {error}</p>
      ) : (
        <UserForm
          history={props.history}
          mutation={MUTATION_EDIT_USER}
          data={data.getAdmin}
          isEdit={true}
          id={props.match.params.id}
        />
      )
    }
  </Query>
);

export default EditUser;
export { QUERY_GET_ADMIN };
