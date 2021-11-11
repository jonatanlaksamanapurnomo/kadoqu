const {dbTrack} = require("../db");


const typeDefs = `
  type TrackDummy {
    id:Int
    message: String
  }
  extend type Query {
    getTrackDummy:[TrackDummy]

  }

`;

const fieldNameMapper = tracker => ({
  id: tracker.id,
  message: tracker.name,

});

const resolvers = {
  Query: {
    getTrackDummy: () => {
      return dbTrack.any("SELECT * FROM test_track")
        .then(res => {
          return res.map(fieldNameMapper)
        })
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
