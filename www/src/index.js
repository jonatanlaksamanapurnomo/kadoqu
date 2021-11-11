import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import bugsnagReact from "@bugsnag/plugin-react";
import bugsnag from '@bugsnag/js';


var bugsnagClient = bugsnag({
    apiKey: '33b45cc1383df3f4375ea1ce7b3d720b'
  });

  bugsnagClient.use(bugsnagReact, React)
var ErrorBoundary = bugsnagClient.getPlugin('react')

ReactDOM.render( 
  <ErrorBoundary> <App /> </ErrorBoundary> , document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
