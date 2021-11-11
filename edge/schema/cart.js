const { db } = require("../db");


const typeDefs = `
  type Cart
    {
      id: Int
      userId: String
      cart: JSON
      createdAt:String
      updateAt:String
    }
  extend type Query
  {
    getCart:[Cart]
    getCartFromServer(cart:JSON):JSON
    getCartById(idUser:String):Cart
  }
  extend type Mutation{
    addCart(idUser:String , cart:JSON):Boolean

  }
`
;

const fieldNameMapper = cart => ({
  id: cart.id,
  userId: cart.user_id,
  cart: cart.cart,
  createdAt: cart.created_at,
  updateAt: cart.updated_at
});

const resolvers = {
  Query: {
    getCartFromServer: (_, { cart }) => {

    },
    getCartById: (_, { idUser }) => {
      return db.one("select * from cart where user_id = $1", [idUser])
        .then(res => fieldNameMapper(res))
        .catch(e => {
          console.log(e.message);
        });
    },
    getCart: () => {
      return db.any("select * from cart")
        .then(carts => carts.map(fieldNameMapper))
        .catch(e => {
          console.log(e.message);
        });
    }
  },
  Mutation: {
    addCart: (_, { idUser, cart }) => {
      return db.one("select * from cart where user_id = $1", [idUser])
        .then((res) => {
          return db.one("update cart set cart = $1 where user_id = $2 returning *", [cart, idUser])
            .then(() => true)
            .catch(e => {
              // console.log("ini coy");
              // console.log(e.message);
            });
        })
        .catch((e) => {
          //if here berarti cart blm ada lets make it
          return db.one("insert into cart (user_id , cart) values($1 , $2) returning * ", [idUser, cart])
            .then(() => true)
            .catch(e => {
              // console.log(e.message);
            });
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
