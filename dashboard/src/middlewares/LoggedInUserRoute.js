import React from "react";
import { Route, withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import { isLoggedIn } from "../utils/userChecker";

const LoggedInUserRoute = props => {
  if (!isLoggedIn()) {
    Swal.fire({
      type: "warning",
      title: "Sorry, session timeout",
      showConfirmButton: false,
      timer: 2000
    });
    props.signOut(props.history);
    return null;
  }
  return (
    <React.Fragment>
      <Helmet>
        <title>Admin Kadoqu | {props.name}</title>
      </Helmet>
      <Route {...props} />
    </React.Fragment>
  );
};

export default withRouter(LoggedInUserRoute);
