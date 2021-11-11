import gql from "graphql-tag";

const MUTATION_ADD_STORE_CATEGORY = gql`
  mutation addStoreCategory($name: String) {
    addStoreCategory(name: $name)
  }
`;

const MUTATION_UPDATE_STORE_CATEGORY = gql`
  mutation updateStoreCategory($id: String, $newName: String) {
    updateStoreCategory(categoryId: $id, newName: $newName)
  }
`;

const MUTATION_UPDATE_STORE_CATEGORY_BANNER = gql`
  mutation updateStoreCategoryBanner(
    $id: String
    $bannerType: String
    $image: String
  ) {
    updateStoreCategoryBanner(
      categoryId: $id
      bannerType: $bannerType
      image: $image
    )
  }
`;

const MUTATION_DELETE_STORE_CATEGORY = gql`
  mutation deleteStoreCategory($id: String) {
    deleteStoreCategory(categoryId: $id)
  }
`;

const QUERY_GET_STORE_CATEGORIES = gql`
  query getStoreCategories {
    getStoreCategories {
      id
      name
    }
  }
`;

const QUERY_GET_STORE_CATEGORIES_BANNERS = gql`
  query getStoreCategories {
    getStoreCategories {
      id
      name
      images
    }
  }
`;

export {
  MUTATION_ADD_STORE_CATEGORY,
  MUTATION_UPDATE_STORE_CATEGORY,
  MUTATION_UPDATE_STORE_CATEGORY_BANNER,
  MUTATION_DELETE_STORE_CATEGORY,
  QUERY_GET_STORE_CATEGORIES,
  QUERY_GET_STORE_CATEGORIES_BANNERS
};
