const _ = require("lodash");
const lodash = require("lodash");
const client = require("../server.client");
const {
  ElasticSearchClient,
  ELasticSearchDelete,
  ElasticSearchDeleteAllDocuments
} = require("../server.elasticsearch");
const elasticSearchSchema = require("../server.es.schema");
const { db } = require("../db");
const typeDefs = `

  type SearchProduct {
    id:String
    name: String
    merchant:String
    isEnable:Boolean
    storeCategories:[JSON]
    categories:[JSON]
    holidayCategories:[JSON]
    merchantData:JSON
    merchantLevel:Int
    price:Float
  }

    input SearchInput{
      productName: String
      storeCategories: [String]
      categories: [String]
      holidayCategories:[String]
      price: [Int]
      merchant: [String]
      sortByNameDesc:Boolean
      sortByPriceDesc:Boolean
      from:Int
      others : [String]

    }

  extend type Query {
    products: [SearchProduct]
    searchProducts(filter:SearchInput):PaginatedProducts
    searchHolidayProducts(filter:SearchInput):PaginatedProducts
    searchProductHeader(query:String):[SearchProduct]
  }
  extend type Mutation {
   exportDocument:String
   deleteDocument(id:String):String
   deleteAllDocument:String
   addDocument(data:[JSON]):Boolean
   addAllDocument(data:[JSON]):Boolean
  }

`;

const fieldNameMapper = product => ({
    id: product.id,
    name: product.name,
    merchant: product.merchant,
    price: product.price,
    slug: product.slug,
    merchantLevel: product.merchantData.merchantLevel,
    merchantData: product.merchantData,
    isEnable: product.is_enable,
    createdAt: product.created_at,
    isPo: product.is_po
  })
;

