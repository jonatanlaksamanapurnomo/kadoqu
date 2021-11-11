import React from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import { Query, withApollo } from "react-apollo";
import Swal from "sweetalert2";
import DashboardNew from "../components/dashboardItems/DashboardNew";
import MerchantDashboardPage
  from "../components/dashboardItems/MerchantDashboard";
import SalesChart from "../components/dashboardItems/SalesChart";
// import RevenueChart from "../components/dashboardItems/RevenueChart";
import BestSellers from "../components/dashboardItems/BestSellers";
import RecentOrders from "../components/dashboardItems/RecentOrders";
import ActiveUsers from "../components/dashboardItems/ActiveUsers";
import TopCustomer from "../components/dashboardItems/TopCustomer";
import AverageProcessingTime
  from "../components/dashboardItems/AverageProcessingTime";
import Ratings from "../components/dashboardItems/Ratings";
import Feedbacks from "../components/dashboardItems/Feedbacks";
import FavoriteProducts from "../components/dashboardItems/FavoriteProducts";
import PopularGidaSearch from "../components/dashboardItems/PopularGidaSearch";
import { isAdmin } from "../utils/userChecker";
import { QUERY_GET_UNREAD_PRODUCT_REVIEWS_COUNT } from "../gql/product-review";
import { MUTATION_UPDATE_EMAIL, QUERY_ADMIN_LOGIN } from "../gql/admin";
import TotalUser from "../components/dashboardNewItems/Summary/TotalUser";
import TotalProducts
  from "../components//dashboardNewItems/Summary/TotalProducts";
import TotalMerchant
  from "../components//dashboardNewItems/Summary/TotalMerchant";
import TotalOrder from "../components//dashboardNewItems/Summary/TotalOrder";
import TotalGida from "../components//dashboardNewItems/Summary/TotalGida";
import TotalRatings
  from "../components//dashboardNewItems/Summary/TotalRatings";
import SignUp from "../components/dashboardNewItems/Summary/SignUp";
import { TextInput } from "../components/FormComponents";
// import MediaQuery from "react-responsive";

import "./Home.css";

class AdminDashboard extends React.Component {
  state = {
    page: 0
  };

  render() {
    const { page } = this.state;
    const { history } = this.props;
    const MENUS_ICON = { Sales: "dollar", Customer: "smile-o" };
    const Dashboard = props => {
      switch (page) {
        case 0:
          return (

            <Container fluid className="mob-container">
              <br/>
              <h1 className="font-weight-bold mb-0">Dashboard Admin</h1>
              <br/>
              <br/>
              <h2 className="font-weight-bold mb-0">All Time Summary</h2>
              <br/>
              <Row className="Graph-Category">
                <Col xs={12} md={6} lg={3}>
                  <TotalUser/>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <TotalProducts/>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <TotalMerchant/>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <TotalOrder/>
                </Col>
              </Row>
              <Row className="Graph-Category">
                <Col xs={12} md={6} lg={3}>
                  <TotalGida/>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <TotalRatings/>
                </Col>
                <Col xs={12} md={6} lg={3}>
                  <SignUp/>
                </Col>
                <Col xs={12} md={6} lg={3}></Col>
              </Row>
              <Row className="mb-1">
                <Col xs={12} md={12} lg={12}>
                  <SalesChart/>
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <BestSellers/>
                </Col>
                <Col xs={12} md={12} lg={6}>
                  <RecentOrders/>
                </Col>
                {/* <Col xs={12} md={12} lg={12}>
                  <RevenueChart />
                </Col> */}
              </Row>
              <Row>
                <Col xs={12} md={12} lg={12}>
                  <DashboardNew/>
                </Col>
              </Row>
            </Container>
          );
        case 1:
          return (
            <Container fluid>
              <Row className="mb-1">
                <Col xs={12} md={12} lg={3}>
                  <ActiveUsers/>
                </Col>
                <Col xs={12} md={12} lg={3}>
                  <TopCustomer/>
                </Col>
                <Col xs={12} md={12} lg={3}>
                  <AverageProcessingTime/>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs={12} md={12} lg={3}>
                  <Ratings/>
                </Col>
                <Col xs={12} md={12} lg={3}>
                  <Feedbacks/>
                </Col>
              </Row>
              <Row className="mb-1">
                <Col xs={12} md={12} lg={6}>
                  <PopularGidaSearch/>
                </Col>
                <Col xs={12} md={12} lg={3}>
                  <FavoriteProducts/>
                </Col>
              </Row>
            </Container>
          );
        default:
          return null;
      }
    };
    return (
      <div className="position-relative">
        <Dashboard/>
        <div className="home-menu-container">
          {Object.entries(MENUS_ICON).map(([menu, fa], index) => (
            <OverlayTrigger
              key={menu}
              placement="left"
              overlay={
                <Tooltip id={`tooltip-${menu}`}>{menu}-oriented</Tooltip>
              }
            >
              <div
                className={"home-menu" + (page === index ? " active" : "")}
                onClick={() => this.setState({ page: index })}
              >
                <i className={"fa fa-" + fa}/>
              </div>
            </OverlayTrigger>
          ))}
          <Query
            query={QUERY_GET_UNREAD_PRODUCT_REVIEWS_COUNT}
            fetchPolicy="network-only"
          >
            {({ loading, error, data }) => {
              if (loading || error || data.getUnreadProductReviewsCount === 0) {
                return null;
              }
              return (
                <OverlayTrigger
                  placement="left"
                  overlay={
                    <Tooltip id="tooltip-product-review">
                      Pending product review
                    </Tooltip>
                  }
                >
                  <div
                    className="home-menu p-0 position-relative"
                    onClick={() => history.push("/products/review")}
                  >
                    <i className="fa fa-envelope-o"/>
                    <Badge pill variant="danger" className="home-notif-badge">
                      {data.getUnreadProductReviewsCount}
                    </Badge>
                  </div>
                </OverlayTrigger>
              );
            }}
          </Query>
        </div>
      </div>
    );
  }
}

class MerchantDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isshow: false
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: QUERY_ADMIN_LOGIN,
        fetchPolicy: "network-only"
      })
      .then(e => {
        let email = e.data.adminLogin.email2;
        if (email === "") {
          this.setState({
            isshow: true
          });
        } else {
          this.setState({
            isshow: false
          });
        }
      });
  }

  render() {
    const Dashboard = props => (
      <Container fluid>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <MerchantDashboardPage {...props} />
          </Col>
        </Row>
      </Container>
    );
    return (
      <div className="position-relative">
        <Dashboard history={this.props.history}/>
        <Modal show={this.state.isshow}>
          <Modal.Header closeButton>
            <Modal.Title>Sepertinya Kamu Belum mengisi email </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextInput
              fieldName="Email"
              value={this.state.email}
              onChange={e => {
                this.setState({
                  email: e.target.value
                });
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.setState({
                  isshow: false
                });
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.props.client
                  .mutate({
                    mutation: MUTATION_UPDATE_EMAIL,
                    variables: {
                      newEmail: this.state.email
                    }
                  })
                  .then(e => {
                    if (e.data.editEmailAdmin) {
                      Swal.fire({
                        type: "success",
                        title: "Berhasil",
                        text: "Email kamu berhasil di tambahkan"
                      });
                      this.setState({
                        isshow: false
                      });
                    } else {
                      Swal.fire({
                        type: "error",
                        title: "oops",
                        text: "something wrong"
                      });
                    }
                  });
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const Home = props => {
  if (isAdmin()) {
    return <AdminDashboard {...props} />;
  }
  return <MerchantDashboard {...props} />;
};

export default withApollo(Home);
