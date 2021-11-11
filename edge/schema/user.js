const { db } = require("../db"); //before es6 i guess

var jwt = require("jsonwebtoken");
const axios = require("axios");
const { emailVerify } = require("../library/postmark");

require("custom-env").env();
const typeDefs = `
  type User {
    id: String
    phone: String
    email: String
    password:String
    firstName: String
    lastName: String
    fullName: String
    birthDate:String
    isActive : Boolean
    isGoogleSynced:Boolean
    role :String
    addresses: [Address]
    favoriteProducts: [Product]
    googleSyncedData:GoogleSyncedData
    photo: Int
    gender: Int
    createdAt: String
    updatedAt: String
  }
  type Age{
    age:Int
    count:Int
  }
  input UserInput{
    phone : String
    email : String
    password : String
    firstName : String
    lastName : String
  }

  input loginInput{
    email:String
    password:String
    response:String
  }

  input updateEmailInput{
    oldEmail:String
    newEmail:String
    password:String
  }

  input dataDiriInput{
    firstName:String
    lastName:String
    gender:Int
    phone:String
    birthDate:String
  }

  input updatePasswordInput{
    oldPassword:String
    newPassword:String
    confirmationPassword:String
  }


   extend type Mutation{
    register(input:UserInput,  response:String):String
    login(input:loginInput ,  response:String) : String
    changeEmail(input:updateEmailInput) :String
    updateDataDiri(input:dataDiriInput) :String
    changePassword(input:updatePasswordInput) :String
    updatePhotoProfile(id:Int) :String
    generatenewtoken(input:String): String
    forgotPassword(token:String, newPassword:String):Boolean
    generateId(email:String) :JSON
    tokenEmergency(id:String):String
    verifyUser(id:String):Boolean
    reSendEmailVerifikasi(token:String):Boolean
    createVerifyToken(token:String):String
    syncDataWithGoogle(googleId : String , accsesToken:String , userId:String):Boolean
  }

  extend type Query {
    getUsers: [User]
    getUser(id: Int): User
    me: User
    emailChecker(email:String):Boolean
    getEmailUsers(token:String):String
    getWomenCount:Int
    getManCount:Int
    getUnsetGenderCount:Int
    getUsersAgeCount:[Age]
  }
`;

const fieldNameMapper = user => ({
  id: user.id,
  phone: user.phone,
  email: user.email,
  password: user.password,
  firstName: user.first_name,
  isActive: user.is_active,
  lastName: user.last_name,
  fullName: `${user.first_name} ${user.last_name}`,
  birthDate: user.birthdate,
  role: user.role,
  photo: user.photo,
  gender: user.gender,
  isGoogleSynced: user.is_google_sync,
  createdAt: user.created_at,
  updatedAt: user.updated_at
});

