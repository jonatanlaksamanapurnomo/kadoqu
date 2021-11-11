const { db } = require("../db");

const typeDefs = `
    extend type Mutation {
      addFavoriteProduct(productId: String): String
      removeFavoriteProduct(productId: String): String
    }
`;

const resolvers = {
  Mutation: {
    addFavoriteProduct: (_, { productId }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .none(
          "INSERT INTO user_favorite_products (user_id, product_id) VALUES ($1, $2)",
          [context.user.data, productId]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message));
    },
    removeFavoriteProduct: (_, { productId }, context) => {
      if (!context.user) {
        throw new Error("Please login first");
      }
      return db
        .none(
          "DELETE FROM user_favorite_products WHERE user_id = $1 AND product_id = $2",
          [context.user.data, productId]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
