const { db } = require("../db");

const typeDefs = `
  type OrderHoliday {
    id: String
    orderId: String
    dateFrom: Date
    dateTo: Date
  }
`;

const fieldNameMapper = e => ({
  id: e.id,
  orderId: e.order_id,
  dateFrom: e.date_from,
  dateTo: e.date_to,
});

const resolvers = {
  // Order: {
  //   orderHolidays: order =>
  //     db
  //       .any("SELECT * FROM order_holidays WHERE order_id = $1", [order.id])
  //       .then(orderHolidays => orderHolidays.map(fieldNameMapper))
  // }
  OrderProduct: {
    orderHoliday: order =>
      db
        .oneOrNone("SELECT * FROM order_holidays WHERE id = $1", [
          order.orderHolidayId
        ])
        .then(orderHoliday => {
          if (orderHoliday) return fieldNameMapper(orderHoliday);
        })
  }
};

module.exports = {
  typeDefs,
  resolvers
};
