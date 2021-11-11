import React from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { Mutation, Query } from "react-apollo";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row
} from "react-bootstrap";
import AddProductCategoryModal from "../components/AddProductCategoryModal";
import Toast from "../components/Toast";
import { QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES } from "../gql/category";
import { QUERY_GET_STORE_CATEGORIES } from "../gql/store-category";
import { QUERY_GET_PRODUCTS_CATEGORIES } from "../gql/product";
import {
  MUTATION_ADD_PRODUCT_GIFT_CATEGORY,
  MUTATION_ADD_PRODUCT_STORE_CATEGORY,
  MUTATION_DELETE_PRODUCT_GIFT_CATEGORY,
  MUTATION_DELETE_PRODUCT_STORE_CATEGORY
} from "../gql/product-category";
import showTransformationsPhoto from "../library/showTransformationsPhoto";

class ProductListByCategory extends React.Component {
  state = {
    isGiftCategory: true,
    isAddingProduct: false,
    selectedProducts: new Set(),
    activeCategory: null,
    activeCategoryParent: null,
    activeCategoryChildren: []
  };
  handleProductClick = id => {
    let temp = this.state.selectedProducts;
    if (this.state.selectedProducts.has(id)) {
      temp.delete(id);
      this.setState({ selectedProducts: temp });
      return;
    }
    this.setState({ selectedProducts: temp.add(id) });
  };
  setActiveCategory = (value, parent = null, children = []) => {
    this.setState({
      activeCategory: value,
      activeCategoryParent: parent,
      selectedProducts: new Set(),
      activeCategoryChildren: children
    });
  };

