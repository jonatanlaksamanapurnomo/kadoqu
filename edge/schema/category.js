const { db } = require("../db");

const typeDefs = `
  type Category {
    id: String
    name: String
    images: JSON
    parentId: String
    parent: Category
    children: [Category]
  }
  extend type Query {
    getCategories: [Category]
    getSubCategories(parentName: String): [Category]
    getCategory(id: String): Category
    getCategoryIdByName(name: String): String
    getParentCategories: [Category]
    getCategoryByName(name: String): Category
  }
  extend type Mutation {
    addCategory(name: String, parentId: String): String
    updateCategoryName(id: String, newName: String): String
    updateCategoryBanner(categoryId: String, bannerType: String, image: String): String
    updateCategoryParent(id: String, newParentId: String): String
    deleteCategory(categoryId: String): String
  }
`;

const fieldNameMapper = category => ({
  id: category.id,
  name: category.name,
  images: {
    default: category.default_banner,
    wide: category.wide_banner
  },
  parentId: category.parent_id,
  createdAt: category.created_at,
  updatedAt: category.updated_at
});

const resolvers = {
  Category: {
    parent: category =>
      category.parentId
        ? db
            .one("SELECT * FROM categories WHERE id = $1", [category.parentId])
            .then(parent => fieldNameMapper(parent))
            .catch(error => console.log(error.message))
        : null,
    children: category =>
      db
        .any("SELECT * FROM categories WHERE parent_id = $1", [category.id])
        .then(subCategories => subCategories.map(fieldNameMapper))
        .catch(error => console.log(error.message))
  },
  Query: {
    getCategories: () => {
      return db
        .any("SELECT * FROM categories WHERE parent_id is null")
        .then(category => category.map(fieldNameMapper));
    },
    getSubCategories: (_, { parentName }) =>
      db
        .one("SELECT id FROM categories WHERE name ilike $1", [parentName])
        .then(parent =>
          db
            .any("SELECT * FROM categories WHERE parent_id=$1", [parent.id])
            .then(category => category.map(fieldNameMapper))
        ),
    getCategory: (_, { id }) => {
      return db
        .one("SELECT * FROM categories WHERE id = $1", [id])
        .then(category => fieldNameMapper(category));
    },
    getCategoryIdByName: (_, { name }) => {
      return db
        .one("select * from categories where name = $1", [name])
        .then(res => res.id);
    },
    getParentCategories: () => {
      return db
        .any("SELECT * FROM categories WHERE parent_id IS null")
        .then(categories => categories.map(fieldNameMapper));
    },
    getCategoryByName: (_, { name }) => {
      return db
        .one("select * from categories where name = $1", [name])
        .then(res => fieldNameMapper(res));
    }
  },
  Mutation: {
    addCategory: (_, { name, parentId }, context) => {
      if (!context.user) {
        throw new Error("Admin auth only!");
      }
      return db
        .none("INSERT INTO categories (name , parent_id) VALUES ($1,$2)", [
          name,
          parentId
        ])
        .then(() => "Success")
        .catch(res => new Error(res.message));
    },
    updateCategoryName: (_, { id, newName }, context) => {
      if (!context.user) {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "UPDATE categories new" +
            " SET name = $1" +
            " FROM categories old" +
            " WHERE old.id = new.id AND new.id = $2" +
            " RETURNING old.name AS name",
          [newName, id]
        )
        .then(res =>
          db
            .none(
              "UPDATE product_gift_categories SET name = $1 WHERE name = $2",
              [newName, res.name]
            )
            .then(() => "Success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    },
    updateCategoryParent: (_, { id, newParentId }, context) => {
      if (!context.user) {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "UPDATE categories SET parent_id = $1 WHERE id = $2 RETURNING name",
          [newParentId, id]
        )
        .then(res => res.name)
        .catch(res => new Error(res.message));
    },
    updateCategoryBanner: (
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
        .none(`UPDATE categories SET ${fieldname} = $2 WHERE id = $1`, [
          categoryId,
          image
        ])
        .then(() => "Success")
        .catch(res => new Error(res.message));
    },
    deleteCategory: (_, { categoryId }, context) => {
      if (!context.user) {
        throw new Error("Admin auth only!");
      }
      return db
        .one("DELETE FROM categories WHERE id = $1 RETURNING name", [
          categoryId
        ])
        .then(res =>
          db
            .none("DELETE FROM product_gift_categories WHERE name = $1", [
              res.name
            ])
            .then(() => "Success")
            .catch(error => new Error(error))
        )
        .catch(error => new Error(error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
