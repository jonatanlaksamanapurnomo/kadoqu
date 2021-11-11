import React from "react";
import AddProductHolidayFirstForm from "../components/AddProductHolidayFirstForm";
import AddProductHolidaySecondForm from "../components/AddProductHolidaySecondForm";
import EditProductHolidayDate from "../components/EditProductHolidayDate";
import { getMerchantCategory, isAdmin } from "../utils/userChecker";
import Toast from "../components/Toast";

class AddProductHolidayForm extends React.Component {
  state = {
    stage: 1,
    productId: ""
  };
  render() {
    if (getMerchantCategory().name === "Holiday" || isAdmin()) {
      return this.state.stage === 1 ? (
        <AddProductHolidayFirstForm
          navigateToSecondForm={id =>
            this.setState({ stage: 2, productId: id })
          }
        />
      ) : this.state.stage === 2 ? (
        <AddProductHolidaySecondForm
          history={this.props.history}
          productId={this.state.productId}
          navigateToThirdForm={id => this.setState({ stage: 3, productId: id })}
        />
      ) : (
        <EditProductHolidayDate
          productId={this.state.productId}
          setAlert={this.setAlert}
          toast={Toast}
        />
      );
    } else {
      return <p>You don't have permission to access this page</p>;
    }
  }
}

export default AddProductHolidayForm;
