import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import "./UserprofileContent.css";
import "./ProfileSider.css";
import MediaQuery from "react-responsive";
import { withApollo } from "react-apollo";
import NavLink from "../components/NavLink";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import { QUERY_GET_TOKEN, MUTATION_REMOVE_TOKEN } from "../gql/token";
import { MUTATION_EMPTY_CART, QUERY_GET_CART_ITEMS } from "../gql/cart";
import uuidv4 from "uuid/v4";
import ProfileSiderHeader from "./ProfileSiderHeader";
import { PopUpLogOut } from "./SweetAlerts";
import { withRouter } from "react-router-dom";

const ProfileSider = props => {
  const logout = () => {
    Promise.all([
      props.client.mutate({
        mutation: MUTATION_REMOVE_TOKEN,
        refetchQueries: [{ query: QUERY_GET_TOKEN }]
      }),
      props.client.mutate({
        mutation: MUTATION_EMPTY_CART,
        refetchQueries: [{ query: QUERY_GET_CART_ITEMS }]
      })
    ])
      .then(() => {
        localStorage.setItem("guestId", uuidv4());
        props.history.push({
          pathname: "/"
        });
        PopUpLogOut();
      })
      .catch(error => console.log(error));
  };
  return (
    <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {isDesktop => {
        return (
          <Fragment>
            <div className="p-0 ">
              <div className=" p-0">
                <ProfileSiderHeader
                  isDesktop={isDesktop}
                  location={props.location}
                />
                <ul className="h-50 ul-sider pl-link pt-link white pr-link mb-0">
                  <li className="li-sider p-0">
                    {" "}
                    {isDesktop ? (
                      <NavLink
                        className={
                          props.active === "DataDiri"
                            ? "profile-sider-active"
                            : "black"
                        }
                        href="/profile"
                      >
                        <h5 className="ml-3 mb-0 "> Data Diri </h5>
                      </NavLink>
                    ) : (
                      <NavLink className="black" href="/profile/data-diri">
                        <h5 className="ml-3 mb-0 "> Data Diri </h5>
                      </NavLink>
                    )}
                  </li>
                  <li className="li-sider p-0 ">
                    {" "}
                    <NavLink
                      className={
                        props.active === "alamat"
                          ? "profile-sider-active"
                          : "black"
                      }
                      href="/profile/address"
                    >
                      {" "}
                      <h5 className="ml-3 mb-0">Alamat</h5>
                    </NavLink>
                  </li>
                  <li className="li-sider  p-0">
                    {" "}
                    <NavLink
                      className={
                        props.active === "favorite"
                          ? "profile-sider-active"
                          : "black"
                      }
                      href="/profile/favorite"
                    >
                      {" "}
                      <h5 className="ml-3 mb-0 ">Favorit </h5>{" "}
                    </NavLink>
                  </li>
                  <li className="li-sider  p-0">
                    {" "}
                    <NavLink
                      className={
                        props.active === "myCart"
                          ? "profile-sider-active"
                          : "black"
                      }
                      href="/profile/my-cart"
                    >
                      <h5 className="ml-3 mb-0 ">Belanjaan Saya </h5>{" "}
                    </NavLink>{" "}
                  </li>
                  <li className="li-sider-non p-0">
                    {" "}
                    <NavLink className="black" href="/faq">
                      {" "}
                      <h5 className="ml-3 mb-0 ">Pusat Solusi </h5>
                    </NavLink>
                  </li>
                  <li className="pt-button">
                    <div className=" d-flex justify-content-center">
                      <Button
                        size="lg"
                        className="exitButton my-3 kadoqu-primary-button-green"
                        onClick={logout}
                      >
                        Keluar
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
              {/* <div className="sidebar-heading">Start Bootstrap</div> */}
            </div>
          </Fragment>
        );
      }}
    </MediaQuery>
  );
};

export default withRouter(withApollo(ProfileSider));
