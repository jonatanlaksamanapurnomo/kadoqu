import React from "react";
import { Button, Form, FormGroup } from "reactstrap";
import { Query, withApollo } from "react-apollo";
import Select from "react-select";
import { MUTATION_EDIT_VOUCHER } from "../gql/voucher";
import { QUERY_GET_ADMINS } from "../gql/admin";
import { LoadingAlert, CloseLoadingAlert } from "./Loader";
import { compareValues } from "../utils/sort";

class EditVoucherMerchantFragment extends React.Component {
  state = {
    formData: {
      merchants: this.props.voucher.merchants
    }
  };

  render() {
    const voucher = this.props.voucher;
    const Toast = this.props.toast;
    return (
      <Form
        onSubmit={e => {
          e.preventDefault();
          LoadingAlert("Editing Voucher Merchants...");
          const { client, voucherId } = this.props;
          client
            .mutate({
              mutation: MUTATION_EDIT_VOUCHER,
              variables: {
                id: voucherId,
                input: {
                  merchants: this.state.formData.merchants
                }
              }
            })
            .then(() => {
              CloseLoadingAlert();
              this.props.setAlert({
                message: `Success! Merchants of ${voucher.name} have been updated!`,
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
          <h4>Merchant</h4>
          <Query query={QUERY_GET_ADMINS}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return error.message;
              const selectedMerchants = voucher.merchants.map(value => {
                const merchant = data.getAdmins
                  .filter(e => e.role === "merchant")
                  .find(e => e.name === value);
                if (merchant)
                  return {
                    label: merchant.code + " - " + merchant.name,
                    value: merchant.name
                  };
                // eslint-disable-next-line
                return;
              });

              return (
                <Select
                  isClearable
                  isMulti
                  options={data.getAdmins
                    .filter(e => e.role === "merchant")
                    .map(value => ({
                      label: value.code + " - " + value.name,
                      value: value.name
                    }))
                    .sort(compareValues("label"))}
                  defaultValue={selectedMerchants}
                  onChange={e =>
                    this.setState({
                      formData: {
                        merchants: (e && e.map(value => value.value)) || []
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

export default withApollo(EditVoucherMerchantFragment);
