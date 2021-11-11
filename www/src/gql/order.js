import gql from "graphql-tag";


const MUTATION_ADD_ORDER_CUSTOME = gql`
  mutation addOrderCustome($orderId:String , $photos:JSON , $isiUcapan:String,$customerNotes:String , $products:JSON , $productColor:String , $input:MagicalMomentForm){
    addOrderCustome(orderId:$orderId , photos:$photos , isiUcapan:$isiUcapan , customerNotes:$customerNotes ,products:$products , productColor:$productColor , input:$input){
      id
      orderId
    }
  }
`;

const MUTATION_ADD_ORDER_CUSTOME_PRODUCT = gql`
  mutation  addOrderCustomeProduct($orderId:String,$customeOrderId:String,$quantity:Int , $product:JSON){
    addOrderCustomeProduct(orderId:$orderId,customeOrderId:$customeOrderId,quantity:$quantity , product:$product)
  }
`;
const MUTATION_ADD_ORDER = gql`
  mutation addOrder(
    $input: OrderInput
    $orderProducts: [OrderProductInput]
    $orderWrappings: [OrderWrappingProductInput]
  ) {
    addOrder(
      input: $input
      orderProducts: $orderProducts
      orderWrappings: $orderWrappings
    ) {
      id
      number
      total
      paymentMethod
      orderStatusId
      createdAt
      updatedAt
    }
  }
`;
const QUERY_GET_ORDER_BY_ID = gql`
  query getOrder($id: int) {
    getOrder(id: $id) {
      id
      number
      resi
      userId
      orderTracks {
        id
        date
        orderStatusId
      }
    }
  }
`;
const QUERY_GET_ORDERS_BY_USER = gql`
  query getUserOrders($orderStatus: Int) {
    getUserOrders(orderStatus: $orderStatus) {
      length
      orders {
        id
        number
        user {
          email
          firstName
          lastName
          phone
        }
        orderProducts {
          id
          product
          quantity
        }
        billingAddress
        shippingAddress
        shippingMethod
        courierCode
        courierService
        resi
        weightTotal
        voucherDiscount
        voucherCode
        productDiscount
        shippingFee
        productTotal
        total
        paymentMethod
        createdAt
        orderStatus {
          id
          status
        }
      }
    }
  }
`;

const GET_USERS_ORDERS = gql`
  query getUserOrders($orderStatus: Int, $limit: Int, $offset: Int) {
    getUserOrders(orderStatus: $orderStatus, limit: $limit, offset: $offset) {
      length
      orders {
        id
        number
        courierService
        courierCode
        shippingMethod
        shippingAddress
        orderProducts {
          id
          product
          quantity
        }
        orderWrappings {
          id
          items {
            product
            quantity
          }
          wrapper
          ribbon
          greetingCard
        }
        resi
        productDiscount
        orderTracks {
          id
          date
          orderStatusId
        }
        orderStatusId
        total
        productTotal
        shippingFee
        voucherDiscount
        paymentMethod
        orderWrappings {
          id
          wrapper
          ribbon
        }
        waybillTrack
        donation
      }
    }
  }
`;

const QUERY_GET_ORDER_NUMBERS_BY_USER = gql`
  query getUserOrders($orderStatus: Int) {
    getUserOrders(orderStatus: $orderStatus) {
      orders {
        id
        number
      }
    }
  }
`;

const MUTATION_UPDATE_ORDER = gql`
  mutation updateOrder(
    $resi: String
    $statusId: Int
    $id: String
    $orderProducts: [JSON]
    $userDetail: JSON
  ) {
    updateOrder(
      resi: $resi
      statusId: $statusId
      id: $id
      orderProducts: $orderProducts
      userDetail: $userDetail
    ) {
      resi
      orderStatus {
        id
        status
      }
    }
  }
`;

const MUTATION_ADD_ORDER_PRODUCT = gql`
  mutation addOrderProduct(
    $orderId: String
    $wrappingId: String
    $orderProduct: OrderProductInput
  ) {
    addOrderProduct(
      orderId: $orderId
      wrappingId: $wrappingId
      orderProduct: $orderProduct
    )
  }
`;

const MUTATION_ADD_ORDER_TRACK = gql`
  mutation addOrderTrack($orderId: String) {
    addOrderTrack(orderId: $orderId)
  }
`;

const MUTATION_ADD_ORDER_WRAPPING = gql`
  mutation addOrderWrapping(
    $orderId: String
    $orderWrapping: OrderWrappingInput
  ) {
    addOrderWrapping(orderId: $orderId, orderWrapping: $orderWrapping)
  }
`;

const MUTATION_CONFIRM_PAYMENT = gql`
  mutation confirmPayment($orderNumber: Int, $input: PaymentConfirmationInput) {
    confirmPayment(orderNumber: $orderNumber, input: $input)
  }
`;

const QUERY_GET_ORDER_BY_ORDER_NUMBER = gql`
  query getOrderByOrderNumber($no: Int) {
    getOrderByOrderNumber(no: $no) {
      id
      number
      user {
        email
        firstName
        lastName
        phone
      }
      orderProducts {
        id
        product
        quantity
      }
      orderTracks {
        id
        orderId
        date
      }
      orderWrappings {
        id
        wrapper
        ribbon
        greetingCard
        items {
          id
          product
          quantity
        }
      }
      billingAddress
      shippingAddress
      shippingMethod
      courierCode
      courierService
      resi
      weightTotal
      voucherDiscount
      voucherCode
      productDiscount
      shippingFee
      productTotal
      total
      paymentMethod
      createdAt
      orderStatus {
        id
        status
      }
    }
  }
`;

export {
  MUTATION_ADD_ORDER,
  MUTATION_ADD_ORDER_PRODUCT,
  MUTATION_ADD_ORDER_WRAPPING,
  QUERY_GET_ORDERS_BY_USER,
  QUERY_GET_ORDER_NUMBERS_BY_USER,
  MUTATION_UPDATE_ORDER,
  MUTATION_CONFIRM_PAYMENT,
  MUTATION_ADD_ORDER_TRACK,
  QUERY_GET_ORDER_BY_ID,
  QUERY_GET_ORDER_BY_ORDER_NUMBER,
  GET_USERS_ORDERS,
  MUTATION_ADD_ORDER_CUSTOME,
  MUTATION_ADD_ORDER_CUSTOME_PRODUCT
};
