import gql from "graphql-tag";

const QUERY_GET_MERCHANT_CODES = gql`
  query getMerchants {
    getMerchants {
      code
      name
    }
  }
`;

const QUERY_GET_PRODUCTS = gql`
  query getProductsDashboard($merchant: String) {
    getProductsDashboard(merchant: $merchant) {
      id
      name
      merchant
      slug
      sku
      stock
      price
      capitalPrice
      kadoquDiscount
      merchantDiscount
      merchantPrice
      merchantData {
        merchantLevel
      }
      storeCategories {
        name
      }
      categories {
        name
      }
      holidayCategories {
        name
      }
      isEnable
      merchantDiscountUntil
      kadoquDiscountUntil
    }
  }
`;

const QUERY_GET_ALL_PRODUCTS = gql`
  query getAllProductsDashboard($limit: Int, $offset: Int, $keyword: String) {
    getAllProductsDashboard(limit: $limit, offset: $offset, keyword: $keyword) {
      length
      products {
        id
        name
        merchant
        slug
        sku
        stock
        price
        capitalPrice
        kadoquDiscount
        merchantDiscount
        merchantPrice
        storeCategories {
          name
        }
        categories {
          name
        }
        holidayCategories {
          name
        }
        isEnable
        merchantDiscountUntil
        kadoquDiscountUntil
      }
    }
  }
`;

const QUERY_GET_PRODUCTS_CATEGORIES = gql`
  query getProductsDashboard($merchant: String) {
    getProductsDashboard(merchant: $merchant) {
      id
      name
      merchant
      slug
      sku
      price
      capitalPrice
      kadoquDiscount
      merchantDiscount
      merchantPrice
      merchantDiscountUntil
      kadoquDiscountUntil
      isEnable
      stock
      categories {
        name
      }
      storeCategories {
        name
      }
      photos {
        url
      }
    }
  }
`;

const QUERY_GET_PRODUCTS_STOCK = gql`
  query getStock($merchant: String) {
    getStock(merchant: $merchant) {
      id
      name
      merchant
    }
  }
`;

const QUERY_GET_PRODUCT = gql`
  query getProduct($id: String) {
    getProduct(id: $id) {
      id
      name
      merchant
      sku
      slug
      shortDescription
      longDescription
      shipmentDescription
      price
      capitalPrice
      merchantPrice
      merchantDiscount
      merchantDiscountUntil
      kadoquDiscountUntil
      kadoquDiscount
      isEnable
      isPo
      isCustomeOrder
      isCustomePhoto
      isCustomeColor
      newToDate
      stock
      weight
      length
      width
      height
      score
      date
      poNotes
      minQty
      multipleQty
      isDigital
      merchantData {
        merchantLevel
      }
      categories {
        name
      }
      storeCategories {
        name
      }
      photos {
        url
        caption
        rank
      }
      colors {
        name
      }
      shippingSupports {
        name
      }
      holidayCategories {
        id
        name
      }
    }
  }
`;

const MUTATION_ADD_PRODUCT_BY_CSV = gql`
  mutation addProductByCSV($input: InputProductCSV) {
    addProductByCSV(input: $input)
  }
`;

const MUTATION_EDIT_PRODUCT = gql`
  mutation editProduct($id: String, $edits: InputProductEdits) {
    editProduct(id: $id, edits: $edits)
  }
`;

const MUTATION_DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String) {
    deleteProduct(id: $id)
  }
`;

const MUTATION_ADD_PRODUCT = gql`
  mutation addProduct($input: InputProduct) {
    addProduct(input: $input)
  }
`;

const QUERY_GET_ADMIN_ROLE = gql`
  query getAdminRoleUsers {
    getAdminRoleUsers {
      name
    }
  }
`;

const MUTATION_DUPLICATE_PRODUCT = gql`
  mutation duplicateProduct($product: JSON) {
    duplicateProduct(product: $product)
  }
`;

const MUTATION_ADD_MAGICAL_MOMENT_CATEGORY = gql`
  mutation addMagicalMoment($productId: String) {
    addMagicalMoment(productId: $productId)
  }
`;

const MUTATION_ADD_BIRTHDAY_PACKAGE_CATEGORY = gql`
  mutation addBirthdayPackage($productId: String) {
    addBirthdayPackage(productId: $productId)
  }
`;

const MUTATION_ADD_COMPANY_CELEBRATION_CATEGORY = gql`
  mutation addCompanyCelebration($productId: String) {
    addCompanyCelebration(productId: $productId)
  }
`;

const MUTATION_ADD_CASE_CATEGORY = gql`
  mutation addProductCase($productId: String) {
    addProductCase(productId: $productId)
  }
`;

export {
  QUERY_GET_MERCHANT_CODES,
  QUERY_GET_PRODUCTS,
  QUERY_GET_PRODUCT,
  QUERY_GET_PRODUCTS_CATEGORIES,
  MUTATION_ADD_PRODUCT_BY_CSV,
  MUTATION_EDIT_PRODUCT,
  MUTATION_DELETE_PRODUCT,
  MUTATION_ADD_PRODUCT,
  QUERY_GET_PRODUCTS_STOCK,
  QUERY_GET_ADMIN_ROLE,
  MUTATION_DUPLICATE_PRODUCT,
  MUTATION_ADD_BIRTHDAY_PACKAGE_CATEGORY,
  MUTATION_ADD_COMPANY_CELEBRATION_CATEGORY,
  MUTATION_ADD_MAGICAL_MOMENT_CATEGORY,
  MUTATION_ADD_CASE_CATEGORY,
  QUERY_GET_ALL_PRODUCTS
};
