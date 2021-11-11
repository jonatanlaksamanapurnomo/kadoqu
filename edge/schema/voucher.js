const { db } = require("../db");

const typeDefs = `
  type Voucher {
    id: String
    name: String
    merchant: String
    description: String
    isEnable: Boolean
    validFrom: Date
    validTo: Date
    minPurchase: Float
    percentDiscount: Float
    maxDiscount: Float
    stock: Int
    maxUsage: Int
    giftCategories: [String]
    storeCategories: [String]
    products: [String]
    merchants: [String]
    voucherCodes: [VoucherCode]
  }

  type VoucherCode {
    id: String
    code: String
    voucher: Voucher
  }

  type VoucherUsage {
    id: String
    voucherCode: VoucherCode
    order: Order
    user: User
  }

  input InputVoucher {
    name: String
    description: String
    isEnable: Boolean
    validFrom: String
    validTo: String
    minPurchase: Float
    percentDiscount: Float
    maxDiscount: Float
    stock: Int
    maxUsage: Int
    giftCategories: [String]
    storeCategories: [String]
    products: [String]
    merchants: [String]
  }

  input InputVoucherCode {
    voucherId: String
    code: String
  }

  input InputVoucherUsage {
    voucherCodeId: String
    orderId: String
  }

  extend type Query {
    getVouchers: [Voucher]
    getVoucher(id: String): Voucher
    checkVoucher(code: String): Voucher
    getVoucherUsages: [VoucherUsage]
    getVoucherUsagesByVoucherId(voucherId: String): [VoucherUsage]
  }

  extend type Mutation {
    addVoucher(input: InputVoucher): String
    editVoucher(id: String, input: InputVoucher): String
    deleteVoucher(id: String): String
    addVoucherCode(input: InputVoucherCode): String
    editVoucherCode(id: String, input: InputVoucherCode): String
    deleteVoucherCode(id: String): String
    addVoucherUsage(input: InputVoucherUsage): String
  }
`;

const fieldNameMapper = e => ({
  id: e.id,
  name: e.name,
  merchant: e.merchant,
  description: e.description,
  isEnable: e.is_enable,
  validFrom: e.valid_from,
  validTo: e.valid_to,
  minPurchase: e.min_purchase,
  percentDiscount: e.percent_discount,
  maxDiscount: e.max_discount,
  stock: e.stock,
  maxUsage: e.max_usage,
  giftCategories: e.gift_categories,
  storeCategories: e.store_categories,
  products: e.products,
  merchants: e.merchants
});

const fieldNameMapperVoucherCode = e => ({
  id: e.id,
  code: e.code,
  voucherId: e.voucher_id
});

const fieldNameMapperVoucherUsage = e => ({
  id: e.id,
  voucherCodeId: e.voucher_code_id,
  orderId: e.order_id,
  userId: e.user_id
});

