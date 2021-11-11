const { db } = require("../db");
const { GraphQLJSON } = require("graphql-type-json");

const typeDefs = `
  scalar JSON
  scalar Date

  type Product {
    id: String
    name: String
    merchant: String
    sku: String
    slug: String
    shortDescription: String
    longDescription: String
    shipmentDescription: String
    price: Float
    merchantPrice: Float
    capitalPrice: Float
    merchantDiscount: Float
    merchantDiscountUntil: Date
    kadoquDiscountUntil: Date
    kadoquDiscount: Float
    inStock: Boolean
    isEnable: Boolean
    isPo: Boolean
    isCustomeOrder: Boolean
    isCustomePhoto: Boolean
    isCustomeColor: Boolean
    newToDate: Date
    stock: Int
    weight: Float
    length: Float
    width: Float
    height: Float
    score: JSON
    date: JSON
    poNotes: String
    createdAt: String
    updatedAt: String
    categories: [Category]
    storeCategories: [StoreCategory]
    holidayCategories: [HolidayCategory]
    eventCategories : [EventCategory]
    magicalMoments: [ProductMagicalMoment]
    photos: [Photo]
    tags: [Tag]
    colors: [ProductColor]
    shippingSupports: [ProductShippingSupport]
    isFavorite: Boolean
    discountPrice: Float
    minQty: Int
    merchantData : Admin
    multipleQty: Int
    isDigital: Boolean
  }

  type PaginatedProducts {
    length: Int
    products: [Product]
  }

  input FiltersInput {
    productName: String
    storeCategories: [String]
    giftCategories: [String]
    holidayCategories: [String]
    eventCategories: [String]
    priceRange: [Int]
    offers: [String]
    colors: [String]
    shippingSupports: [String]
    merchants: [String]
    others: String
  }

  input InputProduct {
    name: String
    merchant: String
    merchantCode: String
    shortDescription: String
    longDescription: String
    shipmentDescription: String
    price: Float
    merchantPrice: Float
    discountPrice: Float
    discountOwner: String
    discountUntil: String
    capitalPrice:Float
    isPo: Boolean
    poNotes:String
    score:JSON
    date:JSON
    newToDate: String
    stock: Int
    weight: Float
    length: Float
    width: Float
    height: Float
    isCustomeOrder: Boolean
    isCustomePhoto: Boolean
    isCustomeColor: Boolean
    minQty: Int
    multipleQty: Int
    isDigital: Boolean
  }

  input InputProductEdits {
    name: String
    merchant: String
    merchantCode: String
    shortDescription: String
    longDescription: String
    shipmentDescription: String
    price: Float
    capitalPrice:Float
    merchantPrice: Float
    discountPrice: Float
    discountUntil: String
    kadoquDiscountPrice: Float
    kadoquDiscountUntil: String
    isPo: Boolean
    isCustomeOrder: Boolean
    isCustomePhoto: Boolean
    isCustomeColor: Boolean
    poNotes: String
    isEnable: Boolean
    isUpdateSku: Boolean
    newToDate: String
    stock: Int
    weight: Float
    length: Float
    width: Float
    height: Float
    score: JSON
    date: JSON
    minQty: Int
    multipleQty: Int
    isDigital: Boolean
  }

  input InputProductCSV {
    sku: String
    name: String
    merchant: String
    shortDescription: String
    longDescription: String
    price: Float
    merchantPrice: Float
    discountPrice: [Float]
    isEnable: Boolean
    stock: Int
    weight: Float
    photos: [String]
    storeCategoryId: [String]
    giftCategoryId: [String]
    width: Float
    length: Float
    height: Float
  }


   extend type Query {
      getUserFavoriteProducts(limit: Int, offset:Int): PaginatedProducts
      getProductsByCategoryid(category_id:String) : [Product]
      getProductsDashboard(merchant: String): [Product]
      getAllProductsDashboard(limit:Int,offset:Int,keyword:String): PaginatedProducts
      getProductsMerchant(merchant: String): [Product]
      getAvailableProducts(sortingField: String, isAscending: Boolean, filters: FiltersInput, limit: Int, offset: Int): PaginatedProducts
      getAvailableHolidayProducts(sortingField: String, isAscending: Boolean, filters: FiltersInput, limit: Int, offset: Int): PaginatedProducts
      getProduct(id:String):Product
      getGidaResults(person: String, event: String, traits: [String], limit: Int, offset: Int ):[Product]
      getSimiliarProduct(id:String):[Product]
      getProductBySlug(slug:String):Product
      getStock(merchant : String) :[Product]
      getProducts : [Product]
      getProductsByOrderId(id: String): [Product]
    }
    extend type Mutation{

      addProduct(input:InputProduct, token:String, merchantCode:String):String
      deleteProduct(id: String): String
      editProduct(id: String, edits: InputProductEdits ): String
      addProductByCSV(input: InputProductCSV): String
      setDiscount(discount1:Int,discount2:Int,discountUntil:String):Boolean
      setDiscountHoliday(discount1:Int,discount2:Int,discountUntil:String):Boolean
      setDiscountMM(discount1:Int,discount2:Int,discountUntil:String):Boolean
      duplicateProduct(product:JSON) : String
    }

`;

