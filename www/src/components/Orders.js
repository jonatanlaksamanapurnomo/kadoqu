import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import OrderCard from "../components/OrderCard";
import { withRouter } from "react-router-dom";
import { validateNumeric } from "../utils/regexInputConverter";
import { Query, withApollo } from "react-apollo";
import { GET_USERS_ORDERS } from "../gql/order";
import { ORDER_CARD_LIMIT } from "../data/constants";
import "./OrderCard.css";

class OrderCardPaginationButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: parseInt(this.props.match.params.page, 10)
    };
  }

  componentDidUpdate = () => {
    const pageInUrl = parseInt(this.props.match.params.page, 10);
    if (this.props.currentPage !== pageInUrl) {
      if (this.state.inputValue !== pageInUrl) {
        this.setState({
          inputValue: pageInUrl
        });
      }
    }
  };

  render() {
    const maxPage = Math.ceil(this.props.productsCount / ORDER_CARD_LIMIT);
    return (
      <div className="pagination-buttons pagination-user-profile pt-3">
        {this.props.currentPage > 1 ? (
          <React.Fragment>
            <Button
              className="active"
              onClick={() => {
                this.props.setPage(1);
                this.setState({ inputValue: 1 });
              }}
            >
              {"<<"}
            </Button>
            <Button
              className="active"
              onClick={() => {
                this.props.previousPage();
                this.setState({
                  inputValue: parseInt(this.props.match.params.page, 10) - 1
                });
              }}
            >
              {"<"}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="disabled">{"<<"}</Button>
            <Button className="disabled">{"<"}</Button>
          </React.Fragment>
        )}
        <input
          className="d-inline-block"
          type="text"
          value={this.state.inputValue}
          onKeyPress={e => {
            if (e.charCode === 13) {
              /* this means enter */
              if (this.state.inputValue <= 0) {
                this.props.setPage(1);
                this.setState({ inputValue: 1 });
                return;
              }
              if (this.state.inputValue > maxPage) {
                this.props.setPage(maxPage);
                this.setState({ inputValue: maxPage });
                return;
              }
              this.props.setPage(this.state.inputValue);
            }
          }}
          onChange={e => {
            this.setState({
              inputValue: validateNumeric(e.target.value)
            });
          }}
        />
        {this.props.currentPage < maxPage ? (
          <React.Fragment>
            <Button
              className="active"
              onClick={() => {
                this.props.nextPage();
                this.setState({
                  inputValue: parseInt(this.props.match.params.page, 10) + 1
                });
              }}
            >
              {">"}
            </Button>
            <Button
              className="active"
              onClick={() => {
                this.props.setPage(maxPage);
                this.setState({
                  inputValue: maxPage
                });
              }}
            >
              {">>"}
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Button className="disabled">{">"}</Button>
            <Button className="disabled">{">>"}</Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const OrderCardList = props =>
  props.data.map(order => (
    <Col className="pl-0" xs={12} key={order.id}>
      <OrderCard
        order={order}
        isDesktop={props.isDesktop}
        className="mb-3"
        key={order.id}
        orderStatus={props.orderStatus}
        limit={props.limit}
        offset={props.offset}
      ></OrderCard>
    </Col>
  ));

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  setPage = page => {
    this.props.history.push({
      pathname: `${this.props.pageUrl}/${page}`
    });
  };

  componentDidMount = () => {
    this.updateStateByUrl();
  };

  componentDidUpdate = () => {
    if (this.state.currentPage !== parseInt(this.props.match.params.page, 10)) {
      this.setState({
        currentPage: parseInt(this.props.match.params.page, 10)
      });
    }
  };

  updateStateByUrl = () => {
    this.setState({
      currentPage: parseInt(this.props.match.params.page, 10)
    });
  };

  render() {
    const offset = (this.state.currentPage - 1) * ORDER_CARD_LIMIT;
    const isDesktop = this.props.isDesktop;
    const orderStatus = () => {
      if (this.props.orderStatus) {
        return this.props.orderStatus;
      } else {
        return null;
      }
    };
    return (
      <Query
        query={GET_USERS_ORDERS}
        variables={{
          orderStatus: orderStatus(),
          limit: ORDER_CARD_LIMIT,
          offset: offset
        }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading) return <Col lg={6}>Loading...</Col>;
          if (error) {
            console.log(`Error! ${error.message}`);
            return "";
          }
          return (
            <React.Fragment>
              {data.getUserOrders.length > 0 ? (
                <>
                  <div
                    className={
                      isDesktop ? "mt-2 order-card-scrollable" : "mt-2"
                    }
                  >
                    <OrderCardList
                      isDesktop={this.props.isDesktop}
                      data={data.getUserOrders.orders}
                      orderStatus={orderStatus()}
                      limit={ORDER_CARD_LIMIT}
                      offset={offset}
                    />
                  </div>
                  <OrderCardPaginationButtons
                    currentPage={this.state.currentPage}
                    nextPage={() =>
                      this.state.currentPage <
                        data.getUserOrders.length / ORDER_CARD_LIMIT &&
                      this.setPage(this.state.currentPage + 1)
                    }
                    previousPage={() =>
                      this.state.currentPage > 1 &&
                      this.setPage(this.state.currentPage - 1)
                    }
                    setPage={this.setPage}
                    match={this.props.match}
                    productsCount={data.getUserOrders.length}
                  />
                </>
              ) : (
                <>
                  <div
                    className={
                      this.props.isDesktop
                        ? ""
                        : "no-item-list d-flex justify-content-center"
                    }
                  >
                    <div className="px-2">
                      <div className="no-item-large text-center">
                        Kelihatannya kamu belum pernah belanja nih
                      </div>
                      <div className="no-item-small text-center">
                        ayo mulai belanja !
                      </div>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withApollo(withRouter(Orders));
