const { db } = require("../db");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
    type RibbonType {
      id: Int
      rank: Int
      name: String
      additionalInfo: String
      price: Int
      thumbnail: String
      choices: [RibbonChoice]
    }

    extend type Query {
      getRibbonTypes: [RibbonType]
    }
    extend type Mutation {
      addRibbonType(name: String, price: Float, thumbnail: String, additionalInfo: String, rank: Int): String
      updateRibbonType(id: Int, rank: Int, name: String, price: Float, additionalInfo: String): String
      updateRibbonTypeThumbnail(id: Int, thumbnail: String, currentUrl: String): String
      deleteRibbonType(id: Int): String
    }
`;

const fieldNameMapper = ribbonType => ({
  id: ribbonType.id,
  rank: ribbonType.rank,
  name: ribbonType.name,
  additionalInfo: ribbonType.info,
  price: ribbonType.price,
  thumbnail: ribbonType.thumbnail
});

const resolvers = {
  Query: {
    getRibbonTypes: () =>
      db
        .any("SELECT * FROM ribbon_types ORDER BY rank ASC")
        .then(ribbonTypes => ribbonTypes.map(fieldNameMapper))
        .catch(error => error.message || error)
  },
  Mutation: {
    addRibbonType: (
      _,
      { name, price, thumbnail, additionalInfo = null, rank = 0 },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "INSERT INTO ribbon_types (name, price, thumbnail, info, rank) VALUES ($1, $2, $3, $4, $5)",
          [name, price, thumbnail, additionalInfo, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateRibbonType: (
      _,
      { id, rank = null, name = null, price = null, additionalInfo = null },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          `UPDATE ribbon_types
            SET name = COALESCE($2, name), price = COALESCE($3, price),
              info = COALESCE($4, info), rank = COALESCE($5, rank)
            WHERE id = $1`,
          [id, name, price, additionalInfo, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateRibbonTypeThumbnail: (_, { id, thumbnail, currentUrl }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return imagekit
        .deleteFile(`Wrapping_Lab/${currentUrl.split("Wrapping_Lab/")[1]}`)
        .then(
          function() {
            return db
              .none("UPDATE ribbon_types SET thumbnail = $1 WHERE id = $2", [
                thumbnail,
                id
              ])
              .then(() => "Success")
              .catch(error => new Error(error.message || error));
          },
          function(err) {
            return new Error(err.message || err);
          }
        );
    },
    deleteRibbonType: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT thumbnail FROM ribbon_types WHERE id = $1", [id])
        .then(({ thumbnail }) =>
          imagekit
            .deleteFile(`Wrapping_Lab/${thumbnail.split("Wrapping_Lab/")[1]}`)
            .then(
              function() {
                return db
                  .none("DELETE FROM ribbon_types WHERE id = $1", [id])
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