const fieldNameMapper = product => ({
  id: product.id,
  name: product.name,
  merchant: product.merchant,
  category_id: product.category_id,
  shortDescription: product.short_description,
  longDescription: product.long_description,
  shipmentDescription: product.shipment_description,
  price: product.price,
  merchantPrice: product.merchant_price,
  merchantDiscount: product.merchant_discount,
  kadoquDiscount: product.kadoqu_discount,
  inStock: product.in_stock,
  capitalPrice: product.capital_price,
  slug: product.slug,
  isEnable: product.is_enable,
  isPo: product.is_po,
  stock: product.stock,
  weight: product.weight,
  length: product.length,
  width: product.width,
  height: product.height,
  score: product.score,
  date: product.date,
  sku: product.sku,
  merchantDiscountUntil: product.merchant_discount_until,
  kadoquDiscountUntil: product.kadoqu_discount_until,
  newToDate: product.new_to_date,
  poNotes: product.po_notes,
  isCustomeOrder: product.is_custome_order,
  isCustomePhoto: product.is_custome_photo,
  isCustomeColor: product.is_custome_color,
  createdAt: product.created_at,
  updatedAt: product.updated_at,
  minQty: product.min_qty,
  multipleQty: product.multiple_qty,
  isDigital: product.is_digital,
  // discount price * 1.2 for tax
  discountPrice:
    product.kadoqu_discount_until &&
    new Date(product.kadoqu_discount_until) > new Date()
      ? product.kadoqu_discount
      : product.merchant_discount_until &&
        new Date(product.merchant_discount_until) > new Date()
      ? product.merchant_discount
      : null
});

const generateSKU = merchantCode => {
  const SEQUENCE_LENGTH = 7;

  return db.one("SELECT nextval('sku')").then(res => {
    let sequence = res.nextval;
    if (sequence.toString().length <= SEQUENCE_LENGTH) {
      return merchantCode + sequence.padStart(SEQUENCE_LENGTH, "0");
    }
    sequence = (parseInt(sequence) % 10000000).toString();
    const sku = merchantCode + sequence.padStart(SEQUENCE_LENGTH, "0");
    db.one("SELECT * FROM products WHERE merchant_code = $1", [sku])
      .then(() => generateSKU(merchantCode))
      .catch(() => sku);
  });
};

