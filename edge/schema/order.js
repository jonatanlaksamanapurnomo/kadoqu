const { GraphQLDateTime } = require("graphql-iso-date");
const { db } = require("../db");
const { getWaybillTrack, getDivider } = require("../library/rajaOngkir");
const {
  customerMail,
  // orderInProgressEmail,
  shippingEmail,
  sendNewOrderNoticeToAdmins
} = require("../library/postmark");
const { sendRajaSms } = require("../library/RajaSms");
const typeDefs = `
  scalar DateTime
  type OrderPagination{
    length:Int
    orders:[Order]
  }
  type Order {
    id: String
    userId: String
    user: User
    number: Int
    billingAddress: JSON
    shippingAddress: JSON
    shippingMethod: String
    courierCode: String
    courierService: String
    shippingFee: Float
    resi: String
    voucherCode: String
    voucherDiscount: Float
    orderProducts: [OrderProduct]
    orderTracks: [OrderTrack]
    orderWrappings: [OrderWrapping]
    orderCustome: [OrderCustome]
    productDiscount: Float
    productTotal: Float
    weightTotal: Float
    total: Float
    paymentMethod: String
    orderStatusId: Int
    orderStatus: OrderStatus
    wrappingFee: Float
    paymentConfirmationData: JSON
    waybillTrack: JSON
    donation: Float
    createdAt: DateTime
    updatedAt: DateTime
  }
  type PaginatedOrders {
    length: Int
    orders: [Order]
  }
  input OrderInput {
    billingAddress: JSON
    shippingAddress: JSON
    shippingMethod: String
    courierCode: String
    courierService: String
    resi: String
    voucherCode: String
    paymentMethod: String
    orderStatusId: Int
    orderProducts: [OrderProductInput]
    totalWrapperPrice: Float
    donation: Boolean
  }
  input PaymentConfirmationInput {
    accountName: String
    bank: String
    nominal: Float
    transferTime: Int
    receipt: String
  }
  extend type Query {
    getOrders: [Order]
    getAllOrdersStatusList(statuses: [Int]):[Order]
    getOrderStatusList(statuses: [Int],limit:Int,offset:Int,keyword:String,start:String,end:String): OrderPagination
    getRecentOrders(limit: Int): [Order]
    getallOrders: [Order]
    getallOrdersPagination(first: Int, after: Int): [Order]
    getOrder(id: String): Order
    getUserOrders(orderStatus: Int, limit: Int, offset: Int): PaginatedOrders
    getUserLastOrder: Order
    getOrderByOrderNumber(no: Int): Order
    getAllPaymentReviewOrder:[Order]
  }
  extend type Mutation{
    addOrder(input: OrderInput, orderProducts: [OrderProductInput], orderWrappings: [OrderWrappingProductInput]): Order
    confirmPayment(orderNumber: Int, input: PaymentConfirmationInput): String
    updateOrder(resi: String, statusId: Int, id: String, orderProducts: [JSON], userDetail: JSON): Order
    editShippingFee(id: String, shippingFee: Float): Boolean
    deleteOrderDetail(id: String): Boolean
    orderChecker:Boolean
    orderWaybillTrack: String
    orderCompletedChecker: String
  }
`;

const fieldNameMapper = order => ({
  id: order.id,
  number: order.no,
  userId: order.user_id,
  billingAddress: order.billing_address,
  shippingAddress: order.shipping_address,
  shippingMethod: order.shipping_method,
  shippingFee: order.shipping_fee,
  courierCode: order.courier_code,
  courierService: order.courier_service,
  resi: order.resi,
  voucherCode: order.voucher_code,
  voucherDiscount: order.voucher_discount,
  productDiscount: order.product_discount,
  productTotal: order.product_total,
  weightTotal: order.weight_total,
  total: order.total,
  paymentMethod: order.payment_method,
  orderStatusId: order.order_status_id,
  wrappingFee: order.wrapping_fee,
  paymentConfirmationData: order.payment_confirmation_data,
  waybillTrack: order.waybill_track,
  donation: order.donation,
  createdAt: order.created_at,
  updatedAt: order.updated_at
});

