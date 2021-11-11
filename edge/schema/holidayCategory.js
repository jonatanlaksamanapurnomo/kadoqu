const {db} = require("../db");

const typeDefs = `
  type HolidayCategory{
    id: String
    name: String
    images: JSON
  }
  extend type Query {
    getHolidayCategories: [HolidayCategory]
  }
  extend type Mutation{
    addHolidayCategory(name: String): String
    updateHolidayCategory(categoryId: String, newName: String): String
    updateHolidayCategoryBanner(categoryId: String, bannerType: String, image: String): String
    deleteHolidayCategory(categoryId: String): String
    addHolidayCategoryProduct(productId:String,name:String):String
    deleteHolidayCategoryProduct(productId:String):String

  }
`;

const fieldNameMapper = holidayCategory => ({
  id: holidayCategory.id,
  name: holidayCategory.name,
  images: {
    default: holidayCategory.default_banner,
    wide: holidayCategory.wide_banner,
    filter_banner: holidayCategory.filter_banner,
    mobile: holidayCategory.mobile_banner
  },
  createdAt: holidayCategory.created_at,
  updatedAt: holidayCategory.updated_at
});

const resolvers = {
  Product: {
    holidayCategories: product => {
      return db.any("select * from product_holiday_categories where product_id = $1", [product.id])
        .then(result => result.map(fieldNameMapper));
    }
  },
  Query: {
    getHolidayCategories: () => {
      return db
        .any("SELECT * FROM holiday_categories")
        .then(holidayCategory => holidayCategory.map(fieldNameMapper));
    }
  },
  Mutation: {
    deleteHolidayCategoryProduct: (_, {productId}, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "DELETE FROM product_holiday_categories WHERE product_holiday_categories.product_id = $1 RETURNING *",
          [productId]
        )
        .then(res =>
          db
            .none(
              "DELETE FROM product_holiday_categories" + "WHERE name = $1",
              [res.name]
            )
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    }
    ,
    // },
    addHolidayCategoryProduct: (_, {productId, name}) => {
      return db.one("insert into product_holiday_categories (product_id , name) values($1 ,$2) returning * ", [productId, name])
        .then(res => {
          if (res) {
            return "sukses";
          } else {
            return "fail";
          }
        })

    },
    addHolidayCategory: (_, {name}, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .none("INSERT INTO holiday_categories (name) VALUES ($1)", [name])
        .then(() => "success")
        .catch(res => new Error(res.message));
    },
    updateHolidayCategory: (_, {categoryId, newName}, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "UPDATE holiday_categories new" +
          " SET name = $1" +
          " FROM store_categories old" +
          " WHERE old.id = new.id AND new.id = $2" +
          " RETURNING old.name AS name",
          [newName, categoryId]
        )
        .then(res =>
          db
            .none(
              "UPDATE product_holiday_categories SET name = $1 WHERE name = $2",
              [newName, res.name]
            )
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    },
    updateHolidayCategoryBanner: (
      _,
      {categoryId, bannerType = "desktop", image},
      context
    ) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      const fieldname =
        bannerType.toLowerCase() === "desktop"
          ? "default_banner"
          : "wide_banner";
      return db
        .none(`UPDATE holiday_categories SET ${fieldname} = $2 WHERE id = $1`, [
          categoryId,
          image
        ])
        .then(() => "Success")
        .catch(res => new Error(res.message));
    },
    deleteHolidayCategory: (_, {categoryId}, context) => {
      if (!context.user || !context.user.role === "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "DELETE FROM holiday_categories WHERE holiday_categories.id = $1 RETURNING name",
          [categoryId]
        )
        .then(res =>
          db
            .none(
              "DELETE FROM product_holiday_categories" + "WHERE name = $1",
              [res.name]
            )
            .then(() => "success")
            .catch(res => "Partial success " + new Error(res.message))
        )
        .catch(res => new Error(res.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
