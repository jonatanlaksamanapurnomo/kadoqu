const axios = require("axios");
const { db } = require("../db");
const { getCost, getDivider } = require("../library/rajaOngkir");

const typeDefs = `
type Cost{
  value:Int
  etd:String
}
type Costs{
  service:String
  description:String
  cost:[Cost]
}
type CostResult{
    code:String
    name:String
    costs:[Costs]
}
type province{
  province_id:String
  province:String
}
type city{
  city_id:String
  province_id:String
  province:String
  type:String
  city_name:String
  postal_code:String
}
type subdistrict{
  subdistrict_id:String
  province_id:String
  province:String
  city_id:String
  city:String
  type:String
  subdistrict_name:String
}
extend type Query {
    getProvince: [province]
    getCity(province_id:String):[city]
    getSubdistrict(city:String):[subdistrict]
    getCost(destination:String, weight:Int, courier:String ,length:Float,width:Float,height:Float):[CostResult]
  }
extend type Mutation {
    fillRajaOngkirTable:Boolean
  }
`;

const resolvers = {
  Mutation: {
    fillRajaOngkirTable: () => {
      return axios
        .get("https://pro.rajaongkir.com/api/province", {
          params: {
            key: process.env.RAJAONGKIR_SECOND_SECREET_KEY
          }
        })
        .then(res => {
          let arrProvince = res.data.rajaongkir.results;
          let promises = [];
          db.none("truncate table raja_ongkir_province");
          let insertProvincePromises = new Promise(resolve => {
            arrProvince.forEach(obj => {
              db.none("insert into raja_ongkir_province values($1 , $2)", [
                obj.province_id,
                obj.province
              ]);
            });
            resolve(true);
          });
          let getCity = axios
            .get("https://pro.rajaongkir.com/api/city", {
              params: {
                key: process.env.RAJAONGKIR_SECOND_SECREET_KEY
              }
            })
            .then(res => {
              db.none("truncate table raja_ongkir_city");
              let arrCities = res.data.rajaongkir.results;
              arrCities.forEach(obj => {
                db.none(
                  "insert into raja_ongkir_city values ($1 , $2 , $3 , $4 ,$5 ,$6) ",
                  [
                    obj.city_id,
                    obj.province_id,
                    obj.province,
                    obj.type,
                    obj.city_name,
                    obj.postal_code
                  ]
                ).then(() => {
                  axios
                    .get("htr" + "tps://pro.rajaongkir.com/api/subdistrict", {
                      params: {
                        key: process.env.RAJAONGKIR_SECOND_SECREET_KEY,
                        city: obj.city_id
                      }
                    })
                    .then(res => {
                      let arrSubdistrict = res.data.rajaongkir.results;
                      arrSubdistrict.forEach(obj => {
                        db.none(
                          "insert into raja_ongkir_subdistrict values($1,$2,$3,$4,$5,$6,$7)",
                          [
                            obj.subdistrict_id,
                            obj.province_id,
                            obj.province,
                            obj.city_id,
                            obj.city,
                            obj.type,
                            obj.subdistrict_name
                          ]
                        );
                      });
                    });
                });
              });
            });
          promises.push(insertProvincePromises);
          promises.push(getCity);
          return Promise.all(promises).then(() => true);
        });
    }
  },
  Query: {
    getProvince: () => {
      return db.any("select * from raja_ongkir_province").then(res => {
        return res;
      });
    },
    getCity: (_, { province_id }) => {
      if (province_id) {
        return db
          .any("select * from raja_ongkir_city where province_id = $1", [
            province_id
          ])
          .then(res => res);
      } else {
        return db.any("select * from raja_ongkir_city").then(res => res);
      }
    },
    getSubdistrict: (_, { city }) => {
      return db
        .any("select * from raja_ongkir_subdistrict where city_id = $1", [city])
        .then(res => res);
    },
    //example of library usage
    getCost: (
      _,
      { destination, weight, courier /*, length, width, height*/ }
    ) => {
      const bobot = weight / 1000;
      let code = "";
      let courier_name = "";
      let service = "";
      let description = "";
      let cost = 0;
      let etd = "";
      let divider = getDivider(bobot);
      return db
        .manyOrNone(
          `SELECT * FROM courier_cost WHERE subdistrict_id = $1 AND (courier='jne' OR courier='J&T') ORDER BY courier ASC,service ASC`,
          destination
        )
        .then(res => {
          if (res.length < 1) {
            return getCost(
              destination,
              1000,
              courier /*, length, width, height*/
            )
              .then(couriers => {
                couriers.forEach(courier => {
                  code = courier.code;
                  courier_name = courier.name;
                  courier.costs.forEach(services => {
                    service = services.service;
                    description = services.description;
                    services.cost.forEach(res => {
                      cost = res.value;
                      etd = res.etd;
                      db.one(
                        `INSERT INTO courier_cost ("subdistrict_id",
                    "courier",
                    "service",
                    "cost",
                    "estimated",
                    "description",
                    "courier_name") VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
                        [
                          destination,
                          code,
                          service,
                          cost,
                          etd,
                          description,
                          courier_name
                        ]
                      )
                        .then()
                        .catch(e => {
                          throw new Error(e.message || e);
                        });
                    });
                  });
                });
                return getCost(
                  destination,
                  weight,
                  courier /*, length, width, height*/
                );
              })
              .catch(e => {
                throw new Error(e.message || e);
              });
          } else {
            const updated_at = new Date(res[0].updated_at);
            const diffTime = Math.abs(new Date() - updated_at);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays > 6) {
              return getCost(
                destination,
                1000,
                courier /*, length, width, height*/
              )
                .then(couriers => {
                  couriers.forEach(courier => {
                    code = courier.code;
                    courier_name = courier.name;
                    courier.costs.forEach(services => {
                      service = services.service;
                      description = services.description;
                      services.cost.forEach(res => {
                        cost = res.value;
                        etd = res.etd;
                        db.none(
                          `UPDATE courier_cost SET updated_at=now() WHERE subdistrict_id=$1`,
                          [destination]
                        ).catch(e => {
                          throw new Error(e.message || e);
                        });
                      });
                    });
                  });
                  return getCost(
                    destination,
                    weight,
                    courier /*, length, width, height*/
                  );
                })
                .catch(e => {
                  throw new Error(e.message || e);
                });
            } else {
              let costJNE = [];
              let costJNT = [];
              let serviceJNE = [];
              let serviceJNT = [];
              let result = [];
              // console.log(bobot);
              // console.log(divider);
              res.forEach(couriers => {
                cost = couriers.cost * divider;
                etd = couriers.estimated;
                if (couriers.courier === "jne") {
                  costJNE.push({ value: cost, etd: etd });
                } else {
                  costJNT.push({ value: cost, etd: etd });
                }
              });
              let iJNE = 0;
              let iJNT = 0;
              res.forEach(couriers => {
                service = couriers.service;
                description = couriers.description;
                if (couriers.courier === "jne") {
                  serviceJNE.push({
                    service: service,
                    description: description,
                    cost: [costJNE[iJNE]]
                  });
                  iJNE++;
                } else {
                  serviceJNT.push({
                    service: service,
                    description: description,
                    cost: [costJNT[iJNT]]
                  });
                  iJNT++;
                }
              });
              iJNE = 0;
              iJNT = 0;
              res.forEach(couriers => {
                courier = couriers.courier;
                courier_name = couriers.courier_name;
                if (courier === "jne" && iJNE < 1) {
                  const arr =
                    serviceJNE.length < 3
                      ? [serviceJNE[iJNE], serviceJNE[iJNE + 1]]
                      : [
                          serviceJNE[iJNE],
                          serviceJNE[iJNE + 1],
                          serviceJNE[iJNE + 2]
                        ];
                  result.push({
                    code: courier,
                    name: courier_name,
                    costs: arr
                  });
                  iJNE++;
                } else if (courier === "J&T" && iJNT < 1) {
                  result.push({
                    code: courier,
                    name: courier_name,
                    costs: [serviceJNT[0]]
                  });
                  iJNT++;
                }
              });
              return result;
            }
          }
        })
        .catch(e => {
          throw new Error(e.message || e);
        });
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
