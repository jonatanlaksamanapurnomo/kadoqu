const { db } = require("../db");

const typeDefs = `
  type Email {
    id: Int
    email: String
  }

  extend type Mutation {
    addEmail(email: String): String
  }
`;

const resolvers = {
  Mutation: {
    addEmail: (_, { email }) => {
      console.log(email);
      return db
        .none("insert into email_broadcast (email) values ($1)", [email])
        .then(res => {
          return "sukses";
        })
        .catch(res => new Error(res.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
