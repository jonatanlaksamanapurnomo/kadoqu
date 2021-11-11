const { db } = require("../db");
const typeDefs = `
    type ProductCase {
        id: Int
        productId:String
        name:String
        product:Product
        createdAt: DateTime
        updatedAt: DateTime
    }

    type ProductMagicalMoment{
         id: Int
        productId:String
        name:String
        product:Product
        createdAt: DateTime
        updatedAt: DateTime
    }
    type ProductBirthdayPackage{
         id: Int
        productId:String
        name:String
        product:Product
        createdAt: DateTime
        updatedAt: DateTime
    }
    type ProductCompanyCelebration{
         id: Int
        productId:String
        name:String
        product:Product
        createdAt: DateTime
        updatedAt: DateTime
    }
    type ProductCategories{
      id:Int
      name:String
    }
    extend type Query{
        getProductCasees:[ProductCase]
        getProductMagicalMoments:[ProductMagicalMoment]
        getProductBirthdayPackages:[ProductBirthdayPackage]
        getProductCompanyCelebrations:[ProductCompanyCelebration]
        getProductCategories:[ProductCategories]
    }
    extend type Mutation{
      addProductCase(productId:String):Boolean
      addMagicalMoment(productId:String):Boolean
      addBirthdayPackage(productId:String):Boolean
      addCompanyCelebration(productId:String):Boolean
    }

`;

const fieldNameMapper = productCase => ({
  id: productCase.id,
  productId: productCase.product_id,
  name: productCase.name,
  createdAt: productCase.created_at,
  updatedAt: productCase.updated_at
});

const resolvers = {
  Product: {
    magicalMoments: product => {
      return db.any("select * from product_magical_moment_categories where product_id = $1", [product.id])
        .then(result => result.map(fieldNameMapper));
    }
  },
  Admin: {
    category: admin => {
      return db.oneOrNone("select * from product_categories where id = $1", [admin.categoryId])
        .then(res => fieldNameMapper(res));
    }
  },
  Query: {
    getProductCasees: () => {
      return db.any("select * from product_case_categories")
        .then(res => res.map(fieldNameMapper));
    },
    getProductMagicalMoments: () => {
      return db.any("select * from product_magical_moment_categories")
        .then(res => res.map(fieldNameMapper));
    },
    getProductBirthdayPackages: () => {
      return db.any("select * from product_birthday_package_categories")
        .then(res => res.map(fieldNameMapper));
    },
    getProductCompanyCelebrations: () => {
      return db.any("select * from product_company_celebration_categories")
        .then(res => res.map(fieldNameMapper));
    },
    getProductCategories: () => {
      return db.any("select * from product_categories")
        .then(res => res.map(fieldNameMapper));
    }
  },
  Mutation: {
    addProductCase: (_, { productId }) => {
      return db.one("insert into product_case_categories (name , product_id) values ($1 , $2) returning *", ["case", productId])
        .then(() => true)
        .catch((e) => new Error(e.message));
    },
    addMagicalMoment: (_, { productId }) => {
      return db.one("insert into product_magical_moment_categories (name , product_id) values ($1 , $2) returning *", ["magical moment", productId])
        .then(() => true)
        .catch((e) => new Error(e.message));
    },
    addBirthdayPackage: (_, { productId }) => {
      return db.one("insert into product_birthday_package_categories (name , product_id) values ($1 , $2) returning *", ["birthday", productId])
        .then(() => true)
        .catch((e) => new Error(e.message));
    },
    addCompanyCelebration: (_, { productId }) => {
      return db.one("insert into product_company_celebration_categories (name , product_id) values ($1 , $2) returning *", ["company celebration", productId])
        .then(() => true)
        .catch((e) => new Error(e.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
