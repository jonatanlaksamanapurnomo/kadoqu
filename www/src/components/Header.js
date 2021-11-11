import React from "react";
import jwt from "jsonwebtoken";
import uuidv4 from "uuid/v4";
import gql from "graphql-tag";
import Autosuggest from "react-autosuggest";
import { Button, Col, Container, Row, OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import queryString from "query-string";
import MediaQuery from "react-responsive";
import { withApollo, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import NavLink from "./NavLink";
import { PopUpLogOut } from "./SweetAlerts";
import { MIN_DESKTOP_SIZE } from "../data/constants";
import IMAGES from "../data/images";
import {
  QUERY_GET_TOKEN,
  QUERY_GET_TOKEN_CART,
  MUTATION_REMOVE_TOKEN,
} from "../gql/token";
// import {MUTATION_EMPTY_CART, QUERY_GET_CART_ITEMS} from "../gql/cart";
import { QUERY_GET_FILTERS } from "../gql/filter";
import ProfileSiderHeader from "./ProfileSiderHeader";
import NotificationBadge from "react-notification-badge";
// import { QUERY_SEARCH_PRODUCT } from "../gql/elasticsearch";
import "./Header.css";
import GoogleLogin from "react-google-login";
import { debounce } from "throttle-debounce";

const Mutation_auth_google = gql`
  mutation syncDataWithGoogle(
    $googleId: String
    $accsesToken: String
    $userId: String
  ) {
    syncDataWithGoogle(
      googleId: $googleId
      accsesToken: $accsesToken
      userId: $userId
    )
  }
`;
const capitalizeFirstLetter = (string) => {
  if (typeof string !== "undefined") {
    let result = string;
    let arr = result.split(" ");
    arr.forEach((str, idx) => {
      arr[idx] = str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    });
    return arr.join(" ");
  }
};

const style = {
  WebkitTransition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
  MozTransition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
  msTransition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
  transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
  display: "inline-block",
  position: "absolute",
  minWidth: "10px",
  padding: "5px 10px",
  fontSize: "16px",
  fontWeight: "700",
  lineHeight: "1",
  color: "#fff",
  textAlign: "center",
  whiteSpace: "nowrap",
  verticalAlign: "baseline",
  backgroundColor: "#8b0000",
  borderRadius: "10px",
  top: "-2px",
  right: "-2px",
};
const photoProfile = IMAGES["Photo Profile"];

const MobileMenuButton = ({ href, icon, title }) => (
  <NavLink
    href={href}
    className="d-flex align-items-center header-sidenav-button shadow"
  >
    <Col xs={2}>
      <img alt="" className="" src={icon} />
    </Col>
    <Col
      xs={4}
      className="header-sidenav-button-title px-0 kadoqu-primary-color"
    >
      {title}
    </Col>
  </NavLink>
);

const MobileHeaderDrawer = (props) => (
  <Query query={QUERY_GET_TOKEN}>
    {({ loading, error, data }) => {
      if (!loading && !error) {
        const token = jwt.decode(data.getToken);

        return (
          <div id="mySidenav" className="sidenav shadow">
            <div
              className="header-sidenav-head shadow p-3 cursor-pointer d-flex justify-content-between"
              onClick={() => props.toggleSideNav()}
            >
              <img
                alt="Kadoqu.com"
                className="washed-white"
                src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png"
              />
              <i className="fas fa-bars menu-mobile-bars" />
            </div>
            <Container
              className="p-0 tiny-mobile mx-0"
              onClick={() => props.toggleSideNav()}
            >
              {token && (
                <ProfileSiderHeader
                  isSideNav={true}
                  token={token}
                  isDesktop={false}
                />
              )}

              <div className="header-sidenav-contents">
                <NavLink href="/cart" className="header-sidenav-cart">
                  <img
                    className="header-user cursor-pointer"
                    alt="cart"
                    src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_basket_cart_1.png"
                  />
                  <p className="kadoqu-primary-color d-inline">Isi Keranjang</p>
                </NavLink>

                <div className="header-sidenav-text-container">
                  {token ? (
                    <>
                      <NavLink href="/profile/data-diri" className="p-0">
                        <Button variant="link" className="p-0">
                          Data diri
                        </Button>
                      </NavLink>
                      <NavLink href="/profile/address" className="p-0">
                        <Button variant="link" className="p-0">
                          Alamat
                        </Button>
                      </NavLink>
                      <NavLink href="/profile/favorite" className="p-0">
                        <Button variant="link" className="p-0">
                          Favorit
                        </Button>
                      </NavLink>
                      <NavLink href="/profile/my-cart" className="p-0">
                        <Button variant="link" className="p-0">
                          Belanjaan saya
                        </Button>
                      </NavLink>
                    </>
                  ) : (
                    <NavLink href="/login" className="p-0">
                      <Button variant="link" className="p-0">
                        Masuk / Daftar
                      </Button>
                    </NavLink>
                  )}
                  <NavLink href="/faq" className="p-0">
                    <Button variant="link" className="p-0">
                      Pusat Solusi
                    </Button>
                  </NavLink>
                </div>
                <div className="sidenav-left-menu">
                  <Row>
                    <Col xs={6} className="pl-3 pr-1">
                      <MobileMenuButton
                        title="GIdA"
                        icon={IMAGES["Mobile Menu"]["gida-menu"]}
                        href="/gida"
                      />
                    </Col>
                    <Col xs={6} className="pr-3 pl-1">
                      <MobileMenuButton
                        title="1001 Inspirasi Kado"
                        icon={IMAGES["Mobile Menu"]["inspirasi-kado"]}
                        href="/1001-inspirasi-kado"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={6} className="pl-3 pr-1">
                      <MobileMenuButton
                        title="Kadoqu Holiday"
                        icon={IMAGES["Mobile Menu"]["holiday"]}
                        href="/kadoqu-holiday"
                      />
                    </Col>
                    <Col xs={6} className="pr-3 pl-1">
                      <MobileMenuButton
                        title="Company Celebration"
                        icon={IMAGES["Mobile Menu"]["company-celebration"]}
                        href="/company-celebration"
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col xs={6} className="pl-3 pr-1">
                      <MobileMenuButton
                        title="Magical Moment"
                        icon={IMAGES["Mobile Menu"]["magical-moment"]}
                        href="/magical-moment"
                      />
                    </Col>
                    <Col xs={6} className="pr-3 pl-1">
                      <MobileMenuButton
                        title="Kids Party"
                        icon={IMAGES["Mobile Menu"]["kids-party"]}
                        href="/kids-party"
                      />
                    </Col>
                    {/*<Col xs={12}*/}
                    {/*     className=" mt-3  pr-3 pl-1">*/}
                    {/*  {token && token.isSynced === false && (*/}
                    {/*    <NavLink>*/}
                    {/*      <GoogleLogin*/}
                    {/*        scope="https://www.googleapis.com/auth/user.birthday.read"*/}
                    {/*        clientId="296849474792-h49hljccnaeg7dh15dnb0lkb86m9mos4.apps.googleusercontent.com"*/}
                    {/*        buttonText="Sync Your Account"*/}
                    {/*        onSuccess={(r) => {*/}
                    {/*          // console.log(token);*/}
                    {/*          props.client.mutate({*/}
                    {/*            mutation: Mutation_auth_google,*/}
                    {/*            variables: {*/}
                    {/*              googleId: r.profileObj.googleId,*/}
                    {/*              accsesToken: r.tokenObj.access_token,*/}
                    {/*              userId: token.data*/}
                    {/*            }*/}
                    {/*          })*/}
                    {/*        }}*/}
                    {/*        onFailure={(r) => {*/}
                    {/*          console.log(r)*/}
                    {/*        }}*/}
                    {/*        cookiePolicy={'single_host_origin'}*/}
                    {/*      />*/}
                    {/*    </NavLink>*/}
                    {/*  )}*/}
                    {/*</Col>*/}
                  </Row>
                </div>

                <div
                  className={`text-center header-terms-and-policy ${
                    token
                      ? " header-terms-and-policy-after-login"
                      : " header-terms-and-policy-before-login"
                  }`}
                >
                  <NavLink href="/privacy-policy">Kebijakan Privacy</NavLink> |{" "}
                  <NavLink href="/terms-and-condition">
                    Syarat & Ketentuan
                  </NavLink>
                </div>

                {token && (
                  <div onClick={props.logout} className="header-sign-out ">
                    Keluar
                  </div>
                )}
              </div>
            </Container>
          </div>
        );
      } else {
        return <p>Loading</p>;
      }
    }}
  </Query>
);

class SearchBar extends React.Component {
  state = {
    value: "",
    suggestions: [],
    categoryList: [],
    subcategoryList: [],
    storeCategoryList: [],
    brandList: [],
    productList: [],
    filters: null,
  };

  componentWillMount() {
    this.onSuggestionsFetchRequested = debounce(
      100,
      this.onSuggestionsFetchRequested
    );
  }

  getSuggestions = (value) => {
    const escapedValue = value.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("^" + escapedValue, "i");

    const suggestions = [
      ...this.state.categoryList.filter((category) =>
        regex.test(category.name)
      ),
      ...this.state.storeCategoryList.filter((category) =>
        regex.test(category.name)
      ),
      ...this.state.subcategoryList.filter((subcategory) =>
        regex.test(subcategory.name)
      ),
      ...this.state.brandList.filter((brand) => regex.test(brand.name)),
      ...this.state.productList,
    ];

    return suggestions;
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.name;
  };

  renderSuggestion = (suggestion) => {
    if (suggestion.type === "brand") {
      return (
        <React.Fragment>
          Brand <strong>{capitalizeFirstLetter(suggestion.name)}</strong>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <strong>
          {capitalizeFirstLetter(suggestion.name)} <br />
        </strong>
        <span>
          {suggestion.category === "1001"
            ? "Kategori Hadiah"
            : "Kategori Holiday"}
        </span>
      </React.Fragment>
    );
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    const { client } = this.props;
    client
      .query({
        query: QUERY_GET_FILTERS,
        variables: {
          query: value.toLowerCase(),
        },
      })
      .then(
        ({
          data: {
            getParentCategories,
            getStoreCategories,
            getMerchants,
            searchProductHeader,
          },
        }) => {
          if (!getParentCategories && !getStoreCategories && !getMerchants) {
            return;
          }
          //
          let productSuggest = new Set();
          searchProductHeader.forEach((item) => {
            productSuggest.add({
              type: "product",
              name: item.name,
              merchant: item.merchant,
              category: item.holidayCategories.length <= 0 ? "1001" : "holiday",
            });
          });

          let brands = new Set();
          brands.add({ type: "brand", name: "Kadoqu.com" });
          getMerchants.forEach((merchant) => {
            brands.add({
              type: "brand",
              name: merchant.name,
            });
          });
          this.setState({
            // categoryList: Array.from(categories),
            // subcategoryList: Array.from(subcategories),
            // storeCategoryList: Array.from(storeCategories),
            brandList: Array.from(brands),
            productList: Array.from(productSuggest),
          });

          this.setState({
            suggestions: this.getSuggestions(value),
          });
        }
      )
      .catch((err) => {
        console.log("err", err);
      });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = (event, { suggestion, method }) => {
    let filters;
    let pathname = "/1001-inspirasi-kado/1";
    switch (suggestion.type) {
      case "gift": {
        // pathname = "/kadoqu-gift/1";
        if (suggestion.parent) {
          filters = {
            filterCategories: suggestion.parent,
            filterSubcategories: suggestion.name,
          };
        } else {
          filters = {
            filterCategories: suggestion.name,
          };
        }
        break;
      }
      case "store": {
        filters = {
          filterEvents: suggestion.name,
        };
        break;
      }
      case "brand": {
        filters = {
          filterBrands: suggestion.name,
        };
        break;
      }
      case "product":
        if (suggestion.category === "holiday") {
          pathname = `/kadoqu-holiday/1`;
          filters = {
            productName: suggestion.name,
          };
        } else {
          pathname = `/1001-inspirasi-kado/1`;
          filters = {
            productName: suggestion.name,
          };
        }
        break;
      default:
        break;
    }

    // console.log(suggestion.name.split(" ")[0]);
    this.setState({ filters: filters });
    if (method === "click") {
      this.props.history.push({
        pathname: pathname,
        search: queryString.stringify(filters),
        state: {search:this.state.value},
      });
      this.onSuggestionsClearRequested();
      this.setState({ value: "" });
    } else {
      this.props.history.push({
        pathname: pathname,
        search: queryString.stringify(filters),
        state: {search:this.state.value},
      });
      this.onSuggestionsClearRequested();
      this.setState({ value: "" });
    }
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Apa yang kamu cari?",
      value,
      onChange: this.onChange,
    };

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let isThisProductHoliday = 0;
          this.state.productList.forEach((item) => {
            if (item.category === "1001") {
              isThisProductHoliday--;
            } else {
              isThisProductHoliday++;
            }
          });

          if (isThisProductHoliday <= this.state.productList.length / 2 - 1) {
            this.props.history.push({
              pathname: "/1001-inspirasi-kado/1",
              search: queryString.stringify(
                this.state.filters || { others: this.state.value }
              ),
              state: {search:this.state.value},
            });
          } else {
            //comment this for a while untill text classfication working again
            // this.props.history.push({
            //   pathname: "/kadoqu-holiday/1",
            //   search: queryString.stringify(
            //     this.state.filters || { others: this.state.value }
            //   )
            // });
            this.props.history.push({
              pathname: "/1001-inspirasi-kado/1",
              search: queryString.stringify(
                this.state.filters || { others: this.state.value }
              ),
              state: {search:this.state.value},
            });
          }

          this.onSuggestionsClearRequested();
          this.setState({ value: "", filters: null });
        }}
      >
        <Autosuggest
          suggestions={suggestions}
          inputProps={inputProps}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
          renderSuggestion={this.renderSuggestion}
        />
      </form>
    );
  }
}

