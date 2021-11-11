import React, { Suspense } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { AppFooter, AppHeader } from "@coreui/react";
import { Container } from "reactstrap";
import AdminRoute from "./middlewares/AdminRoute";
import LoggedInUserRoute from "./middlewares/LoggedInUserRoute";
import routes from "./data/routes";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import "./App.css";
import "./App.scss";
import {
  isLoggedIn,
  isAdmin,
  isMerchant,
  getMerchantLevelTax
} from "./utils/userChecker";
import {
  MUTATION_REMOVE_TOKEN,
  MUTATION_SET_TOKEN,
  QUERY_GET_TOKEN
} from "./gql/token";
import Swal from "sweetalert2";

let localstorage = window.localStorage;
const client = new ApolloClient({
  uri: process.env.REACT_APP_GATEWAY_URL || "http://localhost:4000",

  request: async operation => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
        resi: localstorage.getItem("resi") || "test"
      }
    });
  },
  resolvers: {
    Query: {
      getToken: () => {
        return localstorage.getItem("token");
      }
    },
    Mutation: {
      setToken: (_, { token }) => {
        return localstorage.setItem("token", token);
      },
      removeToken: () => {
        return localstorage.removeItem("token");
      }
    }
  }
});

class App extends React.Component {
  state = {
    isLoggedIn: isLoggedIn(),
    isAdmin: isAdmin()
  };
  componentDidUpdate = () => {
    if (isLoggedIn() !== this.state.isLoggedIn) {
      this.setState({ isLoggedIn: isLoggedIn() });
    }
    if (isAdmin() !== this.state.isAdmin) {
      this.setState({ isAdmin: isAdmin() });
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signIn = (history, newToken) => {
    client
      .mutate({
        mutation: MUTATION_SET_TOKEN,
        variables: {
          token: newToken
        },
        refetchQueries: [{ query: QUERY_GET_TOKEN }]
      })
      .then(() => {
        this.setState({ isLoggedIn: true }, history.push("/dashboard"));
      })
      .catch(error => console.log(error.message || error));
  };

  signOut = history => {
    client
      .mutate({
        mutation: MUTATION_REMOVE_TOKEN
      })
      .then(() => {
        Swal.fire({
          type: "success",
          title: "Berhasil log out!",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false
        });
        this.setState({ isLoggedIn: false }, () => history.push("/login"));
      })
      .catch(error => console.log(error.message || error));
  };

  render() {
    if (!this.state.isLoggedIn) {
      return (

        <div className="app">
          <Router>
            <ApolloProvider client={client}>
              <div>
                <Container fluid>
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      <Route
                        path="/login"
                        exact
                        render={() => (
                          <Login
                            signIn={(history, newToken) =>
                              this.signIn(history, newToken)
                            }
                          />
                        )}
                      />

                      <Redirect path="*" to="/login"/>
                    </Switch>
                  </Suspense>
                </Container>
              </div>
            </ApolloProvider>
          </Router>

        </div>
      );
    }
    return (
      <div className="app">

        <Router>
          <ApolloProvider client={client}>
            <AppHeader fixed>
              <Suspense fallback={this.loading()}>
                <Header signOut={history => this.signOut(history)}/>
              </Suspense>
            </AppHeader>
            <div className="app-body">
              {(isAdmin() || getMerchantLevelTax() > 10) && (
                <SideBar isAdmin={this.state.isAdmin}/>
              )}
              <main className="main">
                <Container fluid>
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      <Redirect path="/products" exact to="/products/list"/>
                      <Redirect path="/orders" exact to="/orders/list"/>
                      <Redirect path="/vouchers" exact to="/vouchers/list"/>
                      {routes.map((route, idx) => {
                        return route.adminOnly ? (
                          <AdminRoute
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={route.component}
                            signOut={history => this.signOut(history)}
                          />
                        ) : route.merchantOnly && !isMerchant() ? (
                          <Redirect
                            key={idx}
                            path={route.path}
                            to="/dashboard"
                          />
                        ) : (
                          <LoggedInUserRoute
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            component={route.component}
                            signOut={history => this.signOut(history)}
                          />
                        );
                      })}
                      <Redirect path="/" to="/dashboard"/>
                    </Switch>
                  </Suspense>
                </Container>
              </main>
            </div>
            <AppFooter>
              <Suspense fallback={this.loading()}>
                <Footer/>
              </Suspense>
            </AppFooter>
          </ApolloProvider>
        </Router>

      </div>
    );
  }
}

export default App;
