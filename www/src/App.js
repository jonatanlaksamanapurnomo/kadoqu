import React from "react";
import { Helmet } from "react-helmet";
import { ApolloProvider } from "react-apollo";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LeftMenu from "./components/LeftMenu";
import Home from "./pages/Home";
import Customer from "./pages/Customer";
import Gallery from "./pages/Gallery";
import GidaMenu from "./pages/GidaMenu";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import GiftInspiration from "./pages/GiftInspiration";
import Checkout from "./pages/Checkout";
import ApolloClient from "apollo-boost";
import UserProfile from "./pages/UserProfile";
import GidaNotFound from "./pages/GidaNotFound";
import GidaResult from "./pages/GidaResult";
import GidaStart from "./pages/GidaStart";
import GidaCriteriaInput from "./pages/GidaCriteriaInput";
import WrappingLab from "./pages/WrappingLab";
import Addresses from "./pages/Addresses";
import Faq from "./pages/Faq";
import OrderThankYou from "./pages/OrderThankYou";
import Error404 from "./pages/Error404";
import ErrorUnderConstruction from "./pages/ErrorUnderConstruction";
import PrivateRoute from "./Middlewares/PrivateRoute";
import Rating from "./pages/Rating";
import AboutUs from "./pages/AboutUs";
import MerchantCallout from "./pages/MerchantCallout";
import KadoPahlawan from "./pages/KadoPahlawan";
import PasswordReset from "./pages/PasswordReset";
import Swal from "sweetalert2";
// import CompanyCelebration from "./pages/CompanyCelebration";
import KadoquHoliday from "./pages/KadoquHolidayPage";
import MagicalMoment from "./pages/MagicalMoment";
import KidsParty from "./pages/KidsParty";
import Career from "./pages/Career";
import CareerDetail from "./pages/Career-detail";
import { isLoggedIn, isExpired } from "./utils/userChecker";
import Partner from "./pages/Partner";
import MagicalMomentForm from "./pages/MagicalMomentForm";
import Merchant from "./pages/Merchant";
import {
  GENERATE_NEW_TOKEN,
  MUTATION_SET_TOKEN,
  QUERY_GET_TOKEN,
  MUTATION_REMOVE_TOKEN
} from "./gql/token";
import "./App.css";
import ReactGA from "react-ga";
import IMAGES from "./data/images";
import withTracker from "./Middlewares/withTracker";
import RegisterVerificationPage from "./pages/RegisterVerificationPage";
import PaymentConfirmation from "./components/PaymentConfirmation";
import Chat from "./components/Chat";
import Promotion from "./pages/Promotion";

