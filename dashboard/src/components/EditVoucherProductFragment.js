import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import { Query, withApollo } from "react-apollo";
import Select from "react-select";
import { MUTATION_EDIT_VOUCHER } from "../gql/voucher";
import { QUERY_GET_PRODUCTS } from "../gql/product";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import { compareValues } from "../utils/sort";

class EditVoucherProductFragment extends React.Component {
  state = {
    formData: {
      products: this.props.voucher.products
    }
  };

  render() {
    const voucher = this.props.voucher;
    const Toast = this.props.toast;
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          LoadingAlert("Editing Voucher Products...");
          const { client, voucherId } = this.props;
          client
            .mutate({
              mutation: MUTATION_EDIT_VOUCHER,
              variables: {
                id: voucherId,
                input: {
                  products: this.state.formData.products
                }
              }
            })
            .then(() => {
              CloseLoadingAlert();
              this.props.setAlert({
                message: `Success! Products of ${voucher.name} have been updated!`,
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
          <h4>Product</h4>
          <Query query={QUERY_GET_PRODUCTS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return error.message;
              const selectedProducts = voucher.products.map(value => {
                const product = data.getProductsDashboard.find(
                  e => e.id === value
                );
                if (product)
                  return {
                    label: product.merchant + " - " + product.name,
                    value: product.id
                  };
                // eslint-disable-next-line
                return;
              });

              return (
                <Select
                  isClearable
                  isMulti
                  options={data.getProductsDashboard
                    .map(value => ({
                      label: value.merchant + " - " + value.name,
                      value: value.id
                    }))
                    .sort(compareValues("label"))}
                  defaultValue={selectedProducts}
                  onChange={e =>
                    this.setState({
                      formData: {
                        products: (e && e.map(value => value.value)) || []
                      }
                    })
                  }
                />
              );
            }}
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

export default withApollo(EditVoucherProductFragment);