const resolvers = {
  JSON: GraphQLJSON,
  ProductCase: {
    product: ProductCase => {
      return db
        .one("select * from products where id = $1", [ProductCase.productId])
        .then(product => fieldNameMapper(product));
    }
  },
  ProductHolidayCategory: {
    product: ProductCase => {
      return db
        .one("select * from products where id = $1", [ProductCase.productId])
        .then(product => fieldNameMapper(product));
    }
  },
  ProductMagicalMoment: {
    product: ProductCase => {
      return db
        .one("select * from products where id = $1", [ProductCase.productId])
        .then(product => fieldNameMapper(product));
    }
  },
  ProductBirthdayPackage: {
    product: ProductCase => {
      return db
        .one("select * from products where id = $1", [ProductCase.productId])
        .then(product => fieldNameMapper(product));
    }
  },
  ProductCompanyCelebration: {
    product: ProductCase => {
      return db
        .one("select * from products where id = $1", [ProductCase.productId])
        .then(product => fieldNameMapper(product));
    }
  },
  ProductReview: {
    product: productReview => {
      return db
        .one("select * from products where  id = $1 ", [
          productReview.productId
        ])
        .then(product => fieldNameMapper(product));
    }
  },
  RatingProduct: {
    product: rating =>
      db
        .one("SELECT * FROM products WHERE id = $1", [rating.productId])
        .then(product => fieldNameMapper(product))
        .catch(error => new Error(error.message || error))
  },
  User: {
    favoriteProducts: user =>
      db
        .any(
          "SELECT product_id FROM user_favorite_products WHERE user_id = $1",
          [user.id]
        )
        .then(response => {
          const ids = response.map(({ product_id }) => product_id);
          return db
            .any(
              `SELECT * FROM products WHERE id IN (${ids
                .map((id, idx) => "$" + idx)
                .join(", ")})`,
              ids
            )
            .then(products => products.map(fieldNameMapper))
            .catch(error => new Error(error.message));
        })
        .catch(error => new Error(error.message))
  },
  Product: {
    isFavorite: (product, _, context) => {
      if (!context.user) {
        return false;
      }
      return db
        .one(
          "SELECT EXISTS(SELECT 1 FROM user_favorite_products WHERE user_id = $1 AND product_id = $2)",
          [context.user.data, product.id]
        )
        .then(response => {
          return response.exists;
        })
        .catch(error => new Error(error.message));
    }
  },
  Query: {
    getUserFavoriteProducts: (_, { limit = null, offset = null }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .any(
          "SELECT product_id FROM user_favorite_products WHERE user_id = $1",
          context.user.data
        )
        .then(response => {
          const ids = response.map(({ product_id }) => product_id);
          const size = ids.length;
          let query = ``;
          if (size > 0) {
            query = `SELECT * FROM products WHERE id IN (${ids
              .map((id, idx) => "$" + (idx + 1))
              .join(", ")}) LIMIT $${size + 1} OFFSET $${size + 2}`;
          } else {
            query = `SELECT * FROM products LIMIT 0 `;
          }
          return db
            .any(query, [...ids, limit, offset])
            .then(products => ({
              length: size,
              products: products.map(fieldNameMapper)
            }))
            .catch(error => new Error(error.message));
        })
        .catch(error => new Error(error.message));
    },
    getProducts: () => {
      return db.any("SELECT * FROM products").then(products => {
        return products.map(fieldNameMapper);
      });
    },
    getStock: (_, __, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .any(
          [
            "SELECT * FROM products",
            merchant
              ? "WHERE merchant = $1 and stock = 0  ORDER BY  1 asc"
              : " WHERE stock = 0 ORDER BY  1 asc"
          ].join(" "),
          [merchant]
        )
        .then(products => products.map(fieldNameMapper));
    },

    getSimiliarProduct: (_, { id }) =>
      db
        .one(
          "select * from products where id = $1  and score is not null and is_enable = true ",
          [id]
        )
        .then(product => {
          let merchant = product.merchant;
          if (product.score != null) {
            let arrScoreTo = Object.entries(product.score.relationship);
            let arrScoreEvent = Object.entries(product.score.event);
            let arrScoreTraits = Object.entries(product.score.personality);
            let higestValue = [];
            let minValue = -99999;
            arrScoreTo.forEach(item => {
              if (item[1] > minValue) {
                higestValue[0] = item;
                minValue = item[1];
              }
            });
            minValue = -999999;
            arrScoreEvent.forEach(item => {
              if (item[1] > minValue) {
                higestValue[1] = item;
                minValue = item[1];
              }
            });
            minValue = -999999;
            arrScoreTraits.forEach(item => {
              if (item[1] > minValue) {
                higestValue[2] = item;
                minValue = item[1];
              }
            });

            return db
              .any(
                "select * from products where score is not null and is_enable = true "
              )
              .then(products => {
                let results = [];
                results = products.filter(item => item.merchant === merchant);
                let objectAtributeTo =
                  higestValue.length > 0 ? higestValue[0][0] : "null";
                let objectAtributeEvent =
                  higestValue.length > 0 ? higestValue[1][0] : "null";
                let objectAtributeCharacter =
                  higestValue.length > 0 ? higestValue[2][0] : "null";
                products.forEach(item => {
                  if (item.id != id) {
                    if (
                      objectAtributeTo in item.score.relationship &&
                      item.score.relationship[`${objectAtributeTo}`] >=
                        higestValue[0][1] - 3
                    ) {
                      if (
                        objectAtributeEvent in item.score.event &&
                        item.score.event[`${objectAtributeEvent}`] >=
                          higestValue[1][1] - 3
                      ) {
                        if (
                          objectAtributeCharacter in item.score.personality &&
                          item.score.personality[
                            `${objectAtributeCharacter}`
                          ] >=
                            higestValue[2][1] - 3
                        ) {
                          results.push(item);
                        }
                      }
                    }
                  }
                });
                return results.slice(0, 6).map(fieldNameMapper);
              });
          } else {
            return db
              .any("select * from products where merchant = $1", [merchant])
              .then(results => results.slice(0, 6).map(fieldNameMapper));
          }
        })
        .catch(() => {
          return [];
        }),
    getGidaResults: (_, { person, event, traits, limit = 4, offset }) => {
      return db
        .any(
          "SELECT * FROM products where is_enable = true  and score is not null  "
        )
        .then(products => {
          let arrProduct = [];
          products.forEach(item => {
            let total = 0;
            traits.forEach(chara => {
              if (item.score.personality[chara]) {
                total += parseInt(item.score.personality[chara]);
              }
            });
            if (item.score.relationship[person]) {
              total += parseInt(item.score.relationship[person]);
            }
            if (item.score.event[event]) {
              total += parseInt(item.score.event[event]);
            }
            item.total = total;
            arrProduct.push(item);
          });

          function sortByKey(array, key) {
            return array.sort(function(a, b) {
              var x = a[key];
              var y = b[key];
              return x > y ? -1 : x < y ? 1 : 0;
            });
          }

          arrProduct = sortByKey(arrProduct, "total");
          return arrProduct.slice(offset, offset + limit).map(fieldNameMapper);
        });
    },
    getProductsDashboard: (_, __, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      if (context.user.role === "merchant") {
        merchant = context.user.name;
      }
      return db
        .any(
          [
            "SELECT  * FROM products",
            merchant
              ? "WHERE merchant = $1 ORDER BY  1 asc"
              : "ORDER BY  1 asc "
          ].join(" "),
          [merchant]
        )
        .then(products => products.map(fieldNameMapper));
    },
    getAllProductsDashboard: (
      _,
      { limit = null, offset = null, keyword },
      context
    ) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      let merchant;
      let variables = [];
      let conditions = [];
      if (context.user.role === "merchant") {
        merchant = context.user.name;
        conditions.push(`WHERE merchant = $${variables.push(merchant)}`);
        if (keyword && keyword !== "") {
          conditions.push(
            `AND (sku ilike $${variables.push(
              "%" + keyword + "%"
            )} OR name ilike $${variables.push("%" + keyword + "%")})`
          );
        }
      } else {
        if (keyword && keyword !== "") {
          conditions.push(
            `WHERE merchant ilike $${variables.push(
              "%" + keyword + "%"
            )} OR sku ilike $${variables.push(
              "%" + keyword + "%"
            )} OR name ilike $${variables.push("%" + keyword + "%")}`
          );
        }
      }
      let limOff = `LIMIT $${variables.push(limit)} OFFSET $${variables.push(
        offset
      )}`;
      return db
        .one(
          ["SELECT COUNT(id) FROM products", conditions.join("")].join(" "),
          variables
        )
        .then(length => {
          return db
            .any(
              [
                "SELECT * FROM products",
                conditions.join(""),
                "ORDER BY  1 asc",
                limOff
              ].join(" "),
              variables
            )
            .then(values => {
              let res = {
                length: length.count,
                products: values.map(fieldNameMapper)
              };
              return res;
            });
        });
    },
    getProductsMerchant: (_, { merchant }) => {
      return db
        .any(
          [
            "SELECT * FROM products",
            merchant
              ? "WHERE merchant = $1 AND is_enable = true ORDER BY  1 asc"
              : "ORDER BY  1 asc"
          ].join(" "),
          [merchant]
        )
        .then(products => products.map(fieldNameMapper));
    },
    getAvailableProducts: (
      _,
      { sortingField, isAscending, filters, limit = 20, offset = 0 }
    ) => {
      let values = [];
      let securedSortingField;
      if (["created_at", "name", "price"].includes(sortingField)) {
        securedSortingField = sortingField;
      } else {
        securedSortingField = "created_at";
      }
      const sortingMethod = isAscending ? "ASC" : "DESC";
      let conditionStatements = [];
      let joinStatements = [];
      if (filters) {
        if (filters.others) {
          values.push(`%${filters.others}%`);
          conditionStatements.push(
            `AND (name ilike $${values.length} OR merchant ilike $${values.length})`
          );
        }
        if (filters.priceRange) {
          conditionStatements.push(
            `AND price >= ${"$" +
              values.push(filters.priceRange[0])} AND price <= ${"$" +
              values.push(filters.priceRange[1])}`
          );
        }
        const offers = new Set(filters.offers);
        if (filters.offers && offers && filters.offers.length > 0) {
          let offersCondition = [];
          if (offers.has("New")) {
            offersCondition.push(
              `new_to_date > ${"$" + values.push(new Date())}`
            );
          }
          if (offers.has("Pre-Order")) {
            offersCondition.push("is_po=true");
          }
          if (offers.has("Sale")) {
            offersCondition.push(`((kadoqu_discount_until IS NOT NULL AND kadoqu_discount_until > now())
              OR (merchant_discount_until IS NOT NULL AND merchant_discount_until > now()))`);
          }
          conditionStatements.push(`AND (${offersCondition.join(" OR ")})`);
        }
        if (filters.merchants && filters.merchants.length > 0) {
          let merchantsCondition = [];
          filters.merchants.forEach(merchant => {
            merchantsCondition.push(
              `merchant = ${"$" + values.push(merchant)}`
            );
          });
          conditionStatements.push(`AND (${merchantsCondition.join(" OR ")})`);
        }
        [
          "storeCategories",
          "holidayCategories",
          "giftCategories",
          "eventCategories" /*<DISABLED UNTIL BC TEAM IS READY>, "colors", "shippingSupports"*/
        ].forEach(field => {
          if (filters[field] && filters[field].length > 0) {
            const underscoredField = field
              .split(/(?=[A-Z])/)
              .join("_")
              .toLowerCase();
            let fieldCondition = [];
            filters[field].forEach(condition => {
              fieldCondition.push(`name = ${"$" + values.push(condition)}`);
            });
            joinStatements.push(
              " INNER JOIN" +
                ` (SELECT DISTINCT product_id AS ${underscoredField}_product_id` +
                ` FROM product_${underscoredField}` +
                ` WHERE ${fieldCondition.join(" OR ")}) ${underscoredField}` +
                ` ON products.id = ${underscoredField}_product_id`
            );
          }
        });
      }
      const pagination = `LIMIT $${values.push(limit)} OFFSET $${values.push(
        offset
      )}`;
      return db
        .one(
          [
            "SELECT COUNT(products.*) as length",
            "FROM products",
            joinStatements.join(" "),
            "WHERE is_enable = true",
            conditionStatements.join(" ")
          ].join(" "),
          values
        )
        .then(({ length }) => {
          return db
            .any(
              [
                "SELECT products.*",
                "FROM products",
                joinStatements.join(" "),
                "WHERE is_enable = true",
                conditionStatements.join(" "),
                "ORDER BY",
                securedSortingField,
                sortingMethod,
                pagination
              ].join(" "),
              values
            )
            .then(products => ({
              length: length,
              products: products.map(fieldNameMapper)
            }));
        });
    },
    getAvailableHolidayProducts: (
      _,
      { sortingField, isAscending, filters, limit = 20, offset = 0 }
    ) => {
      let values = [];
      let securedSortingField;
      if (["created_at", "name", "price"].includes(sortingField)) {
        securedSortingField = sortingField;
      } else {
        securedSortingField = "created_at";
      }
      const sortingMethod = isAscending ? "ASC" : "DESC";
      let conditionStatements = [];
      let joinStatements = [];
      if (filters) {
        if (filters.others) {
          values.push(`%${filters.others}%`);
          conditionStatements.push(
            `AND (name ilike $${values.length} OR merchant ilike $${values.length})`
          );
        }
        if (filters.priceRange) {
          conditionStatements.push(
            `AND price >= ${"$" +
              values.push(filters.priceRange[0])} AND price <= ${"$" +
              values.push(filters.priceRange[1])}`
          );
        }
        const offers = new Set(filters.offers);
        if (offers && filters.offers.length > 0) {
          let offersCondition = [];
          if (offers.has("New")) {
            offersCondition.push(
              `new_to_date > ${"$" + values.push(new Date())}`
            );
          }
          if (offers.has("Pre-Order")) {
            offersCondition.push("is_po=true");
          }
          if (offers.has("Sale")) {
            offersCondition.push(`((kadoqu_discount_until IS NOT NULL AND kadoqu_discount_until > now())
              OR (merchant_discount_until IS NOT NULL AND merchant_discount_until > now()))`);
          }
          conditionStatements.push(`AND (${offersCondition.join(" OR ")})`);
        }
        if (filters.merchants && filters.merchants.length > 0) {
          let merchantsCondition = [];
          filters.merchants.forEach(merchant => {
            merchantsCondition.push(
              `merchant = ${"$" + values.push(merchant)}`
            );
          });
          conditionStatements.push(`AND (${merchantsCondition.join(" OR ")})`);
        }
        [
          "storeCategories",
          "holidayCategories",
          "giftCategories",
          "eventCategories" /*<DISABLED UNTIL BC TEAM IS READY>, "colors", "shippingSupports"*/
        ].forEach(field => {
          if (filters[field] && filters[field].length > 0) {
            const underscoredField = field
              .split(/(?=[A-Z])/)
              .join("_")
              .toLowerCase();
            let fieldCondition = [];
            filters[field].forEach(condition => {
              fieldCondition.push(`name = ${"$" + values.push(condition)}`);
            });
            joinStatements.push(
              " INNER JOIN" +
                ` (SELECT DISTINCT product_id AS ${underscoredField}_product_id` +
                ` FROM product_${underscoredField}` +
                ` WHERE ${fieldCondition.join(" OR ")}) ${underscoredField}` +
                ` ON products.id = ${underscoredField}_product_id`
            );
          } else if (field === "holidayCategories") {
            const underscoredField = field
              .split(/(?=[A-Z])/)
              .join("_")
              .toLowerCase();
            joinStatements.push(
              " INNER JOIN" +
                ` (SELECT DISTINCT product_id AS ${underscoredField}_product_id` +
                ` FROM product_${underscoredField})` +
                ` ${underscoredField} ON products.id = ${underscoredField}_product_id`
            );
          }
        });
      }
      const pagination = `LIMIT $${values.push(limit)} OFFSET $${values.push(
        offset
      )}`;
      return db
        .one(
          [
            "SELECT COUNT(products.*) as length",
            "FROM products inner join product_holiday_categories on products.id = product_holiday_categories.product_id ",
            "WHERE is_enable = true",
            conditionStatements.join(" ")
          ].join(" "),
          values
        )
        .then(({ length }) => {
          return db
            .any(
              [
                "SELECT products.*",
                "FROM products",
                joinStatements.join(" "),
                "WHERE is_enable = true",
                conditionStatements.join(" "),
                "ORDER BY",
                securedSortingField,
                sortingMethod,
                pagination
              ].join(" "),
              values
            )
            .then(products => {
              return {
                length: length,
                products: products.map(fieldNameMapper)
              };
            });
        });
    },
    getProductsByCategoryid: (_, { category_id }) =>
      db
        .any('SELECT * FROM "products" WHERE "category_id"= $1', [category_id])
        .then(products => products.map(fieldNameMapper)),
    getProduct: (_, { id }) =>
      db
        .one('SELECT * FROM "products" WHERE "id"= $1', [id])
        .then(product => fieldNameMapper(product)),
    getProductBySlug: (_, { slug }) =>
      db
        .one('SELECT * FROM "products" WHERE "slug"=$1 AND is_enable = true', [
          slug
        ])
        .then(product => fieldNameMapper(product)),
    getProductsByOrderId: (_, { id }) =>
      db
        .any(
          "SELECT DISTINCT ON (p.id) p.* " +
            "FROM order_products op " +
            "INNER JOIN products p ON (op.product ->> 'id')::UUID = p.id " +
            "WHERE op.order_id = $1",
          [id]
        )
        .then(response => response.map(fieldNameMapper))
        .catch(e => new Error(e.message))
  },
  Mutation: {
    //tax is default tax that we gave into price  note kak fenny has obligation to change this :D hohoho
    //hahah will miss our command chat ya sel :D
    duplicateProduct: (_, { product }) => {
      const sql =
        "INSERT INTO products " +
        "(name, merchant, sku, slug," +
        "short_description, long_description, shipment_description," +
        "price, merchant_price, merchant_discount, merchant_discount_until, kadoqu_discount, kadoqu_discount_until," +
        "is_enable, is_po, new_to_date, stock," +
        "weight, length, width, height , capital_price , po_notes , is_custome_order , is_custome_photo, is_custome_color , score) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21 , $22 , $23 , $24 , $25 , $26 , $27) " +
        "RETURNING id;";

      const variables = [
        product.name + "(duplicate)",
        product.merchant,
        product.sku + "-" + Math.random() * 1000 + "",
        product.slug + "-" + Math.random() * 1000 + "",
        product.shortDescription,
        product.longDescription,
        product.shipmentDescription,
        product.price,
        product.merchantPrice,
        product.merchantDiscount,
        product.merchantDiscountUntil,
        product.kadoquDiscount,
        product.kadoquDiscountUntil,
        false,
        product.isPo,
        null,
        product.stock,
        product.weight,
        product.length,
        product.width,
        product.height,
        product.capitalPrice,
        "",
        false,
        false,
        false,
        product.score
      ];

      return db
        .one(sql, variables)
        .then(clone => {
          if (clone.id) {
            product.photos.forEach(photoUrl => {
              db.none(
                "insert into photos (product_id , url ) values($1 , $2)",
                [
                  clone.id,
                  `https://ik.imagekit.io/nwiq66cx3pvsy${photoUrl.url}`
                ]
              );
            });
            product.categories.forEach(categories => {
              db.none(
                "insert into product_gift_categories (name , product_id) values($1 , $2)",
                [categories.name, clone.id]
              );
            });
            product.storeCategories.forEach(store => {
              db.none(
                "insert into product_store_categories (name , product_id) values($1 , $2)",
                [store.name, clone.id]
              );
            });
            product.colors.forEach(color => {
              db.none(
                "insert into product_colors (name , product_id) values($1 , $2)",
                [color.name, clone.id]
              );
            });
            product.holidayCategories.forEach(holidayCategories => {
              db.none(
                "insert into product_holiday_categories (name , product_id)  values($1 , $2)",
                [holidayCategories.name, clone.id]
              );
            });
            product.shippingSupports.forEach(shippingSupports => {
              db.none(
                "insert into product_shipping_supports (name , product_id) values($1 , $2)",
                [shippingSupports.name, clone.id]
              );
            });
            return clone.id;
          }
        })
        .catch(e => new Error(e.message));
    },
    addProduct: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Admin Auth only");
      }
      return db
        .one(
          "select merchant_level from admins where id = $1 ",
          context.user.data
        )
        .then(e => {
          let tax = e.merchant_level;
          let role = context.user.role;
          const merchant = input.merchant || context.user.name;
          const merchantCode = input.merchantCode || context.user.code;
          return db
            .oneOrNone(
              "SELECT id FROM products where name = $1 AND merchant = $2",
              [input.name.trim(), merchant]
            )
            .then(response => {
              if (response) return new Error("Product name already exists!");

              const sql =
                "INSERT INTO products " +
                "(name, merchant, sku, slug, " +
                "short_description, long_description, shipment_description, " +
                "price, merchant_price, merchant_discount, merchant_discount_until, kadoqu_discount, kadoqu_discount_until, " +
                "is_enable, is_po, new_to_date, stock, " +
                "weight, length, width, height, capital_price, po_notes, is_custome_order, is_custome_photo, is_custome_color, min_qty, multiple_qty, is_digital) " +
                "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29) " +
                "RETURNING id;";

              const slug =
                merchantCode.toLowerCase() +
                "-" +
                input.name
                  .trim()
                  .toLowerCase()
                  .replace(/[^a-zA-Z\d\s]/g, "")
                  .replace(/[\s]+/g, "-");

              const price = input.price ? input.price : input.merchantPrice;
              let capitalPriceFromAdmin = input.capitalPrice;
              let merchantDiscount,
                kadoquDiscount,
                capitalPrice = 0,
                merchantDiscountUntil,
                kadoquDiscountUntil;
              let capitalPriceTax = tax / 100;
              if (input.discountPrice) {
                if (role === "merchant" || input.discountOwner === "merchant") {
                  merchantDiscount = input.discountPrice;
                  merchantDiscountUntil = input.discountUntil;
                  capitalPrice = (1 - capitalPriceTax) * input.discountPrice;
                } else {
                  kadoquDiscount = input.discountPrice;
                  kadoquDiscountUntil = input.discountUntil;
                }
              }
              if (capitalPriceFromAdmin > 0) {
                capitalPrice = capitalPriceFromAdmin;
              } else {
                capitalPrice = (1 - capitalPriceTax) * input.merchantPrice;
              }
              return Promise.resolve(generateSKU(merchantCode)).then(sku =>
                db
                  .one(sql, [
                    input.name.trim(),
                    merchant,
                    sku,
                    slug,

                    input.shortDescription,
                    input.longDescription,
                    input.shipmentDescription,

                    price,
                    input.merchantPrice,
                    merchantDiscount,
                    merchantDiscountUntil,
                    kadoquDiscount,
                    kadoquDiscountUntil,

                    input.isEnable || false,
                    input.isPo,
                    input.newToDate,
                    input.stock,

                    input.weight,
                    input.length,
                    input.width,
                    input.height,
                    capitalPrice,
                    input.poNotes,
                    input.isCustomeOrder,
                    input.isCustomePhoto,
                    input.isCustomeColor,
                    input.minQty,
                    input.multipleQty,
                    input.isDigital
                  ])
                  .then(res => {
                    // db.any("select * from products where id = $1", [res.id])
                    //   .then((data) => {
                    //     data = data.map(fieldNameMapper);
                    //     let initialBulk = { index: { _index: "products" } };
                    //     let collectionBulk = [];
                    //     lodash.map(lodash.keys(data), uuid => {
                    //       collectionBulk = [
                    //         ...collectionBulk,
                    //         initialBulk,
                    //         data[uuid]
                    //       ];
                    //     });
                    //     client.bulk({ body: collectionBulk }, function(err, r) {
                    //       if (err) {
                    //         throw  new Error(err.message);
                    //       } else {
                    //         return "sukses brader";
                    //       }
                    //     });
                    //
                    //   });
                    return res.id;
                  })
                  .catch(res => new Error(res.message))
              );
            })
            .catch(e => new Error(e.message));
        });
    },
    setDiscount: (_, { discount1, discount2 = 0, discountUntil }) => {
      const disc1 = parseFloat(discount1) / 100;
      const disc2 = parseFloat(discount2) / 100;
      const equation =
        disc2 === 0
          ? "(merchant_price)*(1-$1)"
          : "((merchant_price)*(1-$1))*(1-$2)";
      const arrDiscount =
        disc2 === 0 ? [disc1, discountUntil] : [disc1, disc2, discountUntil];
      const until = disc2 === 0 ? "$2" : "$3";
      return db
        .none(
          `UPDATE products p SET kadoqu_discount=${equation},kadoqu_discount_until =${until}
          WHERE p.merchant!='K2U Party Designer' AND p.merchant!='kadoquMagicMoment' AND NOT EXISTS (
            SELECT 1
            FROM product_holiday_categories phc
            WHERE p.id = phc.product_id)`,
          arrDiscount
        )
        .then(() => {
          return true;
        })
        .catch(error => new Error(error.message));
    },
    setDiscountHoliday: (_, { discount1, discount2 = 0, discountUntil }) => {
      const disc1 = parseFloat(discount1) / 100;
      const disc2 = parseFloat(discount2) / 100;
      const equation =
        disc2 === 0
          ? "(merchant_price)*(1-$1)"
          : "((merchant_price)*(1-$1))*(1-$2)";
      const arrDiscount =
        disc2 === 0 ? [disc1, discountUntil] : [disc1, disc2, discountUntil];
      const until = disc2 === 0 ? "$2" : "$3";
      return db
        .none(
          `UPDATE products p SET kadoqu_discount=${equation},kadoqu_discount_until =${until}
          WHERE EXISTS (
            SELECT 1
            FROM product_holiday_categories phc
            WHERE p.id = phc.product_id)`,
          arrDiscount
        )
        .then(() => {
          return true;
        })
        .catch(error => new Error(error.message));
    },

    setDiscountMM: (_, { discount1, discount2 = 0, discountUntil }) => {
      const disc1 = parseFloat(discount1) / 100;
      const disc2 = parseFloat(discount2) / 100;
      const equation =
        disc2 === 0
          ? "(merchant_price)*(1-$1)"
          : "((merchant_price)*(1-$1))*(1-$2)";
      const arrDiscount =
        disc2 === 0 ? [disc1, discountUntil] : [disc1, disc2, discountUntil];
      const until = disc2 === 0 ? "$2" : "$3";
      return db
        .none(
          `UPDATE products p SET kadoqu_discount=${equation},kadoqu_discount_until =${until}
          WHERE p.merchant='K2U Party Designer' AND p.merchant='kadoquMagicMoment' AND  NOT EXISTS (
            SELECT 1
            FROM product_holiday_categories phc
            WHERE p.id = phc.product_id)`,
          arrDiscount
        )
        .then(() => {
          return true;
        })
        .catch(error => new Error(error.message));
    },
    deleteProduct: (_, { id }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only!");
      }
      // ELasticSearchDelete({
      //   "query": {
      //     "match": {
      //       "id": id
      //     }
      //   }
      // });
      const sql = "DELETE FROM products WHERE id = $1 RETURNING *; ";
      if (context.user.role !== "admin") {
        return db
          .one("SELECT merchant FROM products WHERE id = $1", [id])
          .then(res => {
            if (res.merchant !== context.user.name) {
              throw new Error("Bad request");
            }
            return db
              .one(sql, [id])
              .then(e => {
                let sql = db.one("select id from admins where name = $1", [
                  res.merchant
                ]);
                sql.then(id => {
                  db.none(
                    "delete from product_reviews where product_id = $1  and merchant_id = $2",
                    [e.id, id.id]
                  );
                });
                return "Success";
              })
              .catch(error => new Error(error.message));
          })
          .catch(error => new Error(error.message));
      }
      return db
        .one(sql, [id])
        .then(e => {
          let sql = db.one("select id from admins where name = $1", [
            e.merchant
          ]);
          sql.then(id => {
            db.none(
              "delete from product_reviews where product_id = $1  and merchant_id = $2",
              [e.id, id.id]
            );
          });
          return "Success";
        })
        .catch(res => new Error(res.message));
    },
    editProduct: (_, { id, edits }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only!");
      }
      return db
        .one(
          "select merchant_level from admins where id = $1 ",
          context.user.data
        )
        .then(e => {
          let merchantLevelTax = e.merchant_level;
          if (Object.getOwnPropertyNames(edits).length === 0) {
            return;
          }
          let promises = [];
          if (edits.name) {
            promises.push(
              db
                .oneOrNone(
                  "SELECT id FROM products where name = $1 AND merchant = $2",
                  [edits.name.trim(), context.user.name]
                )
                .then(response => {
                  if (response) throw new Error("Product name already exists!");
                })
            );
          }
          return Promise.all(promises)
            .then(() => {
              let variables = [];
              let assignments = [];
              let role = context.user.role;
              const merchantCode =
                edits.merchantCode ||
                context.user.code ||
                (role === "admin" && "KDQ");
              // capital price changed if role merchant
              // if (context.user.role === "merchant" && edits.merchantPrice) {
              //   assignments.push(`capital_price = ${(1 - merchantLevelTax / 100) * edits.merchantPrice}`);
              //   assignments.push(`price = ${edits.merchantPrice}`);
              // }
              if (role === "merchant") {
                assignments.push(`is_enable = false`);
              }
              Object.entries(edits).forEach(([key, edit]) => {
                if (key.toLowerCase() === key) {
                  if (key === "name") edit = edit.trim();
                  assignments.push(`${key} = $${variables.push(edit)}`);
                  return;
                }
                switch (key) {
                  case "merchantPrice":
                    assignments.push(
                      `merchant_price = $${variables.push(edit)}`
                    );
                    if (role === "merchant") {
                      assignments.push(`price = $${variables.push(edit)}`);
                      assignments.push(
                        `capital_price = $${variables.push(
                          (1 - merchantLevelTax / 100) * edit
                        )}`
                      );
                    }
                    // assignments.push(`capital_price = ${(1 - merchantLevelTax / 100) * edit}`);
                    break;
                  case "price":
                    if (role === "admin") {
                      assignments.push(`price = $${variables.push(edit)}`);
                    }
                    break;
                  case "capitalPrice":
                    if (role === "admin") {
                      assignments.push(
                        `capital_price = $${variables.push(edit)}`
                      );
                    }
                    break;
                  case "isEnable":
                    if (role === "admin") {
                      assignments.push(`is_enable = $${variables.push(edit)}`);
                    }
                    break;
                  case "shortDescription":
                  case "longDescription":
                  case "shipmentDescription":
                  case "isPo":
                  case "isCustomeOrder":
                  case "isCustomePhoto":
                  case "isCustomeColor":
                  case "poNotes":
                  case "newToDate":
                  case "minQty":
                  case "multipleQty":
                  case "isDigital":
                    const underscoredField = key
                      .split(/(?=[A-Z])/)
                      .join("_")
                      .toLowerCase();
                    assignments.push(
                      `${underscoredField} = $${variables.push(edit)}`
                    );
                    break;
                  case "discountPrice":
                    assignments.push(
                      `merchant_discount = $${variables.push(edit)}`
                    );
                    break;
                  case "discountUntil":
                    assignments.push(
                      `merchant_discount_until = $${variables.push(edit)}`
                    );
                    break;
                  case "kadoquDiscountPrice":
                    assignments.push(
                      `kadoqu_discount = $${variables.push(edit)}`
                    );
                    break;
                  case "kadoquDiscountUntil":
                    assignments.push(
                      `kadoqu_discount_until = $${variables.push(edit)}`
                    );
                    break;
                  default:
                    break;
                }
              });
              if (edits.name) {
                assignments.push(
                  `slug = $${variables.push(
                    merchantCode.toLowerCase() +
                      "-" +
                      edits.name
                        .trim()
                        .toLowerCase()
                        .replace(/[^a-zA-Z\d\s]/g, "")
                        .replace(/[\s]+/g, "-")
                  )}`
                );
              }
              if (role !== "admin") {
                const sql = [
                  "UPDATE products SET",
                  assignments.join(", "),
                  `WHERE id = $${variables.push(id)}`
                ].join(" ");

                return db
                  .one("SELECT merchant FROM products WHERE id = $1", [id])
                  .then(res => {
                    if (res.merchant !== context.user.name) {
                      throw new Error("Bad request");
                    }
                    return db
                      .none(sql, variables)
                      .then(() => {
                        return "Success";
                        // ELasticSearchDelete({
                        //   "query": {
                        //     "match": {
                        //       "id": id
                        //     }
                        //   }
                        // });
                        // return db.any("select * from products where id = $1", [id])
                        //   .then((data) => {
                        //     data = data.map(fieldNameMapper);
                        //     let initialBulk = { index: { _index: "products" } };
                        //     let collectionBulk = [];
                        //     lodash.map(lodash.keys(data), uuid => {
                        //       collectionBulk = [
                        //         ...collectionBulk,
                        //         initialBulk,
                        //         data[uuid]
                        //       ];
                        //     });
                        //     client.bulk({ body: collectionBulk }, function(err, r) {
                        //       if (err) {
                        //         throw  new Error(err.message);
                        //       } else {
                        //         return "sukses brader";
                        //       }
                        //     });
                        //     return "Success";
                        //   });
                      })
                      .catch(res => new Error(res.message));
                  })
                  .catch(error => new Error(error.message));
              }
              if (!edits.isUpdateSku) {
                const sql = [
                  "UPDATE products SET",
                  assignments.join(", "),
                  `WHERE id = $${variables.push(id)}`
                ].join(" ");
                return db
                  .none(sql, variables)
                  .then(() => {
                    return "Success";
                    // ELasticSearchDelete({
                    //   "query": {
                    //     "match": {
                    //       "id": id
                    //     }
                    //   }
                    // });
                    // return db.any("select * from products where id = $1", [id])
                    //   .then((data) => {
                    //     data = data.map(fieldNameMapper);
                    //     let initialBulk = { index: { _index: "products" } };
                    //     let collectionBulk = [];
                    //     lodash.map(lodash.keys(data), uuid => {
                    //       collectionBulk = [
                    //         ...collectionBulk,
                    //         initialBulk,
                    //         data[uuid]
                    //       ];
                    //     });
                    //     client.bulk({ body: collectionBulk }, function(err, r) {
                    //       if (err) {
                    //         throw  new Error(err.message);
                    //       } else {
                    //         return "sukses brader";
                    //       }
                    //     });
                    //     return "Success";
                    //   });
                  })
                  .catch(res => new Error(res.message));
              }
              return Promise.resolve(generateSKU(edits.merchantCode))
                .then(newSku => {
                  assignments.push(`sku = $${variables.push(newSku)}`);
                  const sql = [
                    "UPDATE products SET",
                    assignments.join(", "),
                    `WHERE id = $${variables.push(id)}`
                  ].join(" ");
                  return db
                    .none(sql, variables)
                    .then(() => {
                      return "Success";
                      // ELasticSearchDelete({
                      //   "query": {
                      //     "match": {
                      //       "id": id
                      //     }
                      //   }
                      // });
                      // return db.any("select * from products where id = $1", [id])
                      //   .then((data) => {
                      //     data = data.map(fieldNameMapper);
                      //     let initialBulk = { index: { _index: "products" } };
                      //     let collectionBulk = [];
                      //     lodash.map(lodash.keys(data), uuid => {
                      //       collectionBulk = [
                      //         ...collectionBulk,
                      //         initialBulk,
                      //         data[uuid]
                      //       ];
                      //     });
                      //     client.bulk({ body: collectionBulk }, function(err, r) {
                      //       if (err) {
                      //         throw  new Error(err.message);
                      //       } else {
                      //         return "sukses brader";
                      //       }
                      //     });
                      //     return "Success";
                      //   });
                    })
                    .catch(res => new Error(res.message));
                })
                .catch(res => new Error(res.message));
            })
            .catch(e => new Error(e.message));
        });
    },
    addProductByCSV: (_, { input, tax = 0.2 }, context) => {
      if (!context.user && !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      const role = context.user.role;
      let { sku, discountPrice, ...data } = input;
      data["merchant"] =
        role === "merchant" ? context.user.name : input.merchant;
      data["slug"] = input.name
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]/g, "")
        .replace(/[\s]+/g, "-");
      data["price"] = input.price || (1 + tax) * input.merchantPrice;
      if (role === "merchant") {
        data["merchantDiscount"] = input.discountPrice[0] || null;
      } else {
        data["kadoquDiscount"] = input.discountPrice[0] || null;
      }
      let fields = [];
      let values = [];
      Object.keys(data).forEach(key => {
        if (key !== "giftCategoryId" && key !== "storeCategoryId") {
          fields.push(
            key === key.toLowerCase()
              ? key
              : key
                  .split(/(?=[A-Z])/)
                  .join("_")
                  .toLowerCase()
          );
          values.push(`$(${key})`);
        }
      });
      let merchantCode;

      const insertProductPromise = (merchantCode, fields, values, data) =>
        Promise.resolve(generateSKU(merchantCode)).then(sku => {
          data["sku"] = sku;
          fields.push("sku");
          values.push(`$(sku)`);
          return db
            .one(
              [
                "INSERT INTO products",
                `(${fields.join(", ")})`,
                "VALUES",
                `(${values.join(", ")})`,
                "RETURNING id"
              ].join(" "),
              data
            )
            .then(res => {
              const { data, role } = context.user;

              if (role !== "admin") {
                db.one(
                  "insert into product_reviews (merchant_id , product_id) values($1,$2) RETURNING id;",
                  [data, res.id]
                );
              }
              input.storeCategoryId.forEach(item => {
                db.none(
                  "insert into product_store_categories ( product_id ,name) values($1 ,$2 )",
                  [res.id, item]
                );
              });
              input.giftCategoryId.forEach(item => {
                db.none(
                  "insert into product_gift_categories ( product_id ,name) values($1 ,$2 )",
                  [res.id, item]
                );
              });
              return res.id;
            });
        });
      return db
        .one("SELECT merchant_code AS code FROM admins WHERE name = $1", [
          role === "merchant" ? context.user.name : data.merchant
        ])
        .then(res => {
          merchantCode = res.code;
          return insertProductPromise(merchantCode, fields, values, data);
        })
        .catch(error => {
          if (error.code === 0) {
            merchantCode = input.sku.substr(2, 3);
            return insertProductPromise(merchantCode, fields, values, data);
          }
          throw new Error(error.message || error);
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
