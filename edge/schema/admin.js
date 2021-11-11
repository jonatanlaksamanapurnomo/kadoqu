const { db } = require("../db");
const jwt = require("jsonwebtoken");

const typeDefs = `
  type Admin {
    id: String
    email: String
    email2: String
    name: String
    code: String
    role: String
    phone: String
    badgePhotoUrl:String
    categoryId:Int
    category:ProductCategories
    merchantLevel: Float
    leagueId:Int
    league:League
    createdAt: String
  }

  input AddAdminInput {
    name: String
    email: String
    password: String
    email2: String
    role: String
    phone: String
    code: String
    merchantLevel: String
    merchantLeagueId:Int
    categoryId:Int
    leagueId:Int
    badge_photo_url: String
  }

  extend type Query {
    getAdmins: [Admin]
    getAdminRoleUsers: [Admin]
    getAdmin(userId: String): Admin
    usernameChecker(username: String): Boolean
    passwordChecker(password: String): Boolean
    adminLogin: Admin
  }

  extend type Mutation {
    adminLogin(email: String, password: String): String
    addAdmin(input: AddAdminInput): String
    editAdmin(userId: String, input: AddAdminInput): String
    deleteAdmin(userId: String): String
    editEmailAdmin(newEmail: String): Boolean
  }
`;

const fieldNameMapper = admin => ({
  id: admin.id,
  name: admin.name,
  code: admin.merchant_code,
  email: admin.email,
  email2: admin.email2,
  role: admin.role,
  phone: admin.phone,
  badgePhotoUrl: admin.badge_photo_url,
  categoryId: admin.category_id,
  leagueId: admin.league_id,
  merchantLevel: admin.merchant_level,
  createdAt: admin.created_at
});

