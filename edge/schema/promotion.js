const { db } = require("../db");

const typeDefs = `
  type Promotion {
    id: String
    slug: String
    name: String
    description: String
    banner: String
    isEnable: Boolean
    validFrom: Date
    validTo: Date
    products: [String]
    merchants: [String]
  }

  input InputPromotion {
    slug: String
    name: String
    description: String
    banner: String
    isEnable: Boolean
    validFrom: Date
    validTo: Date
    products: [String]
    merchants: [String]
  }

  extend type Query {
    getPromotions: [Promotion]
    getPromotion(id: String): Promotion
    getPromotionBySlug(slug: String): Promotion
    getPromotionProductsBySlug(slug: String, sortingField: String, isAscending: Boolean, filters: FiltersInput, limit: Int, offset: Int): PaginatedProducts
  }

  extend type Mutation {
    addPromotion(input: InputPromotion): String
    editPromotion(id: String, input: InputPromotion): String
    deletePromotion(id: String): String
  }
`;

const fieldNameMapper = e => ({
  id: e.id,
  slug: e.slug,
  name: e.name,
  description: e.description,
  banner: e.banner,
  isEnable: e.is_enable,
  validFrom: e.valid_from,
  validTo: e.valid_to,
  products: e.products,
  merchants: e.merchants
});

const productMapper = product => ({
  id: product.id,
  name: product.name,
  merchant: product.merchant,
  category_id: product.category_id,
  shortDescription: product.short_description,
  longDescription: product.long_description,
  shipmentDescription: product.shipment_description,
  price: product.price,
  merchantPrice: product.merchant_price,
  merchantDiscount: product.merchant_discount,
  kadoquDiscount: product.kadoqu_discount,
  inStock: product.in_stock,
  capitalPrice: product.capital_price,
  slug: product.slug,
  isEnable: product.is_enable,
  isPo: product.is_po,
  stock: product.stock,
  weight: product.weight,
  length: product.length,
  width: product.width,
  height: product.height,
  score: product.score,
  date: product.date,
  sku: product.sku,
  merchantDiscountUntil: product.merchant_discount_until,
  kadoquDiscountUntil: product.kadoqu_discount_until,
  newToDate: product.new_to_date,
  poNotes: product.po_notes,
  isCustomeOrder: product.is_custome_order,
  isCustomePhoto: product.is_custome_photo,
  isCustomeColor: product.is_custome_color,
  createdAt: product.created_at,
  updatedAt: product.updated_at,
  minQty: product.min_qty,
  multipleQty: product.multiple_qty,
  isDigital: product.is_digital,
  // discount price * 1.2 for tax
  discountPrice:
    product.kadoqu_discount_until &&
    new Date(product.kadoqu_discount_until) > new Date()
      ? product.kadoqu_discount
      : product.merchant_discount_until &&
        new Date(product.merchant_discount_until) > new Date()
      ? product.merchant_discount
      : null
});

const resolvers = {
  Query: {
    getPromotions: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .any("SELECT * FROM promotions")
        .then(response => response.map(fieldNameMapper))
        .catch(e => new Error(e.message));
    },
    getPromotion: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT * FROM promotions WHERE id = $1", [id])
        .then(response => fieldNameMapper(response))
        .catch(e => new Error(e.message));
    },
    getPromotionBySlug: (_, { slug }) =>
      db
        .one(
          "SELECT * FROM promotions " +
            "WHERE slug = $1 " +
            "AND is_enable = true " +
            "AND (valid_from <= NOW() OR valid_from IS NULL) " +
            "AND (valid_to >= NOW() OR valid_to IS NULL)",
          [slug]
        )
        .then(response => fieldNameMapper(response))
        .catch(e => new Error(e.message)),
    getPromotionProductsBySlug: (
      _,
      { slug, sortingField, isAscending, limit = 20, offset = 0 }
    ) =>
      db
        .one(
          "SELECT products FROM promotions " +
            "WHERE slug = $1 " +
            "AND is_enable = true " +
            "AND (valid_from <= NOW() OR valid_from IS NULL) " +
            "AND (valid_to >= NOW() OR valid_to IS NULL)",
          [slug]
        )
        .then(({ products }) => {
          let values = [];
          let securedSortingField;
          if (["created_at", "name", "price"].includes(sortingField)) {
            securedSortingField = sortingField;
          } else {
            securedSortingField = "created_at";
          }
          const sortingMethod = isAscending ? "ASC" : "DESC";
          let conditionStatements = [];
          let joinStatements = [];
          conditionStatements.push(`AND id IN ($${values.push(products)}:csv)`);
          const pagination = `LIMIT $${values.push(
            limit
          )} OFFSET $${values.push(offset * limit)}`;
          return db
            .one(
              [
                "SELECT COUNT(products.*) as length",
                "FROM products",
                joinStatements.join(" "),
                "WHERE is_enable = true",
                conditionStatements.join(" ")
              ].join(" "),
              values
            )
            .then(({ length }) => {
              return db
                .any(
                  [
                    "SELECT products.*",
                    "FROM products",
                    joinStatements.join(" "),
                    "WHERE is_enable = true",
                    conditionStatements.join(" "),
                    "ORDER BY",
                    securedSortingField,
                    sortingMethod,
                    pagination
                  ].join(" "),
                  values
                )
                .then(products => ({
                  length: length,
                  products: products.map(productMapper)
                }));
            });
        })
        .catch(() => ({ length: 0, products: [] }))
  },
  Mutation: {
    addPromotion: (_, { input }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          `INSERT INTO promotions (slug, name, description, banner, is_enable,
          valid_from, valid_to, products, merchants)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            input.slug,
            input.name,
            input.description,
            input.banner,
            input.isEnable,
            input.validFrom && new Date(input.validFrom),
            input.validTo && new Date(input.validTo),
            input.products,
            input.merchants
          ]
        )
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    editPromotion: (_, { id, input }, context) => {
      if (!context.user || context.user.role !== "admin") {
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
        const underscoredField = key
          .split(/(?=[A-Z])/)
          .join("_")
          .toLowerCase();
        switch (key) {
          case "isEnable":
            assignments.push(`${underscoredField} = $${variables.push(edit)}`);
            break;
          case "validFrom":
          case "validTo":
            assignments.push(
              `${underscoredField} = $${variables.push(edit && new Date(edit))}`
            );
            break;
          default:
            break;
        }
      });
      const sql = [
        "UPDATE promotions SET",
        assignments.join(", "),
        `WHERE id = $${variables.push(id)}`
      ].join(" ");
      return db
        .none(sql, variables)
        .then(() => "Success")
        .catch(e => new Error(e.message));
    },
    deletePromotion: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("DELETE FROM promotions WHERE id = $1", [id])
        .then(() => "Success")
        .catch(e => new Error(e.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
