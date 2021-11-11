const { db } = require("../db");

const monthsInRange = (start, end) => {
  let months;
  months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth() + 1;
  return months <= 0 ? 0 : months;
};

const typeDefs = `
  type MerchantPoint {
    point: Int
    name: String
  }

  extend type Query {
    getMerchantTournamentMonthlySales(merchant: String): [Float]
    getMerchantTournamentPoints(merchant: String): Int
    getMerchantTournamentPointsStandings(league: Int): [MerchantPoint]
  }
`;

const fieldNameMapper = league => ({
  point: ~~(league.points / 10000),
  name: league.name
});

const resolvers = {
  Query: {
    getMerchantTournamentMonthlySales: (_, { merchant }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const merchantName = merchant || context.user.name;
      const start = new Date("2020-03-20");
      const end = new Date("2020-09-21");
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), DATE_TRUNC('month', ot.created_at) AS time" +
            " FROM orders o" +
            " INNER JOIN order_products op ON o.id = op.order_id" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id IN (3, 4, 5) AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " AND (op.product ->> 'merchant') = $3" +
            " GROUP BY time",
          [start, end, merchantName]
        )
        .then(response => {
          let revenues = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return revenues;
          }
          response.forEach(value => {
            const i = monthsInRange(start, new Date(value.time)) - 1;
            if (i >= 0 && i < countRequestedMonths) {
              revenues[i] = value.sum;
            }
          });

          return revenues;
        })
        .catch(e => new Error(e.message));
    },
    getMerchantTournamentPoints: (_, { merchant }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const merchantName = merchant || context.user.name;
      const start = new Date("2020-03-20");
      const end = new Date("2020-09-21");
      return db
        .one(
          "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT)" +
            " FROM orders o" +
            " INNER JOIN order_products op ON o.id = op.order_id" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id IN (3, 4, 5) AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " AND (op.product ->> 'merchant') = $3",
          [start, end, merchantName]
        )
        .then(response => {
          const points = ~~(response.sum / 10000);
          return points;
        })
        .catch(e => new Error(e.message));
    },
    getMerchantTournamentPointsStandings: (_, { league }, context) => {
      if (!context.user || !["admin"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const start = new Date("2020-03-20");
      const end = new Date("2020-09-21");
      return db
        .manyOrNone(
          "SELECT name, COALESCE(point, 0) as points " +
            "FROM admins LEFT JOIN " +
            "(SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT) as point, (op.product ->> 'merchant') as merchant " +
            "FROM orders o INNER JOIN order_products op ON o.id = op.order_id INNER JOIN order_tracks ot ON o.id = ot.order_id " +
            "WHERE o.order_status_id IN (3, 4, 5) AND ot.order_status_id = 2 AND ot.created_at >= $1 AND ot.created_at <= $2 " +
            "GROUP BY (op.product ->> 'merchant')) AS mp ON admins.name = mp.merchant " +
            "WHERE league_id = $3 " +
            "ORDER BY points DESC",
          [start, end, league]
        )
        .then(response => {
          return response.map(fieldNameMapper);
        })
        .catch(e => new Error(e.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
