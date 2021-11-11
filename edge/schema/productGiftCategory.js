const { db } = require("../db");

const typeDefs = `
    type ProductGiftCategory {
        id: Int
        name: String
        productId: String
        createdAt: String
        updatedAt: String
    }
    extend type Mutation{
      addProductGiftCategory(productId:String, category:String):String
      deleteProductGiftCategory(productId:String, category:String): String
    }
    


`;

const fieldNameMapper = category => ({
  id: category.id,
  name: category.name,
  productId: category.product_id,
  createdAt: category.created_at,
  updatedAt: category.updated_at
});

const resolvers = {
  Product: {
    categories: product =>
      db
        .any("SELECT * FROM product_gift_categories WHERE product_id = $1", [
          product.id
        ])
        .then(categories => categories.map(fieldNameMapper))
  },
  Mutation: {
    addProductGiftCategory: (_, { productId, category }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "INSERT INTO product_gift_categories (product_id, name) VALUES ($1, $2)",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.detail));
    },
    deleteProductGiftCategory: (_, { productId, category }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "DELETE FROM product_gift_categories WHERE product_id = $1 AND name = $2",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.message || res));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
