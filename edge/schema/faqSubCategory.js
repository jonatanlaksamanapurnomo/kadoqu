const {db} = require("../db");

const typeDefs = `
    type faqSubCategory{
        id:Int
        idFaqCategory:Int
        name:String
        content:String
    }

    extend type Query {
        getFaqSubCategory: [faqSubCategory]
    }
`;

const fieldNameMapper = faqSubCategory => ({
  id: faqSubCategory.id,
  idFaqCategory: faqSubCategory.id_faq_category,
  name: faqSubCategory.name,
  content: faqSubCategory.content
});

const resolvers = {
  faqCategory: {
    faqSubCategory: faqCategory =>
      db
        .any('select * from  "faq_sub_category" where "id_faq_category" = $1', [
          faqCategory.id
        ])
        .then(faqSubCategory => faqSubCategory.map(fieldNameMapper))
  }
};

module.exports = {
  typeDefs,
  resolvers
};
