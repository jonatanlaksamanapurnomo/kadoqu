const { db } = require("../db");

const typeDefs = `
    type OrderCustome {
        id: String
        orderId: String
        items: [OrderProduct]
        products:JSON
        photos :JSON
        isiUcapan : String
        customerNotes: String
        customeColor:String
        magicalMomentForm:JSON
    }
    input MagicalMomentForm{
      name:String
      perayaan:String
      venueAcara:String
      temaAcara:String
      waktuAcara:Date
      photos:[String]
    }
    extend type Query{
        getAllOrderCustome:[OrderCustome]
    }
    extend type Mutation{
      addOrderCustome(orderId:String , photos:JSON, isiUcapan:String , customerNotes:String , products:JSON , productColor:String , input:MagicalMomentForm):OrderCustome
    }
`;

const fieldNameMapper = OrderCustome => ({
  id: OrderCustome.id,
  orderId: OrderCustome.order_id,
  photos: OrderCustome.photos,
  isiUcapan: OrderCustome.isi_ucapan,
  customerNotes: OrderCustome.notes_dari_customer,
  customeColor: OrderCustome.product_color,
  products: OrderCustome.products,
  magicalMomentForm: OrderCustome.magical_moment_form
});

const resolvers = {
  Order: {
    orderCustome: order => {
      return db.any("select * from order_custome where order_id = $1", [order.id])
        .then(res => res.map(fieldNameMapper));
    }
  },
  Mutation: {
    addOrderCustome: (_, { orderId, photos, isiUcapan, customerNotes = "", products, productColor, input }) => {
      if (input) {
        return db.one("insert into order_custome (magical_moment_form , order_id , photos) values ($1 , $2 , $3) returning *", [input, orderId, photos])
          .then(res => fieldNameMapper(res))
          .catch((err) => {
            console.log(err);
          });
      } else {
        return db.one("insert into order_custome (order_id , photos , isi_ucapan,notes_dari_customer , products , product_color) values ($1,$2,$3,$4 ,$5 , $6) returning * ", [orderId, photos, isiUcapan, customerNotes, products, productColor])
          .then(res => res)
          .catch((e) => new Error(e.message));
      }

    }
  },
  Query: {
    getAllOrderCustome: () => {
      return db.any("select * from  order_custome ")
        .then(e => e.map(fieldNameMapper));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
