import gql from "graphql-tag";

const MUTATION_ADD_PRODUCT_GIFT_CATEGORY = gql`
  mutation addProductGiftCategory($productId: String, $category: String) {
    addProductGiftCategory(productId: $productId, category: $category)
  }
`;

const MUTATION_DELETE_PRODUCT_GIFT_CATEGORY = gql`
  mutation deleteProductGiftCategory($productId: String, $category: String) {
    deleteProductGiftCategory(productId: $productId, category: $category)
  }
`;

const MUTATION_ADD_PRODUCT_STORE_CATEGORY = gql`
  mutation addProductStoreCategory($productId: String, $category: String) {
    addProductStoreCategory(productId: $productId, category: $category)
  }
`;

const MUTATION_DELETE_PRODUCT_STORE_CATEGORY = gql`
  mutation deleteProductStoreCategory($productId: String, $category: String) {
    deleteProductStoreCategory(productId: $productId, category: $category)
  }
`;
const MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORY = gql`
  mutation addProductHolidayCategory($productId: String, $category: String) {
    addProductHolidayCategory(productId: $productId, category: $category)
  }
`;

const MUTATION_DELETE_PRODUCT_HOLIDAY_CATEGORY = gql`
  mutation deleteProductHolidayCategory($productId: String, $category: String) {
    deleteProductHolidayCategory(productId: $productId, category: $category)
  }
`;

const QUERY_GET_PRODUCT_BY_MAGICAL_MOMENT_CATEGORY = gql`
  query getProductMagicalMoments{

    getProductBirthdayPackages{
      product{
        merchant
        id
        name
        price
        kadoquDiscount
        merchantDiscount
      }
    }
    getProductCasees{
      product{
        merchant
        id
        name
        price
        kadoquDiscount
        merchantDiscount
      }
    }
    getProductMagicalMoments{
      product{
        merchant
        id
        name
        price
        kadoquDiscount
        merchantDiscount
      }
    }

    getProductCompanyCelebrations{
      product{
        merchant
        id
        name
        price
        kadoquDiscount
        merchantDiscount
      }
    }

    getProductHolidays{
      product{
        merchant
        id
        name
        price
        kadoquDiscount
        merchantDiscount
      }
    }

  }

`;

const QUERY_GET_CATEGORY = gql`
  query getProductCategories{
    getProductCategories{
      name
    }
  }
`;


export {
  MUTATION_ADD_PRODUCT_GIFT_CATEGORY,
  MUTATION_DELETE_PRODUCT_GIFT_CATEGORY,
  MUTATION_ADD_PRODUCT_STORE_CATEGORY,
  MUTATION_DELETE_PRODUCT_STORE_CATEGORY,
  MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORY,
  MUTATION_DELETE_PRODUCT_HOLIDAY_CATEGORY,
  QUERY_GET_PRODUCT_BY_MAGICAL_MOMENT_CATEGORY,
  QUERY_GET_CATEGORY

};
