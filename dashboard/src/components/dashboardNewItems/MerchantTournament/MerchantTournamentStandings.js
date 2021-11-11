import React from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const QUERY_GET_MERCHANT_TOURNAMENTS_POINTS_STANDINGS = gql`
  query getMerchantTournamentPointsStandings($league: Int) {
    getMerchantTournamentPointsStandings(league: $league) {
      point
      name
    }
  }
`;
const liga = [1, 2, 3, 4, 5];
class MerchantTournamentStandings extends React.Component {
  state = {
    league: 1
  };
  render() {
    const { league } = this.state;
    return (
      <Query
        query={QUERY_GET_MERCHANT_TOURNAMENTS_POINTS_STANDINGS}
        variables={{
          league: parseInt(league)
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return error.message;
          const standings = data.getMerchantTournamentPointsStandings;
          console.log(standings);
          return (
            <Card className="chart-container">
              <Card.Body>
                <h2 className="font-weight-bold mb-3">
                  Merchant Tournament Standings
                </h2>
                <Row className="chart-title-section">
                  <Col xs={3}>
                    <h4 className="font-weight-bold mb-0 d-inline-block">
                      Liga {league} Standings
                    </h4>
                  </Col>
                  <Col className="text-right">
                    <Form.Control
                      as="select"
                      value={league}
                      onChange={e => {
                        this.setState({
                          league: e.target.value
                        });
                      }}
                    >
                      {liga.map(value => {
                        return (
                          <option key={`liga-${value}`} value={value}>
                            Liga {value}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </Col>
                </Row>
                {standings.length > 0 ? (
                  <div>
                    <Row noGutters className=" mt-3 mb-1 border-bottom p-2">
                      <Col xs={11} className="pl-3">
                        <strong>Merchant</strong>
                      </Col>
                      <Col xs={1} className="p-0">
                        <strong>Pts</strong>
                      </Col>
                    </Row>
                    {standings.map((item, index) => (
                      <Row key={index} noGutters className="mb-2 px-2 py-1">
                        <Col xs={1} className="text-center">
                          {index + 1}
                        </Col>
                        <Col xs={10}>{item.name}</Col>
                        <Col xs={1}>{item.point}</Col>
                      </Row>
                    ))}
                  </div>
                ) : (
                  <h2 className="text-center">
                    Tidak Ada Merchant Di Liga Ini!
                  </h2>
                )}
              </Card.Body>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default MerchantTournamentStandings;
