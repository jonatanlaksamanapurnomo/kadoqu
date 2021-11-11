import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { addDays, addMonths } from "../../utils/dateTimeFormatter";
import { isAdmin } from "../../utils/userChecker";
import NavLink from "../NavLink";

const QUERY_GET_MOST_FAVORITE_PRODUCTS = gql`
  query getMostFavoriteProducts($startDate: Date, $endDate: Date) {
    getMostFavoriteProducts(startDate: $startDate, endDate: $endDate) {
      id
      name
      merchant
      quantity
    }
  }
`;

class FavoriteProducts extends React.Component {
  state = {
    period: 0
  };

  const;
  render() {
    const { period } = this.state;
    const PERIOD_MAPPER = {
      0: "all time",
      1: "week",
      2: "month"
    };
    let startDate;
    switch (period) {
      case 0:
        startDate = new Date(0);
        break;
      case 1:
        startDate = addDays(new Date(), -7);
        break;
      case 2:
        startDate = addMonths(new Date(), -1);
        break;
      default:
        break;
    }
    return (
      <Query
        query={QUERY_GET_MOST_FAVORITE_PRODUCTS}
        variables={{
          startDate,
          endDate: new Date()
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const bestSellers = data.getMostFavoriteProducts;
          return (
            <Card className="chart-container">
              <Card.Body>
                <h4 className="font-weight-bold mb-0 d-inline-block">
                  Favorite Products
                </h4>
                <Form.Control
                  as="select"
                  value={period}
                  onChange={e => {
                    this.setState({
                      period: parseInt(e.target.value)
                    });
                  }}
                >
                  {Object.keys(PERIOD_MAPPER).map(key => (
                    <option value={key} key={key}>
                      {PERIOD_MAPPER[key]}
                    </option>
                  ))}
                </Form.Control>
                <div className="d-flex justify-content-between mt-3 mb-1 border-bottom">
                  <strong>Product</strong>
                  <strong>User</strong>
                </div>
                <div>
                  {bestSellers.map((bestSellerProduct, index) => (
                    <Row key={index} noGutters className="mb-2">
                      <Col xs={1}>{index + 1}.</Col>
                      <Col xs={10}>
                        <NavLink
                          className="p-0"
                          href={"products/edit/" + bestSellerProduct.id}
                        >
                          {bestSellerProduct.name}
                        </NavLink>
                        {isAdmin() && (
                          <div className="small">
                            by {bestSellerProduct.merchant}
                          </div>
                        )}
                      </Col>
                      <Col xs={1}>{bestSellerProduct.quantity}</Col>
                    </Row>
                  ))}
                </div>
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default FavoriteProducts;
