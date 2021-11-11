import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { validateNumeric } from "../utils/regexInputConverter";
import { Query, withApollo } from "react-apollo";
import "./OrderCard.css";
import ProductItem from "./ProductItem";

/*
List of sorting method available

Key  would represent choice displayed in front end
Value present "<field_name> <int>"
  where <int> represent whether if sort should be applied ascending (1) or descending (2)
*/

const FAVORITE_LIST_LIMIT = 6;

const QUERY_GET_USERS_FAVORITE = gql`
  query getUsersFavorite($limit: Int, $offset: Int) {
    getUserFavoriteProducts(limit: $limit, offset: $offset) {
      length
      products {
        id
        name
        slug
        merchant
        inStock
        price
        isFavorite
        photos {
          url
        }
        colors {
          name
        }
      }
    }
  }
`;

const ListOfProducts = props => (
  <Row className="margin-left-content-list">
    {props.products.map(product => (
      <Col xs={6} lg={4} key={product.id}>
        <ProductItem
          details={{
            id: product.id,
            merchant: product.merchant,
            slug: product.slug,
            name: product.name,
            photo: product.photos[0] ? product.photos[0].url : "",
            price: product.price,
            isFavorite: product.isFavorite
          }}
          query={props.query}
        />
      </Col>
    ))}
  </Row>
);

class FavoriteListPaginationButtons extends Component {
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
    const maxPage = Math.ceil(this.props.productsCount / FAVORITE_LIST_LIMIT);
    return (
      <div className="pagination-buttons pagination-favorite pt-4">
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

class FavoriteList extends Component {
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
    const offset = (this.state.currentPage - 1) * FAVORITE_LIST_LIMIT;
    const query = {
      query: QUERY_GET_USERS_FAVORITE,
      variables: {
        limit: FAVORITE_LIST_LIMIT,
        offset: offset
      }
    };
    return (
      <Query
        query={QUERY_GET_USERS_FAVORITE}
        variables={{
          limit: FAVORITE_LIST_LIMIT,
          offset: offset
        }}
        fetchPolicy={"cache-and-network"}
      >
        {({ loading, error, data }) => {
          if (loading) return <Col lg={6}>Loading...</Col>;
          if (error) {
            console.log(`Error! ${error.message}`);
            return "";
          }
          return (
            <React.Fragment>
              {data.getUserFavoriteProducts.length > 0 ? (
                <>
                  <div
                    className={
                      this.props.isDesktop ? "scrollable-favorite" : " "
                    }
                  >
                    <Col md={12}>
                      <ListOfProducts
                        products={data.getUserFavoriteProducts.products}
                        query={query}
                      />
                    </Col>
                  </div>
                  <FavoriteListPaginationButtons
                    currentPage={this.state.currentPage}
                    nextPage={() =>
                      this.state.currentPage <
                        data.getUserFavoriteProducts.length /
                          FAVORITE_LIST_LIMIT &&
                      this.setPage(this.state.currentPage + 1)
                    }
                    previousPage={() =>
                      this.state.currentPage > 1 &&
                      this.setPage(this.state.currentPage - 1)
                    }
                    setPage={this.setPage}
                    match={this.props.match}
                    productsCount={data.getUserFavoriteProducts.length}
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
                        Kamu belum punya barang favorit
                      </div>
                      <div className="no-item-small text-center">
                        ayo mulai cari !
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

export default withApollo(withRouter(FavoriteList));
