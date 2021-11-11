import gql from "graphql-tag";

const QUERY_GET_PAYMENT_REVIEW_ORDER = gql`
  query getAllPaymentReviewOrder {
    getAllPaymentReviewOrder {
      id
      orderProducts {
        product
        quantity
      }
      orderWrappings {
        items {
          product
          quantity
        }
      }
      createdAt
    }
  }
`;

const QUERY_GET_ORDERS_BY_STATUS_ALL = gql`
  query getAllOrdersStatusList($statuses: [Int]) {
    getAllOrdersStatusList(statuses: $statuses) {
      id
      number
      user {
        email
        firstName
        lastName
        phone
      }
      orderProducts {
        product
        quantity
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
      voucherDiscount
      voucherCode
      productDiscount
      shippingFee
      productTotal
      total
      paymentMethod
      paymentConfirmationData
      createdAt
      orderStatus {
        id
        status
      }
      orderTracks {
        id
        orderStatusId
        createdAt
      }
      donation
    }
  }
`;

const QUERY_GET_ORDERS_BY_STATUS = gql`
  query getOrderStatusList(
    $statuses: [Int]
    $limit: Int
    $offset: Int
    $keyword: String
    $start: String
    $end: String
  ) {
    getOrderStatusList(
      statuses: $statuses
      limit: $limit
      offset: $offset
      keyword: $keyword
      start: $start
      end: $end
    ) {
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
          product
          quantity
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
        voucherDiscount
        voucherCode
        productDiscount
        shippingFee
        productTotal
        total
        paymentMethod
        paymentConfirmationData
        createdAt
        orderStatus {
          id
          status
        }
        orderTracks {
          id
          orderStatusId
          createdAt
        }
        donation
      }
    }
  }
`;

const QUERY_GET_ORDER_STATUS = gql`
  query getOrderStatuses {
    getOrderStatuses {
      id
      status
    }
  }
`;

const QUERY_GET_ORDER = gql`
  query getOrder($id: String) {
    getOrder(id: $id) {
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
        orderHoliday {
          id
          dateFrom
          dateTo
        }
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
          orderHoliday {
            id
            dateFrom
            dateTo
          }
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
      orderCustome {
        products
        isiUcapan
        photos
        customeColor
        magicalMomentForm
      }
      orderStatus {
        id
        status
      }
      orderTracks {
        id
        orderStatusId
        createdAt
      }
      paymentConfirmationData
      waybillTrack
      donation
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

const MUTATION_CANCEL_ORDER_PRODUCT = gql`
  mutation cancelOrderProduct($productId: String, $quantity: Int) {
    cancelOrderProduct(productId: $productId, quantity: $quantity)
  }
`;

const MUTATION_EDIT_ORDER_SHIPPING_FEE = gql`
  mutation editt($id: String, $fee: Float) {
    editShippingFee(id: $id, shippingFee: $fee)
  }
`;

const MUTATION_DELETE_ORDER_DETAIL = gql`
  mutation deleteOrderDetail($id: String) {
    deleteOrderDetail(id: $id)
  }
`;

export {
  QUERY_GET_ORDERS_BY_STATUS,
  QUERY_GET_ORDER_STATUS,
  QUERY_GET_ORDER,
  MUTATION_UPDATE_ORDER,
  MUTATION_CANCEL_ORDER_PRODUCT,
  MUTATION_EDIT_ORDER_SHIPPING_FEE,
  MUTATION_DELETE_ORDER_DETAIL,
  GET_USERS_ORDERS,
  QUERY_GET_PAYMENT_REVIEW_ORDER,
  QUERY_GET_ORDERS_BY_STATUS_ALL,
};
