import {Redirect, Route} from "react-router-dom";
import jwt from "jsonwebtoken";
import React from "react";
let localstorage = window.localStorage;
const AdminRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      let userLogin = jwt.decode(localstorage.token);
      if(userLogin){
        if (userLogin.role === "admin") {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          );
        }
      }
      else{
        return (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        );
      }
    }}
  />
);

export default  AdminRoute;