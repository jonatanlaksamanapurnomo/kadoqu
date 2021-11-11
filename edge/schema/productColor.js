const { db } = require("../db");

const typeDefs = `
    type ProductColor {
        id: Int
        name: String
        productId: String
        createdAt: String
        updatedAt: String
    }
    extend type Mutation{
      addProductColor(productId: String, color: String): String
      deleteProductColor(productId: String, color: String): String
    }
`;

const fieldNameMapper = color => ({
  id: color.id,
  name: color.name,
  productId: color.product_id,
  createdAt: color.created_at,
  updatedAt: color.updated_at
});

const resolvers = {
  Product: {
    colors: product =>
      db
        .any("select * from product_colors where product_id = $1", [product.id])
        .then(colors => colors.map(fieldNameMapper))
  },
  Mutation: {
    addProductColor: (_, { productId, color }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      return db
        .none("INSERT INTO product_colors (product_id, name) VALUES ($1,$2)", [
          productId,
          color
        ])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteProductColor: (_, { productId, color }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "DELETE FROM product_colors WHERE product_id = $1 AND name = $2",
          [productId, color]
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
