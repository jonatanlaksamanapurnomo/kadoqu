import React, { Fragment, Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProfileSider from "../components/ProfileSider";
import ProfileContent from "../components/UserprofileContent";
import { Row, Col, Container } from "react-bootstrap";
import MediaQuery from "react-responsive";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import PrivateRoute from "../Middlewares/PrivateRoute";
import { Query } from "react-apollo";
import { GET_USER } from "../gql/user";

const ProfileContents = propss => {
  const { props, location, isDesktop, data } = propss;
  return (
    <>
      {isDesktop ? (
        <>
          <PrivateRoute
            exact
            path={props.match.url}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="DataDiri"
              />
            )}
          />
          <Route
            exact
            path={props.match.url + "/data-diri"}
            render={() => <Redirect to={props.match.url}/>}
          />
        </>
      ) : (
        <>
          <PrivateRoute
            exact
            path={props.match.url + "/data-diri"}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="DataDiri"
              />
            )}
          />
          <PrivateRoute
            exact
            path={props.match.url + "/payment-confirmation"}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="payment"
              />
            )}
          />

          <PrivateRoute
            exact
            path={props.match.url + "/change-email"}
            component={() => (
              <ProfileContent location={location} data={data} render="email"/>
            )}
          />
          <PrivateRoute
            exact
            path={props.match.url + "/change-password"}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="password"
              />
            )}
          />
          <PrivateRoute
            exact
            path={props.match.url + "/forget-password"}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="lupa-password"
              />
            )}
          />
          <PrivateRoute
            exact
            path={props.match.url + "/track-order"}
            component={() => (
              <ProfileContent
                location={location}
                data={data}
                render="OrderTrack"
              />
            )}
          />
        </>
      )}
      <PrivateRoute
        path={props.match.url + "/address"}
        component={() => (
          <ProfileContent location={location} data={data} render="alamat"/>
        )}
      />

      <PrivateRoute
        exact
        path={props.match.url + "/edit-photo-profile"}
        component={() => (
          <ProfileContent location={location} data={data} render="EditPhoto"/>
        )}
      />
      <PrivateRoute
        path={props.match.url + "/add-address"}
        component={() => (
          <ProfileContent
            location={location}
            data={data}
            render="tambahAlamat"
          />
        )}
      />
      <Route
        path={props.match.url + "/favorite"}
        exact
        render={() => <Redirect to={props.match.url + "/favorite/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/favorite/:page"}
        component={() => (
          <ProfileContent location={location} data={data} active="favorite"/>
        )}
      />
      <Route
        path={props.match.url + "/history"}
        exact
        render={() => <Redirect to={props.match.url + "/history/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/history/:page"}
        component={() => (
          <ProfileContent location={location} data={data} render="history"/>
        )}
      />
      <Route
        path={props.match.url + "/my-cart"}
        exact
        render={() => <Redirect to={props.match.url + "/my-cart/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/my-cart/:page"}
        component={() => (
          <ProfileContent location={location} data={data} render="myCart"/>
        )}
      />

      <PrivateRoute
        exact
        path={props.match.url + "/edit-address"}
        component={() => (
          <ProfileContent location={location} data={data} render="editAlamat"/>
        )}
      />
    </>
  );
};

const ProfileSiders = propss => {
  const { props, location } = propss;
  return (
    <Switch>
      <PrivateRoute
        exact
        path={props.match.url}
        component={() => <ProfileSider location={location} active="DataDiri"/>}
      />
      <PrivateRoute
        exact
        path={props.match.url + "/data-diri"}
        render={() => <Redirect to={props.match.url}/>}
      />
      <PrivateRoute
        path={props.match.url + "/address"}
        component={() => <ProfileSider location={location} active="alamat"/>}
      />

      <PrivateRoute
        exact
        path={props.match.url + "/edit-photo-profile"}
        component={() => <ProfileSider location={location} render="DataDiri"/>}
      />
      <Route
        path={props.match.url + "/favorite"}
        exact
        render={() => <Redirect to={props.match.url + "/favorite/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/favorite/:page"}
        component={() => <ProfileSider location={location} active="favorite"/>}
      />

      <Route
        path={props.match.url + "/history"}
        exact
        render={() => <Redirect to={props.match.url + "/history/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/history/:page"}
        component={() => <ProfileSider location={location} active="myCart"/>}
      />
      <Route
        path={props.match.url + "/my-cart"}
        exact
        render={() => <Redirect to={props.match.url + "/my-cart/1"}/>}
      />
      <PrivateRoute
        path={props.match.url + "/my-cart/:page"}
        component={() => <ProfileSider location={location} active="myCart"/>}
      />

      <PrivateRoute
        path={props.match.url + "/add-address"}
        component={() => (
          <ProfileSider location={location} active="tambahAlamat"/>
        )}
      />

      <PrivateRoute
        exact
        path={props.match.url + "/edit-address"}
        component={() => <ProfileSider location={location} render="alamat"/>}
      />

      <Redirect path="/profile/" to="/404"/>
    </Switch>
  );
};

class DataDiri extends Component {
  render() {
    window.scrollTo(0, 0);
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
                    from: this.props.location
                  }
                }}
              />
            );
          }
          if (loading) {
            return (
              // <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
              //   {isDesktop => {
              //     return (
              //       <Fragment>
              //         <Container fluid={true}>
              //           <Row className="">
              //             <Col
              //               lg={isDesktop ? 4 : 12}
              //               md={isDesktop ? 4 : 12}
              //               xs={12}
              //               sm={12}
              //               className="p-0 sider"
              //             >
              //               {isDesktop ? (
              //                 <ProfileSiders
              //                   props={this.props}
              //                   location={this.props.location}
              //                 />
              //               ) : (
              //                 <Switch>
              //                   <PrivateRoute
              //                     exact
              //                     path={this.props.match.url + ""}
              //                     component={() => (
              //                       <ProfileSider
              //                         location={this.props.location}
              //                       />
              //                     )}
              //                   />
              //                   <ProfileContents
              //                     props={this.props}
              //                     location={this.props.location}
              //                     isDesktop={isDesktop}
              //                     data={data.me}
              //                   />
              //                 </Switch>
              //               )}
              //             </Col>
              //             {isDesktop ? (
              //               <Col lg={8} md={8} className="p-0">
              //                 <Switch>
              //                   <ProfileContents
              //                     props={this.props}
              //                     location={this.props.location}
              //                     isDesktop={isDesktop}
              //                     data={data.me}
              //                   />
              //                 </Switch>
              //               </Col>
              //             ) : (
              //               ""
              //             )}
              //           </Row>
              //         </Container>
              //       </Fragment>
              //     );
              //   }}
              // </MediaQuery>
              <p>Loading..</p>
            );
          }
          if (data) {
            return (
              <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
                {isDesktop => {
                  return (
                    <Fragment>
                      <Container fluid={true}>
                        <Row className="">
                          <Col
                            lg={isDesktop ? 4 : 12}
                            md={isDesktop ? 4 : 12}
                            xs={12}
                            sm={12}
                            className="p-0 sider"
                          >
                            {isDesktop ? (
                              <ProfileSiders
                                props={this.props}
                                location={this.props.location}
                              />
                            ) : (
                              <Switch>
                                <PrivateRoute
                                  exact
                                  path={this.props.match.url + ""}
                                  component={() => (
                                    <ProfileSider
                                      location={this.props.location}
                                    />
                                  )}
                                />
                                <ProfileContents
                                  props={this.props}
                                  location={this.props.location}
                                  isDesktop={isDesktop}
                                  data={data.me}
                                />
                              </Switch>
                            )}
                          </Col>
                          {isDesktop ? (
                            <Col lg={8} md={8} className="p-0">
                              <Switch>
                                <ProfileContents
                                  props={this.props}
                                  location={this.props.location}
                                  isDesktop={isDesktop}
                                  data={data.me}
                                />
                              </Switch>
                            </Col>
                          ) : (
                            ""
                          )}
                        </Row>
                      </Container>
                    </Fragment>
                  );
                }}
              </MediaQuery>
            );
          }
        }}
      </Query>
    );
  }
}

export default DataDiri;
