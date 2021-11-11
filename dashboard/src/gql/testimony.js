import gql from "graphql-tag";


const MUTATION_ADD_TESTIMONY = gql`
  mutation addTestimony($input: InputTestimony) {
    addTestimony(input: $input)
  }
`;

const QUERY_GET_TESTIMONY = gql`
  query  getTestimonies {
    getTestimonies {
      id
      name
      shortDescription
      budget
      testimony
      image
      category
    }
  }
`;

export {

  MUTATION_ADD_TESTIMONY,
  QUERY_GET_TESTIMONY

};
