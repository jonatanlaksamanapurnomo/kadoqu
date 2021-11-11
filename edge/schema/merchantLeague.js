const { db } = require("../db");

const typeDefs = `
    type League {
        id: Int
        name: String
        description: String
        createdAt: String
        updatedAt: String
    }
    extend type Query{
      getAllLeague:[League]
    }

`;

const fieldNameMapper = league => ({
  id: league.id,
  name: league.name,
  description: league.description,
  createdAt: league.created_at,
  updatedAt: league.updated_at
});

const resolvers = {
  Admin: {
    league: admin => {
      return db.oneOrNone("select * from merchant_league where id = $1", [admin.leagueId])
        .then(res => fieldNameMapper(res))
        .catch(() => new Error("this user not assign to any league yet"));
    }
  },
  Query: {
    getAllLeague: () => {
      return db.any("select * from merchant_league where id != 0")
        .then(leagues => {
          return leagues.map(fieldNameMapper);
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
