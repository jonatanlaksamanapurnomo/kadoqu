const {db} = require("../db");
var ImageKit = require("imagekit");

const imagekit = new ImageKit({
  imagekitId: process.env.IMAGEKIT_ID,
  apiKey: process.env.IMAGEKIT_API_KEY,
  apiSecret: process.env.IMAGEKIT_PRIVATE_KEY
});

const typeDefs = `
    type Banner {
      id: Int
      image: String
      rank: Int
      url:String
      location: String
    }

    extend type Query {
      getBanner(location: String): Banner
      getBanners(location: String): [Banner]
    }
    extend type Mutation {
      addBanner(image: String, rank: Int, location: String): String
      updateBannerImage(id: Int, image: String): String
      updateBannerRank(id: Int, rank: Int): String
      deleteBanner(id: Int): String
      setUrlRedirectURL(id:Int,url:String):Boolean
    }
`;

const fieldNameMapper = banner => ({
  id: banner.id,
  image: banner.image,
  rank: banner.rank,
  url: banner.url
});

const resolvers = {
  Query: {
    getBanner: (_, {location}) =>
      db
        .one('SELECT id , substring(image,37) as "image" , rank  , url FROM banners WHERE location = $1 ORDER BY rank ASC limit 1', [location])
        .then(banner => {

          return fieldNameMapper(banner);
        })
        .catch(error => new Error(error.message || error)),
    getBanners: (_, {location}) =>
      db
        .any('SELECT id , substring(image,37) as "image" , rank , url FROM banners WHERE location = $1 ORDER BY rank ASC', [
          location
        ])
        .then(banners => banners.map(fieldNameMapper))
        .catch(error => new Error(error.message || error))
  },
  Mutation: {
    setUrlRedirectURL: (_, {id, url}) => {
      // if (!context.user || context.user.role !== "admin") {
      //   throw new Error("Admin auth only");
      // }
      return db.one("update  banners set url = $1 where id = $2 returning *  ", [url, id])
        .then(() => true)
        .catch((e) => new Error(e.message));
    },
    addBanner: (_, {image, rank}, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("INSERT INTO banners (image, rank) VALUES ($1, $2)", [
          image,
          rank
        ])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateBannerImage: (_, {id, image}, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("UPDATE banners SET image = $2 WHERE id = $1", [id, image])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    updateBannerRank: (_, {id, rank}, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .none("UPDATE banners SET rank = $2 WHERE id = $1", [id, rank])
        .then(() => "Success")
        .catch(error => new Error(error.message || error));
    },
    deleteBanner: (_, {id}, context) => {
      if (!context.user || context.user.role !== "admin") {
        throw new Error("Admin auth only");
      }
      return db
        .one("SELECT image FROM banners WHERE id = $1", [id])
        .then(({image}) =>
          imagekit.deleteFile(`Banners/${image.split("Banners/")[1]}`).then(
            function () {
              return db
                .none("DELETE FROM banners WHERE id = $1", [id])
                .then(() => "Success")
                .catch(error => new Error(error.message || error));
            },
            function (err) {
              throw new Error(err.message || err);
            }
          )
        )
        .catch(error => new Error(error.message || error));
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
