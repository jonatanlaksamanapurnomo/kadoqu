const { dbTrack } = require("../db");

const typeDefs = `
    type ProductCheckoutTracker {
        id:Int
        userId:String
        productId:String
        gidaOption:JSON
        orderId:String
        searchInput:String
        createdAt: String
        updatedAt: String
    }

    extend type Mutation{
        addProductCheckoutTracker(userId:String,productId:String,orderId:String,gidaOption:JSON,search:String):Boolean
    }
`;

const resolvers = {
  Mutation: {
    addProductCheckoutTracker: (
      _,
      { userId, productId, orderId, gidaOption = null, search = null }
    ) => {
      return dbTrack
        .none(
          `INSERT INTO "product-checkout-tracker" (
            "user_id",
            "product_id",
            "order_id",
            "gida_option",
            "search_input"
        ) VALUES ($1,$2,$3,$4,$5)`,
          [userId, productId, orderId, gidaOption, search]
        )
        .then()
        .catch((e) => new Error(e.message));
    },
  },
};

module.exports = {
  typeDefs,
  resolvers,
};
