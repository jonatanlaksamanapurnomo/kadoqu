const { db } = require("../db");

const typeDefs = `
    type ProductStoreCategory {
        id: Int
        name: String
        productId: String
        createdAt: String
        updatedAt: String
    }
    extend type Mutation {
      addProductStoreCategory(productId:String, category:String):String
      deleteProductStoreCategory(productId:String, category:String):String
    }
    


`;

const fieldNameMapper = storeCategory => ({
  id: storeCategory.id,
  name: storeCategory.name,
  productId: storeCategory.product_id,
  createdAt: storeCategory.created_at,
  updatedAt: storeCategory.updated_at
});

const resolvers = {
  Product: {
    storeCategories: product =>
      db
        .any("SELECT * FROM product_store_categories WHERE product_id = $1", [
          product.id
        ])
        .then(storeCategory => storeCategory.map(fieldNameMapper))
  },
  Mutation: {
    addProductStoreCategory: (_, { productId, category }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "INSERT INTO product_store_categories (product_id, name) VALUES ($1, $2)",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.detail));
    },
    deleteProductStoreCategory: (_, { productId, category }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "DELETE FROM product_store_categories WHERE product_id = $1 AND name = $2",
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
