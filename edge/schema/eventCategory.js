const { db } = require("../db");

const typeDefs = `
  type EventCategory{
    id: String
    name: String
    images: JSON
  }
  extend type Query {
    getEventCategories: [EventCategory]
  }
  extend type Mutation{
    addEventCategory(name: String): String
    updateEventCategory(categoryId: String, newName: String): String
    updateEventCategoryBanner(categoryId: String, bannerType: String, image: String): String
    deleteEventCategory(categoryId: String): String
  }
`;

const fieldNameMapper = eventCategory => ({
  id: eventCategory.id,
  name: eventCategory.name,
  images: {
    default: eventCategory.default_banner,
    wide: eventCategory.wide_banner,
    filter_banner: eventCategory.filter_banner,
    mobile: eventCategory.mobile_banner
  },
  createdAt: eventCategory.created_at,
  updatedAt: eventCategory.updated_at
});

const resolvers = {
  Query: {
    getEventCategories: () => {
      return db
        .any("SELECT * FROM event_categories")
        .then(eventCategory => eventCategory.map(fieldNameMapper));
    }
  },
  Mutation: {
    addEventCategory: (_, { name }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .none("INSERT INTO event_categories (name) VALUES ($1)", [name])
        .then(() => "success")
        .catch(res => new Error(res.message));
    },
    updateEventCategory: (_, { categoryId, newName }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "UPDATE event_categories new" +
            " SET name = $1" +
            " FROM store_categories old" +
            " WHERE old.id = new.id AND new.id = $2" +
            " RETURNING old.name AS name",
          [newName, categoryId]
        )
        .then(res =>
          db
            .none(
              "UPDATE product_event_categories SET name = $1 WHERE name = $2",
              [newName, res.name]
            )
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    },
    updateEventCategoryBanner: (
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
        .none(`UPDATE event_categories SET ${fieldname} = $2 WHERE id = $1`, [
          categoryId,
          image
        ])
        .then(() => "Success")
        .catch(res => new Error(res.message));
    },
    deleteEventCategory: (_, { categoryId }, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "DELETE FROM event_categories WHERE event_categories.id = $1 RETURNING name",
          [categoryId]
        )
        .then(res =>
          db
            .none(
              "DELETE FROM product_event_categories" + "WHERE name = $1",
              [res.name]
            )
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
