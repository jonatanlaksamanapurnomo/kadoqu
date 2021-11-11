const { db } = require("../db");

const typeDefs = `
  type StoreCategory{
    id: String
    name: String
    images: JSON
  }
  extend type Query {
    getStoreCategories: [StoreCategory]
  }
  extend type Mutation{
    addStoreCategory(name: String): String
    updateStoreCategory(categoryId: String, newName: String): String
    updateStoreCategoryBanner(categoryId: String, bannerType: String, image: String): String
    deleteStoreCategory(categoryId: String): String
  }
`;

const fieldNameMapper = storeCategory => ({
  id: storeCategory.id,
  name: storeCategory.name,
  images: {
    default: storeCategory.default_banner,
    wide: storeCategory.wide_banner
  },
  createdAt: storeCategory.created_at,
  updatedAt: storeCategory.updated_at
});

const resolvers = {
  Query: {
    getStoreCategories: () => {
      return db
        .any("SELECT * FROM store_categories")
        .then(storeCategory => storeCategory.map(fieldNameMapper));
    }
  },
  Mutation: {
    addStoreCategory: (_, { name }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .none("INSERT INTO store_categories (name) VALUES ($1)", [name])
        .then(() => "success")
        .catch(res => new Error(res.message));
    },
    updateStoreCategory: (_, { categoryId, newName }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "UPDATE store_categories new" +
            " SET name = $1" +
            " FROM store_categories old" +
            " WHERE old.id = new.id AND new.id = $2" +
            " RETURNING old.name AS name",
          [newName, categoryId]
        )
        .then(res =>
          db
            .none(
              "UPDATE product_store_categories SET name = $1 WHERE name = $2",
              [newName, res.name]
            )
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    },
    updateStoreCategoryBanner: (
      _,
      { categoryId, bannerType = "desktop", image },
      context
    ) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      const fieldname =
        bannerType.toLowerCase() === "desktop"
          ? "default_banner"
          : "wide_banner";
      return db
        .none(`UPDATE store_categories SET ${fieldname} = $2 WHERE id = $1`, [
          categoryId,
          image
        ])
        .then(() => "Success")
        .catch(res => new Error(res.message));
    },
    deleteStoreCategory: (_, { categoryId }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "DELETE FROM store_categories WHERE store_categories.id = $1 RETURNING name",
          [categoryId]
        )
        .then(res =>
          db
            .none("DELETE FROM product_store_categories" + "WHERE name = $1", [
              res.name
            ])
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