  render() {
    return (
      <React.Fragment>
        <Query
          query={
            this.state.isGiftCategory
              ? QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES
              : QUERY_GET_STORE_CATEGORIES
          }
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>{error.message}</p>;
            const categories = this.state.isGiftCategory
              ? data.getParentCategories
              : data.getStoreCategories;
            return (
              <Card>
                <CardHeader className="d-flex justify-content-between">
                  <h2 className="mb-0">
                    Product List by{" "}
                    {this.state.isGiftCategory ? "Gift" : "Store"} Category
                  </h2>
                  <small
                    className="text-primary cursor-pointer"
                    onClick={() =>
                      this.setState({
                        isGiftCategory: !this.state.isGiftCategory,
                        activeCategory: null,
                        selectedProducts: new Set()
                      })
                    }
                  >
                    Switch to {this.state.isGiftCategory ? "store" : "gift"}{" "}
                    category
                  </small>
                </CardHeader>
                <CardBody>
                  <div className="text-muted text-right small mb-3">
                    Double-click on product image to navigate to edit product
                  </div>
                  <Row>
                    <Col xs={3} className="bg-light text-muted py-3">
                      <div
                        className={
                          this.state.activeCategory
                            ? "cursor-pointer"
                            : "font-weight-bold text-dark"
                        }
                        onClick={() => this.setActiveCategory(null)}
                      >
                        Unassigned Products
                      </div>
                      {categories.map(category => (
                        <React.Fragment key={category.id}>
                          <div
                            className={
                              "mt-3 " +
                              (this.state.activeCategory !== category.name
                                ? "cursor-pointer"
                                : "font-weight-bold text-dark")
                            }
                            onClick={() =>
                              this.setActiveCategory(
                                category.name,
                                null,
                                !this.state.isGiftCategory
                                  ? []
                                  : category.children.map(({ name }) => name)
                              )
                            }
                          >
                            {category.name}
                          </div>
                          {category.children &&
                            category.children.map(child => (
                              <div
                                key={child.id}
                                className={
                                  "pl-3 mt-1 " +
                                  (this.state.activeCategory !== child.name
                                    ? "cursor-pointer"
                                    : "font-weight-bold text-dark")
                                }
                                onClick={() =>
                                  this.setActiveCategory(
                                    child.name,
                                    category.name
                                  )
                                }
                              >
                                {child.name}
                              </div>
                            ))}
                        </React.Fragment>
                      ))}
                    </Col>
                    <Mutation
                      mutation={
                        this.state.isGiftCategory
                          ? MUTATION_ADD_PRODUCT_GIFT_CATEGORY
                          : MUTATION_ADD_PRODUCT_STORE_CATEGORY
                      }
                      refetchQueries={[
                        { query: QUERY_GET_PRODUCTS_CATEGORIES }
                      ]}
                    >
                      {mutationAddProductCategory => (
                        <Mutation
                          mutation={
                            this.state.isGiftCategory
                              ? MUTATION_DELETE_PRODUCT_GIFT_CATEGORY
                              : MUTATION_DELETE_PRODUCT_STORE_CATEGORY
                          }
                          refetchQueries={[
                            { query: QUERY_GET_PRODUCTS_CATEGORIES }
                          ]}
                        >
                          {mutationDeleteProductCategory => (
                            <Col xs={9}>
                              <div className="d-flex justify-content-between mb-2">
                                <h3>
                                  {!this.state.activeCategory
                                    ? "Unassigned products"
                                    : this.state.activeCategory}
                                </h3>

                                {this.state.activeCategory ? (
                                  <span>
                                    {this.state.selectedProducts.size > 0 && (
                                      <Button
                                        variant="danger"
                                        className="rounded-circle shadow mr-1"
                                        onClick={() => {
                                          const promises = Array.from(
                                            this.state.selectedProducts
                                          ).map(productId =>
                                            [
                                              mutationDeleteProductCategory({
                                                variables: {
                                                  productId: productId,
                                                  category: this.state
                                                    .activeCategory
                                                }
                                              })
                                            ].concat(
                                              !this.state.isGiftCategory ||
                                                this.state.activeCategoryParent
                                                ? []
                                                : this.state.activeCategoryChildren.map(
                                                    subcategory =>
                                                      mutationDeleteProductCategory(
                                                        {
                                                          variables: {
                                                            productId: productId,
                                                            category: subcategory
                                                          }
                                                        }
                                                      )
                                                  )
                                            )
                                          );
                                          Promise.all(
                                            [].concat.apply([], promises)
                                          )
                                            .then(() => {
                                              Toast.fire({
                                                type: "success",
                                                title: `Products successfully removed from category "${this.state.activeCategory}"`
                                              });
                                              this.setState({
                                                selectedProducts: new Set()
                                              });
                                            })
                                            .catch(error => {
                                              Toast.fire({
                                                type: "error",
                                                title: error
                                              });
                                            });
                                        }}
                                      >
                                        <i className="fa fa-trash" />
                                      </Button>
                                    )}
                                    <Button
                                      variant="primary"
                                      className="rounded-circle shadow"
                                      onClick={() =>
                                        this.setState({ isAddingProduct: true })
                                      }
                                    >
                                      <i className="fa fa-plus" />
                                    </Button>
                                  </span>
                                ) : (
                                  this.state.selectedProducts.size > 0 && (
                                    <DropdownButton
                                      variant="primary"
                                      as={ButtonGroup}
                                      title={
                                        <span>
                                          <i className="fa fa-plus" /> Add to
                                          Category
                                        </span>
                                      }
                                    >
                                      {categories.map(category => (
                                        <Dropdown.Item
                                          key={category.id}
                                          as="button"
                                          onClick={() => {
                                            const promises = Array.from(
                                              this.state.selectedProducts
                                            ).map(productId =>
                                              mutationAddProductCategory({
                                                variables: {
                                                  productId: productId,
                                                  category: category.name
                                                }
                                              })
                                            );
                                            Promise.all(promises)
                                              .then(() => {
                                                Toast.fire({
                                                  type: "success",
                                                  title: `Products successfully added to category "${category.name}"`
                                                });
                                              })
                                              .catch(error => {
                                                Toast.fire({
                                                  type: "error",
                                                  title: error
                                                });
                                              });
                                          }}
                                        >
                                          {category.name}
                                        </Dropdown.Item>
                                      ))}
                                    </DropdownButton>
                                  )
                                )}
                              </div>
                              <Query query={QUERY_GET_PRODUCTS_CATEGORIES}>
                                {({ loading, error, data }) => {
                                  if (loading) {
                                    return (
                                      <div className="text-center">
                                        Loading...
                                      </div>
                                    );
                                  }
                                  if (error) {
                                    return (
                                      <div className="text-center">
                                        Error! {error.message}
                                      </div>
                                    );
                                  }
                                  console.log(data.getProductsDashboard);
                                  let products = [];
                                  let unincludedProducts = [];
                                  data.getProductsDashboard.forEach(product => {
                                    if (!this.state.activeCategory) {
                                      if (
                                        product[
                                          this.state.isGiftCategory
                                            ? "categories"
                                            : "storeCategories"
                                        ].length === 0
                                      ) {
                                        products.push(product);
                                        return;
                                      }
                                      unincludedProducts.push(product);
                                      return;
                                    }
                                    if (
                                      product[
                                        this.state.isGiftCategory
                                          ? "categories"
                                          : "storeCategories"
                                      ].find(
                                        ({ name }) =>
                                          name === this.state.activeCategory
                                      )
                                    ) {
                                      products.push(product);
                                      return;
                                    }
                                    if (
                                      !this.state.activeCategoryParent ||
                                      product[
                                        this.state.isGiftCategory
                                          ? "categories"
                                          : "storeCategories"
                                      ].find(
                                        ({ name }) =>
                                          name ===
                                          this.state.activeCategoryParent
                                      )
                                    ) {
                                      unincludedProducts.push(product);
                                      return;
                                    }
                                  });
                                  return (
                                    <Container fluid>
                                      {products.length === 0 ? (
                                        !this.state.activeCategory ? (
                                          "All products are assigned"
                                        ) : (
                                          "No product assigned in this category"
                                        )
                                      ) : (
                                        <Row>
                                          {products.map(product => (
                                            <Col sm={6} key={product.id}>
                                              <Button
                                                block
                                                variant={
                                                  this.state.selectedProducts.has(
                                                    product.id
                                                  )
                                                    ? "info"
                                                    : "light"
                                                }
                                                className={
                                                  "text-left shadow mb-3 p-2"
                                                }
                                                onClick={e =>
                                                  this.handleProductClick(
                                                    product.id
                                                  )
                                                }
                                              >
                                                <img
                                                  alt=""
                                                  className="h-50px mr-1"
                                                  src={showTransformationsPhoto(
                                                    50,
                                                    50,
                                                    (product.photos[0] || {})
                                                      .url
                                                  )}
                                                  onDoubleClick={() =>
                                                    this.props.history.push(
                                                      "/products/edit/" +
                                                        product.id
                                                    )
                                                  }
                                                />
                                                {product.name}
                                              </Button>
                                            </Col>
                                          ))}
                                        </Row>
                                      )}
                                      <AddProductCategoryModal
                                        list={unincludedProducts}
                                        show={this.state.isAddingProduct}
                                        onHide={() =>
                                          this.setState({
                                            isAddingProduct: false
                                          })
                                        }
                                        category={this.state.activeCategory}
                                        mutation={mutationAddProductCategory}
                                      />
                                    </Container>
                                  );
                                }}
                              </Query>
                            </Col>
                          )}
                        </Mutation>
                      )}
                    </Mutation>
                  </Row>
                </CardBody>
              </Card>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default ProductListByCategory;
