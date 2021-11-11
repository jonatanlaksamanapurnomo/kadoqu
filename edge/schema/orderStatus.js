const { db } = require("../db");

const typeDefs = `
  type OrderStatus {
    id: Int
    status: String
    createdAt: String
    updatedAt: String
  }
  extend type Query {
    getOrderStatus(id: Int): OrderStatus
    getOrderStatuses:[OrderStatus]
  }

  extend type Mutation{
    changeOrderStatus(id: String, status: Int): Boolean
    deleteOrder(id: [String]): Boolean
  }
`;

const fieldNameMapper = orderStatus => ({
  id: orderStatus.id,
  status: orderStatus.status,
  createdAt: orderStatus.created_at,
  updatedAt: orderStatus.updated_at
});

const resolvers = {
  Mutation: {
    changeOrderStatus: (_, { id, status }) => {
      return db
        .none("update orders set order_status_id = $1  where id = $2", [
          status,
          id
        ])
        .then(() => true);
    },
    deleteOrder: (_, { id }) => {
      let status = true;
      id.forEach(item => {
        return db.none("delete from orders where id = $1", [item]);
      });
      return status;
    }
  },
  Query: {
    getOrderStatuses: (_,__, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .any(
            "SELECT * FROM order_status"
        )
        .then(orderStatus => orderStatus.map(fieldNameMapper));
    },

    getOrderStatus: (_, { id }) =>
      db
        .one("SELECT * FROM \"order_status\" WHERE \"id\" = $1", [id])
        .then(orderStatus => fieldNameMapper(orderStatus))
  },
  Order: {
    orderStatus: order =>
      db
        .one("SELECT * FROM \"order_status\" WHERE \"id\" = $1", [
          order.orderStatusId
        ])
        .then(orderStatus => fieldNameMapper(orderStatus))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
