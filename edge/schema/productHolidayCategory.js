const {db} = require("../db");

const typeDefs = `
  type ProductHolidayCategory {
    id: Int
    name: String
    productId: String
    product:Product
    createdAt: String
    updatedAt: String
  }

  extend type Query{
    getProductHolidays:[ProductHolidayCategory]
  }
  extend type Mutation {
    addProductHolidayCategory(productId:String, category:String):String
    deleteProductHolidayCategory(productId:String, category:String):String
  }
`;

const fieldNameMapper = holidayCategory => ({
  id: holidayCategory.id,
  name: holidayCategory.name,
  productId: holidayCategory.product_id,
  createdAt: holidayCategory.created_at,
  updatedAt: holidayCategory.updated_at
});

const resolvers = {
  Product: {
    holidayCategories: product =>
      db
        .any("SELECT * FROM product_holiday_categories WHERE product_id = $1", [
          product.id
        ])
        .then(holidayCategory => holidayCategory.map(fieldNameMapper))
  },
  Query: {
    getProductHolidays: () => {
      return db.any("select * from product_holiday_categories")
        .then(products => products.map(fieldNameMapper));
    }
  },
  Mutation: {
    addProductHolidayCategory: (_, {productId, category}, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "INSERT INTO product_holiday_categories (product_id, name) VALUES ($1, $2)",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.detail));
    },
    deleteProductHolidayCategory: (_, {productId, category}, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin Auth only");
      }
      return db
        .none(
          "DELETE FROM product_holiday_categories WHERE product_id = $1 AND name = $2",
          [productId, category]
        )
        .then(() => "Success")
        .catch(res => new Error(res.message || res));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
