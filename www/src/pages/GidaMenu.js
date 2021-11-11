import React from "react";
import { Helmet } from "react-helmet";
import { Image } from "react-bootstrap";
import MediaQuery from "react-responsive";
import NavLink from "../components/NavLink";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./GidaMenu.css";

const INFO_ICON = IMAGES["GIdA Menu"]["Info GIdA"];

const Menu = props => (
  <NavLink href={props.link}>
    <div className={"gida-menu-banner-" + props.className}>
      {!props.isMobile && (
        <div className="gida-menu-text">
          <span className="gida-menu-title">
            {props.title.split(" ").map(word => {
              return (
                <React.Fragment key={word}>
                  {word}
                  <br />
                </React.Fragment>
              );
            })}
          </span>
          <hr />
        </div>
      )}
      <Image className="gida-menu-image" src={props.image} alt={props.title} />
    </div>
  </NavLink>
);

const GidaMenu = props => (
  <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
    {isDesktop => (
      <React.Fragment>
        <Helmet>
          <title>Kadoqu.com | GIdA</title>
        </Helmet>
        <div className="gida-menu-container">
          {Object.entries(
            IMAGES["GIdA Menu"]["Banner Figures"][
              isDesktop ? "desktop" : "mobile"
            ]
          ).map(([key, value]) => {
            return (
              <Menu
                key={key}
                title={key}
                image={value}
                isMobile={!isDesktop}
                link={key
                  .toLowerCase()
                  .split(" ")
                  .join("-")}
                className={key
                  .toLowerCase()
                  .split(" ")
                  .join("-")}
              />
            );
          })}
        </div>
        <div     className={
                     isDesktop
                        ? "gida-menu-desc"
                        : "gida-menu-desc-mob"
                    } >
          <Image src={INFO_ICON} />
          <p>
            GIdA (Gift Idea Assistant) adalah robot asisten yang siap membantu
            kamu yang kebingungan mencari kado untuk orang terdekat. GIdA juga
            bisa bantu kamu untuk mengorganisir hari-hari spesial yang akan
            datang.
          </p>
        </div>
      </React.Fragment>
    )}
  </MediaQuery>
);

export default GidaMenu;