let localstorage = window.localStorage;
const client = new ApolloClient({
  uri: process.env.REACT_APP_GATEWAY_URL || "http://localhost:4000",
  request: async operation => {
    let token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  resolvers: {
    Query: {
      getCartLength: () => {
        let res = 0;
        if (localstorage.hasOwnProperty("cart")) {
          const arr = JSON.parse(localStorage.cart);
          res = arr.items.length + arr.packages.length;
        }
        return res;
      },
      getToken: () => {
        if (localstorage.hasOwnProperty("token")) {
          return localstorage.getItem("token");
        }
        return {};
      },
      getCart: () => {
        return (
          JSON.parse(localstorage.getItem("cart")) || {
            items: [],
            packages: []
          }
        );
      },
      getCartSelectedItem: () => {
        return (
          JSON.parse(localstorage.getItem("selectedCart")) || {
            items: [],
            packages: []
          }
        );
      },
      getSelectedCart: () => {
        return (
          JSON.parse(localStorage.getItem("selectedCart")) || {
            items: [],
            packages: []
          }
        );
      },
      getCartItems: () => {
        const cart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        return cart.items || [];
      },
      getCartPackages: () => {
        const cart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        return cart.packages || [];
      },
      getOrderDetail: (_, { no }) => {
        let orders = JSON.parse(localstorage.getItem("orders"));
        let order = orders.find(e => e.no === parseInt(no));
        if (order) {
          return order;
        } else {
          return orders.slice(-1)[0];
        }
      }
    },
    Mutation: {
      setToken: (_, { token }) => {
        return localstorage.setItem("token", token);
      },
      setGoogleToken: (_, { token }) => {
        return localstorage.setItem("google_token", token);
      },
      removeToken: () => {
        return localstorage.removeItem("token");
      },
      addCartItem: (
        _,
        {
          idProduct,
          slug,
          quantity,
          productName,
          merchant,
          price,
          capitalPrice,
          discountPrice,
          image,
          weight,
          length,
          width,
          height,
          categories,
          storeCategories,
          shippingSupports,
          date,
          day,
          isiUcapan,
          photos,
          customerNotes,
          customeColor,
          isCustomeOrder,
          customeOrderId,
          magicalMomentData,
          minQty,
          multipleQty,
          isDigital,
          gidaOption,
          search
        }
      ) => {
        let newCartItem = {
          idProduct,
          slug,
          quantity,
          productName,
          merchant,
          price,
          capitalPrice,
          discountPrice,
          image,
          weight,
          length,
          width,
          height,
          categories,
          storeCategories,
          shippingSupports,
          date,
          day,
          isiUcapan,
          photos,
          customerNotes,
          customeColor,
          isCustomeOrder,
          customeOrderId,
          magicalMomentData,
          minQty,
          multipleQty,
          isDigital,
          gidaOption,
          search
        };
        if (!isDigital) {
          let currentCart = JSON.parse(localstorage.getItem("cart")) || {
            items: [],
            packages: []
          };
          let arr = currentCart.items || [];
          let idx = -1;
          if (arr.length > 0) {
            arr.forEach((e, idxTemp) => {
              if (
                e.idProduct === newCartItem.idProduct &&
                !e.isCustomeOrder &&
                (!e.date ||
                  JSON.stringify(e.date) ===
                  JSON.stringify(newCartItem.date)) &&
                (!e.day || e.day === newCartItem.day)
              ) {
                idx = idxTemp;
              }
            });
            if (idx === -1) {
              arr.push(newCartItem);
            } else {
              arr[idx].quantity += newCartItem.quantity;
            }
          } else {
            arr.push(newCartItem);
          }

          return localstorage.setItem(
            "cart",
            JSON.stringify({ ...currentCart, items: arr })
          );
        } else {
          let cart = {
            items: [newCartItem],
            packages: []
          };

          return localstorage.setItem("selectedCart", JSON.stringify(cart));
        }
      },
      updateCartItem: (_, { customeOrderId, newQuantity }) => {
        let currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        if (newQuantity <= 0) {
          return localstorage.setItem(
            "cart",
            JSON.stringify({
              ...currentCart,
              items: currentCart.items.filter(
                el => el.customeOrderId !== customeOrderId
              )
            })
          );
        }
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            ...currentCart,
            items: currentCart.items.map(el => {
              if (el.customeOrderId !== customeOrderId) {
                return el;
              }
              return Object.assign(el, { quantity: newQuantity });
            })
          })
        );
      },
      deleteCartItem: (_, { customeOrderId }) => {
        let currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            ...currentCart,
            items: currentCart.items.filter(
              el => el.customeOrderId !== customeOrderId
            )
          })
        );
      },
      addCartPackage: (_, { wrapper, ribbon, items, greetingCard }) => {
        const newPackage = {
          id: ~~(Date.now() / 1000),
          wrapper: {
            typeId: wrapper.type.id,
            type: wrapper.type.name,
            wrapperId: wrapper.instance.id,
            name: wrapper.instance.name || null,
            price: wrapper.type.price,
            image: wrapper.instance.url || wrapper.type.thumbnail
          },
          ribbon: ribbon.type
            ? {
              typeId: ribbon.type.id,
              type: ribbon.type.name,
              ribbonId: ribbon.instance.id,
              name: ribbon.instance.name || null,
              price: ribbon.type.price,
              image: ribbon.instance.url || ribbon.type.thumbnail
            }
            : null,
          greetingCard: greetingCard.event
            ? {
              event: greetingCard.event,
              greetings: greetingCard.content
            }
            : null,
          items
        };
        const currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        const currentPackage = currentCart.packages || [];
        //subtract from cart
        const newItems = currentCart.items
          .map(cartItem => {
            let wrappedItem = items.find(
              item => item.customeOrderId === cartItem.customeOrderId
            );
            if (!wrappedItem) {
              return cartItem;
            }
            let updatedItem = cartItem;
            updatedItem.quantity -= wrappedItem.quantity;
            return updatedItem;
          })
          .filter(cartItem => cartItem.quantity > 0);
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            items: newItems,
            packages: currentPackage.concat(newPackage)
          })
        );
      },
      updateCartPackageItem: (_, { packageId, idProduct, newQuantity }) => {
        const currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        let intendedPackage = currentCart.packages.find(
          el => el.id === packageId
        );
        if (!intendedPackage) {
          return;
        }
        let newItems = [];
        if (newQuantity <= 0) {
          newItems = intendedPackage.items.filter(
            item => item.idProduct !== idProduct
          );
          if (newItems.length === 0) {
            return localstorage.setItem(
              "cart",
              JSON.stringify({
                ...currentCart,
                packages: currentCart.packages.filter(el => el.id !== packageId)
              })
            );
          }
        } else {
          newItems = intendedPackage.items.map(item => {
            if (item.idProduct !== idProduct) {
              return item;
            }
            return Object.assign(item, { quantity: newQuantity });
          });
        }
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            ...currentCart,
            packages: currentCart.packages.map(el =>
              el.id !== packageId
                ? el
                : Object.assign(intendedPackage, { items: newItems })
            )
          })
        );
      },
      deleteCartPackageItem: (_, { packageId, idProduct }) => {
        let currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        const intendedPackage = currentCart.packages.find(
          el => el.id === packageId
        );
        if (!intendedPackage) {
          return;
        }
        const newItems = intendedPackage.items.filter(
          item => item.idProduct !== idProduct
        );
        // return to cart
        let arr = currentCart.items || [];
        const returnedItem = intendedPackage.items.find(
          item => item.idProduct === idProduct
        );
        let idx = -1;
        if (arr.length > 0) {
          arr.forEach((item, currentIdx) => {
            if (item.idProduct === idProduct) {
              idx = currentIdx;
            }
          });
          if (idx === -1) {
            arr.push(returnedItem);
          } else {
            arr[idx].quantity += returnedItem.quantity;
          }
        } else {
          arr.push(returnedItem);
        }
        if (newItems.length === 0) {
          return localstorage.setItem(
            "cart",
            JSON.stringify({
              items: arr,
              packages: currentCart.packages.filter(el => el.id !== packageId)
            })
          );
        }
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            items: arr,
            packages: currentCart.packages.map(el =>
              el.id !== packageId
                ? el
                : Object.assign(intendedPackage, { items: newItems })
            )
          })
        );
      },
      deleteCartPackage: (_, { packageId }) => {
        let currentCart = JSON.parse(localstorage.getItem("cart")) || {
          items: [],
          packages: []
        };
        // return to cart
        const intendedPackage = currentCart.packages.find(
          el => el.id === packageId
        );
        if (!intendedPackage) {
          return;
        }
        let arr = currentCart.items || [];
        intendedPackage.items.forEach(item => {
          if (arr.length === 0) {
            arr.push(item);
            return;
          }
          let idx = -1;
          arr.forEach((el, currentIdx) => {
            if (el.idProduct === item.idProduct) {
              idx = currentIdx;
            }
          });
          if (idx === -1) {
            arr.push(item);
          } else {
            arr[idx].quantity += item.quantity;
          }
        });
        return localstorage.setItem(
          "cart",
          JSON.stringify({
            items: arr,
            packages: currentCart.packages.filter(el => el.id !== packageId)
          })
        );
      },
      emptyCart: () => {
        return localstorage.setItem(
          "cart",
          JSON.stringify({ items: [], packages: [] })
        );
      },
      emptySelectedCart: () => {
        let cart = JSON.parse(localstorage.getItem("cart"));
        let selectedCart = JSON.parse(localstorage.getItem("selectedCart"));
        cart.items = cart.items.filter(
          item =>
            !selectedCart.items.some(
              item2 => item.idProduct === item2.idProduct
            )
        );
        cart.packages.forEach(paket1 => {
          selectedCart.packages.forEach(paket2 => {
            if (paket1.id === paket2.id) {
              paket1.items = paket1.items.filter(
                item =>
                  !paket2.items.some(
                    item2 => item.idProduct === item2.idProduct
                  )
              );
            }
          });
        });
        cart.packages = cart.packages.filter(item => item.items.length > 0);
        localstorage.setItem("cart", JSON.stringify(cart));
        return localstorage.setItem(
          "selectedCart",
          JSON.stringify({ items: [], packages: [] })
        );
      },
      saveOrderDetail: (
        _,
        { id, no, total, paymentMethod, orderStatusId, createdAt, updatedAt }
      ) => {
        let order = {
          id,
          no,
          total,
          paymentMethod,
          orderStatusId,
          createdAt,
          updatedAt
        };
        let arr = [];
        let orders = localStorage.getItem("orders");
        if (orders) {
          arr = JSON.parse(orders);
        }
        arr.push(order);
        return localstorage.setItem("orders", JSON.stringify(arr));
      }
    }
  }
});

