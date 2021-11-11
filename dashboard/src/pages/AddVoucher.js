import React from "react";
import AddVoucherForm from "../components/AddVoucherForm";

class AddVoucher extends React.Component {
  render() {
    return <AddVoucherForm history={this.props.history} />;
  }
}

export default AddVoucher;
