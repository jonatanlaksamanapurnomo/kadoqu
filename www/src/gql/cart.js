import gql from "graphql-tag";

const QUERY_GET_CART = gql`
  query getCart {
    getCart @client
  }
`;

const QUERY_GET_CART_FROM_SERVER = gql`
  query getCartFromServer($cart:JSON){
    getCartFromServer(cart:$cart)
  }
`;

const QUERY_GET_CART_BY_ID = gql`
  query getCartById($idUser:String){
    getCartById(idUser:$idUser){
      id
      userId
      cart
      createdAt
    }
  }
`;

const QUERY_GET_SELECTED_CART = gql`
  query getSelectedCart{
    getSelectedCart @client
  }
`;
const QUERY_GET_CART_ITEMS = gql`
  query getCartItems {
    getCartItems @client
  }
`;
const QUERY_GET_SELECTED_CART_ITEMS = gql`
  query getSelectedCartItems{
    getCartSelectedItem @client
  }
`;

const MUTATION_ADD_CART_ITEM = gql`
  mutation addCartItem(
    $idProduct: String
    $slug: String
    $quantity: Int
    $productName: String
    $merchant: String
    $price: Int
    $capitalPrice: Float
    $discountPrice: Int
    $image: String
    $weight: Int
    $length: Float
    $width: Float
    $height: Float
    $categories: [String]
    $storeCategories: [String]
    $shippingSupports: [String]
    $date: JSON
    $day: String
    $isiUcapan: String
    $photos: JSON
    $customerNotes: String
    $customeColor: String
    $isCustomeOrder: Boolean
    $customeOrderId: String
    $magicalMomentData: JSON
    $minQty: Int
    $multipleQty: Int
    $isDigital: Boolean
    $gidaOption:JSON
    $search:String
  ) {
    addCartItem(
      idProduct: $idProduct
      slug: $slug
      quantity: $quantity
      productName: $productName
      merchant: $merchant
      price: $price
      capitalPrice: $capitalPrice
      discountPrice: $discountPrice
      image: $image
      weight: $weight
      length: $length
      width: $width
      height: $height
      categories: $categories
      storeCategories: $storeCategories
      shippingSupports: $shippingSupports
      date: $date
      day: $day
      isiUcapan: $isiUcapan
      photos: $photos
      customerNotes: $customerNotes
      customeColor: $customeColor
      isCustomeOrder: $isCustomeOrder
      customeOrderId: $customeOrderId
      magicalMomentData: $magicalMomentData
      minQty: $minQty
      multipleQty: $multipleQty
      isDigital: $isDigital
      gidaOption:$gidaOption
      search:$search
    ) @client
  }
`;

const MUTATION_UPDATE_CART_ITEM = gql`
  mutation updateCartItem(
    $idProduct: String
    $quantity: Int
    $customeOrderId: String
  ) {
    updateCartItem(
      idProduct: $idProduct
      newQuantity: $quantity
      customeOrderId: $customeOrderId
    ) @client
  }
`;

const MUTATION_DELETE_CART_ITEM = gql`
  mutation deleteCartItem($idProduct: String, $customeOrderId: String) {
    deleteCartItem(idProduct: $idProduct, customeOrderId: $customeOrderId)
    @client
  }
`;

const QUERY_GET_CART_PACKAGES = gql`
  query getCartPackages {
    getCartPackages @client
  }
`;

const MUTATION_ADD_CART_PACKAGE = gql`
  mutation addCartPackage(
    $wrapper: JSON
    $ribbon: JSON
    $items: [JSON]
    $greetingCard: [JSON]
  ) {
    addCartPackage(
      wrapper: $wrapper
      ribbon: $ribbon
      items: $items
      greetingCard: $greetingCard
    ) @client
  }
`;

const MUTATION_UPDATE_CART_PACKAGE_ITEM = gql`
  mutation updateCartPackageItem(
    $packageId: String
    $idProduct: String
    $quantity: Int
  ) {
    updateCartPackageItem(
      packageId: $packageId
      idProduct: $idProduct
      newQuantity: $quantity
    ) @client
  }
`;

const MUTATION_DELETE_CART_PACKAGE_ITEM = gql`
  mutation deleteCartPackageItem($packageId: String, $idProduct: String) {
    deleteCartPackageItem(packageId: $packageId, idProduct: $idProduct) @client
  }
`;

const MUTATION_DELETE_CART_PACKAGE = gql`
  mutation deleteCartPackage($packageId: String) {
    deleteCartPackage(packageId: $packageId) @client
  }
`;

const MUTATION_EMPTY_CART = gql`
  mutation emptyCart {
    emptyCart @client
  }
`;
const MUTATION_EMPTY_SELECTED_CART = gql`
  mutation emptySelectedCart {
    emptySelectedCart @client
  }
`;

const MUTATION_ADD_CART_SERVER = gql`
  mutation addCart ($idUser:String,$cart:JSON){
    addCart(idUser:$idUser,cart:$cart)
  }
`;

export {
  QUERY_GET_CART,
  QUERY_GET_CART_ITEMS,
  MUTATION_ADD_CART_ITEM,
  MUTATION_UPDATE_CART_ITEM,
  MUTATION_DELETE_CART_ITEM,
  QUERY_GET_CART_PACKAGES,
  MUTATION_ADD_CART_PACKAGE,
  MUTATION_UPDATE_CART_PACKAGE_ITEM,
  MUTATION_DELETE_CART_PACKAGE_ITEM,
  MUTATION_DELETE_CART_PACKAGE,
  MUTATION_EMPTY_CART,
  QUERY_GET_SELECTED_CART,
  MUTATION_EMPTY_SELECTED_CART,
  QUERY_GET_SELECTED_CART_ITEMS,
  QUERY_GET_CART_FROM_SERVER,
  MUTATION_ADD_CART_SERVER,
  QUERY_GET_CART_BY_ID
};