console.image = function(url, size = 100) {
  var image = new Image();
  image.onload = function() {
    var style = [
      "font-size: 1px;",
      "padding: " +
      (this.height / 100) * size +
      "px " +
      (this.width / 100) * size +
      "px;",
      "background: url(" + url + ") no-repeat;",
      "background-size: contain;"
    ].join(" ");
    console.log(
      "%c Powered By Kadoqu",
      "color: #00998d; font-family: sans-serif; font-size: 2em"
    );
    console.log("%c ", style);
  };
  image.src = url;
};

class App extends React.Component {
  componentDidMount() {
    ReactGA.initialize("UA-153573254-1");
    ReactGA.timing({
      category: "JS Libraries",
      variable: "load",
      value: 20, // in milliseconds
      label: "CDN libs"
    });

    //jangan di hapus yaa gengs :D --joo
    console.image(
      "https://ik.imagekit.io/nwiq66cx3pvsy/Landing_Page/gida-ide-kado-gida.png",
      15
    );

    if (isLoggedIn()) {
      client
        .query({
          query: QUERY_GET_TOKEN
        })
        .then(token => {
          client
            .mutate({
              mutation: GENERATE_NEW_TOKEN,
              variables: {
                input: token.data.getToken
              }
            })
            .then(token => {
              client.mutate({
                mutation: MUTATION_SET_TOKEN,
                variables: {
                  token: token.data.generatenewtoken
                },
                refetchQueries: [{ query: QUERY_GET_TOKEN }]
              });
            });
        });
    }
    if (isExpired()) {
      Swal.fire({
        customClass: {
          container: "pop-up-main-backdrop",
          popup: "pop-up-logout-container",
          title: "kadoqu-primary-color"
        },
        showConfirmButton: false,
        timer: 3000,
        title: "Session Timeout",
        text: "You've been time out due to inactivity",
        imageUrl: IMAGES["Modal With GIdA"].flower,
        imageAlt: "Success!",
        imageWidth: 100
      });
      client.mutate({
        mutation: MUTATION_REMOVE_TOKEN,
        refetchQueries: [{ query: QUERY_GET_TOKEN }]
      });
    }
  }

