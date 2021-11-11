const { db } = require("../db");

const typeDefs = `
    type DeployHistory{
      id:Int
      name:String
      commitId:String
      product:String
      createdAt:Date
    }

    extend type Query {
        getHistory:[DeployHistory]
    }
    extend type Mutation{
      addDeployHistory(name:String , status:String , product:String):Boolean
    }
`;

const fieldNameMapper = deployHistory => ({
  id: deployHistory.id,
  name: deployHistory.name,
  commitId: deployHistory.status,
  product: deployHistory.product,
  createdAt: deployHistory.created_at
});


const resolvers = {
  Query: {
    getHistory: () => {
      return db.any("select * from deploy_history")
        .then(res => res.map(fieldNameMapper));
    }
  },
  Mutation: {
    addDeployHistory: (_, { name, status, product }) => {
      return db.one("insert into deploy_history (name , status,product) values ($1 , $2 , $3) returning *", [name, status, product])
        .then(() => true)
        .catch(() => false);

    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
