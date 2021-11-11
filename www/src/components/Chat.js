import React from "react";
import {
  Widget,
  addResponseMessage,
  renderCustomComponent,
  toggleInputDisabled,
  dropMessages,
  toggleWidget
} from "react-chat-widget";
import { Query } from "react-apollo";
// import gql from "graphql-tag";
import { Row, Col, Image, Spinner } from "react-bootstrap";
import { myFirestore, myFirebase } from "../library/firebase";
import { QUERY_GET_PRODUCTS } from "../gql/elasticsearch";
import IMAGES from "../data/images";
import { AppString } from "../data/constants";
import { getUserLogin } from "../utils/userChecker";
import showTransformationsPhoto from "../library/ShowImageTransformation";
import { rpFormat } from "../utils/currencyFormatter";

import "react-chat-widget/lib/styles.css";
import "./Chat.css";
import "./ChatBot.css";

// const QUERY_GET_PRODUCTS = gql`
//   query getProductsData(
//     $sortingField: String
//     $isAscending: Boolean
//     $filters: FiltersInput
//     $limit: Int
//     $offset: Int
//   ) {
//     getAvailableProducts(
//       sortingField: $sortingField
//       isAscending: $isAscending
//       filters: $filters
//       limit: $limit
//       offset: $offset
//     ) {
//       length
//       products {
//         id
//         name
//         slug
//         merchant
//         inStock
//         price
//         discountPrice
//         isFavorite
//         isPo
//         newToDate
//         merchantDiscountUntil
//         kadoquDiscountUntil
//         photos {
//           url
//         }
//       }
//     }
//   }
// `;

