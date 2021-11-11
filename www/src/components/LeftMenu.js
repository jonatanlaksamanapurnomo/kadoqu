import React from "react";
import { Row, Col } from "react-bootstrap";
import MediaQuery from "react-responsive";
import NavLink from "./NavLink";
import IMAGES from "../data/images";
import { MIN_DESKTOP_SIZE } from "../data/constants";

import "./LeftMenu.css";

const ICONS = IMAGES["Site Left Menu"];

const LeftMenuElement = props => (
  <div
    className={
      "d-flex left-menu-element " +
      props.name +
      (props.isActive ? " active" : "")
    }
  >
    <NavLink href={props.link}>
      <Row className="text-center" noGutters>
        <Col md={8}>
          <div className="left-menu-label d-flex align-items-center">
            {props.label}
          </div>
        </Col>
        <Col>
          <img
            className="left-menu-icon"
            src={ICONS[props.name]}
            alt={props.label}
          />
        </Col>
      </Row>
    </NavLink>
  </div>
);

const labels = {
  gidaMenu: "GIdA Menu",
  inspirasiKado: "1001 Inspirasi Kado",
  // kadoquGift: "Kadoqu Gift",
  // gallery: "Gallery",
  holiday: "Kadoqu Holiday",
  companyCelebration: "Company Celebration",
  magicalMoment: "Magical Moment",
  kidsParty: "Kids Party"
};
const links = {
  gidaMenu: "/gida",
  inspirasiKado: "/1001-inspirasi-kado",
  // kadoquGift: "/kadoqu-gift",
  // gallery: "/gallery",

  holiday: "/kadoqu-holiday",
  companyCelebration: "/company-celebration",
  magicalMoment: "/magical-moment",

  kidsParty: "/kids-party"
};

const LeftMenu = props => {
  let currentPath = props.location.pathname;

  if (!currentPath.includes("profile")) {

    return (
      <MediaQuery minWidth={MIN_DESKTOP_SIZE}>
        {isDesktop =>
          isDesktop && (
            <div className="left-menu-container d-block">
              {Object.entries(links).map(([key, link]) => {
                return (
                  <LeftMenuElement
                    key={key}
                    isActive={
                      currentPath.startsWith(link) &&
                      (!/[-|/]/.test(currentPath[link.length]) ||
                        /\d/.test(currentPath[link.length + 1]))
                    }
                    label={labels[key]}
                    name={key
                      .split(/(?=[A-Z])/)
                      .join("-")
                      .toLowerCase()}
                    link={link}
                  />
                );
              })}
            </div>
          )
        }
      </MediaQuery>
    );
  }
  return "";
};

export default LeftMenu;