const fieldNameAgeMapper = user => ({
  age: user.age,
  count: user.count
});
const resolvers = {
  Order: {
    user: order =>
      db
        .one("SELECT * FROM users WHERE id = $1", [order.userId])
        .then(user => fieldNameMapper(user))
        .catch(error => new Error(error.message || error))
  },
  Rating: {
    user: rating =>
      db
        .one("SELECT * FROM users WHERE id = $1", [rating.userId])
        .then(user => fieldNameMapper(user))
        .catch(error => new Error(error.message || error))
  },
  RatingProduct: {
    user: rating =>
      db
        .one("SELECT * FROM users WHERE id = $1", [rating.userId])
        .then(user => fieldNameMapper(user))
        .catch(error => new Error(error.message || error))
  },
  VoucherUsage: {
    user: voucherUsage =>
      db
        .one("SELECT * FROM users WHERE id = $1", [voucherUsage.userId])
        .then(response => fieldNameMapper(response))
        .catch(e => new Error(e.message))
  },
  Query: {
    me: (parent, args, context) => {
      return db
        .one('SELECT * FROM "users" WHERE "id" = $1', [context.user.data])
        .then(user => fieldNameMapper(user));
    },
    emailChecker: (_, { email }) => {
      return db
        .one("SELECT * FROM users where email = $1", [email])
        .then(() => true)
        .catch(() => false);
    },
    getUsers: () => {
      return db
        .any("SELECT * FROM users")
        .then(users => users.map(fieldNameMapper));
    },
    getEmailUsers: (_, { token }) => {
      let id = jwt.decode(token);

      return db
        .one("SELECT email FROM users where id = $1 ", [id.id])
        .then(res => {
          const { email } = res;
          return email;
        })
        .catch(e => {
          throw new Error(e.message);
        });
    },
    getWomenCount: (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one("SELECT COUNT(id) FROM users WHERE gender=1")
        .then(count => parseInt(count.count));
    },
    getManCount: (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one("SELECT COUNT(id) FROM users WHERE gender=2")
        .then(count => parseInt(count.count));
    },
    getUnsetGenderCount: (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one("SELECT COUNT(id) FROM users WHERE gender=0")
        .then(count => parseInt(count.count));
    },
    getUsersAgeCount: (_, __, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .many(
          "SELECT EXTRACT(YEAR FROM age(now(),birthdate))as age, COUNT(EXTRACT(YEAR FROM age(now(),birthdate))) FROM users WHERE birthdate<'2019-01-01' GROUP BY age ORDER BY count DESC"
        )
        .then(user => user.map(fieldNameAgeMapper));
    }
  },
  Mutation: {
    syncDataWithGoogle: (_, { googleId, accsesToken, userId }) => {
      let url = `https://people.googleapis.com/v1/people/${googleId}?personFields=birthdays%2CemailAddresses%2Cgenders%2CphoneNumbers&key=${process.env.GOOGLE_API_KEY}`;
      axios
        .get(url, {
          headers: { Authorization: `Bearer ${accsesToken}` }
        })
        .then(res => {
          let birthDayJson = "{}";
          let email = res.data.emailAddresses[0].value;
          if (res.data.birthdays) {
            birthDayJson = res.data.birthdays[0].date;
          }
          db.none(
            "insert into google_account_synced (google_id , user_id , brithdays,email) values ($1 , $2 ,$3 , $4)",
            [googleId, userId, birthDayJson, email]
          );
          db.none("update users set is_google_sync = true  where id = $1", [
            userId
          ]);
        });
    },
    createVerifyToken: (_, { token }) => {
      let user = jwt.decode(token);
      if (user) {
        const TOKEN = jwt.sign(
          {
            data: user.data,
            email: user.email,
            phone: user.phone,
            name: user.firstName,
            lastname: user.last_name,
            gender: user.gender,
            birthdate: user.birthdate,
            photo: user.photo,
            isActive: true
          },
          process.env.JSONWEBTOKEN_SECRET,
          { expiresIn: "1d" }
        );
        return TOKEN;
      }
      return "Token Salah";
    },
    reSendEmailVerifikasi: (_, { token }) => {
      let userInfo = jwt.decode(token);
      if (userInfo) {
        emailVerify(userInfo.email, "Verifikasi Akun", userInfo.name, token);
        return true;
      }
      return false;
    },
    verifyUser: (_, { id }) => {
      return db
        .one(`update users set "is_active" = $2 where id =$1  RETURNING * `, [
          id,
          true
        ])
        .then(() => true)
        .catch(() => false);
    },
    register: (_, { input, response }) => {
      return axios
        .get(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${response}`
        )
        .then(res => {
          if (res.data.success === true) {
            return db
              .one(
                `INSERT INTO users ( phone,  email,  password,  first_name,  last_name , "is_active" ) VALUES ($1,$2, crypt($3, gen_salt('bf')),$4,$5 , $6) returning *`,
                [
                  input.phone,
                  input.email,
                  input.password,
                  input.firstName,
                  input.lastName,
                  true
                ]
              )
              .then(user => {
                const TOKEN = jwt.sign(
                  {
                    data: user.id,
                    email: input.email,
                    phone: input.phone,
                    name: input.firstName,
                    lastname: user.last_name,
                    gender: user.gender,
                    birthdate: user.birthdate,
                    photo: user.photo,
                    isActive: false
                  },
                  process.env.JSONWEBTOKEN_SECRET,
                  { expiresIn: "1d" }
                );
                emailVerify(
                  input.email,
                  "Verifikasi Akun",
                  input.firstName,
                  TOKEN
                );
                // console.log(TOKEN);
                return TOKEN;
              });
          }
        });
    },
    login: (_, { input, response }) => {
      return axios
        .get(
          `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${response}`
        )
        .then(res => {
          if (res.data.success) {
            return db
              .one(
                "select * from users where email like $1 and password  like crypt($2, password)",
                [input.email, input.password]
              )
              .then(user => {
                const TOKEN = jwt.sign(
                  {
                    data: user.id,
                    email: user.email,
                    phone: user.phone,
                    name: user.first_name,
                    photo: user.photo,
                    isActive: user.is_active,
                    isSynced: user.is_google_sync
                  },
                  process.env.JSONWEBTOKEN_SECRET,
                  { expiresIn: "1d" }
                );
                return TOKEN;
              })
              .catch(() => new Error("wrong email / password"));
          } else {
            throw new Error("invalid captcha");
          }
        });
    },
    generatenewtoken: (_, { input }, context) => {
      let oldtoken = jwt.decode(input);
      if (context) {
        if (oldtoken.exp * 1000 > new Date()) {
          const TOKEN = jwt.sign(
            {
              data: oldtoken.data,
              email: oldtoken.email,
              phone: oldtoken.phone,
              name: oldtoken.name,
              photo: oldtoken.photo,
              isActive: oldToken.is_active
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        }
      } else {
        throw new Error("Unauthorized access");
      }
    },

    changeEmail: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      } else if (input.oldEmail !== context.user.email) {
        throw new Error("Email lama salah!");
      }
      return db
        .one(
          "SELECT id FROM users WHERE email like $2 and password like crypt($1, password)",
          [input.password, input.oldEmail]
        )
        .then(({ id }) => {
          return db
            .one(
              "UPDATE users SET email = $1,updated_at=now() WHERE id = $2 RETURNING *",
              [input.newEmail, id]
            )
            .then(user => {
              const TOKEN = jwt.sign(
                {
                  data: user.id,
                  email: user.email,
                  phone: user.phone,
                  name: user.first_name,
                  photo: user.photo,
                  isActive: user.is_active
                },
                process.env.JSONWEBTOKEN_SECRET,
                { expiresIn: "1d" }
              );
              return TOKEN;
            })
            .catch(error => new Error(error.message || error));
        })
        .catch(() => new Error("Password salah!"));
    },
    updatePhotoProfile: (_, { id }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      return db
        .one(
          "UPDATE users SET photo=$1,updated_at=now() where id=$2 RETURNING *",
          [id, context.user.data]
        )
        .then(user => {
          const TOKEN = jwt.sign(
            {
              data: user.id,
              email: user.email,
              phone: user.phone,
              name: user.first_name,
              photo: user.photo,
              isActive: user.is_active
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        })
        .catch(error => new Error(error.message || error));
    },
    tokenEmergency: (_, { id }) => {
      return db
        .one("SELECT * FROM users where id=$1", [id])
        .then(user => {
          const TOKEN = jwt.sign(
            {
              data: user.id,
              email: user.email,
              phone: user.phone,
              name: user.first_name,
              photo: user.photo,
              isActive: user.is_active
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        })
        .catch(error => new Error(error.message || error));
    },
    changePassword: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      if (input.confirmationPassword !== input.newPassword) {
        throw new Error("Tulis ulang password salah !");
      }
      return db
        .one(
          "UPDATE users SET password=crypt($3, gen_salt('bf')),updated_at=now() WHERE id = $1 AND password like crypt($2, password) RETURNING *",
          [context.user.data, input.oldPassword, input.newPassword]
        )
        .then(user => {
          const TOKEN = jwt.sign(
            {
              data: user.id,
              email: user.email,
              phone: user.phone,
              name: user.first_name,
              photo: user.photo,
              isActive: user.is_active
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        })
        .catch(() => new Error("Password lama salah!"));
    },
    updateDataDiri: (_, { input }, context) => {
      if (!context.user) {
        throw new Error("Unauthorized access");
      }
      if (input.firstName === "") {
        throw new Error("Nama tidak boleh kosong!");
      }
      if (input.birthDate === "--") {
        throw new Error("Tanggal lahir tidak boleh kosong!");
      }
      if (input.phone === "0" || input.phone.length < 10) {
        throw new Error("Nomor handphone tidak valid!");
      }
      if (input.gender === 0) {
        throw new Error("Jenis kelamin tidak boleh kosong!");
      }
      return db
        .one(
          "UPDATE users SET first_name=$2,last_name=$3,gender=$4,birthdate=$5,phone=$6,updated_at=now() WHERE id = $1 RETURNING *",
          [
            context.user.data,
            input.firstName,
            input.lastName,
            input.gender,
            input.birthDate,
            input.phone
          ]
        )
        .then(user => {
          const TOKEN = jwt.sign(
            {
              data: user.id,
              email: user.email,
              phone: user.phone,
              name: user.first_name,
              photo: user.photo,
              isActive: user.is_active
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1d" }
          );
          return TOKEN;
        })
        .catch(error => new Error(error.message || error));
    },
    forgotPassword: (_, { id, newPassword }) => {
      return db
        .one(
          "UPDATE users SET password=crypt($2, gen_salt('bf')) WHERE id = $1 RETURNING id",
          [id, newPassword]
        )
        .then(() => true)
        .catch(e => {
          throw new Error(e.message);
        });
    },
    generateId: (_, { email }) => {
      return db
        .one("SELECT id,first_name FROM users WHERE email like $1 ", [email])
        .then(user => {
          const IDTOKEN = jwt.sign(
            {
              id: user.id
            },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: "1h" }
          );
          let userinfo = {};
          userinfo.token = IDTOKEN;
          userinfo.nama = user.first_name;

          return userinfo;
        });
    },
    forgotPassword: (_, { token, newPassword }) => {
      let id = jwt.decode(token);

      return db
        .one(
          "UPDATE users SET password=crypt($2, gen_salt('bf')) WHERE id = $1 RETURNING id",
          [id.id, newPassword]
        )
        .then(() => true)
        .catch(e => {
          throw new Error(e.message);
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
