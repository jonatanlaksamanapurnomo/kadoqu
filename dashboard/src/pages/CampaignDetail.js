import React, {Component, Fragment} from 'react';
import {Card} from "react-bootstrap";
import {withApollo} from "react-apollo";
import {
  QUERY_GET_CAMPAIGN_ORDER_HISTORY,
  QUERY_GET_CAMPAIGN_BY_ID
} from "../gql/Marketing";
import {Query} from "react-apollo";
// import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from "react-bootstrap-table-next";
// import {paginationOption} from "../data/listConstant";
import {getFullDateTime} from "../utils/dateTimeFormatter";
import {rpFormat} from "../utils/currencyFormatter";

// const {SearchBar} = Search;

class CampaignDetail extends Component {


  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {}
    };
  }

  fieldNameMapper = campaign => ({
    id: campaign.id,
    name: campaign.name,
    primaryDiscount: campaign.primaryDiscount,
    secondaryDiscount: campaign.secondaryDiscount,
    campaignStart: campaign.campaignStart,
    campaignEnd: campaign.campaignEnd
  });

  componentDidMount() {
    this.props.client.query({
      query: QUERY_GET_CAMPAIGN_BY_ID,
      variables: {
        id: parseInt(this.props.match.params.id)
      }
    }).then(({data}) => {
      this.setState({
          campaignInfo: this.fieldNameMapper(data.getCampaignById)
        },
        () => {
          // console.log(this.state.campaignInfo);
        });
    });
  }

  render() {

    const productColoms = [
      {
        dataField: "id",
        text: "Product Id"
      },
      {
        dataField: "name",
        text: "Product Name"
      },
      {
        dataField: "price",
        text: "Product Price"
      }
    ];
    const columns = [
      {
        dataField: "order_id",
        hidden: true,
        csvExport: false,

      },
      {
        dataField: "no",
        text: "Order Number",
        editable: false,
        csvExport: false

      },
      {
        dataField: "product.name",
        text: "Product Name",
        editable: false,


      },
      {
        dataField: "product.price",
        text: "Price",
        editable: false,


      },
      {
        dataField: "quantity",
        text: "qty",
        editable: false,


      },
      {
        dataField: "product.price",
        text: "price x qty",
        formatter: (cell, row) => {
          return rpFormat(row.product.price * row.quantity);
        }
      },
      {
        dataField: "created_at",
        text: "created_at",
        formatter: (cell) => {
          return getFullDateTime(cell)
        }
      }
    ];
    const defaultSorted = [{dataField: "sku", order: "asc"}];
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Card>
                <Card.Header> Campaign Info</Card.Header>
                <Card.Body>
                  <div className="row">
                    <div className="col-6">
                      <p>Campaign Name</p>
                    </div>
                    <div className="col-6">
                      <p>:{this.state.campaignInfo.name}</p>
                    </div>
                    <div className="col-6">
                      <p>Primary Discount</p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{color: "red"}}>:{this.state.campaignInfo.primaryDiscount} %</p>
                    </div>
                    <div className="col-6">
                      <p>Secondary Discount</p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{color: "red"}}>:{this.state.campaignInfo.secondaryDiscount} %</p>
                    </div>
                    <div className="col-6">
                      <p>Campaign Start Date</p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{color: "blue"}}>:{new Date(this.state.campaignInfo.campaignStart).toDateString()} </p>
                    </div>
                    <div className="col-6">
                      <p>Campaign End Date</p>
                    </div>
                    <div className="col-6">
                      <p
                        style={{color: "blue"}}>:{new Date(this.state.campaignInfo.campaignEnd).toDateString()} </p>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-12">
              <Card>
                <Card.Header>Product in this Campaign</Card.Header>
                <Card.Body>
                  <Query query={QUERY_GET_CAMPAIGN_BY_ID} variables={{
                    id: parseInt(this.props.match.params.id)
                  }}>
                    {({loading, error, data}) => {

                      if (loading || error) {
                        return (<p>Error / loading</p>)
                      }
                      if (!loading && !error) {

                        return (
                          <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={data.getCampaignById.products.products}
                            columns={productColoms}
                            defaultSorted={defaultSorted}
                            pagination={paginationFactory()}
                          />
                        )
                      }
                    }}
                  </Query>
                </Card.Body>
                <Card.Footer>

                </Card.Footer>
              </Card>
            </div>
            <div className="col-lg-12">
              <Card>
                <Card.Header>Order History</Card.Header>
                <Card.Body>
                  <Query query={QUERY_GET_CAMPAIGN_ORDER_HISTORY} variables={{
                    campaignId: this.props.match.params.id
                  }}>
                    {({loading, error, data}) => {
                      if (loading || error) {
                        return (<p>Error / loading</p>)
                      }
                      if (!loading && !error) {
                        return (
                          <BootstrapTable
                            bootstrap4
                            keyField="id"
                            data={data.getOrderHistoryByCampaign}
                            columns={columns}
                            defaultSorted={defaultSorted}
                            pagination={paginationFactory()}
                          />
                        )
                      }
                    }}
                  </Query>
                </Card.Body>
                <Card.Footer>

                </Card.Footer>
              </Card>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withApollo(CampaignDetail);
