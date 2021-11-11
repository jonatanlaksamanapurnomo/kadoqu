import { Redirect, Route, withRouter } from "react-router-dom";
import jwt from "jsonwebtoken";
import React from "react";
import { withApollo } from "react-apollo";

let localstorage = window.localStorage;

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      let userLogin = jwt.decode(localstorage.token);
      if (userLogin) {
        //disable for awhile
        // if (userLogin.isActive) {
        return <Component {...props} />;
        // }
        //  else {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: "/register-status/expired",
        //         state: {
        //           tittle: "oops akun kamu belum terverifikasi",
        //           message:
        //             "sepertinya kamu belum melakukan verfikasi silahkan klik tombol dibawah ini untuk mengulangi proses verfikasi"
        //         }
        //       }}
        //     />
        //   );
        // }
      }
      if (!userLogin) {
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                errMesage: "Anda Harus Login/Register Terlebih Dahulu",
                from: props.location
              }
            }}
          />
        );
      }
    }}
  />
);

export default withApollo(withRouter(PrivateRoute));
