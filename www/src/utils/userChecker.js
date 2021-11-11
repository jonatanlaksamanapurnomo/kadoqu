import jwt from "jsonwebtoken";

const localStorage = window.localStorage;

function isLoggedIn() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token)) {
      return jwt.decode(localStorage.token).exp * 1000 > Date.now();
    } else {
      localStorage.removeItem("token");
      return false;
    }
  }
}

function getUserLoginName() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token)) {
      return jwt.decode(localStorage.token).name;
    } else {
      localStorage.removeItem("token");
      return "notlogin yet";
    }
  }
}

function getLoginId() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token)) {
      return jwt.decode(localStorage.token).data;
    } else {
      localStorage.removeItem("token");
      return "notlogin yet";
    }
  }
}

function isNotVerfy() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token).isActive) {
      let isActive = jwt.decode(localStorage.token).isActive;
      return isActive === true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function isExpired() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token)) {
      return jwt.decode(localStorage.token).exp * 1000 < Date.now();
    } else {
      localStorage.removeItem("token");
      return false;
    }
  }
}

function getUserLogin() {
  if (localStorage.hasOwnProperty("token")) {
    if (jwt.decode(localStorage.token)) return jwt.decode(localStorage.token);
    else {
      localStorage.removeItem("token");
      return null;
    }
  }
  return null;
}

export {
  isLoggedIn,
  isExpired,
  isNotVerfy,
  getUserLoginName,
  getUserLogin,
  getLoginId
};
