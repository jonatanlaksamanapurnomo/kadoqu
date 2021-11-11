const { db } = require("../db");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
    type WrapperType {
      id: Int
      rank: Int
      name: String
      price: Int
      thumbnail: String
      choices: [WrapperChoice]
    }

    extend type Query {
      getWrapperTypes: [WrapperType]
    }
    extend type Mutation {
      addWrapperType(name: String, price: Float, thumbnail: String, rank: Int): String
      updateWrapperType(id: Int, rank: Int, name: String, price: Float): String
      updateWrapperTypeThumbnail(id: Int, thumbnail: String, currentUrl: String): String
      deleteWrapperType(id: Int): String
    }
`;

const fieldNameMapper = wrapperType => ({
  id: wrapperType.id,
  rank: wrapperType.rank,
  price: wrapperType.price,
  name: wrapperType.name,
  thumbnail: wrapperType.thumbnail
});

const resolvers = {
  Query: {
    getWrapperTypes: () =>
      db
        .any("SELECT * FROM wrapper_types ORDER BY rank ASC")
        .then(wrapperTypes => wrapperTypes.map(fieldNameMapper))
        .catch(error => error.message || error)
  },
  Mutation: {
    addWrapperType: (_, { name, price, thumbnail, rank }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "INSERT INTO wrapper_types (name, price, thumbnail, rank) VALUES ($1, $2, $3, $4)",
          [name, price, thumbnail, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateWrapperType: (
      _,
      { id, rank = null, name = null, price = null },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          `UPDATE wrapper_types
            SET name = COALESCE($2, name), price = COALESCE($3, price), rank = COALESCE($4, rank)
            WHERE id = $1`,
          [id, name, price, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateWrapperTypeThumbnail: (_, { id, thumbnail, currentUrl }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return imagekit
        .deleteFile(`Wrapping_Lab/${currentUrl.split("Wrapping_Lab/")[1]}`)
        .then(
          function() {
            return db
              .none("UPDATE wrapper_types SET thumbnail = $1 WHERE id = $2", [
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
    deleteWrapperType: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT thumbnail FROM wrapper_types WHERE id = $1", [id])
        .then(({ thumbnail }) =>
          imagekit
            .deleteFile(`Wrapping_Lab/${thumbnail.split("Wrapping_Lab/")[1]}`)
            .then(
              function() {
                return db
                  .none("DELETE FROM wrapper_types WHERE id = $1", [id])
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
