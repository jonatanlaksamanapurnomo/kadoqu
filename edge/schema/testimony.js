const { db } = require("../db");

const typeDefs = `
    type Testimony {
        id: Int
        name: String
        shortDescription: String
        budget: Float
        testimony: String
        image: String
        category: String
    }
    input InputTestimony{
      name: String
      short_description: String
      budget: Float
      testimony: String
      image: String
      category: String
    }

    extend type Query {
        getTestimonies(limit: Int, offset: Int, category: String): [Testimony]
        getTestimonyCategories: [String]
        getTestimoniesLength(category: String): Int
    }
    extend type Mutation{
      addTestimony(input:InputTestimony):String
 
    }
`;

const fieldNameMapper = testimony => ({
  id: testimony.id,
  name: testimony.name,
  shortDescription: testimony.short_description,
  budget: testimony.budget,
  testimony: testimony.testimony,
  image: testimony.image,
  category: testimony.category
});

const resolvers = {
  Query: {
    getTestimonies: (_, { limit = undefined, offset = 0, category = "" }) =>
      db
        .any(
          `SELECT * FROM testimonies ${
            category !== "" ? "WHERE category = $3" : ""
          } ORDER BY id LIMIT ${limit === undefined ? "ALL" : "$1"} OFFSET $2`,
          [limit, offset, category]
        )
        .then(testimonies => testimonies.map(fieldNameMapper))
        .catch(error => new Error(error.message || error)),
    getTestimonyCategories: () =>
      db
        .any(
          "SELECT UNNEST(ENUM_RANGE(ENUM_FIRST(NULL::testimony_categories), NULL::testimony_categories)) AS name"
        )
        .then(testimonyCategories =>{
            return   testimonyCategories.map(category => category.name)
        }
        
        )
        .catch(error => new Error(error.message || error)),
    getTestimoniesLength: (_, { category = "" }) =>
      db
        .one(
          `SELECT COUNT(*) FROM testimonies ${
            category !== "" ? "WHERE category = $1" : ""
          }`,
          [category]
        )
        .then(res => res.count)
        .catch(error => new Error(error.message || error))
  },
  Mutation: {
    addTestimony: (_, { input }) => {
      return db
        .none(
          "INSERT INTO testimonies (name, short_description, budget, testimony,image,category) VALUES ($1, $2, $3, $4, $5, $6) ",
          [
            input.name,
            input.short_description,
            input.budget,
            input.testimony,
            input.image,
            input.category
          ]
        )
        .then(() => "Success")
        .catch(e => {
           return new Error(e.message);
         
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
