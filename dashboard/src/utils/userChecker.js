import jwt from "jsonwebtoken";
import { PRODUCT_CATEGORIES } from "../data/constants";

const localStorage = window.localStorage;

function isLoggedIn() {
  return (
    localStorage.hasOwnProperty("token") &&
    jwt.decode(localStorage.token).exp * 1000 > new Date()
  );
}

function isMerchant() {
  return isLoggedIn() && jwt.decode(localStorage.token).role === "merchant";
}

function isAdmin() {
  return isLoggedIn() && jwt.decode(localStorage.token).role === "admin";
}

function getUserName() {
  return jwt.decode(localStorage.token).name;
}

function getUserId() {
  return jwt.decode(localStorage.token).data;
}

function getMerchantCode() {
  return jwt.decode(localStorage.token).code;
}

function getMerchantLevelTax() {
  return parseFloat(jwt.decode(localStorage.token).merchantLevelTax);
}

function getMerchantCategory() {
  let userLogin = jwt.decode(localStorage.token);
  let category = {};
  PRODUCT_CATEGORIES.forEach(item => {
    if (item.id === userLogin.categoryId) {
      category = item;
    }
  });
  return category;
}

function getUserLogin() {
  return jwt.decode(localStorage.token);
}

export {
  isLoggedIn,
  isMerchant,
  isAdmin,
  getUserName,
  getMerchantCode,
  getMerchantLevelTax,
  getMerchantCategory,
  getUserLogin,
  getUserId
};
