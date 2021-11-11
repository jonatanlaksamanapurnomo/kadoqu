const { db } = require("../db");
const { GraphQLDateTime } = require("graphql-iso-date");

const typeDefs = `
    type OrderTrack {
        id: String
        orderId: String
        orderStatusId :String
        date :DateTime
        createdAt: DateTime
        updatedAt: DateTime
    }
    extend type Query{
        getOrderTracks:[OrderTrack]
    }
    extend type Mutation {
        addOrderTrack(orderId: String):String
    }
`;

const fieldNameMapper = orderTrack => ({
  id: orderTrack.id,
  orderId: orderTrack.order_id,
  date: orderTrack.date || orderTrack.created_at,
  orderStatusId: orderTrack.order_status_id,
  createdAt: orderTrack.created_at,
  updatedAt: orderTrack.updated_at
});

const resolvers = {
  DateTime: GraphQLDateTime,
  Order: {
    orderTracks: order =>
      db
        .any("SELECT * FROM order_tracks WHERE order_id = $1", [order.id])
        .then(orderTracks => orderTracks.map(fieldNameMapper))
  },
  Query: {
    getOrderTracks: (parent, args, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .any("SELECT * FROM order_tracks")
        .then(orders => orders.map(fieldNameMapper));
    }
  },
  Mutation: {
    addOrderTrack: (_, { orderId }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .one("SELECT * FROM orders WHERE id = $1", [orderId])
        .then(order =>
          db
            .none(
              `INSERT INTO order_tracks (order_id, order_status_id, date) VALUES ($1, $2, $3)`,
              [orderId, order.order_status_id, order.updated_at]
            )
            .catch(error => new Error(error.message || error))
        );
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
