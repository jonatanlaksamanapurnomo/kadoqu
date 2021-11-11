import gql from "graphql-tag";

const QUERY_GET_VOUCHERS = gql`
  query getVouchers {
    getVouchers {
      id
      name
      merchant
      description
      isEnable
      validFrom
      validTo
      minPurchase
      percentDiscount
      maxDiscount
      stock
      maxUsage
      giftCategories
      storeCategories
      products
      merchants
    }
  }
`;

const QUERY_GET_VOUCHER = gql`
  query getVoucher($id: String) {
    getVoucher(id: $id) {
      id
      name
      merchant
      description
      isEnable
      validFrom
      validTo
      minPurchase
      percentDiscount
      maxDiscount
      stock
      maxUsage
      giftCategories
      storeCategories
      products
      merchants
      voucherCodes {
        id
        code
      }
    }
  }
`;

const QUERY_GET_VOUCHER_USAGES = gql`
  query getVoucherUsages {
    getVoucherUsages {
      id
      voucherCode {
        code
        voucher {
          name
          merchant
        }
      }
      order {
        voucherDiscount
        total
        createdAt
      }
      user {
        firstName
      }
    }
  }
`;

const QUERY_GET_VOUCHER_USAGES_BY_VOUCHER_ID = gql`
  query getVoucherUsages($voucherId: String) {
    getVoucherUsages(voucherId: $voucherId) {
      id
      voucherCode {
        code
        voucher {
          name
          merchant
        }
      }
      order {
        voucherDiscount
        total
        createdAt
      }
      user {
        firstName
      }
    }
  }
`;

const MUTATION_ADD_VOUCHER = gql`
  mutation addVoucher($input: InputVoucher) {
    addVoucher(input: $input)
  }
`;

const MUTATION_EDIT_VOUCHER = gql`
  mutation editVoucher($id: String, $input: InputVoucher) {
    editVoucher(id: $id, input: $input)
  }
`;

const MUTATION_DELETE_VOUCHER = gql`
  mutation deleteVoucher($id: String) {
    deleteVoucher(id: $id)
  }
`;

const MUTATION_ADD_VOUCHER_CODE = gql`
  mutation addVoucherCode($input: InputVoucherCode) {
    addVoucherCode(input: $input)
  }
`;

const MUTATION_EDIT_VOUCHER_CODE = gql`
  mutation editVoucherCode($id: String, $input: InputVoucherCode) {
    editVoucherCode(id: $id, input: $input)
  }
`;

const MUTATION_DELETE_VOUCHER_CODE = gql`
  mutation deleteVoucherCode($id: String) {
    deleteVoucherCode(id: $id)
  }
`;

export {
  QUERY_GET_VOUCHERS,
  QUERY_GET_VOUCHER,
  QUERY_GET_VOUCHER_USAGES,
  QUERY_GET_VOUCHER_USAGES_BY_VOUCHER_ID,
  MUTATION_ADD_VOUCHER,
  MUTATION_EDIT_VOUCHER,
  MUTATION_DELETE_VOUCHER,
  MUTATION_ADD_VOUCHER_CODE,
  MUTATION_EDIT_VOUCHER_CODE,
  MUTATION_DELETE_VOUCHER_CODE
};
