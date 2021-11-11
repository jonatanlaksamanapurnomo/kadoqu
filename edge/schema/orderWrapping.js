const { db } = require("../db");

const typeDefs = `
  type OrderWrapping {
    id: String
    orderId: String
    wrapper: JSON
    ribbon: JSON
    greetingCard: JSON
    items: [OrderProduct]
    createdAt: String
    updatedAt: String
  }

  input OrderWrappingInput {
    wrapperTypeId: Int
    wrapperChoiceId: Int
    ribbonTypeId: Int
    ribbonChoiceId: Int
    greetingCard: JSON
  }

  input OrderWrappingProductInput {
    wrapperTypeId: Int
    wrapperChoiceId: Int
    ribbonTypeId: Int
    ribbonChoiceId: Int
    greetingCard: JSON
    items: [OrderProductInput]
  }

  extend type Mutation {
    addOrderWrapping(orderId: String, orderWrapping: OrderWrappingInput): String
    deleteOrderWrapping(id: String): String
  }
`;

const fieldNameMapper = orderWrapping => ({
  id: orderWrapping.id,
  orderId: orderWrapping.order_id,
  wrapper: orderWrapping.wrapper,
  ribbon: orderWrapping.ribbon,
  greetingCard: orderWrapping.greeting_card,
  createdAt: orderWrapping.created_at,
  updatedAt: orderWrapping.updated_at
});

const resolvers = {
  Order: {
    orderWrappings: order =>
      db
        .any("SELECT * FROM order_wrappings WHERE order_id = $1", [order.id])
        .then(orderWrappings => orderWrappings.map(fieldNameMapper))
  },
  Mutation: {
    addOrderWrapping: (_, { orderId, orderWrapping }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      let promises = [
        db
          .one("SELECT * FROM wrapper_types WHERE id = $1", [
            orderWrapping.wrapperTypeId
          ])
          .then(wrapperType => ({
            typeId: wrapperType.id,
            type: wrapperType.name,
            price: wrapperType.price,
            image: wrapperType.thumbnail
          }))
      ];
      if (orderWrapping.wrapperChoiceId) {
        promises.push(
          db
            .one("SELECT * FROM wrapper_choices WHERE id = $1", [
              orderWrapping.wrapperChoiceId
            ])
            .then(wrapper => ({
              wrapperId: wrapper.id,
              name: wrapper.name,
              image: wrapper.url
            }))
        );
      }
      if (orderWrapping.ribbonTypeId) {
        promises.push(
          db
            .one("SELECT * FROM ribbon_types WHERE id = $1", [
              orderWrapping.ribbonTypeId
            ])
            .then(ribbonType => ({
              typeId: ribbonType.id,
              type: ribbonType.name,
              price: ribbonType.price,
              image: ribbonType.thumbnail
            }))
        );
        if (orderWrapping.ribbonChoiceId) {
          promises.push(
            db
              .one("SELECT * FROM ribbon_choices WHERE id = $1", [
                orderWrapping.ribbonChoiceId
              ])
              .then(ribbon => ({
                ribbonId: ribbon.id,
                name: ribbon.name,
                image: ribbon.url
              }))
          );
        }
      }

      return Promise.all(promises)
        .then(results => {
          const wrapper = Object.assign(
            results[0],
            orderWrapping.wrapperChoiceId ? results[1] : {}
          );
          const nextIndex = orderWrapping.wrapperChoiceId ? 2 : 1;
          const ribbon = !orderWrapping.ribbonTypeId
            ? null
            : Object.assign(
                results[nextIndex],
                orderWrapping.ribbonChoiceId ? results[nextIndex + 1] : {}
              );
          const greetingCardInput = orderWrapping.greetingCard || {};
          const greetingCard = !greetingCardInput.event
            ? null
            : {
                event: greetingCardInput.event,
                greetings: greetingCardInput.greetings
              };
          return db
            .tx(t => {
              const q1 = t.one(
                "INSERT INTO order_wrappings (order_id, wrapper, ribbon, greeting_card) VALUES ($1, $2, $3, $4) RETURNING id",
                [orderId, wrapper, ribbon, greetingCard]
              );

              return t.batch([q1]);
            })
            .then(data => data[0].id)
            .catch(error => {
              throw new Error(error.message || error);
            });
        })
        .catch(error => {
          throw new Error(error.message || error);
        });
    },
    deleteOrderWrapping: (_, { id }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .none("DELETE FROM order_wrappings WHERE id = $1", [id])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