const resolvers = {
  DateTime: GraphQLDateTime,
  // OrderStatus: {
  //   orders: orderStatus =>
  //     db
  //       .any('SELECT * FROM "orders" WHERE "order_status_id" = $1', [
  //         orderStatus.id
  //       ])
  //       .then(orders => orders.map(fieldNameMapper))
  // },
  VoucherUsage: {
    order: voucherUsage =>
      db
        .one("SELECT * FROM orders WHERE id = $1", [voucherUsage.orderId])
        .then(response => fieldNameMapper(response))
        .catch(e => new Error(e.message))
  },
  RatingProduct: {
    order: rating =>
      db
        .one("SELECT * FROM orders WHERE id = $1", [rating.orderId])
        .then(response => fieldNameMapper(response))
        .catch(error => new Error(error.message || error))
  },
  Query: {
    getOrderStatusList: (
      _,
      {
        statuses,
        limit = null,
        offset = null,
        keyword,
        start = null,
        end = null
      },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      // const start = new Date().getTime();
      let variables = [];
      let conditions = [];
      // console.log(keyword);
      (statuses || []).forEach(status => {
        conditions.push(`order_status_id = $${variables.push(status)}`);
      });
      let search = [];
      if (keyword && keyword !== "") {
        search.push(
          `AND (billing_address->>'name' ilike $${variables.push(
            "%" + keyword + "%"
          )} OR shipping_address->>'name' ilike $${variables.push(
            "%" + keyword + "%"
          )}`
        );
        if (Number.isInteger(parseInt(keyword))) {
          search.push(` OR no=$${variables.push(keyword)}`);
        }
        search.push(")");
      }
      if (start && start !== "" && (end && end !== "")) {
        search.push(
          `AND (created_at>=$${variables.push(
            start
          )} AND created_at<=$${variables.push(end)})`
        );
      }
      let limOff = `LIMIT $${variables.push(limit)} OFFSET $${variables.push(
        offset
      )}`;
      // console.log(variables)
      return db
        .one(
          [
            "SELECT COUNT(id) FROM orders",
            "WHERE",
            "(",
            conditions.join(" OR "),
            ")",
            search.join("")
          ].join(" "),
          variables
        )
        .then(length => {
          // console.log(length)
          return db
            .any(
              [
                "SELECT * FROM orders",
                "WHERE",
                "(",
                conditions.join(" OR "),
                ")",
                search.join(""),
                "ORDER BY no DESC",
                limOff
              ].join(" "),
              variables
            )
            .then(orderStatus => {
              let res = {
                length: length.count,
                orders: orderStatus.map(fieldNameMapper)
              };
              return res;
            });
        });
    },
    getAllOrdersStatusList: (_, { statuses }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      let variables = [];
      let conditions = [];
      (statuses || []).forEach(status => {
        conditions.push(`order_status_id = $${variables.push(status)}`);
      });
      return db
        .any(
          ["SELECT * FROM orders", "WHERE", conditions.join(" OR ")].join(" "),
          variables
        )
        .then(orderStatus => {
          return orderStatus.map(fieldNameMapper);
        });
    },
    getAllPaymentReviewOrder: () => {
      return db
        .any(
          "select * from orders where order_status_id >= 2 and order_status_id < 6  "
        )
        .then(orders => orders.map(fieldNameMapper));
    },
    getOrderByOrderNumber: (_, { no }) => {
      return db
        .one("select * from orders where no  = $1", [no])
        .then(order => fieldNameMapper(order));
    },
    getUserOrders: (
      _,
      { orderStatus = null, limit = null, offset = null },
      context
    ) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one(
          "SELECT COUNT(orders.*) as length FROM orders WHERE user_id = $1" +
            (orderStatus
              ? " AND order_status_id = $2 "
              : " AND order_status_id != 5 "),
          [context.user.data, orderStatus]
        )
        .then(({ length }) => {
          return db
            .any(
              "SELECT * FROM orders WHERE user_id = $1" +
                (orderStatus
                  ? " AND order_status_id = $2 ORDER BY order_status_id ASC,no DESC "
                  : " AND order_status_id != 5 ORDER BY order_status_id ASC,no DESC ") +
                (limit ? "LIMIT $3 OFFSET $4" : ""),
              [context.user.data, orderStatus, limit, offset]
            )
            .then(orders => ({
              length: length,
              orders: orders.map(fieldNameMapper)
            }));
        });
    },
    getOrders: (parent, args, context) => {
      return db
        .any("SELECT * FROM orders")
        .then(orders => orders.map(fieldNameMapper));
    },
    getRecentOrders: (_, { limit = 5 }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin Auth only");
      }
      return db
        .any("SELECT * FROM orders ORDER BY created_at DESC LIMIT $1", [limit])
        .then(orders => orders.map(fieldNameMapper));
    },
    getallOrders: (parent, args, context) => {
      let role = context.user.role;

      if (role === "admin") {
        return db
          .any('SELECT * FROM "orders"')
          .then(orders => orders.map(fieldNameMapper));
      } else {
        throw new Error("bukan admin");
      }
    },
    getallOrdersPagination: (root, { first, after }, ctx, info) => {
      {
        const index = posts.map(m => m.id).indexOf(after) + 1;
        return getallOrders.slice(index, index + 1);
      }
    },
    getOrder: (_, { id }) => {
      return db
        .one("select * from orders where id = $1", [id])
        .then(order => fieldNameMapper(order));
    },
    getUserLastOrder: (_, __, context) =>
      db
        .one(
          "SELECT * FROM orders WHERE user_id = $1 AND order_status_id = 5 ORDER BY created_at DESC LIMIT 1",
          [context.user.data]
        )
        .then(order => fieldNameMapper(order))
        .catch(e => {
          throw new Error(e.message);
        })
  },
  Mutation: {
    orderChecker: () => {
      return db
        .any("select * from orders where order_status_id=1")
        .then(orders => {
          const allOrders = orders.map(fieldNameMapper);
          allOrders.forEach(order => {
            const id = order.id;
            return db
              .manyOrNone("SELECT * FROM order_products where order_id=$1", [
                id
              ])
              .then(products => {
                products.map(product => {
                  return db
                    .manyOrNone(
                      "select * from product_holiday_categories where product_id = $1",
                      [product.product.id]
                    )
                    .then(categories => {
                      let orderCreatedAt = 0;
                      let dateNow = 0;
                      if (categories.length < 1) {
                        orderCreatedAt =
                          new Date(order.createdAt).getTime() + 86400000;
                      } else {
                        orderCreatedAt =
                          new Date(order.createdAt).getTime() + 3600000;
                      }
                      dateNow = Date.now();
                      if (orderCreatedAt < dateNow) {
                        return db
                          .none(
                            "UPDATE products SET stock = stock + $1 WHERE id = $2",
                            [product.quantity, product.product.id]
                          )
                          .then(() => {
                            return db
                              .none(
                                `UPDATE orders SET order_status_id = 6,
                                   updated_at = now()
                                   WHERE id = $1
                                `,
                                [id]
                              )
                              .then(() => true);
                          })
                          .catch(error => new Error(error.message || error));
                      } else {
                        return false;
                      }
                    });
                });
              })
              .catch(error => new Error(error.message || error));
          });
        });
    },
    orderWaybillTrack: () =>
      db
        .any(
          "SELECT id, resi, courier_code FROM orders " +
            "WHERE order_status_id = 4 AND shipping_method = 'courier' AND resi <> '' " +
            "ORDER BY created_at DESC"
        )
        .then(orders => {
          const promises = orders.map(order =>
            getWaybillTrack(order.resi, order.courier_code.toLowerCase())
              .then(response => {
                if (response) {
                  const isDelivered = response.delivered;
                  return db.none(
                    `UPDATE orders SET waybill_track = $1${
                      isDelivered ? ", order_status_id = 5" : ""
                    } WHERE id = $2`,
                    [response, order.id]
                  );
                }
                return true;
              })
              .catch(e => new Error(e.message || e))
          );
          return Promise.all(promises)
            .then(() => "Success")
            .catch(e => new Error(e.message || e));
        }),
    orderCompletedChecker: () =>
      db
        .any("SELECT id, created_at FROM orders WHERE order_status_id = 4")
        .then(orders => {
          const promises = orders.map(order => {
            const dateNow = ~~(Date.now() / 1000);
            orderCreatedAt =
              ~~(new Date(order.created_at).getTime() / 1000) + 604800;
            if (dateNow > orderCreatedAt)
              return db.none(
                "UPDATE orders SET order_status_id = 5 WHERE id = $1",
                [order.id]
              );
            return true;
          });
          return Promise.all(promises)
            .then(() => "Success")
            .catch(e => new Error(e.message));
        }),
    deleteOrderDetail: (_, { id }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db.none("delete from orders where id = $1", [id]).then(() => true);
    },
    editShippingFee: (_, { id, shippingFee }) => {
      return db
        .none(
          "update orders set shipping_fee = $2, updated_at = now() where id = $1",
          [id, shippingFee]
        )
        .then(() => true)
        .catch(e => {
          throw new Error("Cannot edit Fee");
        });
    },
    addOrder: (_, { input, orderProducts, orderWrappings }, context) => {
      let order = { ...input };

      order.userId = context.user.data;

      // Set status to PENDING
      order.orderStatusId = 1;

      let ids = [];
      let items = [];
      const calculateSubtotals = db
        .any(
          `SELECT * FROM products WHERE id IN (${order.orderProducts
            .map(orderProduct => "$" + ids.push(orderProduct.productId))
            .join(", ")})`,
          ids
        )
        .then(products => {
          // Check product availability
          let insufficientStocks = [];

          order.orderProducts.forEach(orderProduct => {
            const product = products.find(
              product => product.id === orderProduct.productId
            );
            if (!product) {
              return;
            }
            if (product.stock < orderProduct.quantity) {
              insufficientStocks.push({
                id: product.id,
                itemLeft: product.stock
              });
            }
          });
          if (insufficientStocks.length) {
            throw new Error(
              "Maaf, stok kami ga cukup nih..|" +
                JSON.stringify(insufficientStocks)
            );
          }

          order.productDiscount = null;
          order.productTotal = order.totalWrapperPrice;
          order.weightTotal = 0;
          let totalWeight = 0;
          let totalHeight = 0;
          let length = 0;
          let width = 0;
          let promises = [];
          let isBunga = false;

          order.orderProducts.forEach(orderProduct => {
            let product = products.find(
              product => product.id === orderProduct.productId
            );
            if (product) {
              let promises2 = [];
              promises2.push(
                db
                  .any(
                    "SELECT name FROM product_gift_categories WHERE product_id = $1",
                    [product.id]
                  )
                  .then(response => response.map(e => e.name))
              );
              promises2.push(
                db
                  .any(
                    "SELECT name FROM product_store_categories WHERE product_id = $1",
                    [product.id]
                  )
                  .then(response => response.map(e => e.name))
              );
              promises.push(
                Promise.all(promises2).then(
                  ([giftCategories, storeCategories]) => {
                    // Calculate price total
                    order.productTotal += product.price * orderProduct.quantity;

                    // Calculate discount total
                    const discountedPrice =
                      product.kadoqu_discount_until &&
                      new Date(product.kadoqu_discount_until) > new Date()
                        ? product.kadoqu_discount
                        : product.merchant_discount_until &&
                          new Date(product.merchant_discount_until) > new Date()
                        ? product.merchant_discount
                        : product.price;

                    order.productDiscount +=
                      (product.price - discountedPrice) * orderProduct.quantity;

                    giftCategories.forEach(category => {
                      if (category.includes("Bunga")) {
                        isBunga = true;
                      }
                    });

                    totalHeight += product.height * orderProduct.quantity;
                    if (product.width + (isBunga ? 5 : 2) > width) {
                      width = product.width + (isBunga ? 5 : 2);
                    }
                    if (product.length + (isBunga ? 5 : 2) > length) {
                      length = product.length + (isBunga ? 5 : 2);
                    }
                    totalWeight += product.weight * orderProduct.quantity;

                    if (discountedPrice === product.price) {
                      items.push({
                        ...product,
                        quantity: orderProduct.quantity,
                        giftCategories,
                        storeCategories
                      });
                    }
                  }
                )
              );
            }
          });
          return Promise.all(promises).then(() => {
            // Calculate weight total
            totalHeight += isBunga ? 5 : 2;
            // console.log(length, width, totalHeight, totalWeight);
            order.weightTotal = Math.max(
              Math.ceil((length * width * totalHeight) / 6),
              Math.ceil(totalWeight)
            );
            // order.weightTotal *= 1000; // Satuan dalam gram

            return order;
          });
        });

      const getShippingFee = calculateSubtotals.then(order => {
        if (order.shippingMethod.toLowerCase() === "courier") {
          const bobot = order.weightTotal / 1000;
          const destination = order.shippingAddress.subdistrictId;
          let code = "";
          let courier_name = "";
          let service = "";
          let description = "";
          let cost = 0;
          let etd = "";
          let divider = getDivider(bobot);

          // console.log(bobot);
          // console.log(divider);
          return db
            .manyOrNone(
              `SELECT * FROM courier_cost WHERE subdistrict_id = $1 AND(
                 courier = 'jne' OR courier = 'J&T')ORDER BY courier ASC,
                 service ASC;`,
              destination
            )
            .then(res => {
              // if (res.length < 1) {
              //   return getCost(
              //     destination,
              //     order.weightTotal,
              //     courier /*, length, width, height*/
              //   ).then(couriers => {
              //     couriers.forEach(courier => {
              //       code = courier.code;
              //       courier_name = courier.name;
              //       courier.costs.forEach(services => {
              //         service = services.service;
              //         description = services.description;
              //         services.cost.forEach(res => {
              //           cost = res.value / divider;
              //           etd = res.etd;
              //           db.one(
              //             `INSERT INTO courier_cost ("subdistrict_id",
              //       "courier",
              //       "service",
              //       "cost",
              //       "estimated",
              //       "description",
              //       "courier_name") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
              //             [
              //               destination,
              //               code,
              //               service,
              //               cost,
              //               etd,
              //               description,
              //               courier_name
              //             ]
              //           )
              //             .then()
              //             .catch(e => {
              //               throw new Error(e.message || e);
              //             });
              //         });
              //       });
              //     });
              //     return couriers.then(res => {
              //       let courier = res.find(
              //         courier => courier.code === order.courierCode
              //       );
              //       if (courier) {
              //         if (order.courierService) {
              //           let courierService = courier.costs.find(
              //             costs => costs.service === order.courierService
              //           );
              //           console.log(courierService);
              //           if (courierService) {
              //             return courierService.cost[0].value;
              //           } else {
              //             return courier.costs[0].cost[0].value;
              //           }
              //         } else {
              //           return courier.costs[0].cost[0].value;
              //         }
              //       }
              //       return null;
              //     });
              //   });
              // } else {
              let costJNE = [];
              let costJNT = [];
              let serviceJNE = [];
              let serviceJNT = [];
              let result = [];
              res.forEach(couriers => {
                cost = couriers.cost * divider;
                etd = couriers.estimated;
                if (couriers.courier === "jne") {
                  costJNE.push({ value: cost, etd: etd });
                } else {
                  costJNT.push({ value: cost, etd: etd });
                }
              });
              let iJNE = 0;
              let iJNT = 0;
              res.forEach(couriers => {
                service = couriers.service;
                description = couriers.description;
                if (couriers.courier === "jne") {
                  serviceJNE.push({
                    service: service,
                    description: description,
                    cost: [costJNE[iJNE]]
                  });
                  iJNE++;
                } else {
                  serviceJNT.push({
                    service: service,
                    description: description,
                    cost: [costJNT[iJNT]]
                  });
                  iJNT++;
                }
              });
              iJNE = 0;
              iJNT = 0;
              res.forEach(couriers => {
                code = couriers.courier;
                courier_name = couriers.courier_name;
                if (code === "jne" && iJNE < 1) {
                  const arr =
                    serviceJNE.length < 3
                      ? [serviceJNE[iJNE], serviceJNE[iJNE + 1]]
                      : [
                          serviceJNE[iJNE],
                          serviceJNE[iJNE + 1],
                          serviceJNE[iJNE + 2]
                        ];

                  result.push({
                    code: code,
                    name: courier_name,
                    costs: arr
                  });
                  iJNE++;
                } else if (code === "J&T" && iJNT < 1) {
                  result.push({
                    code: code,
                    name: courier_name,
                    costs: [serviceJNT[0]]
                  });
                  iJNT++;
                }
              });
              let courier = result.find(
                courier => courier.code === order.courierCode
              );
              if (courier) {
                if (order.courierService) {
                  let courierService = courier.costs.find(
                    costss => costss.service === order.courierService
                  );
                  if (courierService) {
                    return courierService.cost[0].value;
                  } else {
                    return courier.costs[0].cost[0].value;
                  }
                } else {
                  return courier.costs[0].cost[0].value;
                }
              }
              return null;
              //}
            });
          // return getCost(
          //   order.shippingAddress.subdistrictId,
          //   order.weightTotal,
          //   "jne:jnt"
          // ).then(res => {
          //   let courier = res.find(
          //     courier => courier.code === order.courierCode
          //   );
          //   if (courier) {
          //     if (order.courierService) {
          //       let courierService = courier.costs.find(
          //         costs => costs.service === order.courierService
          //       );
          //       if (courierService) {
          //         return courierService.cost[0].value;
          //       } else {
          //         return courier.costs[0].cost[0].value;
          //       }
          //     } else {
          //       return courier.costs[0].cost[0].value;
          //     }
          //   }
          //   return null;
          // });
        } else if (order.shippingMethod.toLowerCase() === "ojek online") {
          return 35000;
        } else {
          return null;
        }
      });

      let voucherId;
      return Promise.all([calculateSubtotals, getShippingFee])
        .then(([order, shippingFee]) => {
          order.shippingFee = shippingFee;

          // Calculate sub total
          order.total =
            order.productTotal - order.productDiscount + order.shippingFee;

          // Check donation, calculate grand total
          order.donation = null;
          if (input.donation) {
            order.donation = 5000;
            order.total += 5000;
          }

          // Validate voucher, calculate grand total
          order.voucherDiscount = null;
          if (input.voucherCode) {
            return db
              .one(
                `SELECT v.*, vc.id AS voucher_code_id, vc.code AS code
                  FROM voucher_codes vc
                  INNER JOIN vouchers v ON vc.voucher_id = v.id
                  WHERE vc.code = $1
                  AND v.is_enable = true
                  AND (v.valid_from <= NOW() OR v.valid_from IS NULL)
                  AND (v.valid_to >= NOW() OR v.valid_to IS NULL)`,
                [input.voucherCode]
              )
              .then(voucher => {
                return db
                  .one(
                    `SELECT COUNT(*) AS total FROM voucher_usages
                      WHERE voucher_code_id = $1`,
                    [voucher.voucher_code_id]
                  )
                  .then(({ total }) => {
                    total = parseInt(total);
                    if (voucher.stock !== null && total >= voucher.stock)
                      throw new Error("Kuota Voucher Habis");
                    return db
                      .one(
                        `SELECT COUNT(*) AS total FROM voucher_usages
                          WHERE voucher_code_id = $1
                          AND user_id = $2`,
                        [voucher.voucher_code_id, context.user.data]
                      )
                      .then(({ total }) => {
                        total = parseInt(total);
                        if (
                          voucher.max_usage !== null &&
                          total >= voucher.max_usage
                        )
                          throw new Error(
                            "Penggunaan Voucher Sudah Melewati Batas"
                          );

                        let totalDiscountedPrice = 0;
                        items.forEach(value => {
                          let isConditionProducts = true;
                          let isConditionMerchants = true;
                          let isConditionGiftCategories = true;
                          let isConditionStoreCategories = true;
                          if (voucher.products.length)
                            isConditionProducts =
                              voucher.products.filter(e => e === value.id)
                                .length > 0;
                          if (voucher.merchants.length)
                            isConditionMerchants =
                              voucher.merchants.filter(
                                e => e === value.merchant
                              ).length > 0;
                          if (voucher.gift_categories.length)
                            isConditionGiftCategories =
                              voucher.gift_categories.filter(category =>
                                value.giftCategories.includes(category)
                              ).length > 0;
                          if (voucher.store_categories.length)
                            isConditionStoreCategories =
                              voucher.store_categories.filter(category =>
                                value.storeCategories.includes(category)
                              ).length > 0;
                          if (
                            isConditionProducts &&
                            isConditionMerchants &&
                            isConditionGiftCategories &&
                            isConditionStoreCategories
                          ) {
                            totalDiscountedPrice +=
                              value.quantity * value.price;
                          }
                        });

                        if (totalDiscountedPrice === 0)
                          throw new Error("Syarat dan Ketentuan Berlaku");
                        if (totalDiscountedPrice < voucher.min_purchase)
                          throw new Error(
                            `Minimal Transaksi ${parseFloat(
                              voucher.min_purchase
                            )
                              .toFixed(0)
                              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`
                          );
                        let discount =
                          (voucher.percent_discount * totalDiscountedPrice) /
                          100;
                        if (voucher.max_discount)
                          discount = Math.min(discount, voucher.max_discount);
                        order.voucherCode = voucher.code;
                        order.voucherDiscount = discount;
                        order.total -= discount;
                        voucherId = voucher.voucher_code_id;

                        return order;
                      });
                  });
              })
              .catch(e => {
                if (e.message === "No data returned from the query.")
                  throw new Error("Kode Voucher Salah");
                throw new Error(e.message);
              });
          } else return order;
        })
        .then(order => {
          return db
            .tx(t => {
              return t
                .one(
                  `INSERT INTO orders (
                     user_id,
                     billing_address,
                     shipping_address,
                     shipping_method,
                     courier_code,
                     courier_service,
                     shipping_fee,
                     voucher_code,
                     voucher_discount,
                     product_discount,
                     product_total,
                     weight_total,
                     total,
                     payment_method,
                     order_status_id,
                     donation
                     ) VALUES (
                     $(userId),
                     $(billingAddress),
                     $(shippingAddress),
                     $(shippingMethod),
                     $(courierCode),
                     $(courierService),
                     $(shippingFee),
                     $(voucherCode),
                     $(voucherDiscount),
                     $(productDiscount),
                     $(productTotal),
                     $(weightTotal),
                     $(total),
                     $(paymentMethod),
                     $(orderStatusId),
                     $(donation)
                     ) RETURNING *
                  `,
                  order
                )
                .then(data => {
                  order.id = data.id;
                  order.number = data.no;
                  order.createdAt = data.created_at;
                  order.updatedAt = data.updated_at;

                  let orderPromises = orderProducts
                    .map(orderProduct => {
                      const q1 = t.none(
                        "UPDATE products SET stock = stock - $1 WHERE id = $2",
                        [orderProduct.quantity, orderProduct.productId]
                      );
                      const q2 = t.one("SELECT * FROM products WHERE id = $1", [
                        orderProduct.productId
                      ]);

                      return t.batch([q1, q2]).then(data => {
                        const product = data[1];
                        if (orderProduct.date || orderProduct.day) {
                          return t
                            .one(
                              "INSERT INTO order_holidays (order_id, date_from, date_to) " +
                                "VALUES ($1, $2, $3) " +
                                "RETURNING id",
                              [
                                order.id,
                                orderProduct.date && orderProduct.date.from,
                                orderProduct.date && orderProduct.date.to
                              ]
                            )
                            .then(data => {
                              const orderHolidayId = data.id;
                              return t.none(
                                `INSERT INTO order_products (product, order_id, quantity${
                                  orderHolidayId ? `, order_holiday_id` : ""
                                }) VALUES ($1, $2, $3${
                                  orderHolidayId ? ", $4" : ""
                                })`,
                                [
                                  {
                                    id: product.id,
                                    name: product.name,
                                    merchant: product.merchant,
                                    image: orderProduct.productImage,
                                    price: product.price,
                                    capitalPrice: product.capital_price,
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
                                    merchantDiscountUntil:
                                      product.merchant_discount_until,
                                    kadoquDiscountUntil:
                                      product.kadoqu_discount_until
                                  },
                                  order.id,
                                  orderProduct.quantity,
                                  orderHolidayId
                                ]
                              );
                            });
                        }
                        return t.none(
                          `INSERT INTO order_products (product, order_id, quantity)
                          VALUES ($1, $2, $3)`,
                          [
                            {
                              id: product.id,
                              name: product.name,
                              merchant: product.merchant,
                              image: orderProduct.productImage,
                              price: product.price,
                              capitalPrice: product.capital_price,
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
                              merchantDiscountUntil:
                                product.merchant_discount_until,
                              kadoquDiscountUntil: product.kadoqu_discount_until
                            },
                            order.id,
                            orderProduct.quantity
                          ]
                        );
                      });
                    })
                    .concat(
                      orderWrappings.map(orderWrapping => {
                        let promises = [
                          t
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
                            t
                              .one(
                                "SELECT * FROM wrapper_choices WHERE id = $1",
                                [orderWrapping.wrapperChoiceId]
                              )
                              .then(wrapper => ({
                                wrapperId: wrapper.id,
                                name: wrapper.name,
                                image: wrapper.url
                              }))
                          );
                        }
                        if (orderWrapping.ribbonTypeId) {
                          promises.push(
                            t
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
                              t
                                .one(
                                  "SELECT * FROM ribbon_choices WHERE id = $1",
                                  [orderWrapping.ribbonChoiceId]
                                )
                                .then(ribbon => ({
                                  ribbonId: ribbon.id,
                                  name: ribbon.name,
                                  image: ribbon.url
                                }))
                            );
                          }
                        }

                        return t
                          .batch(promises)
                          .then(results => {
                            const wrapper = Object.assign(
                              results[0],
                              orderWrapping.wrapperChoiceId ? results[1] : {}
                            );
                            const nextIndex = orderWrapping.wrapperChoiceId
                              ? 2
                              : 1;
                            const ribbon = !orderWrapping.ribbonTypeId
                              ? null
                              : Object.assign(
                                  results[nextIndex],
                                  orderWrapping.ribbonChoiceId
                                    ? results[nextIndex + 1]
                                    : {}
                                );
                            const greetingCardInput =
                              orderWrapping.greetingCard || {};
                            const greetingCard = !greetingCardInput.event
                              ? null
                              : {
                                  event: greetingCardInput.event,
                                  greetings: greetingCardInput.greetings
                                };

                            return t
                              .one(
                                "INSERT INTO order_wrappings (order_id, wrapper, ribbon, greeting_card) " +
                                  "VALUES ($1, $2, $3, $4) " +
                                  "RETURNING id",
                                [order.id, wrapper, ribbon, greetingCard]
                              )
                              .then(data => {
                                const wrappingId = data.id;
                                const wrappingPromises = orderWrapping.items.map(
                                  orderProduct => {
                                    const q1 = t.none(
                                      "UPDATE products SET stock = stock - $1 WHERE id = $2",
                                      [
                                        orderProduct.quantity,
                                        orderProduct.productId
                                      ]
                                    );
                                    const q2 = t.one(
                                      "SELECT * FROM products WHERE id = $1",
                                      [orderProduct.productId]
                                    );

                                    return t.batch([q1, q2]).then(data => {
                                      const product = data[1];
                                      if (
                                        orderProduct.date ||
                                        orderProduct.day
                                      ) {
                                        return t
                                          .one(
                                            "INSERT INTO order_holidays (order_id, date_from, date_to) " +
                                              "VALUES ($1, $2, $3) " +
                                              "RETURNING id",
                                            [
                                              order.id,
                                              orderProduct.date &&
                                                orderProduct.date.from,
                                              orderProduct.date &&
                                                orderProduct.date.to
                                            ]
                                          )
                                          .then(data => {
                                            const orderHolidayId = data.id;
                                            return t.none(
                                              `INSERT INTO order_products (product, order_id, quantity${
                                                wrappingId
                                                  ? `, wrapping_id`
                                                  : ""
                                              }${
                                                orderHolidayId
                                                  ? `, order_holiday_id`
                                                  : ""
                                              }) VALUES ($1, $2, $3${
                                                wrappingId ? ", $4" : ""
                                              }${
                                                orderHolidayId ? ", $5" : ""
                                              })`,
                                              [
                                                {
                                                  id: product.id,
                                                  name: product.name,
                                                  merchant: product.merchant,
                                                  image:
                                                    orderProduct.productImage,
                                                  price: product.price,
                                                  capitalPrice:
                                                    product.capital_price,
                                                  merchantPrice:
                                                    product.merchant_price,
                                                  merchantDiscount:
                                                    product.merchant_discount,
                                                  kadoquDiscount:
                                                    product.kadoqu_discount,
                                                  inStock: product.in_stock,
                                                  slug: product.slug,
                                                  isEnable: product.is_enable,
                                                  stock: product.stock,
                                                  weight: product.weight,
                                                  length: product.length,
                                                  width: product.width,
                                                  height: product.height,
                                                  sku: product.sku,
                                                  merchantDiscountUntil:
                                                    product.merchant_discount_until,
                                                  kadoquDiscountUntil:
                                                    product.kadoqu_discount_until
                                                },
                                                order.id,
                                                orderProduct.quantity,
                                                wrappingId,
                                                orderHolidayId
                                              ]
                                            );
                                          });
                                      }
                                      return t.none(
                                        `INSERT INTO order_products (product, order_id, quantity${
                                          wrappingId ? `, wrapping_id` : ""
                                        }) VALUES ($1, $2, $3${
                                          wrappingId ? ", $4" : ""
                                        })`,
                                        [
                                          {
                                            id: product.id,
                                            name: product.name,
                                            merchant: product.merchant,
                                            image: orderProduct.productImage,
                                            price: product.price,
                                            merchantPrice:
                                              product.merchant_price,
                                            capitalPrice: product.capital_price,
                                            merchantDiscount:
                                              product.merchant_discount,
                                            kadoquDiscount:
                                              product.kadoqu_discount,
                                            inStock: product.in_stock,
                                            slug: product.slug,
                                            isEnable: product.is_enable,
                                            stock: product.stock,
                                            weight: product.weight,
                                            length: product.length,
                                            width: product.width,
                                            height: product.height,
                                            sku: product.sku,
                                            merchantDiscountUntil:
                                              product.merchant_discount_until,
                                            kadoquDiscountUntil:
                                              product.kadoqu_discount_until
                                          },
                                          order.id,
                                          orderProduct.quantity,
                                          wrappingId
                                        ]
                                      );
                                    });
                                  }
                                );

                                return t.batch(wrappingPromises);
                              })
                              .catch(e => {
                                throw new Error(e.message || e);
                              });
                          })
                          .catch(e => {
                            throw new Error(e.message || e);
                          });
                      })
                    );
                  if (voucherId) {
                    orderPromises.push(
                      t.none(
                        "INSERT INTO voucher_usages (voucher_code_id, order_id, user_id) " +
                          "VALUES ($1, $2, $3)",
                        [voucherId, order.id, order.userId]
                      )
                    );
                  }

                  return t
                    .batch(orderPromises)
                    .then(() => {
                      return order;
                    })
                    .catch(e => {
                      throw new Error(e.message || e);
                    });
                })
                .catch(e => {
                  throw new Error(e.message || e);
                });
            })
            .then(order => {
              // email to customer
              let shippingAddress =
                order.shippingAddress &&
                `${order.shippingAddress.street}, ${order.shippingAddress.subdistrict}, ${order.shippingAddress.city}, ${order.shippingAddress.province}, ${order.shippingAddress.postCode}`;
              customerMail(
                context.user.email,
                "Order Confirmation",
                context.user.name,
                order.orderProducts,
                order.total,
                order.createdAt,
                order.productDiscount,
                order.shippingFee,
                order.productTotal,
                order.paymentMethod,
                order.voucherDiscount,
                order.number,
                order.courierCode,
                order.courierService,
                order.shippingMethod,
                shippingAddress
              );
              // sms to customer
              sendRajaSms(
                context.user.phone,
                "GidA suka pilihan kamu! Supaya pembayaran bisa diproses, silahkan lakukan pembayaran & konfirmasi Pada CS kami di link http://bit.ly/KontakGIdA"
              );
              return order;
            })
            .catch(e => new Error(e.message));
        });
    },
    confirmPayment: (_, { orderNumber, input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one("SELECT id FROM orders WHERE no = $1 AND user_id = $2", [
          orderNumber,
          context.user.data
        ])
        .then(({ id }) =>
          db
            .none(
              "UPDATE orders SET payment_confirmation_data = $1 WHERE id = $2",
              [input, id]
            )
            .then(() => "Success")
            .catch(error => new Error(error.message || error))
        )
        .catch(() => new Error("Order number does not exist!"));
    },
    updateOrder: (
      _,
      {
        resi = null,
        statusId = null,
        id,
        orderProducts = null,
        userDetail = null
      },
      context
    ) => {
      return db
        .one(
          `UPDATE orders SET resi = COALESCE($1, resi),
             order_status_id = COALESCE($2, order_status_id),
             updated_at = now()
             WHERE id = $3
             RETURNING *
          `,
          [resi, statusId, id]
        )
        .then(order => {
          db.none(
            `INSERT INTO order_tracks(order_id, order_status_id, date)VALUES(
               $1, $2, $3)`,
            [order.id, order.order_status_id, order.updated_at]
          );
          //order accpte
          if (statusId === 2) {
            let orderDetail = JSON.parse(orderProducts);
            let user = JSON.parse(userDetail);
            sendNewOrderNoticeToAdmins(
              "Pesanan Baru Yang Perlu Dikirim",
              user.name,
              order.created_at,
              order,
              orderDetail
            );
          } else if (statusId === 4) {
            let orderDetail = JSON.parse(orderProducts);
            let user = JSON.parse(userDetail);
            let shippingAddress =
              order.shipping_address &&
              `${order.shipping_address.street}, ${order.shipping_address.subdistrict}, ${order.shipping_address.city}, ${order.shipping_address.province}, ${order.shipping_address.post_code}`;
            shippingEmail(
              user.email,
              order.resi
                ? "Order sudah dikirim"
                : "Order siap diambil di warehouse Kadoqu.com!",
              user.name,
              orderDetail,
              order.total,
              order.created_at,
              order.product_discount,
              order.shippingFee,
              order.product_total,
              order.courierCode,
              order.courierService,
              order.shipping_method,
              shippingAddress,
              order.payment_method,
              order.no,
              order.wrapping_fee,
              order.resi
            );

            //sms
            let textWarehouseTakeOut =
              `Pesanan No.${order.no} siap diambil di warehouse` +
              "\n" +
              `kadoqu.com !` +
              "\n" +
              `Jika ada pertanyaan, silahkan hubungi CS kami di http://bit.ly/KontakGIdA`;
            let textShipping =
              `Pesanan dikirim !` +
              "\n" +
              `Pesanan No.${order.no} dengan resi` +
              "\n" +
              `${order.resi}` +
              "\n" +
              `berhasil GIdA kirim.Jika ada pertanyaan, silahkan hubungi CS kami di http://bit.ly/KontakGIdA`;
            sendRajaSms(
              user.phone,
              order.resi ? textShipping : textWarehouseTakeOut
            );
          }

          return fieldNameMapper(order);
        })
        .catch(error => new Error(error.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