const resolvers = {
  Voucher: {
    voucherCodes: e =>
      db
        .any("SELECT * FROM voucher_codes WHERE voucher_id = $1", [e.id])
        .then(response => response.map(fieldNameMapperVoucherCode))
        .catch(e => new Error(e.message))
  },
  VoucherCode: {
    voucher: e =>
      db
        .one("SELECT * FROM vouchers WHERE id = $1", [e.voucherId])
        .then(response => fieldNameMapper(response))
        .catch(e => new Error(e.message))
  },
  VoucherUsage: {
    voucherCode: e =>
      db
        .one("SELECT * FROM voucher_codes WHERE id = $1", [e.voucherCodeId])
        .then(response => fieldNameMapperVoucherCode(response))
        .catch(e => new Error(e.message))
  },
  Query: {
    getVouchers: (_, __, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .any(
          `SELECT * FROM vouchers ${merchant ? "WHERE merchant = $1" : ""}`,
          [merchant]
        )
        .then(vouchers => vouchers.map(fieldNameMapper))
        .catch(e => new Error(e.message));
    },
    getVoucher: (_, { id }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .one(
          `SELECT * FROM vouchers WHERE id = $1 ${
            merchant ? "AND merchant = $2" : ""
          }`,
          [id, merchant]
        )
        .then(voucher => fieldNameMapper(voucher))
        .catch(e => new Error(e.message));
    },
    checkVoucher: (_, { code }, context) =>
      db
        .one(
          `SELECT v.*, vc.id AS voucher_code_id, vc.code AS code
            FROM voucher_codes vc
            INNER JOIN vouchers v ON vc.voucher_id = v.id
            WHERE vc.code = $1
            AND v.is_enable = true
            AND (v.valid_from <= NOW() OR v.valid_from IS NULL)
            AND (v.valid_to >= NOW() OR v.valid_to IS NULL)`,
          [code]
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
                return new Error("Kuota Voucher Habis");
              return db
                .one(
                  `SELECT COUNT(*) AS total FROM voucher_usages
                    WHERE voucher_code_id = $1
                    AND user_id = $2`,
                  [voucher.voucher_code_id, context.user.data]
                )
                .then(({ total }) => {
                  total = parseInt(total);
                  if (voucher.max_usage !== null && total >= voucher.max_usage)
                    return new Error("Penggunaan Voucher Sudah Melewati Batas");
                  return fieldNameMapper(voucher);
                });
            });
        })
        .catch(e => {
          return new Error("Kode Voucher Salah");
        }),
    getVoucherUsages: (_, __, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .any(
          `SELECT vu.* FROM voucher_usages vu ${
            merchant
              ? "INNER JOIN voucher_codes vc ON vu.voucher_code_id = vc.id " +
                "INNER JOIN vouchers v ON vc.voucher_id = v.id " +
                "WHERE v.merchant = $1"
              : ""
          }`,
          [merchant]
        )
        .then(response => response.map(fieldNameMapperVoucherUsage))
        .catch(e => new Error(e.message));
    },
    getVoucherUsagesByVoucherId: (_, { voucherId }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return (
        db
          // .any(
          //   `SELECT voucher_usages.* FROM voucher_usages ${
          //     merchant
          //       ? "INNER JOIN vouchers ON voucher_usages.voucher_id = vouchers.id " +
          //         "WHERE voucher_usages.voucher_id = $1 AND vouchers.merchant = $2"
          //       : "WHERE voucher_usages.voucher_id = $1"
          //   }`,
          .any(
            `SELECT vu.* FROM voucher_usages vu
              INNER JOIN voucher_codes vc ON vu.voucher_code_id = vc.id
              INNER JOIN vouchers v ON vc.voucher_id = v.id
              WHERE v.id = $1 ${merchant ? "AND v.merchant = $2" : ""}`,
            [voucherId, merchant]
          )
          .then(response => response.map(fieldNameMapperVoucherUsage))
          .catch(e => new Error(e.message))
      );
    }
  },
  Mutation: {
    addVoucher: (_, { input }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .none(
          `INSERT INTO vouchers (name, merchant, description, is_enable,
          valid_from, valid_to, min_purchase, percent_discount, max_discount,
          stock, max_usage)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
          [
            input.name,
            merchant,
            input.description,
            input.isEnable,
            input.validFrom && new Date(input.validFrom),
            input.validTo && new Date(input.validTo),
            input.minPurchase,
            input.percentDiscount,
            input.maxDiscount,
            input.stock,
            input.maxUsage
          ]
        )
        .then(() => "Success")
        .catch(e => {
          return new Error(e.message);
        });
    },
    editVoucher: (_, { id, input }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      if (Object.getOwnPropertyNames(input).length === 0) return;
      let variables = [];
      let assignments = [];
      Object.entries(input).forEach(([key, edit]) => {
        if (key.toLowerCase() === key) {
          assignments.push(`${key} = $${variables.push(edit)}`);
          return;
        }
        switch (key) {
          case "isEnable":
          case "minPurchase":
          case "percentDiscount":
          case "maxDiscount":
          case "maxUsage":
          case "giftCategories":
          case "storeCategories":
            const underscoredField = key
              .split(/(?=[A-Z])/)
              .join("_")
              .toLowerCase();
            assignments.push(`${underscoredField} = $${variables.push(edit)}`);
            break;
          case "validFrom":
            assignments.push(
              `valid_from = $${variables.push(edit && new Date(edit))}`
            );
            break;
          case "validTo":
            assignments.push(
              `valid_to = $${variables.push(edit && new Date(edit))}`
            );
            break;
          default:
            break;
        }
      });
      const sql = [
        "UPDATE vouchers SET",
        assignments.join(", "),
        `WHERE id = $${variables.push(id)}`,
        merchant ? `AND merchant = $${variables.push(merchant)}` : ""
      ].join(" ");
      return db
        .none(sql, variables)
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    deleteVoucher: (_, { id }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .none(
          `DELETE FROM vouchers WHERE id = $1 ${
            merchant ? "AND merchant = $2" : ""
          }`,
          [id, merchant]
        )
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    addVoucherCode: (_, { input }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      return db
        .none("INSERT INTO voucher_codes (voucher_id, code) VALUES ($1, $2)", [
          input.voucherId,
          input.code
        ])
        .then(() => "Success")
        .catch(e => {
          return new Error(e.message);
        });
    },
    editVoucherCode: (_, { id, input }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      if (Object.getOwnPropertyNames(input).length === 0) return;
      let variables = [];
      let assignments = [];
      Object.entries(input).forEach(([key, edit]) => {
        if (key.toLowerCase() === key) {
          assignments.push(`${key} = $${variables.push(edit)}`);
          return;
        }
        switch (key) {
          default:
            break;
        }
      });
      const sql = [
        "UPDATE voucher_codes SET",
        assignments.join(", "),
        `WHERE id = $${variables.push(id)}`
      ].join(" ");
      return db
        .none(sql, variables)
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    deleteVoucherCode: (_, { id }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      return db
        .none("DELETE FROM voucher_codes WHERE id = $1", [id])
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    addVoucherUsage: (_, { input }, context) =>
      db
        .tx(t => {
          const q1 = t.none(
            "INSERT INTO voucher_usages (voucher_code_id, order_id, user_id) " +
              "VALUES ($1, $2, $3)",
            [input.voucherCodeId, input.orderId, context.user.data]
          );

          return t.batch([q1]);
        })
        .then(() => "Success")
        .catch(e => new Error(e.message))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
