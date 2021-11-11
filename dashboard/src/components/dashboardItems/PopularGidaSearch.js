import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { addDays, addMonths } from "../../utils/dateTimeFormatter";

const QUERY_GET_POPULAR_GIDA_SEARCH = gql`
  query getGidaPopularKeywords(
    $startDate: Date
    $endDate: Date
    $category: String
    $limit: Int
  ) {
    getGidaPopularKeywords(
      startDate: $startDate
      endDate: $endDate
      category: $category
      limit: $limit
    ) {
      keyword
      quantity
    }
  }
`;

const KeywordList = ({ startDate, endDate, category }) => (
  <Query
    query={QUERY_GET_POPULAR_GIDA_SEARCH}
    variables={{
      startDate,
      endDate,
      category,
      limit: 10
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return "Loading...";
      if (error) return error.message;
      const keywords = data.getGidaPopularKeywords;
      return (
        <React.Fragment>
          <div className="font-weight-bold text-capitalize">{category}</div>
          <div>
            {keywords.map(({ keyword, quantity }, index) => (
              <Row key={index} noGutters>
                <Col xs={1}>{index + 1}.</Col>
                <Col xs={10}>
                  <div>{keyword}</div>
                </Col>
                <Col xs={1}>{quantity}</Col>
              </Row>
            ))}
          </div>
        </React.Fragment>
      );
    }}
  </Query>
);

class PopularGidaSearch extends React.Component {
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
      <Card className="chart-container">
        <Card.Body>
          <h4 className="font-weight-bold mb-0 d-inline-block">
            Popular GIdA Search
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
          <Row>
            <Col className="border-right">
              <KeywordList
                startDate={startDate}
                endDate={new Date()}
                category="person"
              />
            </Col>
            <Col>
              <KeywordList
                startDate={startDate}
                endDate={new Date()}
                category="event"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  }
}

export default PopularGidaSearch;
