const {db} = require("../db");


const typeDefs = `
    type Tag{
        id:Int
        name:String
        product_id:String
        createdAt: String
        updatedAt: String
    }
    input addTag{
        name:String
        product_id:String
    }
    extend type Mutation{
      addTag(input:addTag):String
    }
`;

const fieldNameMapper = tag => ({
  id: tag.id,
  name: tag.name,
  product_id: tag.parent_id,
  createdAt: tag.created_at,
  updatedAt: tag.updated_at
});


const resolvers = {
  Product: {
    tags: prodcut =>
      db.any('select * from  "tags" where "product_id" = $1', [prodcut.id]).then(tags => tags.map(fieldNameMapper))
  },
  Mutation: {
    addTag: (_, {input}) => {
      return db.none("insert into tags (product_id,name) values ($1,$2)", [input.product_id, input.name])
        .then(() => "sukses")
        .catch((res) => new Error(res.detail));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
