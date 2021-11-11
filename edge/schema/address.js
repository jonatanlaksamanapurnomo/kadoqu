const { db } = require("../db");

const typeDefs = `
  type Address {
    id: Int
    userId: String
    name:String
    phone:String
    street: String
    alias : String
    city: String
    cityId: String
    province: String
    provinceId: String
    subdistrict: String
    subdistrictId: String
    postCode: String
    primaryAddress:Boolean
    createdAt: String
    updatedAt: String
  }

  type City{
    city:String
    province:String
    count:Int
  }

  type Province{
    province:String
    count:Int
  }

  input AddressInput{
    street: String
    name:String
    phone:String
    city: String
    cityId: String
    alias: String
    province: String
    provinceId: String
    subdistrict:String
    subdistrictId:String
    postCode: String
  }

  extend type Mutation{
    addAddress(input:AddressInput): Address
    updateAddress(input:AddressInput,id:Int): Address
    deleteAddress(id:Int): Address
    selectPrimary(id:Int): [Address]
  }

  extend type Query {
    getAddresses: [Address]
    getAddress(id: Int): Address
    getUsersCity(province:String):[City]
    getUsersProvince:[Province]
  }
`;

const fieldNameMapper = address => ({
  id: address.id,
  userId: address.user_id,
  name: address.name,
  phone: address.phone,
  street: address.street,
  alias: address.alias,
  city: address.city,
  cityId: address.city_id,
  primaryAddress: address.primary_address,
  province: address.province,
  provinceId: address.province_id,
  subdistrict: address.subdistrict,
  subdistrictId: address.subdistrict_id,
  postCode: address.post_code,
  createdAt: address.created_at,
  updatedAt: address.updated_at
});

const fieldNameMapperCity = city => ({
  city: city.city,
  province: city.province,
  count: city.count
});

const fieldNameMapperProvince = province => ({
  province: province.province,
  count: province.count
});

const resolvers = {
  User: {
    addresses: (parent, args, context) =>
      db
        .any(
          "SELECT * FROM addresses WHERE user_id = $1 ORDER BY created_at ASC",
          [context.user.data]
        )
        .then(addresses => addresses.map(fieldNameMapper))
  },
  Query: {
    getAddresses: () =>
      db
        .any('SELECT * FROM "addresses"')
        .then(addresses => addresses.map(fieldNameMapper)),
    getAddress: (_, { id }) =>
      db
        .one("SELECT * FROM addresses WHERE id  = $1 ", [id])
        .then(address => fieldNameMapper(address)),
    getUsersCity: (_, { province }, context) => {
      return db
        .many(
          "SELECT city,province,count(city) FROM addresses WHERE province=$1 GROUP BY city,province ORDER BY count DESC limit 5",
          [province]
        )
        .then(cities => cities.map(fieldNameMapperCity));
    },
    getUsersProvince: () => {
      return db
        .many(
          "SELECT province,count(province) FROM addresses GROUP BY province ORDER BY count DESC limit 10"
        )
        .then(provinces => provinces.map(fieldNameMapperProvince));
    }
  },
  Mutation: {
    addAddress: (_, { input }, context) => {
      return db
        .one(
          `
        INSERT INTO addresses ( 
          user_id,
          street,
          alias,
          city,
          city_id,
          province,
          province_id,
          post_code,
          subdistrict,
          subdistrict_id,
          name, 
          phone, 
          primary_address
        ) VALUES (
          '${context.user.data}',
          '${input.street}',
          '${input.alias}',
          '${input.city}',
          '${input.cityId}',
          '${input.province}',
          '${input.provinceId}',
          '${input.postCode}',
          '${input.subdistrict}',
          '${input.subdistrictId}',
          '${input.name}',
          '${input.phone}',
          ${input.primaryAddress ? input.primaryAddress : false}
        ) RETURNING *;
      `
        )
        .then(address => fieldNameMapper(address));
    },
    updateAddress: (_, { input, id }, context) => {
      return db
        .one(
          `
        UPDATE addresses SET 
          street = '${input.street}',
          city = '${input.city}',
          city_id = '${input.cityId}',
          alias = '${input.alias}',
          province = '${input.province}',
          province_id = '${input.provinceId}',
          subdistrict = '${input.subdistrict}',
          subdistrict_id = '${input.subdistrictId}',
          post_code = '${input.postCode}',
          name = '${input.name}',
          phone = '${input.phone}'
        WHERE user_id = '${context.user.data}' and id = ${id}
        RETURNING *;
      `
        )
        .then(address => fieldNameMapper(address));
    },
    deleteAddress: (_, { id }, context) =>
      db
        .one(
          "DELETE FROM  addresses where user_id = $1 and id = $2 RETURNING *; ",
          [context.user.data, id]
        )
        .then(address => fieldNameMapper(address)),
    selectPrimary: (_, { id }, context) =>
      db
        .one(
          `UPDATE addresses set primary_address = false WHERE user_id = '${context.user.data}' AND primary_address = true RETURNING *;`
        )
        .then(oldPrimaryAddress =>
          db
            .one(
              `UPDATE addresses set primary_address = true WHERE id = ${id} RETURNING *;`
            )
            .then(newPrimaryAddress => {
              let addresses = [oldPrimaryAddress, newPrimaryAddress];
              return addresses.map(fieldNameMapper);
            })
        )
        .catch(error => {
          return db
            .one(
              `UPDATE addresses set primary_address = true WHERE id = ${id} RETURNING *;`
            )
            .then(newPrimaryAddress => {
              let addresses = [{}, newPrimaryAddress];
              return addresses.map(fieldNameMapper);
            });
        })
  }
};

module.exports = {
  typeDefs,
  resolvers
};
