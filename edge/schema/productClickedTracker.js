const { dbTrack } = require("../db");

const typeDefs = `
    type ProductClickedTracker {
        id:Int
        userId:String
        productId:String
        gidaOption:JSON
        searchInput:String
        createdAt: String
        updatedAt: String
    }

    extend type Mutation{
        addProductClicked(userId:String,productId:String,gidaOption:JSON,search:String):Boolean
    }
`;

const resolvers = {
  Mutation: {
    addProductClicked: (_, { userId, productId, gidaOption = null ,search=null}) => {
        return dbTrack.none(
          `INSERT INTO "product-clicked-tracker" (
            "user_id",
            "product_id",
            "gida_option",
            "search_input"
        ) VALUES ($1,$2,$3,$4)`,
          [userId, productId, gidaOption,search]
        );
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
