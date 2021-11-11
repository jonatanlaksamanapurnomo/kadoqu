import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { MONTHS, KADOQU_START_YEAR } from "../../data/constants";
import { addMonths } from "../../utils/dateTimeFormatter";
import NavLink from "../NavLink";
import { getUserName } from "../../utils/userChecker";



const QUERY_GET_BEST_SELLER_PRODUCTS_MERCHANT = gql`
  query getBestSellerProductsMerchant(
    
    $startDate: ParsedDateInput
    $endDate: ParsedDateInput
    $merchant : String
  ) {
    getBestSellerProductsMerchant(startDate: $startDate, endDate: $endDate,merchant: $merchant) {
      id
      name
      quantity
    }
  }
`;

class BestSellersMerchant extends React.Component {
  state = {
    start: {
      month: addMonths(new Date(), -1).getMonth() + 1,
      year: addMonths(new Date(), -1).getFullYear()
    },
    end: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }
  };
  render() {
    const { start, end } = this.state;
    return (
      <Query
        query={QUERY_GET_BEST_SELLER_PRODUCTS_MERCHANT}
        variables={{
            merchant :getUserName(),
          startDate: { month: start.month, year: start.year },
          endDate: { month: end.month, year: end.year }
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const bestSellers = data.getBestSellerProductsMerchant;
           console.log(getUserName())
          return (
            <Card className="chart-container">
              <Card.Body>
                <Row className="chart-title-section">
                  <Col xs={3}>
                    <h4 className="font-weight-bold mb-0 d-inline-block">
                      Best Seller &nbsp;
                      {getUserName()}
                    </h4>
                  </Col>
                  <Col className="text-right">
                    <Form.Control
                      as="select"
                      value={start.month}
                      onChange={e => {
                        if (
                          start.year === end.year &&
                          e.target.value > end.month
                        )
                          return;
                        this.setState({
                          start: { ...start, month: parseInt(e.target.value) }
                        });
                      }}
                    >
                      {MONTHS.map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                          disabled={
                            start.year === end.year && index + 1 > end.month
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control
                      as="select"
                      value={start.year}
                      onChange={e =>
                        this.setState({
                          start: { ...start, year: parseInt(e.target.value) }
                        })
                      }
                    >
                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() - KADOQU_START_YEAR + 1
                        },
                        (e, index) => KADOQU_START_YEAR + index
                      ).map(year => (
                        <option
                          key={year}
                          value={year}
                          disabled={year > end.year}
                        >
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                    to
                    <Form.Control
                      as="select"
                      value={end.month}
                      onChange={e => {
                        if (
                          start.year === end.year &&
                          e.target.value < start.month
                        )
                          return;
                        this.setState({
                          end: { ...end, month: parseInt(e.target.value) }
                        });
                      }}
                    >
                      {MONTHS.map((month, index) => (
                        <option
                          key={month}
                          value={index + 1}
                          disabled={
                            start.year === end.year && index + 1 < start.month
                          }
                        >
                          {month}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control
                      as="select"
                      value={end.year}
                      onChange={e =>
                        this.setState({
                          end: { ...end, year: parseInt(e.target.value) }
                        })
                      }
                    >
                      {Array.from(
                        {
                          length:
                            new Date().getFullYear() - KADOQU_START_YEAR + 1
                        },
                        (e, index) => KADOQU_START_YEAR + index
                      ).map(year => (
                        <option
                          key={year}
                          value={year}
                          disabled={year < start.year}
                        >
                          {year}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between mt-3 mb-1 border-bottom">
                  <strong>Product</strong>
                  <strong>Qty Sold</strong>
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
                        {/* {isAdmin() && (
                          <div className="small">
                            by {bestSellerProduct.merchant}
                          </div>
                        )} */}
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

export default BestSellersMerchant;
