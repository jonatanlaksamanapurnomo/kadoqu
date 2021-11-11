import gql from "graphql-tag";

const MUTATION_ADD_HOLIDAY_CATEGORY = gql`
  mutation addHolidayCategory($name: String, $parentId: String) {
    addCategory(name: $name, parentId: $parentId)
  }
`;
const MUTATION_UPDATE_HOLIDAY_CATEGORY = gql`
  mutation updateHolidayCategory($id: String, $newName: String) {
    updateHolidayCategory(categoryId: $id, newName: $newName)
  }
`;


const MUTATION_DELETE_HOLIDAY_CATEGORY = gql`
  mutation deleteHolidayCategory($id: String) {
    deleteCategory(categoryId: $id)
  }
`;

const QUERY_GET_HOLIDAY_CATEGORIES = gql`
  query getHolidayCategories {
    getHolidayCategories {
      id
      name
    }
  }
`;

const MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORIES = gql`
mutation addHolidayCategoryProduct($productId:String, $name:String){
  addHolidayCategoryProduct(productId:$productId , name:$name)
}
`;
const MUTATION_DELETE_PRODUCT_HOLIDAY_CATEGORY = gql`
mutation deleteHolidayCategoryProduct($productId:String){
  deleteHolidayCategoryProduct(productId:$productId )
}
`;


export {
  MUTATION_ADD_HOLIDAY_CATEGORY,
  MUTATION_DELETE_HOLIDAY_CATEGORY,
  QUERY_GET_HOLIDAY_CATEGORIES,
  MUTATION_UPDATE_HOLIDAY_CATEGORY,
  MUTATION_ADD_PRODUCT_HOLIDAY_CATEGORIES,
  MUTATION_DELETE_PRODUCT_HOLIDAY_CATEGORY
};
