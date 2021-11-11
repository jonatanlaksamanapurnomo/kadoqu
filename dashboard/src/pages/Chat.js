import React, { Component } from "react";
import ReactLoading from "react-loading";
import { withRouter } from "react-router-dom";
import { Badge } from "react-bootstrap";
import WelcomeBoard from "../components/chat/WelcomeBoard";
import ChatBoard from "../components/chat/ChatBoard";
import Toast from "../components/Toast";
import { myFirestore } from "../library/firebase";
import images from "../data/images";
import { AppString } from "../data/constants";
import { getUserLogin } from "../utils/userChecker";

import "./Chat.css";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentPeerUser: null
    };

    this.listUser = [];
    this.removeListener = null;
  }

  componentDidMount() {
    this.getListUser();
  }

  componentWillUnmount() {
    if (this.removeListener) {
      this.removeListener();
    }
  }

  // getListUser = async () => {
  //   const result = await myFirestore
  //     .collection(AppString.NODE_USERS)
  //     .orderBy("updatedAt", "desc")
  //     .get();
  //   if (result.docs.length > 0) {
  //     this.listUser = [...result.docs];
  //     this.setState({ isLoading: false });
  //   }
  // };

  getListUser = () => {
    if (this.removeListener) {
      this.removeListener();
    }

    this.listUser.length = 0;
    this.setState({ isLoading: true });

    this.removeListener = myFirestore
      .collection(AppString.NODE_USERS)
      .orderBy("updatedAt", "desc")
      .onSnapshot(
        snapshot => {
          this.listUser = [...snapshot.docs];
          this.setState({ isLoading: false });
        },
        err => {
          Toast.fire(err.toString());
        }
      );
  };

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = [];
      this.listUser.forEach((item, index) => {
        const user = item.data();
        const id = item.id;
        viewListUser.push(
          <button
            key={index}
            className={
              this.state.currentPeerUser && this.state.currentPeerUser.id === id
                ? "viewWrapItemFocused"
                : "viewWrapItem"
            }
            onClick={() => {
              this.setState({
                currentPeerUser: { ...user, id: id }
              });
            }}
          >
            <img
              className="viewAvatarItem"
              src={images["Photo Profile"][user.photo]}
              alt="icon avatar"
            />
            <div className="viewWrapContentItem">
              <span className="textItem">{`Name: ${user.name}`}</span>
              {/* <span className="textItem">{`About me: ${
                item.data().aboutMe ? item.data().aboutMe : "Not available"
              }`}</span> */}
            </div>
            {user.newMessages > 0 && (
              <Badge variant="danger">{user.newMessages}</Badge>
            )}
          </button>
        );
      });
      return viewListUser;
    } else {
      return null;
    }
  };

  render() {
    return (
      <div className="root">
        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser()}</div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentUser={getUserLogin()}
                currentPeerUser={this.state.currentPeerUser}
              />
            ) : (
              <WelcomeBoard name={getUserLogin().name} />
            )}
          </div>
        </div>

        {/* Loading */}
        {this.state.isLoading && (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Chat);
