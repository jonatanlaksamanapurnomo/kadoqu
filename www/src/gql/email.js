import gql from "graphql-tag";

const MUTATION_SENDING_EMAIL = gql`
  mutation forgetPasswordEmail($link: String, $email: String,$nama : String) {
       forgetPasswordEmail(link: $link, email : $email, nama: $nama) 
    
  }
`;



export {
  MUTATION_SENDING_EMAIL

};