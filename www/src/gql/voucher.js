import gql from "graphql-tag";

const QUERY_CHECK_VOUCHER = gql`
  query checkVoucher($code: String) {
    checkVoucher(code: $code) {
      id
      minPurchase
      percentDiscount
      maxDiscount
      giftCategories
      storeCategories
      products
      merchants
    }
  }
`;

const MUTATION_ADD_VOUCHER_USAGE = gql`
  mutation addVoucherUsage($input: InputVoucherUsage) {
    addVoucherUsage(input: $input)
  }
`;

export { QUERY_CHECK_VOUCHER, MUTATION_ADD_VOUCHER_USAGE };
