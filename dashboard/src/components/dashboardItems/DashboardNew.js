import React from "react";
import { Card, Col, Row } from "react-bootstrap";
// import { Line, HorizontalBar } from "react-chartjs-2";
import SalesChart from "../dashboardNewItems/SalesChart";
import SalesCategoryChart from "../dashboardNewItems/SalesCategoryChart";
import SalesMerchantChart from "../dashboardNewItems/SalesMerchantChart";
import SalesProductChart from "../dashboardNewItems/SalesProductChart";
import GenderCustomerChart from "../dashboardNewItems/GenderCustomerChart";
import RegionCustomerChart from "../dashboardNewItems/RegionCustomerChart";
import AgeCustomerChart from "../dashboardNewItems/AgeCustomerChart";
import NCampaignPerMonthChart
  from "../dashboardNewItems/NCampaignPerMonthChart";
import MarketingBudgetChart from "../dashboardNewItems/MarketingBudgetChart";
import MarketingBudgetPerCampaign
  from "../dashboardNewItems/MarketingBudgetPerCampaign";
import MarketingSalesPerCampaign
  from "../dashboardNewItems/MarketingSalesPerCampaign";
import TotalProductsChart from "../dashboardNewItems/TotalProductsChart";
import TotalGidaChart from "../dashboardNewItems/TotalGidaChart";
import UserSignUp from "../dashboardNewItems/UserSignUp";
import PopularGidaSearch from "../dashboardItems/PopularGidaSearch";
import Feedbacks from "../dashboardItems/Feedbacks";
import TotalMerchantsChart from "../dashboardNewItems/TotalMerchantsChart";
import TotalProductsCategoriesChart
  from "../dashboardNewItems/TotalProductsCategoriesChart";
import TotalProductMerchantsChart
  from "../dashboardNewItems/TotalProductMerchantsChart";
import NumberOrderChart from "../dashboardNewItems/NumberOrderChart";
import NumberOrderStatusChart
  from "../dashboardNewItems/NumberOrderStatusChart";
import TotalProductsWishlist from "../dashboardNewItems/TotalProductWishlist";
import Ratings from "../dashboardItems/Ratings";

import "./Chart.css";

// const data = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "Oktober",
//     "November",
//     "Desember"
//   ],
//   datasets: [
//     {
//       label: "Cust Sign up",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [421, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     }
//   ]
// };

// const dataCSContact = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "Oktober",
//     "November",
//     "Desember"
//   ],
//   datasets: [
//     {
//       label: "Jumlah User",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//     }
//   ]
// };
// const dataSales = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "Oktober",
//     "November",
//     "Desember"
//   ],
//   datasets: [
//     {
//       label: "Monthly Sales Rp",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [
//         300000,
//         300000,
//         200000,
//         300000,
//         300000,
//         300000,
//         300000,
//         300000,
//         300000,
//         650000,
//         790000,
//         921000
//       ]
//     }
//   ]
// };

// const dataOrder = {
//   labels: [
//     "Jawa Barat",
//     "Jakarta",
//     "Jawa Tengah",
//     "Jawa Timur",
//     "Sumatera Selatan",
//     "Sumatera Barat",
//     "Sumatera Utara"
//   ],
//   datasets: [
//     {
//       label: "Bandung",
//       backgroundColor: "#CFF0CC",
//       borderColor: "#CFF0CC",
//       borderWidth: 1,
//       hoverBackgroundColor: "#CFF0CC",
//       hoverBorderColor: "#CFF0CC",
//       data: [65, 59, 80, 81, 56, 55, 40]
//     },
//     {
//       label: "Kabupaten Bandung Barat",
//       backgroundColor: "#80CEE1",
//       borderColor: "#80CEE1",
//       borderWidth: 1,
//       hoverBackgroundColor: "#80CEE1",
//       hoverBorderColor: "#80CEE1",
//       data: [34, 87, 21, 64, 23, 56, 21]
//     },
//     {
//       label: "Depok",
//       backgroundColor: "#FF6961",
//       borderColor: "#FF6961",
//       borderWidth: 1,
//       hoverBackgroundColor: "#FF6961",
//       hoverBorderColor: "#FF6961",
//       data: [4, 7, 1, 4, 3, 6, 8]
//     }
//   ]
// };

// const dataPie = {
//   labels: ["Wanita", "Pria"],
//   datasets: [
//     {
//       data: [112, 67],
//       backgroundColor: ["#FF6384", "#36A2EB"],
//       hoverBackgroundColor: ["#FF6384", "#36A2EB"]
//     }
//   ]
// };

class DashboardNew extends React.Component {
  render() {
    return (
      <Card className="chart-container">
        <Card.Body>
          <Row className="chart-title-section">
            <Col>
              <h1 className="font-weight-bold mb-0">Dashboard 2.0</h1>
            </Col>
          </Row>
          <h2 className="font-weight-bold mb-0">Transaction</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12}>
              <h4>Customer Sign up</h4>
              <UserSignUp/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12}>
              <h4>Monthly Sales</h4>
              <SalesChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12}>
              <h4>Monthly Sales Per Category</h4>
              <SalesCategoryChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Monthly Sales Per Merchant</h4>
              <SalesMerchantChart/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Monthly Sales Per Product</h4>
              <SalesProductChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Number of Order (All)</h4>
              <NumberOrderChart/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Number of Order (Status)</h4>
              <NumberOrderStatusChart/>
            </Col>
          </Row>
          {/* <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Average Transaction / Customer</h4>
              <Line data={data} />
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Average Purchase (Rp) / Customer</h4>
              <HorizontalBar data={dataOrder} />
            </Col>
          </Row> */}
          <h2 className="font-weight-bold mb-0">Engagement</h2>
          {/* <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>CS Contact</h4>
              <Line data={dataCSContact} />
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Conversion Rate</h4>
              <Line data={data} />
            </Col>
          </Row> */}
          <h2 className="font-weight-bold mb-0">Customer Satisfaction</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Product Experience</h4>
              <Feedbacks/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Shopping Experience</h4>
              <Ratings/>
            </Col>
          </Row>
          <h2 className="font-weight-bold mb-1">Customer Profile</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={6}>
              <h4>Gender</h4>
              <GenderCustomerChart/>
            </Col>
            <Col xs={12} md={12} lg={6}>
              <h4>Age</h4>
              <AgeCustomerChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            {/* <Col xs={12} md={12} lg={6}>
              <h4>Occupation</h4>
              <HorizontalBar data={dataOrder} />
            </Col> */}
            <Col xs={12} md={12} lg={12}>
              <h4>Region</h4>
              <RegionCustomerChart/>
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
          <h2 className="font-weight-bold mb-3">Product</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12} className="mb-3">
              <TotalProductsChart/>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <TotalMerchantsChart/>
            </Col>
          </Row>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12} className="mb-3">
              {/* <h4>Amount of product / Category</h4>
              <Line data={data} /> */}
              <TotalProductsCategoriesChart/>
            </Col>
            <Col xs={12} md={12} lg={12} className="mb-3">
              <TotalProductMerchantsChart/>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <TotalProductsWishlist/>
            </Col>
          </Row>
          <h2 className="font-weight-bold mb-3">GIdA</h2>
          <Row className="Graph-Category">
            <Col xs={12} md={12} lg={12} className="mb-3">
              <TotalGidaChart/>
            </Col>
            <Col xs={12} md={12} lg={12}>
              <PopularGidaSearch/>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default DashboardNew;
