import React, { Component } from "react";
import moment from "moment";
import ReactLoading from "react-loading";
import { myFirestore, myStorage, myFirebase } from "../../library/firebase";
import Toast from "../Toast";
import IMAGES from "../../data/images";
import { AppString } from "../../data/constants";

import "./ChatBoard.css";

export default class ChatBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isShowSticker: false,
      inputValue: ""
    };

    this.currentUserId = props.currentUser.data;
    this.currentUserAvatar =
      "https://ik.imagekit.io/nwiq66cx3pvsy/icon_signin_1.png";
    this.currentUserNickname = props.currentUser.name;
    this.listMessage = [];
    this.currentPeerUser = props.currentPeerUser;
    this.removeListener = null;
    this.currentPhotoFile = null;
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    // For first render, it's not go through componentWillReceiveProps
    this.getListHistory();
  }

  componentWillUnmount() {
    if (this.removeListener) {
      this.removeListener();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentPeerUser !== this.currentPeerUser) {
      this.currentPeerUser = newProps.currentPeerUser;
      this.getListHistory();
    }
  }

  getListHistory = () => {
    if (this.removeListener) {
      this.removeListener();
    }

    this.listMessage.length = 0;
    this.setState({ isLoading: true });

    this.removeListener = myFirestore
      .collection(AppString.NODE_MESSAGES)
      .doc(this.currentPeerUser.id)
      .collection("messages")
      .onSnapshot(
        snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === AppString.DOC_ADDED) {
              this.listMessage.push(change.doc.data());
            }
          });
          this.setState({ isLoading: false });
        },
        err => {
          Toast.fire(err.toString());
        }
      );

    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(this.currentPeerUser.id)
      .update({ newMessages: 0 })
      .then(() => {})
      .catch(err => {
        Toast.fire(err.toString());
      });
  };

  openListSticker = () => {
    this.setState({ isShowSticker: !this.state.isShowSticker });
  };

  onSendMessage = (content, type) => {
    if (this.state.isShowSticker && type === 2) {
      this.setState({ isShowSticker: false });
    }

    if (content.trim() === "") {
      return;
    }

    const dateNow = Date.now();
    // const timestamp = (~~(dateNow / 1000)).toString();
    const timestamp = dateNow.toString();

    const itemMessage = {
      idFrom: this.currentUserId,
      idTo: this.currentPeerUser.id,
      timestamp: myFirebase.firestore.Timestamp.fromMillis(dateNow),
      content: content.trim(),
      type: type
    };

    myFirestore
      .collection(AppString.NODE_MESSAGES)
      .doc(this.currentPeerUser.id)
      .collection("messages")
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        this.setState({ inputValue: "" });
      })
      .catch(err => {
        Toast.fire(err.toString());
      });

    myFirestore
      .collection(AppString.NODE_USERS)
      .doc(this.currentPeerUser.id)
      .update({ updatedAt: myFirebase.firestore.Timestamp.fromMillis(dateNow) })
      .then(() => {})
      .catch(err => {
        Toast.fire(err.toString());
      });
  };

  onChoosePhoto = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({ isLoading: true });
      this.currentPhotoFile = event.target.files[0];
      // Check this file is an image?
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(AppString.PREFIX_IMAGE) === 0) {
        this.uploadPhoto();
      } else {
        this.setState({ isLoading: false });
        Toast.fire("This file is not an image");
      }
    } else {
      this.setState({ isLoading: false });
    }
  };

  uploadPhoto = () => {
    if (this.currentPhotoFile) {
      const timestamp = moment()
        .valueOf()
        .toString();

      const uploadTask = myStorage
        .ref()
        .child(timestamp)
        .put(this.currentPhotoFile);

      uploadTask.on(
        AppString.UPLOAD_CHANGED,
        null,
        err => {
          this.setState({ isLoading: false });
          Toast.fire(err.message);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.setState({ isLoading: false });
            this.onSendMessage(downloadURL, 1);
          });
        }
      );
    } else {
      this.setState({ isLoading: false });
      Toast.fire("File is null");
    }
  };

  onKeyboardPress = event => {
    if (event.key === "Enter") {
      this.onSendMessage(this.state.inputValue, 0);
    }
  };

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView();
      // this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
    }
  };

  render() {
    return (
      <div className="viewChatBoard">
        {/* Header */}
        <div className="headerChatBoard">
          <img
            className="viewAvatarItem"
            src={IMAGES["Photo Profile"][this.currentPeerUser.photo]}
            alt="icon avatar"
          />
          <span className="textHeaderChatBoard">
            {this.currentPeerUser.name}
          </span>
        </div>

        {/* List message */}
        <div className="viewListContentChat">
          {this.renderListMessage()}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          />
        </div>

        {/* Stickers */}
        {this.state.isShowSticker ? this.renderStickers() : null}

        {/* View bottom */}
        <div className="viewBottom">
          <img
            className="icOpenGallery"
            src={IMAGES.ic_photo}
            alt="icon open gallery"
            onClick={() => this.refInput.click()}
          />
          <input
            ref={el => {
              this.refInput = el;
            }}
            accept="image/*"
            className="viewInputGallery"
            type="file"
            onChange={this.onChoosePhoto}
          />

          <img
            className="icOpenSticker"
            src={IMAGES.ic_sticker}
            alt="icon open sticker"
            onClick={this.openListSticker}
          />

          <input
            className="viewInput"
            placeholder="Type your message..."
            value={this.state.inputValue}
            onChange={event => {
              this.setState({ inputValue: event.target.value });
            }}
            onKeyPress={this.onKeyboardPress}
          />
          <img
            className="icSend"
            src={IMAGES.ic_send}
            alt="icon send"
            onClick={() => this.onSendMessage(this.state.inputValue, 0)}
          />
        </div>

        {/* Loading */}
        {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </div>
    );
  }

  renderListMessage = () => {
    if (this.listMessage.length > 0) {
      let viewListMessage = [];
      this.listMessage.forEach((item, index) => {
        if (item.idTo === this.currentPeerUser.id) {
          // Item right (my message)
          if (item.type === 0) {
            viewListMessage.push(
              <div className="viewWrapItemRight">
                <div className="viewWrapItemRight3">
                  <div className="viewItemRight" key={item.timestamp.seconds}>
                    <span className="textContentItem">{item.content}</span>
                  </div>
                </div>
                {this.isLastMessageRight(index) ? (
                  <span className="textTimeRight">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="viewItemRight2" key={item.timestamp.seconds}>
                <a
                  href={item.content}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img
                    className="imgItemRight"
                    src={item.content}
                    alt="content message"
                    onLoad={this.scrollToBottom}
                  />
                </a>
                {this.isLastMessageRight(index) ? (
                  <span className="textTimeRight">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          } else {
            viewListMessage.push(
              <div className="viewItemRight3" key={item.timestamp.seconds}>
                <img
                  className="imgItemRight"
                  src={this.getGifImage(item.content)}
                  alt="content message"
                  onLoad={this.scrollToBottom}
                />
                {this.isLastMessageRight(index) ? (
                  <span className="textTimeRight">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          }
        } else {
          // Item left (peer message)
          if (item.type === 0) {
            viewListMessage.push(
              <div className="viewWrapItemLeft" key={item.timestamp.seconds}>
                <div className="viewWrapItemLeft3">
                  {this.isLastMessageLeft(index) ? (
                    <img
                      src={IMAGES["Photo Profile"][this.currentPeerUser.photo]}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft" />
                  )}
                  <div className="viewItemLeft">
                    <span className="textContentItem">{item.content}</span>
                  </div>
                </div>
                {this.isLastMessageLeft(index) ? (
                  <span className="textTimeLeft">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          } else if (item.type === 1) {
            viewListMessage.push(
              <div className="viewWrapItemLeft2" key={item.timestamp.seconds}>
                <div className="viewWrapItemLeft3">
                  {this.isLastMessageLeft(index) ? (
                    <img
                      src={IMAGES["Photo Profile"][this.currentPeerUser.photo]}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft" />
                  )}
                  <div className="viewItemLeft2">
                    <img
                      className="imgItemLeft"
                      src={item.content}
                      alt="content message"
                      onLoad={this.scrollToBottom}
                    />
                  </div>
                </div>
                {this.isLastMessageLeft(index) ? (
                  <span className="textTimeLeft">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          } else {
            viewListMessage.push(
              <div className="viewWrapItemLeft2" key={item.timestamp.seconds}>
                <div className="viewWrapItemLeft3">
                  {this.isLastMessageLeft(index) ? (
                    <img
                      src={IMAGES["Photo Profile"][this.currentPeerUser.photo]}
                      alt="avatar"
                      className="peerAvatarLeft"
                    />
                  ) : (
                    <div className="viewPaddingLeft" />
                  )}
                  <div className="viewItemLeft3" key={item.timestamp.seconds}>
                    <img
                      className="imgItemLeft"
                      src={this.getGifImage(item.content)}
                      alt="content message"
                      onLoad={this.scrollToBottom}
                    />
                  </div>
                </div>
                {this.isLastMessageLeft(index) ? (
                  <span className="textTimeLeft">
                    {moment.unix(item.timestamp.seconds).format("lll")}
                  </span>
                ) : null}
              </div>
            );
          }
        }
      });
      return viewListMessage;
    } else {
      return (
        <div className="viewWrapSayHi">
          <span className="textSayHi">Say hi to new friend</span>
          <img
            className="imgWaveHand"
            src={IMAGES.ic_wave_hand}
            alt="wave hand"
          />
        </div>
      );
    }
  };

  renderStickers = () => {
    return (
      <div className="viewStickers">
        {Object.entries(IMAGES["Gida-Emot"]).map(([key, value]) => (
          <img
            className="imgSticker"
            src={value}
            alt="sticker"
            onClick={() => this.onSendMessage(key, 2)}
          />
        ))}
      </div>
    );
  };

  getGifImage = value => {
    if (value.includes("emoticon")) return IMAGES["Gida-Emot"][value];
    else if (value.includes("mimi")) return IMAGES.mimi[value];
    else return null;
  };

  isLastMessageLeft(index) {
    if (
      (index + 1 < this.listMessage.length &&
        this.listMessage[index + 1].idFrom === this.currentUserId) ||
      index === this.listMessage.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }

  isLastMessageRight(index) {
    if (
      (index + 1 < this.listMessage.length &&
        this.listMessage[index + 1].idFrom !== this.currentUserId) ||
      index === this.listMessage.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  }
}
