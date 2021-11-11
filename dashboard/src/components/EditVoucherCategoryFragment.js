import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Query, withApollo } from "react-apollo";
import { QUERY_GET_STORE_CATEGORIES } from "../gql/store-category";
import { QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES } from "../gql/category";
import { MUTATION_EDIT_VOUCHER } from "../gql/voucher";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";

const SubCategoryTag = props => (
  <div className="shadow-sm p-2 mb-1 bg-white rounded d-inline-flex w-auto align-items-center border mr-1">
    {props.category}
    <i
      className="fa fa-times text-secondary ml-1 cursor-pointer"
      onClick={() => props.onDelete()}
    />
  </div>
);

class EditVoucherCategoryFragment extends React.Component {
  state = {
    formData: {
      giftCategories: new Set(),
      giftSubCategories: {}, // keys are categories, values are in array
      storeCategories: new Set()
    }
  };

  componentDidMount = () => {
    this.props.client
      .query({
        query: QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES
      })
      .then(({ data }) => {
        let subcategories = {};
        data.getParentCategories.forEach(parent => {
          const selectedSubcategories = parent.children
            .map(subcategory => subcategory.name)
            .filter(subcategory =>
              this.props.voucher.giftCategories.includes(subcategory)
            );
          if (selectedSubcategories.length > 0) {
            subcategories[parent.name] = selectedSubcategories;
          }
        });
        this.setState({
          formData: {
            giftCategories: new Set(
              data.getParentCategories
                .map(category => category.name)
                .filter(category =>
                  this.props.voucher.giftCategories.includes(category)
                )
            ),
            giftSubCategories: subcategories,
            storeCategories: new Set(this.props.voucher.storeCategories)
          }
        });
      });
  };

  render() {
    const voucher = this.props.voucher;
    const Toast = this.props.toast;
    const onClickCheckboxes = (formNode, changedChoice, isChecked) => {
      let newData = this.state.formData;
      if (isChecked) {
        newData[formNode].add(changedChoice);
      } else {
        newData[formNode].delete(changedChoice);
      }
      this.setState({ formData: newData });
    };
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          LoadingAlert("Editing Voucher Category..");
          let { giftSubCategories, ...input } = this.state.formData;
          // define what should be added to the database
          Object.keys(giftSubCategories).forEach(key => {
            if (!input.giftCategories.has(key)) {
              delete giftSubCategories[key];
            }
          });
          let addition = {};
          addition["storeCategories"] = Array.from(input.storeCategories);
          addition["giftCategories"] = Array.from(
            new Set(
              [].concat.apply(
                Array.from(input.giftCategories),
                Object.values(giftSubCategories)
              )
            )
          );
          // prepare mutations to be done
          const { client, voucherId } = this.props;
          let promises = [];
          promises.push(
            client.mutate({
              mutation: MUTATION_EDIT_VOUCHER,
              variables: {
                id: voucherId,
                input: {
                  giftCategories: addition.giftCategories,
                  storeCategories: addition.storeCategories
                }
              }
            })
          );

          Promise.all(promises)
            .then(() => {
              CloseLoadingAlert();
              this.props.setAlert({
                message: `Success! Categories of ${voucher.name} have been updated!`,
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
          <h4>Gift Category</h4>
          <Query query={QUERY_GET_HIERARCHICAL_GIFT_CATEGORIES}>
            {({ loading, error, data }) =>
              loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error.message || error}</p>
              ) : (
                <Row>
                  {data.getParentCategories.map(category => (
                    <Col md={4} xs={6} key={category.id}>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id={
                            "gift-" +
                            category.name.toLowerCase().replace(/[\W]/g, "-")
                          }
                          name="parentCategories"
                          value={category.name}
                          checked={this.state.formData.giftCategories.has(
                            category.name
                          )}
                          onChange={e => {
                            onClickCheckboxes(
                              "giftCategories",
                              category.name,
                              e.target.checked
                            );
                          }}
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor={
                            "gift-" +
                            category.name.toLowerCase().replace(/[\W]/g, "-")
                          }
                        >
                          {category.name}
                        </Label>
                      </FormGroup>
                      {category.children.length === 0 ||
                      !this.state.formData.giftCategories.has(
                        category.name
                      ) ? null : (
                        <React.Fragment>
                          {!this.state.formData.giftSubCategories[
                            category.name
                          ] ? null : (
                            <div>
                              {this.state.formData.giftSubCategories[
                                category.name
                              ].map(subcategory => (
                                <SubCategoryTag
                                  key={subcategory}
                                  category={subcategory}
                                  onDelete={() =>
                                    this.setState({
                                      formData: {
                                        ...this.state.formData,
                                        giftSubCategories: {
                                          ...this.state.formData
                                            .giftSubCategories,
                                          [category.name]: (
                                            this.state.formData
                                              .giftSubCategories[
                                              category.name
                                            ] || []
                                          ).filter(
                                            listedSubcategory =>
                                              listedSubcategory !== subcategory
                                          )
                                        }
                                      }
                                    })
                                  }
                                />
                              ))}
                            </div>
                          )}
                          <FormGroup>
                            <Input
                              as="select"
                              type="select"
                              value={0}
                              onChange={({ target }) =>
                                this.setState({
                                  formData: {
                                    ...this.state.formData,
                                    giftSubCategories: Object.assign(
                                      this.state.formData.giftSubCategories,
                                      {
                                        [category.name]: (
                                          this.state.formData.giftSubCategories[
                                            category.name
                                          ] || []
                                        ).concat([target.value])
                                      }
                                    )
                                  }
                                })
                              }
                            >
                              <option disabled value={0}>
                                Select sub-categories...
                              </option>
                              {category.children
                                .filter(
                                  el =>
                                    !(
                                      this.state.formData.giftSubCategories[
                                        category.name
                                      ] || []
                                    ).includes(el.name)
                                )
                                .map(subcategory => (
                                  <option
                                    value={subcategory.name}
                                    key={subcategory.name}
                                  >
                                    {subcategory.name}
                                  </option>
                                ))}
                            </Input>
                          </FormGroup>
                        </React.Fragment>
                      )}
                    </Col>
                  ))}
                </Row>
              )
            }
          </Query>
        </FormGroup>
        <FormGroup>
          <h4>Store Category</h4>
          <Query query={QUERY_GET_STORE_CATEGORIES}>
            {({ loading, error, data }) =>
              loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>{error.message || error}</p>
              ) : (
                <Row>
                  {data.getStoreCategories.map(category => (
                    <Col md={4} xs={6} key={category.id}>
                      <FormGroup check inline>
                        <Input
                          className="form-check-input"
                          type="checkbox"
                          id={
                            "store-" +
                            category.name.toLowerCase().replace(/[\W]/g, "-")
                          }
                          name="storeCategories"
                          value={category.name}
                          defaultChecked={voucher.storeCategories.includes(
                            category.name
                          )}
                          onChange={e =>
                            onClickCheckboxes(
                              "storeCategories",
                              category.name,
                              e.target.checked
                            )
                          }
                        />
                        <Label
                          className="form-check-label"
                          check
                          htmlFor={
                            "store-" +
                            category.name.toLowerCase().replace(/[\W]/g, "-")
                          }
                        >
                          {category.name}
                        </Label>
                      </FormGroup>
                    </Col>
                  ))}
                </Row>
              )
            }
          </Query>
        </FormGroup>

        <div className="mt-3 d-flex justify-content-center">
          <Button type="submit" color="primary" className="w-100">
            Save
          </Button>
        </div>
      </Form>
    );
  }
}

export default withApollo(EditVoucherCategoryFragment);