const productNameMapper = product => ({
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

const resolvers = {
  Mutation: {
    deleteAllDocument: () => {
      return new Promise(resolve => {
        ElasticSearchDeleteAllDocuments().then(res => {
          resolve("all documents deleted");
        });
      });
    },
    addAllDocument: (_, { data }) => {
      data = data.filter(item => item.isEnable === true);
      return new Promise(resolve => {
        let initialBulk = { index: { _index: "products" } };
        let collectionBulk = [];
        lodash.map(lodash.keys(data), uuid => {
          collectionBulk = [...collectionBulk, initialBulk, data[uuid]];
        });
        client.bulk({ body: collectionBulk }, function(err, r) {
          if (err) {
            console.log(err.message);
            return new Error(err.message);
          } else {
            return "sukses brader";
          }
        });
        resolve(true);
      });
    },
    addDocument: (_, { data }) => {
      return new Promise(resolve => {
        let initialBulk = { index: { _index: "products" } };
        let collectionBulk = [];
        lodash.map(lodash.keys(data), uuid => {
          collectionBulk = [...collectionBulk, initialBulk, data[uuid]];
        });

        client.bulk({ body: collectionBulk }, function(err, r) {
          if (err) {
            console.log(err.message);
            return new Error(err.message);
          } else {
            return "sukses brader";
          }
        });
        resolve(true);
      });
    },
    exportDocument: () => {
      return db
        .any("select * from products where is_enable = true")
        .then(data => {
          // console.log(data);
          data = data.map(fieldNameMapper);
          let initialBulk = { index: { _index: "products" } };
          let collectionBulk = [];
          _.map(_.keys(data), uuid => {
            collectionBulk = [...collectionBulk, initialBulk, data[uuid]];
          });
          client.bulk({ body: collectionBulk }, function(err, r) {
            if (err) {
              console.log(err.message);
              return new Error(err.message);
            } else {
              return "sukses brader";
            }
          });
          return "succses brader";
        });
    },
    deleteDocument: (_, { id }) => {
      return new Promise(resolve => {
        ELasticSearchDelete({
          query: {
            match: {
              id: id
            }
          }
        }).then(res => {
          if (res.total == 1) {
            resolve(`document by id ${id} deleted`);
          }
          resolve("nothing deleted");
        });
      });
    }
  },
  // "query": {
  //   "bool": {
  //     "must": {
  //       "match_all": {}
  //     },
  //     "must": {
  //       "exists": {
  //         "field": "holidayCategories"
  //       }
  //     },
  //     "filter": [
  //       {
  //         "multi_match": {
  //           "query": true,
  //           "fields": ["isEnable"]
  //         }
  //       }
  //     ]
  //   }
  // }
  // "multi_match": {
  //   "query": query,
  //   "fields": ["name", "merchant"],
  //   "fuzziness": "AUTO"
  // }
  Query: {
    searchProductHeader: (_, { query }) => {
      let searchBody = {
        size: 100,
        from: 0,
        query: {
          bool: {
            must: {
              match_all: {}
            },
            filter: [
              {
                multi_match: {
                  query: query,
                  fields: ["name"],
                  fuzziness: "AUTO"
                }
              }
            ]
          }
        }
      };
      return new Promise(resolve => {
        ElasticSearchClient(searchBody)
          .then(r => {
            let _source = r["hits"]["hits"];
            _source.map((item, i) => (_source[i] = item._source));
            resolve(_source);
          })
          .catch(e => new Error(e.message || e));
      });
    },
    products: () =>
      new Promise((resolve, reject) => {
        ElasticSearchClient({ ...elasticSearchSchema })
          .then(r => {
            let _source = r["hits"]["hits"];
            _source.map((item, i) => (_source[i] = item._source));
            resolve(_source.map(fieldNameMapper));
          })
          .catch(e => new Error(e.message || e));
      }),
    // "must_not": {
    //   "exists": {
    //     "field": "holidayCategories"
    //   }
    // },
    searchHolidayProducts: (_, { filter }) => {
      let searchBody = {
        size: 12,
        from: filter.from * 12 || 0,
        query: {
          bool: {
            must: {
              match_all: {}
            },
            must: {
              exists: {
                field: "holidayCategories"
              }
            },
            filter: []
          }
        },
        sort: []
      };
      Object.entries(filter).forEach(([key, value]) => {
        switch (key) {
          case "productName":
            let nameFilter = {
              multi_match: {
                query: value,
                fields: ["name"]
              }
            };
            searchBody.query.bool.filter.push(nameFilter);
            break;
          case "price":
            if (value.length > 0) {
              let priceFilter = {
                range: {
                  price: {
                    gte: value[0],
                    lte: value[1]
                  }
                }
              };
              searchBody.query.bool.filter.push(priceFilter);
            }
            break;
          case "others":
            if (value.length > 0) {
              let others = {
                multi_match: {
                  query: value.join(),
                  fields: ["name"],
                  fuzziness: "AUTO"
                }
              };
              searchBody.query.bool.filter.push(others);
            }
            break;
          case "merchant":
            if (value.length > 0) {
              let merchant = {
                multi_match: {
                  query: value.join(" "),
                  operator: "OR",
                  fields: [key],
                  fuzziness: "AUTO"
                }
              };
              searchBody.query.bool.filter.push(merchant);
            }
            break;
          case "sortByNameDesc":
            let nameSort = {};
            if (value === false) {
              nameSort = { name: "desc" };
            } else {
              nameSort = { name: "asc" };
            }
            searchBody.sort.push(nameSort);
            break;
          case "sortByPriceDesc":
            let priceSort = {};
            if (value === true) {
              priceSort = { price: "desc" };
            } else {
              priceSort = { price: "asc" };
            }
            searchBody.sort.push(priceSort);
            break;
          default:
            if (value.length > 0) {
              let filter = {
                multi_match: {
                  query: value.join(" "),
                  operator: "OR",
                  fields: [`${key}.name`]
                }
              };
              searchBody.query.bool.filter.push(filter);
            }
            break;
        }
      });
      return new Promise(resolve => {
        ElasticSearchClient(searchBody)
          .then(r => {
            let _source = r["hits"]["hits"];
            _source.map((item, i) => (_source[i] = item._source));
            let resultsId = _source.map(item => item.id);
            if (resultsId.length > 0) {
              let length = resultsId.length;
              let resultIdStringArray = [];
              resultsId.forEach(item => {
                resultIdStringArray.push("'" + item + "'");
              });
              let sql = `select * from products where id  in ( ${resultIdStringArray.join(
                ","
              )}  ) `;
              db.manyOrNone(sql).then(item => {
                resolve({
                  length: length,
                  products: item.map(productNameMapper)
                });
              });
            } else {
              resolve({
                length: 0,
                products: []
              });
            }
          })
          .catch(e => new Error(e.message || e));
      });
    },
    searchProducts: (_, { filter }) => {
      let searchBody = {
        size: 12,
        from: filter.from * 12 || 0,
        query: {
          bool: {
            must: {
              match_all: {}
            },
            must_not: {
              exists: {
                field: "holidayCategories"
              }
            },
            filter: []
          }
        },
        sort: []
      };
      Object.entries(filter).forEach(([key, value]) => {
        switch (key) {
          case "productName":
            let regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
            let nameFilter = {
              multi_match: {
                query: value.replace(regex, ""),
                fields: ["name"]
              }
            };
            searchBody.query.bool.filter.push(nameFilter);
            break;
          case "price":
            if (value.length > 0) {
              let priceFilter = {
                range: {
                  price: {
                    gte: value[0],
                    lte: value[1]
                  }
                }
              };
              searchBody.query.bool.filter.push(priceFilter);
            }
            break;
          case "others":
            if (value.length > 0) {
              let others = {
                multi_match: {
                  query: value.join(),
                  fields: ["name"],
                  fuzziness: "AUTO"
                }
              };
              searchBody.query.bool.filter.push(others);
            }
            break;
          case "merchant":
            if (value.length > 0) {
              let merchant = {
                multi_match: {
                  query: value.join(" "),
                  operator: "OR",
                  fields: [key],
                  fuzziness: "AUTO"
                }
              };
              searchBody.query.bool.filter.push(merchant);
            }
            break;
          case "sortByNameDesc":
            let nameSort = {};
            if (value === false) {
              nameSort = { name: "desc" };
            } else {
              nameSort = { name: "asc" };
            }
            searchBody.sort.push(nameSort);
            break;
          case "sortByPriceDesc":
            let priceSort = {};
            if (value === true) {
              priceSort = { price: "desc" };
            } else {
              priceSort = { price: "asc" };
            }
            searchBody.sort.push(priceSort);
            break;
          default:
            if (value.length > 0) {
              let filter = {
                multi_match: {
                  query: value.join(" "),
                  operator: "OR",
                  fields: [`${key}.name`]
                }
              };
              searchBody.query.bool.filter.push(filter);
            }
            break;
        }
      });
      return new Promise(resolve => {
        ElasticSearchClient(searchBody)
          .then(r => {
            let _source = r["hits"]["hits"];
            _source.map((item, i) => (_source[i] = item._source));
            let resultsId = _source.map(item => item.id);
            if (resultsId.length > 0) {
              let length = resultsId.length;
              let resultIdStringArray = [];
              resultsId.forEach(item => {
                resultIdStringArray.push("'" + item + "'");
              });
              let sql = `select * from products where id  in ( ${resultIdStringArray.join(
                ","
              )}  ) `;
              db.manyOrNone(sql).then(item => {
                resolve({
                  length: item.length,
                  products: item.map(productNameMapper)
                });
              });
            } else {
              resolve({
                length: 0,
                products: []
              });
            }
          })
          .catch(e => new Error(e.message || e));
      });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
