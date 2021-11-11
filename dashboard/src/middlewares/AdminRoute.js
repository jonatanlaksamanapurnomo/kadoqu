import React from "react";
import { Redirect } from "react-router-dom";
import { isAdmin } from "../utils/userChecker";
import LoggedInUserRoute from "./LoggedInUserRoute";

const AdminRoute = props => {
  if (!isAdmin()) {
    return (
      <Redirect
        to={{
          pathname: "/"
        }}
      />
    );
  }
  return <LoggedInUserRoute {...props} />;
};

export default AdminRoute;
