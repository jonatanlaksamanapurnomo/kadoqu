const { db } = require("../db");

const typeDefs = `
    type GidaFeedback{
        id:Int
        username:String
        rating:Int
        description:String
    }
    extend type Mutation{
            addGidaFeedback( rating:Int , kecepatan_cs:Boolean , service:Boolean , kualitas_product:Boolean,kualitas_wrapping:Boolean , keamanan_packing:Boolean , description:String):Boolean
    
    }
`;

const resolvers = {
    Mutation:{
        addGidaFeedback:(_,{rating,kecepatan_cs=false,service=false,kualitas_product=false, kualitas_wrapping=false,keamanan_packing=false ,description} , context)=>{
            return db.none("insert into gida_feedback (username,rating,kecepatan_cs ,service , kualitas_product,kualitas_wrapping, keamanan_packing,description) values ($1,$2,$3,$4,$5,$6,$7,$8)" ,
                [context.user.name,rating,kecepatan_cs,service,kualitas_product,kualitas_wrapping,keamanan_packing,description])
                .then(() => true)
                .catch(() => false);
        }
    }
};

module.exports = {
    typeDefs,resolvers
}