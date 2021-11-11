import React from "react";
import { NavLink } from "react-router-dom";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem
} from "reactstrap";
import { withRouter } from "react-router-dom";
import { withApollo, Query } from "react-apollo";
import PropTypes from "prop-types";
import jwt from "jsonwebtoken";
// import {
//   QUERY_GET_PRODUCTS_STOCK

// } from "../gql/product";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import { QUERY_GET_TOKEN } from "../gql/token";
import NotificationBadge from "react-notification-badge";
// import { getUserName, isAdmin } from "../utils/userChecker";
// import gql from "graphql-tag";

const logo =
  "https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png";
const sygnet =
  "https://ik.imagekit.io/nwiq66cx3pvsy/Sign_In_Sign_Up/gida-login-01_S1bfse5_V.svg";

const propTypes = {
  children: PropTypes.node
};
// const querystock = isAdmin()
// ? { query:   QUERY_GET_PRODUCTS_STOCK}
// : {
//     query:   QUERY_GET_PRODUCTS_STOCK,
//     variables: {
//       merchant: getUserName()
//     }
//   };
const defaultProps = {};
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
  right: "-2px"
};
// const QUERY_GET_PRODUCTS_STOCK = gql`
//   query getStock($merchant: String) {
//     getStock(merchant: $merchant) {
//       id
//       name
//       merchant
//     }
//   }
// `;
const Header = props => (
  <React.Fragment>
    <AppSidebarToggler className="d-lg-none" display="md" mobile/>
    <AppNavbarBrand
      full={{
        src: logo,
        height: 35,
        alt: "Kadoqu Logo"
      }}
      minimized={{
        src: sygnet,
        width: 30,
        height: 30,
        alt: "Kadoqu Logo"
      }}
    />
    <AppSidebarToggler className="d-md-down-none" display="lg"/>


    {/* <Query query={QUERY_GET_PRODUCTS_STOCK}>
      {({ loading, error, data }) => {
        let banyakStockKosong;
        banyakStockKosong = data.getStock;
        console.log(banyakStockKosong);
        if (loading || error) {
          return <p>Loading...</p>;
        }
        return <p>ok</p>;
      }}
    </Query> */}

    <Query query={QUERY_GET_TOKEN}>
      {({ loading, error, data }) => {
        // let banyakStockKosong;

        if (loading || error) {
          return <p>Loading...</p>;
        }
        return (
          <React.Fragment>
            <Nav className="d-md-down-none" navbar>
              <NavItem className="px-3">
                <NavLink to="/dashboard" className="nav-link">
                  <i className="fa fa-home"/> Dashboard
                </NavLink>
              </NavItem>
              <strong>Welcome, {jwt.decode(data.getToken).name}!</strong>
            </Nav>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav direction="down">
                <NotificationBadge count={0} style={style}/>
                <DropdownToggle nav>
                  <img
                    src="https://ik.imagekit.io/nwiq66cx3pvsy/icon_signin_1.png"
                    className="img-avatar"
                    alt="admin@bootstrapmaster.com"
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem header tag="div" className="text-center">
                    <strong>{jwt.decode(data.getToken).name}</strong>
                  </DropdownItem>
                  <DropdownItem
                    onClick={() =>
                      props.history.push({
                        pathname: `/users/edit/${
                          jwt.decode(data.getToken).data
                        }`
                      })
                    }
                  >
                    <i className="fa fa-lock"/> Edit profile
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      props.signOut(props.history);
                    }}
                  >
                    <i className="fa fa-sign-out"/> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </React.Fragment>
        );
      }}
    </Query>
  </React.Fragment>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default withApollo(withRouter(Header));
