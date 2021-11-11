const {db} = require("../db");

const typeDefs = `
  type GoogleSyncedData {
   googleId:String
   userId:String
   brithdays:JSON
   email:String
  }
  extend type Query{
    getAllSyncedData:[GoogleSyncedData]

  }


`;


const fieldNameMapper = googleAccount => ({
  googleId: googleAccount.google_id,
  userId: googleAccount.user_id,
  brithdays: googleAccount.brithdays,
  email: googleAccount.email
});

const resolvers = {
  User: {
    googleSyncedData: user => {
      return db.oneOrNone("select * from google_account_synced where user_id  = $1", [user.id])
        .then(res => {
          if (res) {
            return fieldNameMapper(res);
          }
          return {};

        });
    }
  },
  Query: {
    getAllSyncedData: () => {
      return db.any("select * from google_account_synced")
        .then(res => res.map(fieldNameMapper))
        .catch((err) => new Error(err.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
