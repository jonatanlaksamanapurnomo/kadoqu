import React from "react";

import "./WelcomeBoard.css";

const WelcomeBoard = props => {
  return (
    <div className="viewWelcomeBoard">
      <span className="textTitleWelcome">{`Welcome, ${props.name}`}</span>
      <img
        className="avatarWelcome"
        src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_signin_1.png"
        alt="icon avatar"
      />
      <span className="textDesciptionWelcome">
        Let's start talking. Great things might happen.
      </span>
    </div>
  );
};

export default WelcomeBoard;
