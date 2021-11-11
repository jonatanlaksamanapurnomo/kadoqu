const { db } = require("../db");

const typeDefs = `
  type GidaOption {
    id: Int
    value: String
  }

  extend type Query {
    getGidaRelationshipOptions: [GidaOption]
    getGidaEventOptions: [GidaOption]
    getGidaPersonalityOptions: [GidaOption]
  }

  extend type Mutation {
    addGidaOption(category: String, value: String): String
    updateGidaOption(id: Int, newValue: String): String
    deleteGidaOption(id: Int): String
  }
`;

const fieldNameMapper = gidaOption => ({
  id: gidaOption.id,
  value: gidaOption.value
});

const resolvers = {
  Query: {
    getGidaRelationshipOptions: () =>
      db
        .any(
          "SELECT * FROM gida_options WHERE category = 'Relationship' ORDER BY value ASC"
        )
        .then(gidaOptions => gidaOptions.map(fieldNameMapper)),
    getGidaEventOptions: () =>
      db
        .any(
          "SELECT * FROM gida_options WHERE category = 'Event' ORDER BY value ASC"
        )
        .then(gidaOptions => gidaOptions.map(fieldNameMapper)),
    getGidaPersonalityOptions: () =>
      db
        .any(
          "SELECT * FROM gida_options WHERE category = 'Personality' ORDER BY value ASC"
        )
        .then(gidaOptions => gidaOptions.map(fieldNameMapper))
  },
  Mutation: {
    addGidaOption: (_, { category, value }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("INSERT INTO gida_options (category, value) VALUES ($1, $2)", [
          category,
          value
        ])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateGidaOption: (_, { id, newValue }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("UPDATE gida_options SET value = $2 WHERE id = $1", [
          id,
          newValue
        ])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteGidaOption: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("DELETE FROM gida_options WHERE id = $1", [id])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
