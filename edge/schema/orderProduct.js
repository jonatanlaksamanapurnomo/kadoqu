const { db } = require("../db");

const typeDefs = `
  type OrderProduct {
    id: Int
    orderId: String
    wrappingId: String
    orderHolidayId: String
    orderHoliday: OrderHoliday
    order: Order
    product: JSON
    quantity: Int
    createdAt: String
    updatedAt: String
  }

  input OrderProductInput {
    productId: String
    productName: String
    productPrice: Float
    productImage: String
    quantity: Int
    date: JSON
    day: String
  }

  extend type Mutation {
    addOrderProduct(orderId: String, wrappingId: String, orderProduct: OrderProductInput): String
    addOrderCustomeProduct(orderId: String, customeOrderId: String, quantity: Int, product: JSON): Boolean
    cancelOrderProduct(productId: String, quantity: Int): String
  }
`;

const fieldNameMapper = orderProduct => ({
  id: orderProduct.id,
  orderId: orderProduct.order_id,
  wrappingId: orderProduct.wrapping_id,
  orderHolidayId: orderProduct.order_holiday_id,
  product: orderProduct.product,
  quantity: orderProduct.quantity,
  createdAt: orderProduct.created_at,
  updatedAt: orderProduct.updated_at
});

const resolvers = {
  Order: {
    orderProducts: order =>
      db
        .any(
          "SELECT * FROM order_products WHERE order_id = $1 AND wrapping_id IS NULL",
          [order.id]
        )
        .then(orderProducts => orderProducts.map(fieldNameMapper))
  },
  OrderWrapping: {
    items: orderWrapping =>
      db
        .any("SELECT * FROM order_products WHERE wrapping_id = $1", [
          orderWrapping.id
        ])
        .then(orderProducts => orderProducts.map(fieldNameMapper))
  },
  OrderCustome: {
    items: orderCustome =>
      db
        .any("SELECT * FROM order_products WHERE custome_order_id = $1", [
          orderCustome.id
        ])
        .then(orderCustome => orderCustome.map(fieldNameMapper))
  },
  Mutation: {
    addOrderCustomeProduct: (
      _,
      { orderId, customeOrderId, quantity, product }
    ) => {
      return db
        .one(
          "insert into order_products (order_id,custome_order_id,quantity,product) values($1,$2,$3,$4) returning *",
          [orderId, customeOrderId, quantity, product]
        )
        .then(res => true)
        .catch(e => new Error(e.message));
    },
    addOrderProduct: (
      _,
      { orderId, wrappingId = null, orderProduct },
      context
    ) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .none("UPDATE products SET stock = stock - $1 WHERE id = $2", [
          orderProduct.quantity,
          orderProduct.productId
        ])
        .then(() => {
          return db
            .one("SELECT * FROM products WHERE id = $1", [
              orderProduct.productId
            ])
            .then(product =>
              db
                .tx(t => {
                  const q1 = t.none(
                    `INSERT INTO order_products (product, order_id, quantity${
                      wrappingId ? `, wrapping_id` : ""
                    }) VALUES ($1, $2, $3${wrappingId ? ", $4" : ""})`,
                    [
                      {
                        id: product.id,
                        name: product.name,
                        merchant: product.merchant,
                        image: orderProduct.productImage,
                        price: product.price,
                        merchantPrice: product.merchant_price,
                        merchantDiscount: product.merchant_discount,
                        kadoquDiscount: product.kadoqu_discount,
                        inStock: product.in_stock,
                        slug: product.slug,
                        isEnable: product.is_enable,
                        stock: product.stock,
                        weight: product.weight,
                        length: product.length,
                        width: product.width,
                        height: product.height,
                        sku: product.sku,
                        merchantDiscountUntil: product.merchant_discount_until,
                        kadoquDiscountUntil: product.kadoqu_discount_until
                      },
                      orderId,
                      orderProduct.quantity,
                      wrappingId
                    ]
                  );

                  return t.batch([q1]);
                })
                .then(() => "Success")
                .catch(error => new Error(error.message || error))
            );
        })
        .catch(error => new Error(error.message || error));
    },
    cancelOrderProduct: (_, { productId, quantity }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .none("UPDATE products SET stock = stock + $1 WHERE id = $2", [
          quantity,
          productId
        ])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
