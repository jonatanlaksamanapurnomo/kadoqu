import React from "react";
import {Button, Col, Form, FormGroup, Row} from "reactstrap";
import {withApollo} from "react-apollo";
import {subtractSet} from "../utils/setOperator";
import {
  MUTATION_DELETE_PRODUCT_COLOR,
  MUTATION_ADD_PRODUCT_COLOR
} from "../gql/color";
import {LoadingAlert, CloseLoadingAlert} from "./Loader";
import {
  MUTATION_ADD_PRODUCT_REVIEW,
  MUTATION_SET_PRODUCT_REVIEWS_STATUS
} from "../gql/product-review";
import { MUTATION_DELETE_DOCUMENT } from "../gql/elasticsearch";

class EditProductColorFragment extends React.Component {
  state = {
    formData: {
      colors: new Set()
    }
  };
  componentDidMount = () => {
    this.resetFormData();
  };
  resetFormData = () => {
    this.setState({
      formData: {
        colors: new Set(
          this.props.productDetail.colors.map(color => color.name)
        )
      }
    });
  };

  render() {
    const productDetail = this.props.productDetail;
    const Toast = this.props.toast;
    const onClickCheckboxes = (formNode, changedChoice, isChecked) => {
      let newData = this.state.formData;
      if (isChecked) {
        newData[formNode].add(changedChoice);
      } else {
        newData[formNode].delete(changedChoice);
      }
      this.setState({formData: newData});
    };
    return (
      <Form
        onReset={e => {
          e.preventDefault();
          this.resetFormData();
        }}
        onSubmit={e => {
          e.preventDefault();
          LoadingAlert("Editing Product Color(s)..");
          let {colors} = this.state.formData;
          // define what should be added to the database
          const addition = Array.from(
            subtractSet(
              colors,
              new Set(productDetail.colors.map(color => color.name))
            )
          );
          // define what should be removed from the database
          const subtraction = Array.from(
            subtractSet(
              new Set(productDetail.colors.map(color => color.name)),
              colors
            )
          );
          // exit if no change occur
          if (addition.length === 0 && subtraction.length === 0) {
            Toast.fire({
              type: "warning",
              title: "No changes detected"
            });
            return;
          }
          // prepare mutations to be done
          const {client, productId} = this.props;
          let promises = [
            this.props.client.mutate({
              mutation: MUTATION_ADD_PRODUCT_REVIEW,
              variables: {
                productId: this.props.productId
              }
            }).then(() => {
              this.props.client.mutate({
                mutation:MUTATION_DELETE_DOCUMENT,
                variables:{
                  id:this.props.productDetail.id
                }
              });
              this.props.client.mutate({
                mutation: MUTATION_SET_PRODUCT_REVIEWS_STATUS,
                variables: {
                  status: false,
                  productId: this.props.productId
                }
              })
            })
          ];
          addition.forEach(color => {
            promises.push(
              client.mutate({
                mutation: MUTATION_ADD_PRODUCT_COLOR,
                variables: {
                  productId: productId,
                  color: color
                }
              })
            );
          });
          subtraction.forEach(color => {
            promises.push(
              client.mutate({
                mutation: MUTATION_DELETE_PRODUCT_COLOR,
                variables: {
                  productId: productId,
                  color: color
                }
              })
            );
          });

          Promise.all(promises)
            .then(() => {
              CloseLoadingAlert();
              this.props.setAlert({
                message: `Success! Colors of ${productDetail.name} have been updated!`,
                variant: "success"
              });
            })
            .catch(error => {
              Toast.fire({
                type: "error",
                title: `Oops! ${error.message || error}`
              });
            });
        }}
        className="form-horizontal"
      >
        <FormGroup>
          <h4>Color</h4>
          <Row>
            <Col>
              {[
                "red",
                "blue",
                "black",
                "yellow",
                "white",
                "green",
                "grey",
                "pink"
              ].map(color => {
                return (
                  <label key={color}>
                    <input
                      type="checkbox"
                      name="colors"
                      className="color-input"
                      style={{backgroundColor: color}}
                      checked={this.state.formData.colors.has(color)}
                      onChange={e =>
                        onClickCheckboxes("colors", color, e.target.checked)
                      }
                    />
                  </label>
                );
              })}
            </Col>
          </Row>
        </FormGroup>
        <div className="mt-3 d-flex justify-content-center">
          <Button type="submit" color="primary" className="w-25 mr-2">
            Save
          </Button>
          <Button type="reset" color="secondary" className="w-25">
            Reset
          </Button>
        </div>
      </Form>
    );
  }
}

export default withApollo(EditProductColorFragment);