const Header = (props) => {
  const toggleSideNav = () => {
    const sideNav = document.getElementById("mySidenav");
    if (sideNav.style.maxWidth === "0px") {
      sideNav.style.maxWidth = "100%";
      document.getElementById("root").classList.add("stop-scrolling");
    } else {
      sideNav.style.maxWidth = "0px";
      document.getElementById("root").classList.remove("stop-scrolling");
    }
  };
  const logout = () => {
    Promise.all([
      props.client.mutate({
        mutation: MUTATION_REMOVE_TOKEN,
        refetchQueries: [
          { query: QUERY_GET_TOKEN },
          { query: QUERY_GET_TOKEN_CART },
        ],
      }),
      // ,
      // props.client.mutate({
      //   mutation: MUTATION_EMPTY_CART,
      //   refetchQueries: [{ query: QUERY_GET_CART_ITEMS }]
      // })
    ])
      .then(() => {
        localStorage.setItem("guestId", uuidv4());
        props.history.push({
          pathname: "/",
        });
        PopUpLogOut();
      })
      .catch((error) => console.log(error));
  };
  return (
    <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
      {(isDesktop) => (
        <React.Fragment>
          <Container
            fluid
            className={`header header-${
              (!isDesktop && props.theme !== "gida") || !props.theme
                ? "default"
                : props.theme
            }-theme pt-1`}
          >
            <Row className={isDesktop ? "p-4" : "p-2"} noGutters={!isDesktop}>
              <Col
                xs={isDesktop ? 2 : 3}
                className="navigation-container d-flex justify-content-center align-items-center"
              >
                <NavLink href="/" className="p-0">
                  <img
                    alt="Kadoqu.com"
                    className="header-logo"
                    src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png"
                  />
                </NavLink>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <div className={`header-nav-item${!isDesktop ? " w-100" : ""}`}>
                  <SearchBar client={props.client} history={props.history} />
                </div>
                {isDesktop ? (
                  <React.Fragment>
                    <Query query={QUERY_GET_TOKEN_CART}>
                      {({ loading, error, data }) => {
                        let token, banyakKeranjang;
                        if (typeof data !== "undefined") {
                          token = jwt.decode(data.getToken);
                          banyakKeranjang = data.getCartLength;
                        }
                        if (loading || error || !token) {
                          return (
                            <>
                              <NavLink href="/cart" className="header-nav-item">
                                <NotificationBadge
                                  count={banyakKeranjang}
                                  style={style}
                                />
                                <img
                                  className="cursor-pointer"
                                  alt="cart"
                                  src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_basket_cart_1.png"
                                />
                              </NavLink>
                              <NavLink
                                href="/login"
                                className="header-nav-item"
                              >
                                <img
                                  className="header-guest"
                                  alt="Login"
                                  src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_signin_1.png"
                                />
                              </NavLink>
                            </>
                          );
                        }
                        return (
                          <>
                            <NavLink href="/cart" className="header-nav-item">
                              <NotificationBadge
                                count={banyakKeranjang || 0}
                                style={style}
                              />
                              <img
                                className=" cursor-pointer"
                                alt="cart"
                                src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_basket_cart_1.png"
                              />
                            </NavLink>
                            <OverlayTrigger
                              trigger="click"
                              rootClose
                              placement="bottom"
                              overlay={
                                <Popover id="header-user-popover">
                                  <div
                                    onClick={() =>
                                      document
                                        .getElementById("header-user-icon")
                                        .click()
                                    }
                                  >
                                    <div className="header-user-popover-upper-section text-center">
                                      <h4 className="m-0">{token.name}</h4>
                                    </div>
                                    <div className="header-user-popover-lower-section font-weight-light">
                                      <NavLink href="/profile">
                                        Data diri
                                      </NavLink>
                                      <NavLink href="/profile/address">
                                        Alamat
                                      </NavLink>
                                      <NavLink href="/profile/favorite">
                                        Favorit
                                      </NavLink>
                                      <NavLink href="/profile/my-cart">
                                        Belanjaan saya
                                      </NavLink>
                                      <NavLink href="/faq">
                                        Pusat solusi
                                      </NavLink>
                                      {token && token.isSynced === false && (
                                        <NavLink>
                                          <GoogleLogin
                                            scope="https://www.googleapis.com/auth/user.birthday.read"
                                            clientId="296849474792-h49hljccnaeg7dh15dnb0lkb86m9mos4.apps.googleusercontent.com"
                                            buttonText="Sync Your Account"
                                            onSuccess={(r) => {
                                              // console.log(token.data);
                                              props.client.mutate({
                                                mutation: Mutation_auth_google,
                                                variables: {
                                                  googleId:
                                                    r.profileObj.googleId,
                                                  accsesToken:
                                                    r.tokenObj.access_token,
                                                  userId: token.data,
                                                },
                                              });
                                            }}
                                            onFailure={(r) => {
                                              console.log(r);
                                            }}
                                            cookiePolicy={"single_host_origin"}
                                          />
                                        </NavLink>
                                      )}

                                      <Button
                                        block
                                        className="kadoqu-primary-button mt-3"
                                        onClick={logout}
                                      >
                                        Keluar
                                      </Button>
                                    </div>
                                  </div>
                                </Popover>
                              }
                            >
                              <img
                                className="header-user header-nav-item cursor-pointer"
                                id="header-user-icon"
                                alt="User"
                                src={photoProfile[token.photo]}
                              />
                            </OverlayTrigger>
                          </>
                        );
                      }}
                    </Query>
                  </React.Fragment>
                ) : (
                  <Button variant="link" onClick={() => toggleSideNav()}>
                    <i className="header-burger-button fas fa-bars" />
                  </Button>
                )}
              </Col>
            </Row>
          </Container>
          {!isDesktop && (
            <MobileHeaderDrawer logout={logout} toggleSideNav={toggleSideNav} />
          )}
        </React.Fragment>
      )}
    </MediaQuery>
  );
};

export default withRouter(withApollo(Header));
