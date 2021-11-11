import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import {Query} from "react-apollo";
import gql from "graphql-tag";

const query = gql`
    query getCustomers {
        getUsers {
            id
            firstName
            lastName
            phone
            addresses {
                street
                city
                postCode
            }
        }
    }
`;

const Customer = props => (
  <Query query={query}>
    {({loading, error, data}) => (
      <Container>
        <Row>
          <Col>
            <h1>Customers</h1>
            {loading ? <p>Loading ...</p> : null}
            {!loading && !error ? (
              <ol>
                {data.getUsers.map(user => (
                  <li key={user.id}>
                    <strong>
                      {user.firstName} {user.lastName} ({user.phone})
                    </strong>
                    <br/>
                    {user.addresses.map(address => (
                      <div>
                        {address.street} - {address.city} - {address.postCode}
                      </div>
                    ))}
                  </li>
                ))}
              </ol>
            ) : null}
          </Col>
        </Row>
      </Container>
    )}
  </Query>
);

export default Customer;
