const { db } = require("../db");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
    type WrapperChoice {
      id: Int
      rank: Int
      name: String
      wrapperTypeId: Int
      url: String
    }
    extend type Mutation {
      addWrapperChoice(name: String, url: String, typeId: Int, rank: Int): String
      updateWrapperChoice(id: Int, name: String, rank: Int): String
      deleteWrapperChoice(id: Int): String
    }
`;

const fieldNameMapper = wrapperChoice => ({
  id: wrapperChoice.id,
  rank: wrapperChoice.rank,
  name: wrapperChoice.name,
  wrapperTypeId: wrapperChoice.wrapper_type_id,
  url: wrapperChoice.url
});

const resolvers = {
  WrapperType: {
    choices: wrapperType =>
      db
        .any(
          "SELECT * FROM wrapper_choices WHERE wrapper_type_id = $1 ORDER BY rank ASC",
          [wrapperType.id]
        )
        .then(wrapperChoices => wrapperChoices.map(fieldNameMapper))
        .catch(error => error.message || error)
  },
  Mutation: {
    addWrapperChoice: (_, { name, url, typeId, rank = 0 }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "INSERT INTO wrapper_choices (name, url, wrapper_type_id, rank) VALUES ($1, $2, $3, $4)",
          [name, url, typeId, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateWrapperChoice: (_, { id, name = null, rank = null }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none(
          "UPDATE wrapper_choices SET name = COALESCE($2, name), rank = COALESCE($3, rank) WHERE id = $1",
          [id, name, rank]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteWrapperChoice: (_, { id }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT url FROM wrapper_choices WHERE id = $1", [id])
        .then(({ url }) =>
          imagekit
            .deleteFile(`Wrapping_Lab/${url.split("Wrapping_Lab/")[1]}`)
            .then(
              function() {
                return db
                  .none("DELETE FROM wrapper_choices WHERE id = $1", [id])
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
