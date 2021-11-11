import React, {Component} from 'react';
import {Card, Col, Row} from "react-bootstrap";
import NCampaignPerMonthChart
  from "../components/dashboardNewItems/NCampaignPerMonthChart";
import MarketingBudgetChart
  from "../components/dashboardNewItems/MarketingBudgetChart.js";
import MarketingBudgetPerCampaign
  from "../components/dashboardNewItems/MarketingBudgetPerCampaign";
import MarketingSalesPerCampaign
  from "../components/dashboardNewItems/MarketingSalesPerCampaign";

import "../components/dashboardNewItems/Chart.css";

class MarketingChart extends Component {
  render() {
    return (
      <Card className="chart-container">
        <Card.Body>
          <Row className="chart-title-section">
            <Col>
              <h1 className="font-weight-bold mb-0">Marketing Chart</h1>
            </Col>
          </Row>

          <h2 className="font-weight-bold mb-0">Marketing</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Number of Campaign</h4>
              {/*<Line data={data}/>*/}
              <NCampaignPerMonthChart/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Marketing Budget</h4>
              <MarketingBudgetChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Marketing Budget / Campaign</h4>
              <MarketingBudgetPerCampaign/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Campaign Sales</h4>
              <MarketingSalesPerCampaign/>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    );
  }
}

export default MarketingChart;
