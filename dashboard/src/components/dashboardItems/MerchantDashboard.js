import React from "react";
import { Card, Col, Row, Image } from "react-bootstrap";
import SalesChart from "../merchantDashboardItems/SalesChart";
import BestSellersMerchant from "../../components/dashboardItems/BestSellersMerchant";
import GenderCustomerChart from "../dashboardNewItems/GenderCustomerChart";
import AgeCustomerChart from "../dashboardNewItems/AgeCustomerChart";

import { getMerchantLevelTax } from "../../utils/userChecker";

import "./Chart.css";

class MerchantDashboard extends React.Component {
  render() {
    return (
      <>
        {getMerchantLevelTax() === 10 && (
          <Card>
            <Card.Body>
              <Row className="d-flex align-items-center">
                <Col className="text-center">
                  <Image
                    className="w-50"
                    src="https://ik.imagekit.io/nwiq66cx3pvsy/emoticon-17.png"
                    alt="Product not found"
                  />
                </Col>
                <Col>
                  <div className="kadoqu-primary-color font-weight-bold mb-n2 text-uppercase display-3">
                    Oh noo....
                  </div>
                  <h1 className="text-dark font-weight-bold mb-0 ">
                    Sepertinya akun kamu di disable..
                  </h1>
                  <h2 className="text-dark font-weight-bold mb-0 hub-cs-text">
                    Silahkan hubungi CS kami{" "}
                  </h2>
                  <a href="https://wa.me/628112181600">
                    <button
                      type="submit"
                      className="kadoqu-primary-button-green cs-button"
                    >
                      Contact Us!
                    </button>
                  </a>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
        {getMerchantLevelTax() > 10 && (
          <Card className="chart-container">
            <Card.Body>
              <Row>
                <Col>
                  <Image
                    className="w-100 cursor-pointer"
                    src="https://ik.imagekit.io/nwiq66cx3pvsy/merchant-tournament.jpg"
                    alt="Merchant Tournament"
                    onClick={() =>
                      this.props.history.push("/merchant/tournament")
                    }
                  />
                </Col>
              </Row>
              <Row className="chart-title-section my-3">
                <Col>
                  <h1 className="font-weight-bold mb-0">Your Dashboard !</h1>
                </Col>
              </Row>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={12}></Col>
              </Row>
              <h2 className="font-weight-bold mb-0">Transaction</h2>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={12}>
                  <h4>Sales per Month</h4>
                  <SalesChart />
                </Col>
              </Row>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={12}>
                  <h4>Sales Details</h4>
                  <BestSellersMerchant />
                </Col>
              </Row>
              <h2 className="font-weight-bold mb-1">Customer Profile</h2>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={6}>
                  <h4>Gender</h4>
                  <GenderCustomerChart />
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <h4>Age</h4>
                  <AgeCustomerChart />
                </Col>
              </Row>
              <h2 className="font-weight-bold mb-0">Visitor</h2>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={6}>
                  <h4>Website Visitor</h4>
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <h4>Product View</h4>
                </Col>
              </Row>
              <h2 className="font-weight-bold mb-3">Feedback</h2>
              <Row className="Graph-Category">
                <Col xs={12} md={12} lg={12}>
                  <h4>What to Improve</h4>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        )}
      </>
    );
  }
}

export default MerchantDashboard;
