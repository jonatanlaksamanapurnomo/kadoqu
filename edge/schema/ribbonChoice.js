const { db } = require("../db");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
    type RibbonChoice {
      id: Int
      rank: Int
      name: String
      ribbonTypeId: Int
      url: String
    }

    extend type Query {
      getRibbonDetail: [RibbonChoice]
    }
    extend type Mutation {
      addRibbonChoice(name: String, url: String, typeId: Int, rank: Int): String
      updateRibbonChoice(id: Int, name: String, rank: Int): String
      deleteRibbonChoice(id: Int): String
    }
`;

const fieldNameMapper = ribbonChoice => ({
  id: ribbonChoice.id,
  rank: ribbonChoice.rank,
  name: ribbonChoice.name,
  ribbonTypeId: ribbonChoice.ribbon_type_id,
  url: ribbonChoice.url
});

const resolvers = {
  RibbonType: {
    choices: ribbonType =>
      db
        .any(
          "SELECT * FROM ribbon_choices WHERE ribbon_type_id = $1 ORDER BY rank ASC",
          [ribbonType.id]
        )
        .then(ribbonChoices => ribbonChoices.map(fieldNameMapper))
        .catch(error => error.message || error)
  },
  Mutation: {
    addRibbonChoice: (_, { name, url, typeId, rank = 0 }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "INSERT INTO ribbon_choices (name, url, ribbon_type_id, rank) VALUES ($1, $2, $3, $4)",
          [name, url, typeId, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateRibbonChoice: (_, { id, name = null, rank = null }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "UPDATE ribbon_choices SET name = COALESCE($2, name), rank = COALESCE($3, rank) WHERE id = $1",
          [id, name, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteRibbonChoice: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT url FROM ribbon_choices WHERE id = $1", [id])
        .then(({ url }) =>
          imagekit
            .deleteFile(`Wrapping_Lab/${url.split("Wrapping_Lab/")[1]}`)
            .then(
              function() {
                return db
                  .none("DELETE FROM ribbon_choices WHERE id = $1", [id])
                  .then(() => "Success")
                  .catch(error => new Error(error.message || error));
              },
              function(err) {
                throw new Error(err.message || err);
              }
            )
        )
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
