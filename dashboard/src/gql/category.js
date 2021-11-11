import gql from "graphql-tag";

const MUTATION_ADD_GIFT_CATEGORY = gql`
  mutation addCategory($name: String, $parentId: String) {
    addCategory(name: $name, parentId: $parentId)
  }
`;

const MUTATION_UPDATE_GIFT_CATEGORY_BANNER = gql`
  mutation updateCategoryBanner(
    $id: String
    $bannerType: String
    $image: String
  ) {
    updateCategoryBanner(
      categoryId: $id
      bannerType: $bannerType
      image: $image
    )
  }
`;

const MUTATION_DELETE_GIFT_CATEGORY = gql`
  mutation deleteCategory($id: String) {
    deleteCategory(categoryId: $id)
  }
`;

const QUERY_GET_PARENT_CATEGORIES = gql`
  query getParents {
    getParentCategories {
      id
      name
    }
  }
`;

const QUERY_GET_GIFT_CATEGORIES_BANNERS = gql`
  query getParents {
    getParentCategories {
      id
      name
      images
    }
  }
`;

const QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES = gql`
  query getParentCategories {
    getParentCategories {
      id
      name
      children {
        id
        name
      }
    }
  }
`;

export {
  MUTATION_ADD_GIFT_CATEGORY,
  MUTATION_UPDATE_GIFT_CATEGORY_BANNER,
  MUTATION_DELETE_GIFT_CATEGORY,
  QUERY_GET_PARENT_CATEGORIES,
  QUERY_GET_GIFT_CATEGORIES_BANNERS,
  QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES
};
