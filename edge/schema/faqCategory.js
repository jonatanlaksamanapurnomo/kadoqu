const {db} = require("../db");

const typeDefs = `
    type faqCategory{
        id:Int
        name:String
        faqSubCategory: [faqSubCategory]
    }

    extend type Query {
        getFaqCategory: [faqCategory]
    }
`;

const fieldNameMapper = faqCategory => ({
  id: faqCategory.id,
  name: faqCategory.name
});

const resolvers = {
  Query: {
    getFaqCategory: (parent, args, context) =>
      db
        .any('SELECT * FROM "faq_category"')
        .then(faqCategory => faqCategory.map(fieldNameMapper))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