const ProductItem = props => {
  const {
    slug,
    photo,
    name,
    merchant,
    price,
    discountPrice
    // isPo,
    // newToDate,
    // kadoquDiscountUntil,
    // merchantDiscountUntil
  } = props.details;
  // const isSale =
  //   (kadoquDiscountUntil || merchantDiscountUntil) &&
  //   (new Date(kadoquDiscountUntil) > new Date() ||
  //     new Date(merchantDiscountUntil) > new Date());

  return (
    <div
      className="chatbot-product-box cursor-pointer"
      onClick={() => {
        props.history.push("/product/" + slug);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }}
    >
      <div className="chatbot-product-image-container">
        <img
          className="chatbot-product-image"
          src={showTransformationsPhoto(200, 200, photo)}
          alt={name}
        />
      </div>
      <div className="chatbot-product-description">
        <div className="chatbot-product-merchant">{merchant}</div>
        <div className="chatbot-product-title">{name}</div>
        <div className="product-item-price">
          <div className="product-price-container">
            <div className="product-price">{rpFormat(price)}</div>
            {discountPrice && <div className="product-price-strikethrough" />}
          </div>
          {discountPrice && (
            <div className="product-price product-price-discount">
              {rpFormat(discountPrice)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductNotFoundNotice = props => (
  <Row>
    <Col xs={12} className="text-center">
      <Image
        className="w-50"
        src={IMAGES["Error Page"]["product-not-found"]}
        alt="Product not found"
      />
    </Col>
    <Col xs={12} className="text-center">
      <h3 className="kadoqu-primary-color font-weight-bold mb-0">
        GIdA gak nemu barangnya
      </h3>
      <div className="font-weight-light">Coba pakai kata lain</div>
    </Col>
  </Row>
);

const ImageItem = props => (
  <a href={props.src} rel="noopener noreferrer" target="_blank">
    <img className="image-item" src={props.src} alt="img"></img>
  </a>
);

const StickerItem = props => (
  <img className="image-item" src={props.src} alt="img"></img>
);

const LoginMessage = props => (
  <div className="rcw-response">
    <div className="rcw-message-text">
      <p>Silahkan login terlebih dahulu ya :)</p>
      <p>
        Klik{" "}
        <span
          className="cursor-pointer"
          onClick={() => {
            props.history.push("/login");
            toggleWidget();
          }}
        >
          <strong>
            <u>disini</u>
          </strong>
        </span>{" "}
        untuk menuju halaman login
      </p>
    </div>
  </div>
);

class Product extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: props.count,
      product: props.product,
      trigger: false,
      slidingState: {
        startX: 0,
        currentScrollLeft: 0,
        isDown: false
      }
    };
  }

  triggerNext = () => {
    if (!this.state.trigger)
      this.setState({ trigger: true }, () =>
        this.props.triggerNextStep(this.state.count)
      );
  };

  startSliding = e => {
    e.preventDefault();
    const slider = this.container;
    slider.classList.add("active");
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: true,
        startX: e.pageX,
        currentScrollLeft: slider.scrollLeft
      })
    });
  };

  stopSliding = () => {
    this.setState({
      slidingState: Object.assign(this.state.slidingState, {
        isDown: false
      })
    });
    const slider = this.container;
    slider.classList.remove("active");
  };

  onSliding = e => {
    if (!this.state.slidingState.isDown) {
      return;
    }
    const slider = this.container;
    const walk = (e.pageX - this.state.slidingState.startX) * 1.4;
    this.setState({}, () => {
      slider.scrollLeft = this.state.slidingState.currentScrollLeft - walk;
    });
  };

  render() {
    const { product, trigger } = this.state;
    // const query = {
    //   query: QUERY_GET_PRODUCTS,
    //   variables: {
    //     sortingField: "created_at",
    //     isAscending: false,
    //     filters: {
    //       others: product
    //     }
    //   }
    // };
    const query = {
      query: QUERY_GET_PRODUCTS,
      variables: {
        filter: {
          from: 0,
          others: product
        }
      }
    };

    return (
      <Query {...query}>
        {({ loading, error, data }) => {
          if (loading)
            return (
              <div className="w-100 text-center">
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            );
          if (error) return <p>{error.message || error}</p>;
          const { length, products } = data.searchProducts;
          if (!trigger) this.triggerNext();
          if (length === 0) return <ProductNotFoundNotice />;

          return (
            <div
              ref={el => (this.container = el)}
              className="chatbot-scrolling-wrapper"
              onMouseDown={this.startSliding}
              onMouseLeave={this.stopSliding}
              onMouseUp={this.stopSliding}
              onMouseMove={this.onSliding}
            >
              {products.map((product, idx) => (
                <ProductItem
                  key={idx}
                  details={{
                    ...product,
                    photo: product.photos[0] ? product.photos[0].url : ""
                  }}
                  history={this.props.history}
                />
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}

let user = getUserLogin();
let steps = [
  {
    id: "1",
    message:
      (user ? `Hello, ${user.name}! ` : "") + "Selamat datang di Kadoqu.com!",
    trigger: "Menu"
  },
  {
    id: "Menu",
    message: "Ada yang bisa GIdA bantu?",
    trigger: "Menu-2"
  },
  {
    id: "Menu-2",
    options: [
      { value: "1", label: "Cari Produk", trigger: "Product" },
      { value: "2", label: "Customer Service", trigger: "CS" },
      { value: "3", label: "Selesai", trigger: "End" }
    ]
  },
  {
    id: "Product",
    message: "Produk apa yang ingin kamu cari?",
    trigger: "Product-2"
  },
  {
    id: "Product-2",
    user: true,
    trigger: "Menu"
  },
  {
    id: "CS",
    message: user ? "Apa yang ingin kamu tanyakan pada GIdA?" : null,
    // : "Silahkan login terlebih dahulu ya :)",
    trigger: user ? "Chat" : "Menu"
  },
  {
    id: "Chat",
    user: true,
    trigger: "Menu"
  },
  {
    id: "End",
    message: "Terima kasih sudah chat dengan GIdA. Senang membantu kakak. :)",
    end: true
  }
];

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const renderStep = async id => {
  while (true) {
    // console.log(id);
    // eslint-disable-next-line no-loop-func
    let step = steps.find(e => e.id === id);
    if (!step) return;
    await sleep(1200);
    if (id === "CS") {
      const date = new Date(Date.now() + 7 * 3600000);
      const day = date.getUTCDay();
      const hours = date.getUTCHours();
      if (
        !(
          ([1, 2, 3, 4, 5].includes(day) && hours >= 9 && hours <= 17) ||
          (day === 6 && hours >= 9 && hours <= 14)
        )
      ) {
        addResponseMessage(
          "Mohon maaf GIdA sedang tidak di tempat.  \n" +
            "GIdA akan tersedia pada hari dan jam :  \n" +
            "Senin-Jumat : 09.00-17.00  \n" +
            "Sabtu : 09.00-14.00  \n" +
            "Tgl merah : off"
        );

        step = steps.find(e => e.id === "Menu");
        await sleep(1200);
      }
    }
    if (step.message) {
      addResponseMessage(step.message);
      if (step.end) return { id: id, step: step };
      id = step.trigger;
    } else if (step.options) {
      const message = step.options
        .map(e => e.value + ". " + e.label)
        .join("\n");
      addResponseMessage(message);
      return { id: id, step: step };
    } else {
      return { id: id, step: step };
    }
  }
};

class ReadListener extends React.Component {
  componentDidMount() {
    this.props.onOpen();
  }

  componentWillUnmount() {
    this.props.onClose();
  }

  render() {
    return null;
  }
}

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      id: "1",
      step: {},
      isOpened: false,
      isLoading: false,
      isFirstChat: true
    };

    this.removeListener = null;
  }

  componentDidMount() {
    renderCustomComponent(ReadListener, {
      onOpen: this.chatOpenedHandler,
      onClose: this.chatClosedHandler
    });
  }

  chatOpenedHandler = () => {
    // console.log("opened");
    if (JSON.stringify(user) !== JSON.stringify(getUserLogin())) {
      console.log("reset");
      if (!this.state.isOpened) this.setState({ isOpened: true });
      this.resetChat();
    } else if (!this.state.isOpened) {
      this.setState({ isOpened: true }, this.handleRenderStep);
    }
  };

  chatClosedHandler = () => {
    // console.log("closed");
  };

  resetChat = () => {
    user = getUserLogin();
    steps = [
      {
        id: "1",
        message:
          (user ? `Hello, ${user.name}! ` : "") +
          "Selamat datang di Kadoqu.com!",
        trigger: "Menu"
      },
      {
        id: "Menu",
        message: "Ada yang bisa GIdA bantu?",
        trigger: "Menu-2"
      },
      {
        id: "Menu-2",
        options: [
          { value: "1", label: "Cari Produk", trigger: "Product" },
          { value: "2", label: "Customer Service", trigger: "CS" },
          { value: "3", label: "Selesai", trigger: "End" }
        ]
      },
      {
        id: "Product",
        message: "Produk apa yang ingin kamu cari?",
        trigger: "Product-2"
      },
      {
        id: "Product-2",
        user: true,
        trigger: "Menu"
      },
      {
        id: "CS",
        message: user ? "Apa yang ingin kamu tanyakan pada GIdA?" : null,
        trigger: user ? "Chat" : "Menu"
      },
      {
        id: "Chat",
        user: true,
        trigger: "Menu"
      },
      {
        id: "End",
        message:
          "Terima kasih sudah chat dengan GIdA. Senang membantu kakak. :)",
        end: true
      }
    ];
    dropMessages();
    renderCustomComponent(ReadListener, {
      onOpen: this.chatOpenedHandler,
      onClose: this.chatClosedHandler
    });
    this.setState({ id: "1", step: {} }, () => {
      this.handleRenderStep();
    });
  };

  handleRenderStep = () => {
    renderStep(this.state.id).then(response => {
      // console.log(response);
      if (response) {
        this.setState({ id: response.id, step: response.step });
        switch (response.id) {
          case "CS":
            renderCustomComponent(
              LoginMessage,
              { history: this.props.history },
              true
            );
            break;
          case "Chat":
            if (user) this.getListHistory();
            break;
          case "End":
            toggleInputDisabled();
            break;
          default:
            break;
        }
      }
    });
  };

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);

    if (newMessage === "!reset") {
      this.setState(
        {
          id: "1",
          step: {}
        },
        this.handleRenderStep
      );
      return;
    }

    const { id, step } = this.state;
    console.log(step);
    if (id === "Chat") {
      if (this.state.isFirstChat)
        this.setState(
          { isFirstChat: false },
          addResponseMessage(
            "Sebentar lagi CS Kadoqu.com akan mengambil alih pembicaraan ini."
          )
        );
      this.onSendMessage(newMessage, 0);
      return;
    }
    if (step.options) {
      const option = step.options.find(e => e.value === newMessage);
      if (option) {
        const newStep = steps.find(e => e.id === option.trigger);
        if (newStep) {
          this.setState(
            {
              id: newStep.id,
              step: newStep
            },
            this.handleRenderStep
          );
        }
      } else {
        // addResponseMessage("GIdA tidak mengerti maksud kamu :(");
        this.handleRenderStep();
      }
    } else if (step.user) {
      const newStep = steps.find(e => e.id === step.trigger);
      this.setState({ id: step.trigger, step: newStep });
      if (id === "Product-2") {
        renderCustomComponent(Product, {
          count: this.state.count,
          history: this.props.history,
          product: newMessage,
          triggerNextStep: count => {
            if (count === this.state.count)
              this.setState(
                { count: this.state.count + 1 },
                this.handleRenderStep
              );
          }
        });
      }
    }
  };

  getListHistory = () => {
    if (this.removeListener) {
      this.removeListener();
    }

    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(user.data)
      .get()
      .then(doc => {
        if (!doc.exists)
          myFirestore
            .collection(AppString.NODE_USERS)
            .doc(user.data)
            .set({
              name: user.name,
              newMessages: 0,
              photo: user.photo,
              updatedAt: myFirebase.firestore.Timestamp.now()
            });
      });

    this.setState({ isLoading: true });

    // Get history and listen new data added
    this.removeListener = myFirestore
      .collection(AppString.NODE_MESSAGES)
      .doc(user.data)
      .collection("messages")
      .where("timestamp", ">", new Date())
      .onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === AppString.DOC_ADDED) {
              const data = change.doc.data();
              if (data.idTo === user.data) {
                this.setState({
                  isLoading: false
                });
                const { type, content } = data;
                switch (type) {
                  case 0:
                    if (content.toLowerCase() === "selesai") {
                      this.removeListener();
                      this.setState(
                        { id: "Menu", isFirstChat: true },
                        this.handleRenderStep
                      );
                    } else addResponseMessage(content);
                    break;
                  case 1:
                    renderCustomComponent(ImageItem, { src: content }, true);
                    break;
                  case 2:
                    renderCustomComponent(
                      StickerItem,
                      { src: IMAGES["Gida-Emot"][content] },
                      true
                    );
                    break;
                  default:
                    break;
                }
              }
            }
          });
        },
        err => {
          // Toast.fire(err.toString());
        }
      );
  };

  onSendMessage = (content, type) => {
    // if (this.state.isShowSticker && type === 2) {
    //   this.setState({ isShowSticker: false });
    // }

    if (!content || content.trim() === "") {
      return;
    }

    const dateNow = Date.now();
    // const timestamp = (~~(dateNow / 1000)).toString();
    const timestamp = dateNow.toString();

    const itemMessage = {
      idFrom: user.data,
      idTo: "bfd0405d-6318-462b-b77b-542ea82aec23",
      timestamp: myFirebase.firestore.Timestamp.fromMillis(dateNow),
      content: content.trim(),
      type: type
    };

    myFirestore
      .collection(AppString.NODE_MESSAGES)
      .doc(user.data)
      .collection("messages")
      .doc(timestamp)
      .set(itemMessage)
      .then()
      .catch(err => {
        // Toast.fire(err.toString());
      });

    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(user.data)
      .update({
        updatedAt: myFirebase.firestore.Timestamp.fromMillis(dateNow),
        newMessages: myFirebase.firestore.FieldValue.increment(1)
      })
      .then()
      .catch(err => {
        // Toast.fire(err.toString());
      });
  };

  render() {
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        profileAvatar={IMAGES["Gida-Emot"].emoticon10}
        titleAvatar={IMAGES["Gida-Emot"].emoticon10}
        title="GIdA"
        subtitle="GIdA selalu ada buat kamu"
      />
    );
  }
}

export default Chat;
