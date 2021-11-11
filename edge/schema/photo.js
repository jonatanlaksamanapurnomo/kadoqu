const { db } = require("../db");
const crypto = require("crypto");
const axios = require("axios");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
  type Token {
    hash:String
    timestamp:String
    path:String
  }

  type Photo {
    product_id:String
    caption:String
    url:String
    rank:Int
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getPhotos: [String]
  }

  extend type Mutation {
    addPhoto(productId: String, productName: String, url: String):String
    createUploadToken(filename:String):Token
    deletePhoto(productId: String, url: String): String
    updatePhotoCaption(productId: String, url: String, newCaption: String): String
    deleteReceiptPhoto(url:String):Boolean
    updateRankByUrl(url:String , rank:Int):Boolean
    deletePhotoByUrl(url:String):Boolean
    setRankToZero(productId:String):Boolean
  }
`;

const fieldNameMapper = photo => ({
  product_id: photo.product_id,
  caption: photo.caption,
  url: photo.url,
  rank: photo.rank,
  createdAt: photo.created_at,
  updatedAt: photo.updated_at
});

const resolvers = {
  Product: {
    photos: prodcut =>
      db
        .any(
          "select product_id , caption , substring(url , 37) as \"url\", rank , created_at , updated_at from  \"photos\" where \"product_id\" = $1  ORDER BY rank desc  ",
          [prodcut.id]
        )
        .then(photos => photos.map(fieldNameMapper))
  },
  Query: {
    getPhotos: () =>
      db.any("SELECT url FROM photos").then(photos => {
        let result = [];
        let i = 0;
        const promises = photos.map(photo =>
          axios
            .get(photo.url + "?tr=w-1,h-1")
            .then(() => console.log(`${++i} Success`))
            .catch(e => {
              console.log(`${++i} Error`);
              if (e.response.data === "Not Found") result.push(photo.url);
            })
        );
        return Promise.all(promises)
          .then(() => result)
          .catch(() => result);
      })
  },
  Mutation: {
    setRankToZero: (_, { productId }) => {
      return db.any("update photos set rank = 0 where  product_id = $1 returning *", [productId])
        .then(() => true)
        .catch((e) => {
          console.log(e.message);
        });
    },
    updateRankByUrl: (_, { url, rank }) => {
      let baseUrl = "https://ik.imagekit.io/nwiq66cx3pvsy";
      let fullUrl = baseUrl + url;
      return db.one("update  photos set rank = $1 where url  = $2 returning *", [rank, fullUrl])
        .then(() => true)
        .catch(e => console.log(e.message));
    },
    deletePhotoByUrl: (_, { url }) => {
      let file = url.split(process.env.IMAGEKIT_ID)[1].split("/")[1];
      let imageName = url.split(file + "/")[1];
      let path = `${file}/${imageName}`;
      return imagekit.deleteFile(path).then(() => true).catch((error) => new Error(error.message));
    },
    deleteReceiptPhoto: (_, { url }, context) => {
      if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
        throw new Error("Admin auth only!");
      }
      return imagekit
        .deleteFile(`payment_receipt/${url.split("payment_receipt/")[1]}`)
        .then(() => true);
    },
    addPhoto: (_, { productId, productName, url }) => {
      return db
        .none(
          "INSERT INTO photos (product_id, caption, url) VALUES ($1, $2, $3)",
          [productId, productName, url]
        )
        .then(() => "sukses")
        .catch(res => new Error(res.detail));
    },
    createUploadToken: (_, { filename }, context) => {
      // if (!context.user) {
      //   throw new Error("Admin Auth only");
      // }
      let timestamp = Math.floor(new Date().getTime() / 1000);
      const data = `apiKey=${process.env.IMAGEKIT_API_KEY}&filename=${filename}&timestamp=${timestamp}`;
      const hash = crypto
        .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY)
        .update(data)
        .digest("hex");
      const token = { hash, timestamp };
      return token;
    },
    deletePhoto: (_, { productId, url }, context) => {
      // if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
      //   throw new Error("Admin auth only!");
      // }
      let newUrl = `https://ik.imagekit.io/nwiq66cx3pvsy${url}`;
      const deletePromises = [
        imagekit.deleteFile(`products/${newUrl.split("products/")[1]}`).then(
          function(resp) {
            return resp.success;
          },
          function(err) {
            return new Error(err.message || err);
          }
        ),
        db
          .none("DELETE FROM photos WHERE product_id = $1 AND url = $2", [
            productId,
            newUrl
          ])
          .then(() => true)
          .catch(error => new Error(error.message || error))
      ];
      return Promise.all(deletePromises)
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updatePhotoCaption: (_, { productId, url, newCaption }, context) => {
      // if (!context.user || !["admin", "merchant"].includes(context.user.role)) {
      //   throw new Error("Admin auth only!");
      // }
      return db
        .none(
          "UPDATE photos SET caption = $1 WHERE product_id = $2 AND url = $3",
          [newCaption, productId, url]
        )
        .then(() => "Success")
        .catch(error => new Error(error.message));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
