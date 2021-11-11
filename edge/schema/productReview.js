const { db } = require("../db");

const typeDefs = `
  type ProductReview {
    id: Int
    merchantId: String
    productId: String
    rejectionMessage: String
    product: Product
    merchant: Admin
    isReviewed: Boolean
  }

  type MerchantGroupedProductReview {
    count: Int
    merchantId: String
    merchant: Admin
  }

  extend type Query{
    getAllProductReviews: [ProductReview]
    getUnreadProductReviewsCount: Int
    getProductReviewsGroupedByMerchant: [MerchantGroupedProductReview]
    getProductReviewsByMerchant(merchantId: String): [ProductReview]
    getRejectedProductReviews: [ProductReview]
    getRejectedProductReview(productId: String): ProductReview
  }

  extend type Mutation{
    addProductReview(productId: String): String
    updateProductReview(id: Int, rejectionMessage: String): String
    deleteProductReview(id: Int): String
    setIsReviewStatus(status: Boolean, productId: String): String
  }
`;

const fieldNameMapper = record => ({
  id: record.id,
  merchantId: record.merchant_id,
  productId: record.product_id,
  rejectionMessage: record.rejection_message,
  isReviewed: record.is_reviewed
});

const resolvers = {
  Query: {
    getAllProductReviews: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .any("select * from product_reviews")
        .then(productReviews => {
          return productReviews.map(fieldNameMapper);
        })
        .catch(error => new Error(error.message || error));
    },
    getUnreadProductReviewsCount: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .any("SELECT * FROM product_reviews WHERE rejection_message = ''")
        .then(response => {
          return response.length;
        })
        .catch(error => new Error(error.message || error));
    },
    getProductReviewsGroupedByMerchant: (_, __, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .any(
          "SELECT COUNT(id), merchant_id FROM product_reviews GROUP BY merchant_id ORDER BY count DESC"
        )
        .then(response =>
          response.map(({ count, merchant_id }) => ({
            count: count,
            merchantId: merchant_id
          }))
        )
        .catch(error => new Error(error.message || error));
    },
    getProductReviewsByMerchant: (_, { merchantId }) => {
      return db
        .any(
          "SELECT * FROM product_reviews WHERE merchant_id = $1 ORDER BY rejection_message =  '' DESC",
          [merchantId]
        )
        .then(productReviews => productReviews.map(fieldNameMapper))
        .catch(error => new Error(error.message || error));
    },
    getRejectedProductReviews: (_, __, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      const { data, role } = context.user;
      const isAdmin = role === "admin";
      return db
        .any(
          "SELECT * FROM product_reviews WHERE rejection_message != ''" +
            (isAdmin ? "" : " AND merchant_id = $1"),
          [data]
        )
        .then(productReviews => {
          return productReviews.map(fieldNameMapper);
        })
        .catch(error => new Error(error.message || error));
    },
    getRejectedProductReview: (_, { productId }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only");
      }
      const { data, role } = context.user;
      const isAdmin = role === "admin";
      return db
        .one(
          `select exists (SELECT * FROM product_reviews WHERE   product_id = $1 ${
            isAdmin ? "" : " AND merchant_id = $2"
          })`,
          [productId, data]
        )
        .then(res => {
          if (res.exists === true) {
            return db
              .one(
                "SELECT * FROM product_reviews WHERE  product_id = $1" +
                  (isAdmin ? "" : " AND merchant_id = $2"),
                [productId, data]
              )
              .then(productReview => {
                return fieldNameMapper(productReview);
              })
              .catch(error => new Error(error.message || error));
          } else {
            return db
              .one(
                "INSERT INTO product_reviews (merchant_id, product_id , rejection_message) VALUES ($1, $2 , $3) returning * ;",
                [data, productId, ""]
              )
              .then(productReview => {
                return fieldNameMapper(productReview);
              })
              .catch(error => new Error(error.message || error));
          }
        });
    }
  },
  Mutation: {
    setIsReviewStatus: (_, { status, productId }) => {
      return db
        .none(
          "update product_reviews set is_reviewed  = $1 where product_id = $2",
          [status, productId]
        )
        .then(() => "update sukses")
        .catch(() => {
          throw new Error("Update Gagal");
        });
    },
    addProductReview: (_, { productId }, context) => {
      const { data, role } = context.user;
      if (role === "admin") {
        return true;
      }
      return db
        .any("SELECT id FROM product_reviews WHERE product_id = $1", [
          productId
        ])
        .then(res => {
          if (res.length === 0) {
            return db
              .none(
                "INSERT INTO product_reviews (merchant_id, product_id , rejection_message) VALUES ($1, $2 , $3)",
                [data, productId, ""]
              )
              .then(() => "Success")
              .catch(error => new Error(error.message || error));
          }
          return db
            .none(
              "UPDATE product_reviews SET rejection_message = $2 WHERE id = $1",
              [res[0].id, ""]
            )
            .then(() => "Success")
            .catch(error => new Error(error.message || error));
        })
        .catch(error => new Error(error.message || error));
    },
    updateProductReview: (_, { id, rejectionMessage }, context) => {
      const { role } = context.user;
      if (role !== "admin") {
        throw new Error("Admin only");
      }
      return db
        .none(
          "UPDATE product_reviews SET rejection_message = $2 WHERE id = $1 ",
          [id, rejectionMessage]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteProductReview: (_, { id }, context) => {
      const { role } = context.user;
      if (role !== "admin") {
        throw new Error("Admin only");
      }
      return db
        .none("DELETE FROM product_reviews WHERE id = $1", [id])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
