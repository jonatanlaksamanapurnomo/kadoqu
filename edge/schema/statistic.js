const { db } = require("../db");
const { kadoquPurchasePrice } = require("../constants");

const monthsInRange = (start, end) => {
  let months;
  months = (end.getFullYear() - start.getFullYear()) * 12;
  months += end.getMonth() - start.getMonth() + 1;
  return months <= 0 ? 0 : months;
};

const daysInRange = (start, end) => {
  const diffInTime = end.getTime() - start.getTime();
  const milliSecondPerSecond = 1000;
  const secondPerHour = 3600;
  const hourPerDay = 24;
  return (
    Math.floor(
      diffInTime / (milliSecondPerSecond * secondPerHour * hourPerDay)
    ) + 1
  );
};

const typeDefs = `
  type StatisticalProduct {
    id: String
    name: String
    merchant: String
    quantity: Int
  }
  type StatisticalGidaKeyword {
    keyword: String
    quantity: Int
  }
  type StatisticalProductCategory{
    category: String
    quantity:[Int]
  }
  type StatisticalProductMerchant{
    merchant: String
    quantity:[Int]
  }
  type TopCustomer {
    id: String
    name: String
    email: String
    ordersMade: Int
    totalSpent: Float
    lastActivity: Date
  }
  type AverageRatings {
    speedCS: Float
    service: Float
    productQuality: Float
    wrappingQuality: Float
    productSafety: Float
    productSatisfaction : Float
    ratingCount: Int
  }
  type NumberOrderStatus {
    done: [Int]
    process: [Int]
    cancel: [Int]
    total: [Int]
  }
  type SalesCategory {
    category: String
    qty: [Int]
    sales: [Float]
  }
  input ParsedDateInput {
    date: Int
    month: Int
    year: Int
  }
  extend type Query {
    getMonthlyRevenues(startDate: ParsedDateInput, endDate: ParsedDateInput): [Float]
    getMonthlyProfits(startDate: ParsedDateInput, endDate: ParsedDateInput): [Float]
    getUserCheckoutCounts(startDate: Date, endDate: Date): [Int]
    getTotalProductCounts(startDate: ParsedDateInput, endDate: ParsedDateInput,): [Int]
    getTotalProductWishlistCounts(startDate: ParsedDateInput, endDate: ParsedDateInput,): [Int]
    getTotalMerchantCounts(startDate: ParsedDateInput, endDate: ParsedDateInput): [Int]
    getTotalProductsPerCategoryCounts(startDate: ParsedDateInput, endDate: ParsedDateInput): [StatisticalProductCategory]
    getTotalProductsPerMerchantCounts(startDate: ParsedDateInput, endDate: ParsedDateInput,merchant:String): [StatisticalProductMerchant]
    getUserSignUp (startDate: ParsedDateInput, endDate: ParsedDateInput,): [Int]
    getPaidOrderCounts(startDate: Date, endDate: Date): [Int]
    getBestSellerProducts(startDate: ParsedDateInput, endDate: ParsedDateInput, limit: Int): [StatisticalProduct]
    getBestSellerProductsMerchant(startDate: ParsedDateInput, endDate: ParsedDateInput, limit: Int,merchant: String): [StatisticalProduct]
    getTotalRevenue(startDate: Date, endDate: Date): [Float]
    getUserSignUpTotal: Int
    getProductsTotal: Int
    getMerchantTotal: Int
    getOrderTotal: Int
    getGidaUser: Int
    getTotalRating: Int
    getActiveUsersCount: Int
    getMostActiveCustomer: TopCustomer
    getBiggestSpenderCustomer: TopCustomer
    getAverageProcessingTime: String
    getAverageRatings(startDate: Date, endDate: Date): AverageRatings
    getMostFavoriteProducts(startDate: Date, endDate: Date, limit: Int): [StatisticalProduct]
    getGidaPopularKeywords(startDate: Date, endDate: Date, limit: Int, category: String): [StatisticalGidaKeyword]
    getMonthlySalesCategory(startDate: ParsedDateInput, endDate: ParsedDateInput): [SalesCategory]
    getMonthlySalesMerchant(startDate: ParsedDateInput, endDate: ParsedDateInput, merchant: String): [Float]
    getMonthlySalesProduct(startDate: ParsedDateInput, endDate: ParsedDateInput, productId: String): [Float]
    getMonthlyNumberOrder(startDate: ParsedDateInput, endDate: ParsedDateInput): NumberOrderStatus
    getMonthlySales(startDate: ParsedDateInput, endDate: ParsedDateInput): [Float]
    getMonthlyDigitalMarketing(startDate: ParsedDateInput, endDate: ParsedDateInput): [Float]
  }
`;

