const axios = require("axios");

function getCost(
  destination,
  weight,
  courier,
  length = null,
  width = null,
  height = null
) {
  return axios
    .post("https://pro.rajaongkir.com/api/cost", {
      key: process.env.RAJAONGKIR_SITE_KEY,
      origin: process.env.RAJAONGKIR_ORIGIN,
      originType: process.env.RAJAONGKIR_ORIGINTYPE,
      destination: destination,
      destinationType: process.env.RAJAONGKIR_DESTINATIONTYPE,
      weight: weight,
      courier: courier,
      length: length,
      width: width,
      height: height
    })
    .then(res => res.data.rajaongkir.results);
}

function getDivider(weight) {
  const bobot = weight;
  const lower = bobot <= 1.3 ? 0 : Math.floor(bobot) + 0.31;
  const upper = Math.ceil(bobot) + 0.3;
  const divider =
    bobot >= lower && bobot <= upper ? Math.floor(upper) : Math.ceil(upper);
  return divider;
}

function getWaybillTrack(waybill, courier) {
  return axios
    .post("https://pro.rajaongkir.com/api/waybill", {
      key: process.env.RAJAONGKIR_SECOND_SECREET_KEY,
      waybill: waybill,
      courier: courier
    })
    .then(res => res.data.rajaongkir.result);
}

module.exports = {
  getCost,
  getWaybillTrack,
  getDivider
};
