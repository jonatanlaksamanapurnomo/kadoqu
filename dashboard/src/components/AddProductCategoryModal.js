import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import Toast from "./Toast";

class AddProductCategoryModal extends React.Component {
  state = {
    selectedProducts: new Set()
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
  render() {
    return (
      <Modal
        size="lg"
        show={this.props.show}
        onHide={() =>
          this.setState({ selectedProducts: new Set() }, () =>
            this.props.onHide()
          )
        }
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-uppercase mt-2">
            Add Product to Category {this.props.category}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.list.length === 0 ? (
            "All products are included in this category"
          ) : (
            <Container className="h-75vh">
              <Row className="h-100">
                <Col xs={10} className="h-100 overflow-auto">
                  <Container fluid>
                    <Row>
                      {this.props.list.map(product => (
                        <Col sm={6} key={product.id}>
                          <div>
                            <Button
                              block
                              variant={
                                this.state.selectedProducts.has(product.id)
                                  ? "info"
                                  : "light"
                              }
                              className={"text-left shadow mb-3 p-2"}
                              onClick={e => this.handleProductClick(product.id)}
                            >
                              <img
                                alt=""
                                className="h-50px mr-1"
                                src={(product.photos[0] || {}).url}
                              />
                              {product.name}
                            </Button>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </Col>
                <Col xs={2}>
                  <Button
                    block
                    onClick={() => {
                      const promises = Array.from(
                        this.state.selectedProducts
                      ).map(productId =>
                        this.props.mutation({
                          variables: {
                            productId: productId,
                            category: this.props.category
                          }
                        })
                      );
                      Promise.all(promises)
                        .then(() => {
                          Toast.fire({
                            type: "success",
                            title: "Products successfully added"
                          });
                          this.setState({ selectedProducts: new Set() }, () =>
                            this.props.onHide()
                          );
                        })
                        .catch(error => {
                          Toast.fire({ type: "error", title: error });
                        });
                    }}
                  >
                    Add
                  </Button>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

export default AddProductCategoryModal;
