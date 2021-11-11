import React from "react";
import gql from "graphql-tag";
import UserForm from "../components/UserForm";


const MUTATION_ADD_USER = gql`
  mutation addAdmin($input: AddAdminInput) {
    addAdmin(input: $input)
  }
`;

const AddUser = props => (
  <UserForm history={props.history} mutation={MUTATION_ADD_USER} />
);

export default AddUser;