const resolvers = {
  Product: {
    merchantData: product => {
      return db.one("select * from admins where name = $1", [product.merchant])
        .then(admin => fieldNameMapper(admin))
        .catch((e) => {
          //  do nothing
        });
    }
  },
  ProductReview: {
    merchant: productReview => {
      return db
        .one("select * from admins where id = $1", [productReview.merchantId])
        .then(admin => fieldNameMapper(admin));
    }
  },
  MerchantGroupedProductReview: {
    merchant: merchantGroupedProductReview => {
      return db
        .one("select * from admins where id = $1", [
          merchantGroupedProductReview.merchantId
        ])
        .then(admin => fieldNameMapper(admin));
    }
  },
  Query: {
    getAdminRoleUsers: () => {
      return db
        .any(
          "select * from admins where is_special_admin = $1 and name != $2",
          [true, "Andre S"]
        )
        .then(admins => admins.map(fieldNameMapper));
    },
    adminLogin: (parent, args, context) => {
      return db
        .one("SELECT * FROM \"admins\" WHERE \"id\" = $1", [context.user.data])
        .then(admin => fieldNameMapper(admin));
    },
    usernameChecker: (_, { username }) => {
      let emailChecker = db.one("select * from admins where email = $1", [
        username
      ]);
      return emailChecker.then(() => true).catch(() => false);
    },
    passwordChecker: (_, { password }) => {
      let passwordChecker = db.one(
        "select * from admins where password = crypt($1, password)",
        [password]
      );
      return passwordChecker.then(() => true).catch(() => false);
    },
    getAdmins: (_, variables, context) => {
      // if (!context.user || context.user.role !== "admin") {
      //   throw new Error("Admin auth only!");
      // }
      return db
        .any("SELECT * FROM admins")
        .then(admins => {
          return admins.map(fieldNameMapper);
        });
    },
    getAdmin: (_, { userId }, context) => {
      if (!context.user) {
        throw new Error("Admin auth only!");
      }
      return db
        .one("SELECT * FROM admins WHERE id = $1", [userId])
        .then(admin => fieldNameMapper(admin));
    }
  },
  Mutation: {
    editEmailAdmin: (_, { newEmail }, context) => {
      let { data } = context.user;
      return db
        .one("update admins set email2  = $1 where id = $2 returning *", [
          newEmail,
          data
        ])
        .then(() => {
          return true;
        })
        .catch(() => {
          return false;
        });
    },
    adminLogin: (_, { email, password }) => {
      return db
        .one(
          "select * from admins where email = $1 and password = crypt($2, password)",
          [email, password]
        )
        .then(user => {
          const TOKEN = jwt.sign(
            {
              data: user.id,
              name: user.name,
              role: user.role,
              code: user.merchant_code,
              merchantLevelTax: user.merchant_level,
              categoryId: user.category_id,
              leagueId: user.league_id
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        })
        .catch(() => {
          throw new Error("Admin dosent Exist");
        });
    },
    addAdmin: (_, { input }, context) => {
      if (context.user.role !== "admin") {
        throw new Error("Admin Auth only");
      }
      return db
        .one("SELECT * FROM admins WHERE name = $1", [input.name])
        .then(() => {
          return new Error(`User with name ${input.name} already exist!`);
        })
        .catch(() => {
          if (input.role.toLowerCase() === "admin") {
            return db
              .none(
                "INSERT INTO admins (email, password, name, role, phone , email2,  merchant_level , category_id, badge_photo_url,merchant_code, league_id) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, $5 , $6 , $7 , $8 , $9, $10 , $11)",

                [
                  input.email,
                  input.password,
                  input.name,
                  input.role.toLowerCase(),
                  input.phone,
                  input.email2,
                  parseFloat(input.merchantLevel),
                  input.categoryId,
                  input.badge_photo_url,
                  input.code,
                  input.leagueId
                ]
              )
              .then(() => "Success")
              .catch(err => {
                throw new Error(err);
              });
          }
          if (input.code.length !== 3) {
            throw new Error("Merchant code should be 3 letters length!");
          }
          if (input.code === "KDQ") {
            throw new Error("The code KDQ is reserved for Kadoqu.com");
          }
          return db
            .one("SELECT * FROM admins WHERE merchant_code = $1", [input.code])
            .then(res => {
              return new Error(
                `Merchant code ${input.code} has been used under the name of "${res.name}"!`
              );
            })
            .catch(() =>
              db
                .none(
                  "INSERT INTO admins (email, password, name, role, phone , email2,  merchant_level , category_id, badge_photo_url,merchant_code,league_id) VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, $5 , $6 , $7 , $8 , $9, $10,$11)",
                  [
                    input.email,
                    input.password,
                    input.name,
                    input.role.toLowerCase(),
                    input.phone,
                    input.email2,
                    parseFloat(input.merchantLevel),
                    input.categoryId,
                    input.badge_photo_url,
                    input.code,
                    input.leagueId
                  ]
                )
                .then(() => "Success")
                .catch(err => {
                  throw new Error(err);
                })
            );
        });
    },
    editAdmin: (_, { userId, input }) => {


      let change = [],
        variables = [];
      Object.entries(input).forEach(([key, value]) => {
        if (key === "role") return;
        if (value !== "") {
          if (key === "password") {
            change.push(
              `${key} = crypt($${variables.push(value)}, gen_salt('bf'))`
            );
          } else if (key === "code") {
            change.push(`merchant_code = $${variables.push(value)}`);
          } else if (key === "merchantLevel") {
            change.push(
              `merchant_level = $${variables.push(parseFloat(value))}`
            );
          } else if (key === "categoryId") {
            change.push(`category_id = $${variables.push(value)}`);
          } else if (key === "leagueId") {
            change.push(`league_id = $${variables.push(value)}`);
          } else {
            change.push(`${key} = $${variables.push(value)}`);

          }
        }
      });

      const sql =
        "UPDATE admins SET " +
        change.join(", ") +
        ` WHERE id = $${variables.push(userId)}`;
      return db
        .one("SELECT * FROM admins WHERE email = $1 AND NOT id = $2", [
          input.email,
          userId
        ])
        .then(() => {
          return new Error(`User with e-mail ${input.email} already exist!`);
        })
        .catch(() => {
          if (input.role.toLowerCase() === "admin") {
            return db
              .none(sql, variables)
              .then(() => "Success")
              .catch(err => {
                throw new Error(err);
              });
          }
          if (input.code.length !== 3) {
            throw new Error("Merchant code should be 3 letters length!");
          }
          if (input.code === "KDQ") {
            throw new Error("The code KDQ is reserved for Kadoqu.com");
          }
          return db
            .one(
              "SELECT * FROM admins WHERE merchant_code = $1 AND NOT id = $2",
              [input.code, userId]
            )
            .then(res => {
              return new Error(
                `Merchant code ${input.code} has been used under the name of "${res.name}"!`
              );
            })
            .catch(() =>
              db
                .none(sql, variables)
                .then(() => "Success")
                .catch(err => {
                  throw new Error(err);
                })
            );
        });
    },
    deleteAdmin: (_, { userId }, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only!");
      }
      return db
        .one("DELETE FROM admins WHERE id = $1 RETURNING *; ", [userId])
        .then(e => {
          db.none("delete from products where merchant = $1", [e.name]);
          db.none("delete from product_reviews where merchant_id = $1", [e.id]);
          return "sukses";
        })
        .catch(error => new Error(error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