const resolvers = {
  Query: {
    getMonthlyRevenues: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          // "SELECT SUM(total), DATE_TRUNC('month', created_at) AS time FROM orders" +
          //   " WHERE order_status_id != 6 AND created_at >= $1 AND created_at <= $2" +
          //   " GROUP BY time",
          "SELECT SUM(o.total), DATE_TRUNC('month', ot.created_at) AS time FROM orders o" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " GROUP BY time",
          [start, end]
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
        });
    },
    getMonthlyProfits: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      /* NOTES
        profit = product quantity *
          ((Kadoqu discounted price || customer's purchase price) - Kadoqu's purchase price)
          + wrapping service fee if wrapped
      */
      return db
        .any(
          "SELECT SUM(quantity * (" +
            " (CASE (product ->> 'kadoquDiscount')::FLOAT WHEN 0 THEN (product ->> 'price')::FLOAT" +
            " ELSE (product ->> 'kadoquDiscount')::FLOAT END) - " +
            ` (product ->> 'merchantPrice')::FLOAT * ${kadoquPurchasePrice}` +
            ")) AS profit, DATE_TRUNC('month', order_tracks.created_at) AS time" +
            " FROM orders INNER JOIN order_products ON orders.id = order_products.order_id" +
            " INNER JOIN order_tracks ON orders.id = order_tracks.order_id" +
            " WHERE order_status_id != 6 AND order_tracks.status = 2" +
            " AND order_tracks.created_at >= $1 AND order_tracks.created_at <= $2" +
            " GROUP BY time",
          // "SELECT SUM(quantity * (" +
          //   " (product ->> 'price')::FLOAT" +
          //   " - " +
          //   ` (product ->> 'merchantPrice')::FLOAT * ${kadoquPurchasePrice}` +
          //   ")) AS profit, DATE_TRUNC('month', orders.created_at) AS time" +
          //   " FROM orders INNER JOIN order_products ON orders.id = order_products.order_id" +
          //   " WHERE order_status_id != 6 AND orders.created_at >= $1 AND orders.created_at <= $2" +
          //   " GROUP BY time",
          [start, end]
        )
        .then(responseProduct => {
          let profits = new Array(countRequestedMonths).fill(0);
          if (responseProduct.length === 0) {
            return profits;
          }
          responseProduct.forEach(value => {
            const i = monthsInRange(start, new Date(value.time)) - 1;
            if (i >= 0 && i < countRequestedMonths) {
              profits[i] = value.profit;
            }
          });
          return db
            .any(
              // "SELECT SUM(10000::FLOAT) AS profit, DATE_TRUNC('month', orders.created_at) AS time" +
              //   " FROM orders INNER JOIN order_wrappings ON orders.id = order_wrappings.order_id" +
              //   " WHERE order_status_id != 6 AND orders.created_at >= $1 AND orders.created_at <= $2" +
              //   " GROUP BY time",
              "SELECT SUM(COALESCE((ow.wrapper ->> 'price')::FLOAT, 0) + COALESCE((ow.ribbon ->> 'price')::FLOAT, 0) + CASE WHEN ow.greeting_card IS NULL then 0 ELSE 5000 END) AS profit," +
                " DATE_TRUNC('month', ot.created_at) AS time" +
                " FROM orders o" +
                " INNER JOIN order_wrappings ow ON o.id = ow.order_id" +
                " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
                " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
                " AND ot.created_at >= $1 AND ot.created_at <= $2" +
                " GROUP BY time",
              [start, end]
            )
            .then(responseWrapping => {
              responseWrapping.forEach(value => {
                const i = monthsInRange(start, new Date(value.time)) - 1;
                if (i >= 0 && i < countRequestedMonths) {
                  profits[i] += value.profit;
                }
              });
              return profits;
            });
        });
    },
    getUserSignUp: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(DATE_TRUNC('month', users.created_at)), DATE_TRUNC('month', users.created_at) AS create_date" +
            " FROM users" +
            " WHERE users.created_at >= $1 AND users.created_at <= $2" +
            " GROUP BY create_date" +
            " ORDER BY create_date",
          [start, end]
        )
        .then(response => {
          let user = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return user;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedMonths; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              monthsInRange(
                start,
                new Date(response[resIterator].create_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            user[i] = response[resIterator].count;
            resIterator++;
          }
          return user;
        });
    },
    getUserCheckoutCounts: (
      _,
      { startDate, endDate = new Date() },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let start = new Date(startDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      let end = new Date(endDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      const countRequestedDays = daysInRange(start, end);
      return db
        .any(
          "SELECT COUNT(id), DATE_TRUNC('day', orders.created_at) AS create_date" +
            " FROM orders" +
            " WHERE orders.created_at >= $1 AND orders.created_at <= $2" +
            " GROUP BY create_date",
          [start, end]
        )
        .then(response => {
          let checkouts = new Array(countRequestedDays).fill(0);
          if (response.length === 0) {
            return checkouts;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedDays; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              daysInRange(
                start,
                new Date(response[resIterator].create_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            checkouts[i] = response[resIterator].count;
            resIterator++;
          }
          return checkouts;
        });
    },
    getPaidOrderCounts: (_, { startDate, endDate = new Date() }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let start = new Date(startDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      let end = new Date(endDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      const countRequestedDays = daysInRange(start, end);
      return db
        .any(
          "SELECT COUNT(id)," +
            " DATE_TRUNC('day', TIMESTAMP 'epoch' + (payment_confirmation_data ->> 'transferTime')::INT * INTERVAL '1 second') AS transfer_date" +
            " FROM orders" +
            " WHERE payment_confirmation_data IS NOT NULL AND" +
            " DATE_TRUNC('day', TIMESTAMP 'epoch' + (payment_confirmation_data ->> 'transferTime')::INT * INTERVAL '1 second') >= $1" +
            " AND" +
            " DATE_TRUNC('day', TIMESTAMP 'epoch' + (payment_confirmation_data ->> 'transferTime')::INT * INTERVAL '1 second') <= $2" +
            " GROUP BY transfer_date",
          [start, end]
        )
        .then(response => {
          let paidOrders = new Array(countRequestedDays).fill(0);
          if (response.length === 0) {
            return paidOrders;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedDays; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              daysInRange(
                start,
                new Date(response[resIterator].transfer_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            paidOrders[i] = response[resIterator].count;
            resIterator++;
          }
          return paidOrders;
        });
    },
    getBestSellerProducts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        limit = 5
      },
      context
    ) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const { role, name } = context.user;
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      return db
        .any(
          "SELECT (product #>> '{id}') AS id," +
            " (product #>> '{name}') AS name, (product #>> '{merchant}') AS merchant," +
            " SUM(quantity) AS quantity" +
            " FROM orders INNER JOIN order_products ON orders.id = order_products.order_id" +
            " WHERE order_status_id > 1 AND order_status_id < 6 AND" +
            " orders.created_at >= $1 AND orders.updated_at <= $2" +
            (role === "admin" ? "" : " AND (product ->> 'merchant') = $4") +
            " GROUP BY (product #>> '{id}'), (product #>> '{name}'), (product #>> '{merchant}')" +
            " ORDER BY quantity DESC" +
            (role === "admin" ? " LIMIT $3" : ""),
          [start, end, limit, name]
        )
        .then(bestSellerProducts => {
          return bestSellerProducts;
        });
    },
    getBestSellerProductsMerchant: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        limit = 5,
        merchant
      },
      context
    ) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const { role, name } = context.user;
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      return db
        .any(
          "SELECT (product #>> '{id}') AS id," +
            " (product #>> '{name}') AS name, (product #>> '{merchant}') AS merchant," +
            " SUM(quantity) AS quantity" +
            " FROM orders INNER JOIN order_products ON orders.id = order_products.order_id" +
            " WHERE order_status_id > 1 AND order_status_id < 6 AND" +
            " orders.created_at >= $1 AND orders.updated_at <= $2" +
            (role === "admin" ? "" : " AND (product ->> 'merchant') = $5") +
            " GROUP BY (product #>> '{id}'), (product #>> '{name}'), (product #>> '{merchant}')" +
            " ORDER BY quantity DESC" +
            (role === "admin" ? " LIMIT $3" : ""),
          [start, end, limit, name, merchant]
        )
        .then(bestSellerProducts => {
          return bestSellerProducts;
        });
    },
    getTotalRevenue: (_, { startDate, endDate }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db
        .one(
          "SELECT SUM(total) FROM orders GROUP BY month" +
            " WHERE order_status_id != 6 AND created_at >= $1 AND created_at <= $2",
          [startDate, endDate]
        )
        .then(sum => {
          return sum;
        });
    },
    getActiveUsersCount: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const ACTIVE_USER_PERIOD = 3; // based on OKR
      const ACTIVE_USER_MIN_PURCHASE = 1; // based on OKR
      let start = new Date();
      start.setMonth(start.getMonth() - ACTIVE_USER_PERIOD);
      const end = new Date();
      return db
        .any(
          "SELECT COUNT(id), user_id FROM orders" +
            " WHERE order_status_id = 5 AND" +
            " orders.updated_at >= $1 AND orders.updated_at <= $2" +
            " GROUP BY user_id HAVING COUNT(id) >= $3",
          [start, end, ACTIVE_USER_MIN_PURCHASE]
        )
        .then(response => {
          return response.length;
        });
    },
    getUserSignUpTotal: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db.one("SELECT COUNT(id) FROM users").then(response => {
        return response.count;
      });
    },
    getProductsTotal: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db
        .one(
          "SELECT COUNT(p.id) FROM products p " +
            "INNER JOIN admins a " +
            "ON p.merchant = a.name " +
            "WHERE merchant_level != 10"
        )
        .then(response => {
          return response.count;
        });
    },
    getMerchantTotal: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db
        .one(
          "SELECT COUNT(id) FROM admins " +
            "WHERE role = 'merchant' AND merchant_level != 10"
        )
        .then(response => {
          return response.count;
        });
    },
    getOrderTotal: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db.one("SELECT COUNT(id) FROM orders").then(response => {
        return response.count;
      });
    },
    getGidaUser: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db.one("SELECT COUNT(id) FROM survey_log").then(response => {
        return response.count;
      });
    },
    getTotalRating: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db.one("SELECT COUNT(id) FROM ratings").then(response => {
        return response.count;
      });
    },
    getMostActiveCustomer: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db
        .any(
          "SELECT x.user_id AS id, first_name, last_name, email, x.count AS count" +
            " FROM (SELECT COUNT(id) AS count, user_id FROM orders" +
            " WHERE order_status_id = 5" +
            " GROUP BY user_id ORDER BY COUNT(id) DESC LIMIT 1) x" +
            " INNER JOIN users ON users.id = x.user_id"
        )
        .then(response => {
          if (response.length === 0) {
            return {};
          }
          const { id, first_name, last_name, email, count } = response[0];
          let topCustomer = {
            id,
            name: `${first_name} ${last_name}`,
            email,
            ordersMade: count
          };
          return db
            .one(
              "SELECT updated_at" +
                " FROM orders" +
                " WHERE user_id = $1 AND order_status_id = 5" +
                " ORDER BY updated_at DESC LIMIT 1",
              [id]
            )
            .then(response => {
              topCustomer["lastActivity"] = new Date(response.updated_at);
              return topCustomer;
            });
        });
    },
    getBiggestSpenderCustomer: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return db
        .any(
          "SELECT x.user_id AS id, first_name, last_name, email, x.sum AS sum" +
            " FROM (SELECT SUM(total) AS sum, user_id FROM orders" +
            " WHERE order_status_id = 5" +
            " GROUP BY user_id ORDER BY SUM(total) DESC LIMIT 1) x" +
            " INNER JOIN users ON users.id = x.user_id"
        )
        .then(response => {
          if (response.length === 0) {
            return {};
          }
          const { id, first_name, last_name, email, sum } = response[0];
          let topCustomer = {
            id,
            name: `${first_name} ${last_name}`,
            email,
            totalSpent: sum
          };
          return db
            .one(
              "SELECT updated_at" +
                " FROM orders" +
                " WHERE user_id = $1 AND order_status_id = 5" +
                " ORDER BY updated_at DESC LIMIT 1",
              [id]
            )
            .then(response => {
              topCustomer["lastActivity"] = new Date(response.updated_at);
              return topCustomer;
            });
        });
    },
    getAverageProcessingTime: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      return (
        db
          // .any(
          //   "SELECT (payment_confirmation_data -> 'transferTime') AS start, updated_at AS end" +
          //     " FROM orders" +
          //     " WHERE order_status_id = 5"
          // )
          .any(
            "SELECT st1.date AS start, COALESCE(st2.date, now()) AS end " +
              "FROM orders o INNER JOIN order_tracks st1 ON o.id = st1.order_id " +
              "AND st1.order_status_id = 2 " +
              "LEFT JOIN order_tracks st2 ON o.id = st2.order_id " +
              "AND st2.order_status_id = 3 " +
              "WHERE o.order_status_id NOT IN (1, 6)"
          )
          .then(response => {
            if (response.length === 0) {
              return null;
            }
            const totalTime = response.reduce((sum, transaction) => {
              // const diffInSeconds =
              //   transaction.end.getTime() / 1000 - transaction.start;
              const diffInSeconds =
                (transaction.end.getTime() - transaction.start.getTime()) /
                1000;
              return sum + diffInSeconds;
            }, 0);
            const averageTime = totalTime / response.length;
            return `${Math.floor(averageTime / (3600 * 24))}d ${Math.floor(
              (averageTime % (3600 * 24)) / 3600
            )}h`;
          })
      );
    },
    getAverageRatings: (_, { startDate, endDate = new Date() }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let start = new Date(startDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      let end = new Date(endDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      return db
        .one(
          "SELECT COUNT(id), AVG(speed_cs) AS cs, AVG(service) AS sv," +
            " AVG(product_quality) AS pq, AVG(wrapping_quality) AS wq, AVG(product_safety) AS ps , AVG(product_satisfaction) AS pros" +
            " FROM ratings WHERE created_at >= $1 AND created_at <= $2",
          [start, end]
        )
        .then(response => {
          const { cs, sv, pq, wq, ps, pros, count } = response;
          return {
            speedCS: cs,
            service: sv,
            productQuality: pq,
            wrappingQuality: wq,
            productSafety: ps,
            productSatisfaction: pros,
            ratingCount: count
          };
        });
    },
    getMostFavoriteProducts: (
      _,
      { startDate, endDate = new Date(), limit = 5 },
      context
    ) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const { role, name } = context.user;
      let start = new Date(startDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      let end = new Date(endDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      return db
        .any(
          "SELECT products.id AS id, products.name AS name, products.merchant AS merchant," +
            " x.quantity" +
            " FROM (" +
            "   SELECT product_id, COUNT(product_id) AS quantity" +
            "   FROM user_favorite_products" +
            "   WHERE created_at >= $1 AND created_at <= $2" +
            "   GROUP BY product_id, user_id" +
            " ) x INNER JOIN products ON products.id = x.product_id" +
            (role === "admin" ? "" : " AND products.merchant = $4") +
            " ORDER BY quantity DESC LIMIT $3",
          [start, end, limit, name]
        )
        .then(mostFavoriteProducts => {
          return mostFavoriteProducts;
        });
    },
    getGidaPopularKeywords: (
      _,
      { startDate, endDate = new Date(), limit = 5, category },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let securedCategory;
      switch (category) {
        case "person":
        case "event":
          securedCategory = category;
          break;
        default:
          securedCategory = "person";
          break;
      }
      let start = new Date(startDate);
      start.setHours(0);
      start.setMinutes(0);
      start.setSeconds(0);
      start.setMilliseconds(0);
      let end = new Date(endDate);
      end.setHours(23);
      end.setMinutes(59);
      end.setSeconds(59);
      end.setMilliseconds(999);
      return db
        .any(
          `SELECT ${securedCategory} AS keyword, COUNT(${securedCategory}) AS quantity` +
            " FROM survey_log" +
            " WHERE created_at >= $1 AND created_at <= $2" +
            ` GROUP BY ${securedCategory}` +
            " ORDER BY quantity DESC LIMIT $3",
          [start, end, limit]
        )
        .then(mostPopularKeywords => {
          return mostPopularKeywords;
        });
    },
    // getMonthlySalesCategory: (
    //   _,
    //   {
    //     startDate,
    //     endDate = {
    //       month: new Date().getMonth() + 1,
    //       year: new Date().getFullYear()
    //     },
    //     storeCategory,
    //     giftCategory
    //   },
    //   context
    // ) => {
    //   if (!context.user || context.user.role !== "admin") {
    //     throw new Error("Unauthorized access");
    //   }
    //   const start = new Date(
    //     startDate.year,
    //     startDate.month - 1,
    //     startDate.date || 1
    //   );
    //   const end = new Date(
    //     endDate.year,
    //     endDate.date ? endDate.month - 1 : endDate.month,
    //     endDate.date || 0
    //   );
    //   const countRequestedMonths = monthsInRange(start, end);
    //   return db
    //     .any(
    //       "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), DATE_TRUNC('month', o.updated_at) AS time" +
    //         " FROM orders o" +
    //         " INNER JOIN order_products op ON o.id = op.order_id" +
    //         " WHERE o.order_status_id = 5 AND o.updated_at >= $1 AND o.updated_at <= $2" +
    //         " AND (EXISTS (SELECT 1 FROM product_store_categories psc WHERE (op.product ->> 'id')::UUID = psc.product_id AND psc.name = $3)" +
    //         " OR EXISTS (SELECT 1 FROM product_gift_categories pgc WHERE (op.product ->> 'id')::UUID = pgc.product_id AND pgc.name = $4))" +
    //         " GROUP BY time",
    //       [start, end, storeCategory, giftCategory]
    //     )
    //     .then(response => {
    //       let revenues = new Array(countRequestedMonths).fill(0);
    //       if (response.length === 0) {
    //         return revenues;
    //       }
    //       let resIterator = 0;
    //       for (let i = 0; i < countRequestedMonths; i++) {
    //         if (!response[resIterator]) {
    //           break;
    //         }
    //         if (
    //           monthsInRange(start, new Date(response[resIterator].time)) !==
    //           i + 1
    //         ) {
    //           continue;
    //         }
    //         revenues[i] = response[resIterator].sum;
    //         resIterator++;
    //       }
    //       return revenues;
    //     })
    //     .catch(e => new Error(e.message));
    // },
    getMonthlySalesCategory: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      let promises = [];
      let sales = [];

      promises.push(
        db
          .any(
            // "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', o.created_at) AS time" +
            //   " FROM orders o" +
            //   " INNER JOIN order_products op ON o.id = op.order_id" +
            //   " WHERE o.order_status_id != 6 AND o.created_at >= $1 AND o.created_at <= $2" +
            //   " AND (op.product ->> 'merchant') NOT IN ('gida', 'Kadoqu Holiday', 'kadoquMagicMoment', 'Birthday Package')" +
            //   " GROUP BY time",
            "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_products op ON o.id = op.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " AND (op.product ->> 'merchant') NOT IN ('gida', 'Kadoqu Holiday', 'kadoquMagicMoment', 'Birthday Package')" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Gift",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Gift",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            // "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', o.created_at) AS time" +
            //   " FROM orders o" +
            //   " INNER JOIN order_products op ON o.id = op.order_id" +
            //   " WHERE o.order_status_id != 6 AND o.created_at >= $1 AND o.created_at <= $2" +
            //   " AND (op.product ->> 'merchant') = 'gida'" +
            //   " GROUP BY time",
            "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_products op ON o.id = op.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " AND (op.product ->> 'merchant') = 'gida'" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Case",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Case",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            // "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', o.created_at) AS time" +
            //   " FROM orders o" +
            //   " INNER JOIN order_products op ON o.id = op.order_id" +
            //   " WHERE o.order_status_id != 6 AND o.created_at >= $1 AND o.created_at <= $2" +
            //   " AND (op.product ->> 'merchant') = 'Kadoqu Holiday'" +
            //   " GROUP BY time",
            "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_products op ON o.id = op.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " AND (op.product ->> 'merchant') = 'Kadoqu Holiday'" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Travel",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Travel",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            // "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', o.created_at) AS time" +
            //   " FROM orders o" +
            //   " INNER JOIN order_products op ON o.id = op.order_id" +
            //   " WHERE o.order_status_id != 6 AND o.created_at >= $1 AND o.created_at <= $2" +
            //   " AND (op.product ->> 'merchant') = 'kadoquMagicMoment'" +
            //   " GROUP BY time",
            "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_products op ON o.id = op.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " AND (op.product ->> 'merchant') = 'kadoquMagicMoment'" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Magical Moment",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Magical Moment",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            // "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', o.created_at) AS time" +
            //   " FROM orders o" +
            //   " INNER JOIN order_products op ON o.id = op.order_id" +
            //   " WHERE o.order_status_id != 6 AND o.created_at >= $1 AND o.created_at <= $2" +
            //   " AND (op.product ->> 'merchant') = 'Birthday Package'" +
            //   " GROUP BY time",
            "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), SUM(op.quantity) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_products op ON o.id = op.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " AND (op.product ->> 'merchant') = 'Birthday Package'" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Birthday Package",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Birthday Package",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            "SELECT SUM(COALESCE((ow.wrapper ->> 'price')::FLOAT, 0) + COALESCE((ow.ribbon ->> 'price')::FLOAT, 0) + CASE WHEN ow.greeting_card IS NULL then 0 ELSE 5000 END)," +
              " COUNT(*) AS qty, DATE_TRUNC('month', ot.created_at) AS time" +
              " FROM orders o" +
              " INNER JOIN order_wrappings ow ON o.id = ow.order_id" +
              " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
              " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
              " AND ot.created_at >= $1 AND ot.created_at <= $2" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let revenues = new Array(countRequestedMonths).fill(0);
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              sales.push({
                category: "Wrapping",
                qty: qtys,
                sales: revenues
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                revenues[i] = value.sum;
                qtys[i] = value.qty;
              }
            });
            sales.push({
              category: "Wrapping",
              qty: qtys,
              sales: revenues
            });
            return;
          })
      );

      return Promise.all(promises)
        .then(() => sales)
        .catch(e => new Error(e.message));
    },
    getMonthlySalesMerchant: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        merchant
      },
      context
    ) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), DATE_TRUNC('month', ot.created_at) AS time" +
            " FROM orders o" +
            " INNER JOIN order_products op ON o.id = op.order_id" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " AND (op.product ->> 'merchant') = $3" +
            " GROUP BY time",
          [start, end, merchant]
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
    getMonthlySalesProduct: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        productId
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT SUM(op.quantity * (op.product ->> 'price')::FLOAT), DATE_TRUNC('month', ot.created_at) AS time" +
            " FROM orders o" +
            " INNER JOIN order_products op ON o.id = op.order_id" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " AND (op.product ->> 'id') = $3" +
            " GROUP BY time",
          [start, end, productId]
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
    getTotalProductCounts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(DATE_TRUNC('month', products.created_at)), DATE_TRUNC('month', products.created_at) AS create_date" +
            " FROM products" +
            " WHERE products.created_at >= $1 AND products.created_at <= $2" +
            " GROUP BY create_date" +
            " ORDER BY create_date",
          [start, end]
        )
        .then(response => {
          let products = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return products;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedMonths; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              monthsInRange(
                start,
                new Date(response[resIterator].create_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            products[i] = response[resIterator].count;
            resIterator++;
          }
          return products;
        });
    },
    getTotalProductWishlistCounts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1,
        0,
        0,
        0
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0,
        23,
        59,
        59
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(DATE_TRUNC('month', f.created_at)), DATE_TRUNC('month', f.created_at) AS time FROM user_favorite_products as f WHERE  (f.created_at >= $1 AND f.created_at <= $2) GROUP BY time",
          [start, end]
        )
        .then(response => {
          let products = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return products;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedMonths; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              monthsInRange(start, new Date(response[resIterator].time)) !==
              i + 1
            ) {
              continue;
            }
            products[i] = response[resIterator].count;
            resIterator++;
          }
          return products;
        });
    },
    getTotalMerchantCounts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(DATE_TRUNC('month', admins.created_at)), DATE_TRUNC('month', admins.created_at) AS create_date FROM admins WHERE merchant_code is not null AND (admins.created_at >= $1 AND admins.created_at <= $2) GROUP BY create_date ORDER BY create_date",
          [start, end]
        )
        .then(response => {
          let merchants = new Array(countRequestedMonths).fill(0);
          if (response.length === 0) {
            return merchants;
          }
          let resIterator = 0;
          for (let i = 0; i < countRequestedMonths; i++) {
            if (!response[resIterator]) {
              break;
            }
            if (
              monthsInRange(
                start,
                new Date(response[resIterator].create_date)
              ) !==
              i + 1
            ) {
              continue;
            }
            merchants[i] = response[resIterator].count;
            resIterator++;
          }
          return merchants;
        });
    },
    getTotalProductsPerCategoryCounts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      let promises = [];
      let products = [];

      promises.push(
        db
          .any(
            "SELECT COUNT(DATE_TRUNC('month', p.created_at)), DATE_TRUNC('month', p.created_at) AS time " +
              "FROM products as p " +
              "WHERE p.created_at >= $1 AND p.created_at <= $2 " +
              "AND (p.merchant NOT IN ('gida', 'Kadoqu Holiday', 'kadoquMagicMoment', 'Birthday Package','')) " +
              "AND p.is_enable=true " +
              "GROUP BY time",
            [start, end]
          )
          .then(response => {
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              products.push({
                category: "Gift",
                quantity: qtys
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                qtys[i] = parseInt(value.count);
              }
            });
            products.push({
              category: "Gift",
              quantity: qtys
            });
            return;
          })
      );

      promises.push(
        db
          .any(
            "SELECT COUNT(DATE_TRUNC('month', p.created_at)), DATE_TRUNC('month', p.created_at) AS time" +
              " FROM products as p" +
              " WHERE p.created_at >= $1 AND p.created_at <= $2" +
              " AND (p.merchant IN ('kadoquMagicMoment', 'K2U Party Designer'))" +
              " AND p.is_enable=true" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              products.push({
                category: "Magical Moment",
                quantity: qtys
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                qtys[i] = parseInt(value.count);
              }
            });
            products.push({
              category: "Magical Moment",
              quantity: qtys
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            "SELECT COUNT(DATE_TRUNC('month', p.created_at)), DATE_TRUNC('month', p.created_at) AS time" +
              " FROM products as p" +
              " WHERE p.created_at >= $1 AND p.created_at <= $2" +
              " AND (p.merchant IN ('Kadoqu Holiday'))" +
              " AND p.is_enable=true " +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              products.push({
                category: "Travel",
                quantity: qtys
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                qtys[i] = parseInt(value.count);
              }
            });
            products.push({
              category: "Travel",
              quantity: qtys
            });
            return;
          })
      );
      promises.push(
        db
          .any(
            "SELECT COUNT(DATE_TRUNC('month', p.created_at)), DATE_TRUNC('month', p.created_at) AS time" +
              " FROM products as p" +
              " WHERE p.created_at >= $1 AND p.created_at <= $2" +
              " AND (p.merchant IN ('Birthday Package'))" +
              " AND p.is_enable=true" +
              " GROUP BY time",
            [start, end]
          )
          .then(response => {
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              products.push({
                category: "Birthday Package",
                quantity: qtys
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                qtys[i] = value.count;
              }
            });
            products.push({
              category: "Birthday Package",
              quantity: qtys
            });
            return;
          })
      );

      promises.push(
        db
          .any(
            "SELECT COUNT(DATE_TRUNC('month', p.created_at)), DATE_TRUNC('month', p.created_at) AS time " +
              "FROM products as p " +
              "WHERE p.created_at >= $1 AND p.created_at <= $2 " +
              "AND (p.merchant IN ('gida')) " +
              "AND p.is_enable=true " +
              "GROUP BY time",
            [start, end]
          )
          .then(response => {
            let qtys = new Array(countRequestedMonths).fill(0);
            if (response.length === 0) {
              products.push({
                category: "Case",
                quantity: qtys
              });
              return;
            }
            response.forEach(value => {
              const i = monthsInRange(start, new Date(value.time)) - 1;
              if (i >= 0 && i < countRequestedMonths) {
                qtys[i] = value.count;
              }
            });
            products.push({
              category: "Case",
              quantity: qtys
            });
            return;
          })
      );

      return Promise.all(promises)
        .then(() => {
          return products;
        })
        .catch(e => new Error(e.message));
    },
    getTotalProductsPerMerchantCounts: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        },
        merchant
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(`SELECT name FROM admins WHERE role='merchant' AND name=$1`, [
          merchant
        ])
        .then(merchants => {
          return db
            .any(
              `SELECT COUNT(DATE_TRUNC('month', products.created_at)), DATE_TRUNC('month', products.created_at) AS create_date,admins.name  FROM products JOIN admins ON products.merchant = admins.name WHERE products.is_enable=true AND admins.name =$3 AND (products.created_at >= $1 AND products.created_at <= $2) GROUP BY create_date,admins.name  ORDER BY create_date,admins.name `,
              [start, end, merchant]
            )
            .then(response => {
              let merchant = [];

              for (let i = 0; i < merchants.length; i++) {
                merchant.push(merchants[i].name);
              }
              let res = [];
              for (let i = 0; i < merchant.length; i++) {
                let products = new Array(countRequestedMonths).fill(0);
                let arr = response.filter(e => e.name === merchant[i]);
                let resIterator = 0;
                for (let k = 0; k < countRequestedMonths; k++) {
                  if (!arr[resIterator]) {
                    break;
                  }
                  if (
                    monthsInRange(
                      start,
                      new Date(arr[resIterator].create_date)
                    ) !==
                    k + 1
                  ) {
                    continue;
                  }
                  products[k] = response[resIterator].count;
                  resIterator++;
                }
                res.push({
                  merchant: merchant[i],
                  quantity: products
                });
              }
              return res;
            });
        });
    },
    getMonthlyNumberOrder: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT COUNT(*), DATE_TRUNC('month', created_at) AS time, order_status_id AS status" +
            " FROM orders" +
            " WHERE created_at >= $1 AND created_at <= $2" +
            " GROUP BY time, status",
          [start, end]
        )
        .then(response => {
          let done = new Array(countRequestedMonths).fill(0);
          let process = new Array(countRequestedMonths).fill(0);
          let cancel = new Array(countRequestedMonths).fill(0);
          let total = new Array(countRequestedMonths).fill(0);
          response.forEach(value => {
            if (value.status === 5) {
              done[monthsInRange(start, new Date(value.time)) - 1] =
                value.count;
            } else if (value.status === 6) {
              cancel[monthsInRange(start, new Date(value.time)) - 1] =
                value.count;
            } else {
              process[
                monthsInRange(start, new Date(value.time)) - 1
              ] += parseInt(value.count);
            }
            total[monthsInRange(start, new Date(value.time)) - 1] += parseInt(
              value.count
            );
          });

          return {
            done: done,
            process: process,
            cancel: cancel,
            total: total
          };
        })
        .catch(e => new Error(e.message));
    },
    getMonthlySales: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          // "SELECT SUM(product_total), DATE_TRUNC('month', created_at) AS time FROM orders" +
          //   " WHERE order_status_id != 6 AND created_at >= $1 AND created_at <= $2" +
          //   " GROUP BY time",
          "SELECT SUM(o.product_total), DATE_TRUNC('month', ot.created_at) AS time FROM orders o" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " GROUP BY time",
          [start, end]
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
        });
    },
    getMonthlyDigitalMarketing: (
      _,
      {
        startDate,
        endDate = {
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear()
        }
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      const start = new Date(
        startDate.year,
        startDate.month - 1,
        startDate.date || 1
      );
      const end = new Date(
        endDate.year,
        endDate.date ? endDate.month - 1 : endDate.month,
        endDate.date || 0
      );
      const countRequestedMonths = monthsInRange(start, end);
      return db
        .any(
          "SELECT SUM(o.product_discount), DATE_TRUNC('month', ot.created_at) AS time FROM orders o" +
            " INNER JOIN order_tracks ot ON o.id = ot.order_id" +
            " WHERE o.order_status_id != 6 AND ot.order_status_id = 2" +
            " AND ot.created_at >= $1 AND ot.created_at <= $2" +
            " GROUP BY time",
          [start, end]
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
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
