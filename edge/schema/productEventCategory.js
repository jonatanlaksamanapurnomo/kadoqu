const { db } = require("../db");

const typeDefs = `
    type ProductEventCategory {
        id: Int
        name: String
        productId: String
        createdAt: String
        updatedAt: String
    }
    extend type Mutation {
      addProductEventCategory(productId:String, category:String):String
      deleteProductEventCategory(productId:String, category:String):String
    }
    


`;

const fieldNameMapper = eventCategory => ({
  id: eventCategory.id,
  name: eventCategory.name,
  productId: eventCategory.product_id,
  createdAt: eventCategory.created_at,
  updatedAt: eventCategory.updated_at
});

const resolvers = {
  Product: {
    evenCategories: product =>
      db
        .any("SELECT * FROM product_event_categories WHERE product_id = $1", [
          product.id
        ])
        .then(eventCategory => eventCategory.map(fieldNameMapper))
  },
  Mutation: {
    addProductEventCategory: (_, { productId, category }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "INSERT INTO product_event_categories (product_id, name) VALUES ($1, $2)",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.detail));
    },
    deleteProductEventCategory: (_, { productId, category }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "DELETE FROM product_event_categories WHERE product_id = $1 AND name = $2",
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
