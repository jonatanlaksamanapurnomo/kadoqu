import React, {Component} from "react";
import gql from "graphql-tag";
import {Mutation, withApollo} from "react-apollo";
import {withRouter} from "react-router-dom";
import Swal from "sweetalert2";
import {Helmet} from "react-helmet";
import {QUERY_CHECK_EMAIL_VALID, QUERY_CHECK_PASSWORD} from "../gql/admin";
import {LoadingAlert, CloseLoadingAlert} from "../components/Loader";

const adminLogin = gql`
  mutation adminLogin($email: String, $password: String) {
    adminLogin(email: $email, password: $password)
  }
`;

class Login extends Component {
  state = {
    email: "",
    password: ""
  };


  render() {
    return (
      <div className="container">
        <Helmet>
          <title>Admin Kadoqu</title>
        </Helmet>
        <fieldset>
          <legend>Admin Login :)</legend>
          <Mutation mutation={adminLogin}>
            {(adminLogin, {loading}) => (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  this.props.client
                  .query({
                    query: QUERY_CHECK_EMAIL_VALID,
                    variables: {
                      username: this.state.email
                    }
                  })
                  .then(e => {
                    if (!e.data.usernameChecker) {
                      Swal.fire({
                        type: "error",
                        title: "Oops...",
                        text: "Username tidak valid/belum terdaftar!",
                        footer:
                          'Ada masalah? <a target="_blank"  href="http://bit.ly/contactGIdA"> Silahkan klik link ini.</a>'
                      });
                    } else {
                      this.props.client
                      .query({
                        query: QUERY_CHECK_PASSWORD,
                        variables: {
                          password: this.state.password
                        }
                      })
                      .then(e => {
                        if (e.data.passwordChecker) {
                          LoadingAlert("Harap tunggu sebentar..");
                          adminLogin({
                            variables: {
                              email: this.state.email,
                              password: this.state.password
                            }
                          })
                          .then(res => {
                            CloseLoadingAlert();
                            let token = res.data.adminLogin;
                            this.props.signIn(this.props.history, token);
                          })
                          .catch(res => console.log(res));
                        } else {
                          Swal.fire({
                            type: "error",
                            title: "Oops...",
                            text: "Password Anda Salah!",
                            footer:
                              'Ada masalah? <a target="_blank" href="http://bit.ly/contactGIdA">Silahkan klik link ini.</a>'
                          });
                        }
                      });
                    }
                  });
                }}
              >
                <div className="form-group">
                  <label htmlFor="email">username:</label>
                  <input
                    type="text"
                    id="login"
                    className="form-control"
                    required
                    onChange={e => this.setState({email: e.target.value})}
                    placeholder="Email..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Password:</label>
                  <input
                    type="password"
                    id="password"
                    required
                    className="form-control"
                    onChange={e => this.setState({password: e.target.value})}
                    placeholder="password..."
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-success btn-md"
                  value="Log In"
                />
              </form>
            )}
          </Mutation>
        </fieldset>
      </div>
    );
  }
}

export default withApollo(withRouter(Login));
