import React from "react";
import { Image } from "react-bootstrap";
import "./ProfileSiderHeader.css";
import NavLink from "../components/NavLink";
import IMAGES from "../data/images";
import { Query } from "react-apollo";
import { GET_USER } from "../gql/user";
import { Redirect } from "react-router-dom";
const ProfileSiderHeader = props => {
  const { isDesktop, isSideNav } = props;
  const photoProfile = IMAGES["Photo Profile"];
  return (
    <Query query={GET_USER}>
      {({ loading, error, data }) => {
        if (error) {
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
        if (loading) {
          return (
            <div className="profile-sider-header">
              {isDesktop ? (
                <>
                  <div className="d-flex justify-content-center">
                    <Image
                      className="profile-sider-header-photo-profile"
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/Ball-0.8s-200px.gif"
                    />
                  </div>
                  <div className=" mt-1 d-flex justify-content-center"></div>
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <NavLink
                    className="pt-1 pr-0 pl-0 pb-0"
                    href="/profile/edit-photo-profile"
                  >
                    <Image
                      className={`${
                        isSideNav
                          ? "profile-sider-sidenav-photo"
                          : "profile-sider-header-photo-profile"
                      }`}
                      src="https://ik.imagekit.io/nwiq66cx3pvsy/Ball-0.8s-200px.gif"
                    />
                  </NavLink>
                </div>
              )}
              <div
                className={`${
                  isSideNav ? "" : "profile-sider-header-name "
                }d-flex justify-content-center`}
              >
                Loading..
              </div>
            </div>
          );
        }
        if (data) {
          const token = data.me;
          return (
            <div className="profile-sider-header">
              {isDesktop ? (
                <>
                  <div className="d-flex justify-content-center">
                    <Image
                      className="profile-sider-header-photo-profile"
                      src={photoProfile[token.photo]}
                    />
                  </div>
                  <div className=" mt-1 d-flex justify-content-center">
                    <NavLink
                      className="pt-1 pr-0 pl-0 pb-0"
                      href="/profile/edit-photo-profile"
                    >
                      {" "}
                      <small className="profile-sider-header-link">
                        Edit Foto
                      </small>{" "}
                    </NavLink>
                  </div>
                </>
              ) : (
                <div className="d-flex justify-content-center">
                  <NavLink
                    className="pt-1 pr-0 pl-0 pb-0"
                    href="/profile/edit-photo-profile"
                  >
                    <Image
                      className={`${
                        isSideNav
                          ? "profile-sider-sidenav-photo"
                          : "profile-sider-header-photo-profile"
                      }`}
                      src={photoProfile[token.photo]}
                    />
                  </NavLink>
                </div>
              )}
              <div
                className={`${
                  isSideNav ? "" : "profile-sider-header-name"
                } d-flex justify-content-center pb-1`}
              >
                {isSideNav ? (
                  <span>{token.firstName}</span>
                ) : (
                  <h4>{token.firstName}</h4>
                )}
              </div>
            </div>
          );
        }
      }}
    </Query>
  );
};

export default ProfileSiderHeader;
