const { db } = require("../db");

const typeDefs = `
  type Rating {
    id: String
    orderId: String
    userId: String
    speedCS: Int
    service: Int
    productQuality: Int
    wrappingQuality: Int
    productSafety: Int
    productSatisfaction : Int
    description: String
    user: User
  }

  type RatingProduct {
    id: String
    orderId: String
    userId: String
    productId : String
    rating: Int
    image: String
    description: String
    user: User
    product: Product
    order: Order
  }

  input RatingInput {
    orderId: String
    speedCS: Int
    service: Int
    productQuality: Int
    wrappingQuality: Int
    productSafety: Int
    productSatisfaction : Int
    description: String
  }

  input RatingProductInput {
    orderId: String
    userId: String
    productId : String
    rating: Int
    image: String
    description: String
  }

  extend type Query {
    getProductRatings :[RatingProduct]
    checkProductRatingByOrderId(orderId: String): Boolean
    getRatings: [Rating]
    getFilteredRatings(filterField: String, filterValue: Int, sort: String): [Rating]
    checkRatingByOrderId(orderId: String): Boolean
    checkRatingProductByOrderId(orderId: String): Boolean
    getFilteredRatingsProduct(filterField: String, filterValue: Int, sort: String): [RatingProduct]
  }

  extend type Mutation {
    addRating(input: RatingInput): Boolean
    deleteRating(id: Int): Boolean
    addRatingProduct(input: RatingProductInput) : Boolean
  }
`;

const fieldNameMapper = rating => ({
  id: rating.id,
  orderId: rating.order_id,
  userId: rating.user_id,
  speedCS: rating.speed_cs,
  service: rating.service,
  productQuality: rating.product_quality,
  wrappingQuality: rating.wrapping_quality,
  productSafety: rating.product_safety,
  productSatisfaction: rating.product_satisfaction,
  description: rating.description
});

const fieldRatingMapper = ratingProduct => ({
  id: ratingProduct.id,
  orderId: ratingProduct.order_id,
  userId: ratingProduct.user_id,
  productId: ratingProduct.product_id,
  rating: ratingProduct.rating,
  image: ratingProduct.image,
  description: ratingProduct.description
});

const resolvers = {
  Query: {
    getProductRatings: () =>
    db
      .any("SELECT * FROM rating_products")
      .then(ratingProduct => ratingProduct.map(fieldRatingMapper))
    ,
    getFilteredRatingsProduct: (
      _,
      { filterField, filterValue, sort = "ASC" },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let securedField;
      switch (filterField) {
        case "order_id":
        case "user_id":
        case "product_id":
        case "rating":
        case "image":
        case "description":
          securedField = filterField;
          break;
        default:
          break;
      }
      let securedSort;
      switch (sort.toUpperCase()) {
        case "ASC":
        case "DESC":
          securedSort = sort.toUpperCase();
          break;
        default:
          break;
      }
      return db
        .any(
          "SELECT * FROM rating_products" +
            (securedField ? ` WHERE ${securedField} = $1` : "") +
            ` ORDER BY created_at ${securedSort}`,
          [filterValue]
        )
        .then(ratings => ratings.map(fieldRatingMapper));
    },
    checkRatingProductByOrderId: (_, { orderId }) =>
    db
      .one("SELECT * FROM rating_products WHERE order_id = $1", [orderId])
      .then(() => true)
      .catch(e => false)
,
    getRatings: () =>
      db
        .any("SELECT * FROM ratings")
        .then(ratings => ratings.map(fieldNameMapper)),
    getFilteredRatings: (
      _,
      { filterField, filterValue, sort = "ASC" },
      context
    ) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Unauthorized access");
      }
      let securedField;
      switch (filterField) {
        case "speed_cs":
        case "service":
        case "product_quality":
        case "wrapping_quality":
        case "product_safety":
        case "product_satisfaction":
          securedField = filterField;
          break;
        default:
          break;
      }
      let securedSort;
      switch (sort.toUpperCase()) {
        case "ASC":
        case "DESC":
          securedSort = sort.toUpperCase();
          break;
        default:
          break;
      }
      return db
        .any(
          "SELECT * FROM ratings" +
            (securedField ? ` WHERE ${securedField} = $1` : "") +
            ` ORDER BY created_at ${securedSort}`,
          [filterValue]
        )
        .then(ratings => ratings.map(fieldNameMapper));
    },
    checkRatingByOrderId: (_, { orderId }) =>
      db
        .one("SELECT * FROM ratings WHERE order_id = $1", [orderId])
        .then(() => true)
        .catch(e => false)
  },
  Mutation: {
    addRating: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .none(
          `INSERT INTO ratings (order_id, user_id, speed_cs, service,
            product_quality, wrapping_quality, product_safety, product_satisfaction, description)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            input.orderId,
            context.user.data,
            input.speedCS,
            input.service,
            input.productQuality,
            input.wrappingQuality,
            input.productSafety,
            input.productSatisfaction,
            input.description
          ]
        )
        .then(() => true)
        .catch(e => {
          return new Error(e.message);
        });
    },
    addRatingProduct: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .none(
          `INSERT INTO rating_products (order_id, user_id, product_id, rating, image, description)
              VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            input.orderId,
            context.user.data,
            input.productId,
            input.rating,
            input.image,
            input.description
          ]
        )
        .then(() => true)
        .catch(e => {
          return new Error(e.message);
        });
    },
    deleteRating: (_, { id }) =>
      db
        .none("DELETE FROM ratings WHERE id = $1", [id])
        .then(() => true)
        .catch(e => {
          return new Error(e.message);
        })
  }
};

module.exports = {
  typeDefs,
  resolvers
};
