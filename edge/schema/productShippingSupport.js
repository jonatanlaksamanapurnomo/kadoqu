const { db } = require("../db");

const typeDefs = `
    type ProductShippingSupport {
        id: Int
        name: String
        productId: String
        createdAt: String
        updatedAt: String
    }
    extend type Mutation{
      addShippingSupport(productId: String, shippingSupport: String):String
      deleteShippingSupport(productId: String, shippingSupport: String):String
    }
`;

const fieldNameMapper = shippingSupport => ({
  id: shippingSupport.id,
  name: shippingSupport.name,
  productId: shippingSupport.product_id,
  createdAt: shippingSupport.created_at,
  updatedAt: shippingSupport.updated_at
});

const resolvers = {
  Product: {
    shippingSupports: product =>
      db
        .any("select * from product_shipping_supports where product_id = $1", [
          product.id
        ])
        .then(shippingSupports => shippingSupports.map(fieldNameMapper))
  },
  Mutation: {
    addShippingSupport: (_, { productId, shippingSupport }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "INSERT INTO product_shipping_supports (product_id,name) VALUES ($1,$2)",
          [productId, shippingSupport]
        )
        .then(() => "sukses")
        .catch(res => new Error(res.detail));
    },
    deleteShippingSupport: (_, { productId, shippingSupport }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "DELETE FROM product_shipping_supports WHERE product_id = $1 AND name = $2",
          [productId, shippingSupport]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
