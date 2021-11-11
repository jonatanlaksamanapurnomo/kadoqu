const { db } = require("../db");
const typeDefs = `

  
  type Merchant{
    name:String
    code:String
  }
  
  extend type Query{
    getMerchants: [Merchant]
    getMerchantsLevel : [Merchant]
  }
`;

const fieldNameMapper = merchant => ({
  name: merchant.name,
  code: merchant.merchant_code
});

const resolvers = {
  Query: {
    getMerchants: () => {
      return db
        .any(
          "select * from admins where merchant_code is not null and merchant_level > 10  ORDER BY name"
        )
        .then(merchants => merchants.map(fieldNameMapper));
    },
    getMerchantsLevel :() =>{
      return db
      .any(
        "select * from admins where merchant_code is not null and merchant_level > 25  ORDER BY name"
      )
      .then(merchants => merchants.map(fieldNameMapper));
    }
  
}
}

module.exports = {
  typeDefs,
  resolvers
};
