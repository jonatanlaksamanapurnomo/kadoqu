import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form
} from "react-bootstrap";
import AddressCard from "../components/AddressCard";
import AddressForm from "../components/AddressForm";
import { GET_USER_ADDRESSES } from "../components/AddressForm";
import gql from "graphql-tag";
import { Query, Mutation, withApollo } from "react-apollo";

const SELECT_PRIMARY = gql`
  mutation selectPrimary($id: Int) {
    selectPrimary(id: $id) {
      id,
      primaryAddress
    }
 }
`;

class Addresses extends Component {
  state = {
    address: {}
  }

  render() {  
    return (
      <Container className="profile-addresses">
        LOGIN dulu
        <Row>
          <Query query={GET_USER_ADDRESSES}>
            {({ loading, error, data }) => {
              if (loading) return (<Col lg={6}>Loading...</Col>)
              if (error) {console.log(`Error! ${error.message}`); return"";}
              if (!data.me.addresses) return "";

              return <React.Fragment>
                <AddressForm client={this.props.client} address={data.me.addresses[0]} onDismiss={()=>{console.log("kembali")}}/>

                {data.me.addresses.map(address =>
                  <Mutation mutation={SELECT_PRIMARY} key={address.id}>
                    {selectPrimary => 
                      <Col lg={6}>
                        <AddressCard 
                          address={address}
                          onClick={() => {console.log('edit address', address.id); this.setState({address: address})}}
                          className="mb-3"
                        >
                          {address.primaryAddress 
                            ? <AddressCard.Button active className="cursor-default">Alamat Utama</AddressCard.Button>
                            : <Form
                                onSubmit={e => {
                                  e.preventDefault();
                                  selectPrimary({ variables: { id: address.id } })
                                  .catch(error => {console.log(error)});                  
                                }}
                              >    
                                <AddressCard.Button type="submit">Jadikan Alamat Utama</AddressCard.Button>
                              </Form>
                          }
                        </AddressCard>
                      </Col>
                    }
                  </Mutation>
                )}
              </React.Fragment>
            }}
          </Query>
        </Row>
      </Container>
    );
  }
}

export default withApollo(Addresses);