  render() {
    return (
      <Router>
        <ApolloProvider client={client}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Header theme="transparent-default"/>}
            />
            <Route
              path="/gida-search-engine"
              render={() => <Header theme="gida"/>}
            />
            <Route
              path="/magical-moment"
              render={() => <Header theme="gida"/>}
            />
            <Route path={"/"} component={Header}/>
          </Switch>
          <Route component={withTracker(LeftMenu)}/>

          <Switch>
            <Route path="/" exact component={withTracker(Home)}/>
            <Route path="/404" exact component={withTracker(Error404)}/>
            <Route path="/gallery" component={withTracker(Gallery)}/>
            <Route path="/customers" component={withTracker(Customer)}/>
            <Route path="/gida" component={withTracker(GidaMenu)} exact/>
            <Route path="/login" component={withTracker(Login)}/>
            <Route path="/register" component={withTracker(Register)}/>
            <PrivateRoute path="/cart" component={withTracker(Cart)}/>
            <Route path="/about-us" component={withTracker(AboutUs)}/>
            <Route
              path="/merchant-callout"
              component={withTracker(MerchantCallout)}
            />
            <Route
              path="/kado-pahlawan"
              component={withTracker(KadoPahlawan)}
            />
            <Route path="/career" component={withTracker(Career)}/>

            <PrivateRoute
              path="/payment-confirmation"
              component={withTracker(PaymentConfirmation)}
            />
            <Route
              path="/Career-detail/:id"
              component={withTracker(CareerDetail)}
            />
            <Route path="/Merchant/:id" component={withTracker(Merchant)}/>

            <Route
              path="/magical-moment"
              component={withTracker(MagicalMoment)}
            />
            <Route
              path="/register-status/:status"
              component={withTracker(RegisterVerificationPage)}
            />
            {/*<Route*/}
            {/*  path="/company-celebration"*/}
            {/*  component={withTracker(CompanyCelebration)}*/}
            {/*/>*/}
            <Route
              path="/company-celebration"
              component={withTracker(ErrorUnderConstruction)}
            />
            <Route path="/kids-party" component={withTracker(KidsParty)}/>
            <Route
              path="/Forget-Password/:token"
              component={withTracker(PasswordReset)}
            />
            <Route
              path="/gida-search-engine/start"
              component={withTracker(GidaStart)}
            />
            <Route
              path="/gida-search-engine/criteria"
              component={withTracker(GidaCriteriaInput)}
            />
            <Route
              path="/gida-search-engine/result"
              component={withTracker(GidaResult)}
            />
            <Route
              path="/gida-search-engine/not-found"
              component={withTracker(GidaNotFound)}
            />
            <Redirect
              path="/gida-search-engine"
              to="/gida-search-engine/start"
            />

            <Route path="/faq" component={Faq}/>
            <Route
              path="/thank-you/:no"
              component={withTracker(OrderThankYou)}
            />
            <Route
              path="/MagicalMoment/form/:slug"
              component={withTracker(MagicalMomentForm)}
            />
            <PrivateRoute
              path="/profile"
              component={withTracker(UserProfile)}
            />
            <Route
              path="/1001-inspirasi-kado"
              exact
              render={() => <Redirect to="/1001-inspirasi-kado/1"/>}
            />
            <Route
              path="/1001-inspirasi-kado/:page"
              exact
              component={withTracker(GiftInspiration)}
            />
            <Route
              path="/kadoqu-holiday"
              exact
              render={() => <Redirect to="/kadoqu-holiday/1"/>}
            />

            <Route
              path="/kadoqu-holiday/:page"
              exact
              component={withTracker(KadoquHoliday)}
            />
            {/* <Route
              path="/kadoqu-gift"
              exact
              render={() => <Redirect to="/kadoqu-gift/1" />}
            /> */}
            {/* <Route path="/kadoqu-gift/:page" exact component={KadoquGift} /> */}
            <Route
              path="/product/:slug"
              exact
              component={withTracker(ProductDetail)}
            />
            <PrivateRoute path="/checkout" component={withTracker(Checkout)}/>
            <Route path="/wrapping-lab" component={withTracker(WrappingLab)}/>
            <Route path="/Partner" component={withTracker(Partner)}/>

            <Route
              path="/(event-reminder|privacy-policy|terms-and-condition)"
              exact
              component={withTracker(ErrorUnderConstruction)}
            />
            {/* <Route path="/profile" component={ErrorUnderConstruction} /> */}
            <Route path="/addresses" component={withTracker(Addresses)}/>
            <PrivateRoute path="/rating/:id?" component={withTracker(Rating)}/>
            <Route
              exact
              path="/promotion/:slug"
              render={props => (
                <Redirect to={`/promotion/${props.match.params.slug}/1`}/>
              )}
            />
            <Route
              exact
              path="/promotion/:slug/:page"
              component={withTracker(Promotion)}
            />

            {/* Classify everything else as not found */}
            <Redirect path="/" to="/404"/>
          </Switch>
          {/* <RightCart /> */}
          <Switch>
            <Route path="/gida-search-engine" render={null}/>
            <Route path="/" component={Footer}/>
          </Switch>
          <Switch>
            <Route
              exact
              path="/about-us"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/merchant-callout"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/kado-pahlawan"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/kado-pahlawan"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              path="/MagicalMoment/form/:slug"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/magical-moment"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              path="/Merchant/:id"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/company-celebration"
              render={() => {
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              path="/Forget-Password"
              render={() => {
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/Career"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />
            <Route
              exact
              path="/Career-detail"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = " var(--grey-5)";
                return null;
              }}
            />

            <Route
              exact
              path="/(cart|checkout)"
              render={() => {
                document.body.style.backgroundImage =
                  "-webkit-linear-gradient(-90deg, #d1eff7 0vh, #d1eff7 50vh, #f9f9f9 50vh, #f9f9f9 70vh)";
                return null;
              }}
            />
            <Route
              exact
              path="/faq"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = "white";
                return null;
              }}
            />
            <Route
              path="/gida-search-engine"
              render={() => {
                document.body.style.backgroundImage =
                  "-webkit-linear-gradient(top, #27186b 0%, #4c2580 30%, #4c2580 70%, #27186b 100% )";
                return (
                  <Helmet>
                    <title>Kadoqu.com | GIdA Search Engine</title>
                  </Helmet>
                );
              }}
            />
            <Route
              exact
              path="/(wrapping-lab|404)"
              render={() => {
                document.body.style.backgroundImage = "none";
                document.body.style.backgroundColor = "#f9f9f9";
                return null;
              }}
            />
            <Route
              path="/"
              render={() => {
                document.body.style.backgroundImage =
                  "-webkit-linear-gradient(172deg, #d1eff7 0%, #d1eff7 50%, #f9f9f9 50%, #f9f9f9 50%)";
                return null;
              }}
            />
          </Switch>
          {/* <Route component={ChatBot} /> */}
          <Route component={Chat}/>
        </ApolloProvider>
      </Router>
    );
  }
}

export default App;
