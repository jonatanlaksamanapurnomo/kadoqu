const { dbTrack } = require("../db");

const typeDefs = `
    type ProductAddedToCartTracker {
        id:Int
        userId:String
        productId:String
        gidaOption:JSON
        searchInput:String
        createdAt: String
        updatedAt: String
    }

    extend type Mutation{
        addProductAddedToCartTracker(userId:String,productId:String,gidaOption:JSON,search:String):Boolean
    }
`;

const resolvers = {
  Mutation: {
    addProductAddedToCartTracker: (_, { userId, productId, gidaOption = null,search=null }) => {
        return dbTrack.none(
          `INSERT INTO "product-added-to-cart-tracker" (
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
