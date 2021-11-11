const { db } = require("../db");

const typeDefs = `
  extend type Query {
    getKadoPahlawanProducts: [Product]
    getTotalCarePackages: Int
  }
`;

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
    getKadoPahlawanProducts: () =>
      db
        .any("SELECT * FROM products WHERE merchant = $1 ORDER BY name ASC", [
          "KadoPahlawanKesehatan"
        ])
        .then(products => products.map(productMapper))
        .catch(e => new Error(e.message || e)),
    getTotalCarePackages: () =>
      db
        .one(
          "SELECT COALESCE(SUM(op.quantity), 0) AS total FROM order_products op " +
            "INNER JOIN orders o ON op.order_id = o.id " +
            "WHERE o.order_status_id BETWEEN 3 AND 5 " +
            "AND op.product ->> 'merchant' = $1",
          ["KadoPahlawanKesehatan"]
        )
        .then(response => response.total)
        .catch(e => new Error(e.message || e))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
