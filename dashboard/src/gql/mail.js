import gql from "graphql-tag";
const MUTATION_SEND_EMAIL = gql`
    mutation emailShippingFee($to: String, $html: String) {
        emailShippingFee(to: $to, html: $html)
    }
`;

export {MUTATION_SEND_EMAIL}