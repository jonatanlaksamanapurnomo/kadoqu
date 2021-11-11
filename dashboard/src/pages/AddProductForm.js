import React from "react";
import AddProductFirstForm from "../components/AddProductFirstForm";
import AddProductSecondForm from "../components/AddProductSecondForm";
import EditProductScoreFragment from "../components/EditProductScoreFragment";
import { getMerchantCategory, isAdmin } from "../utils/userChecker";
import Toast from "../components/Toast";

class AddProductForm extends React.Component {
  state = {
    stage: 1,
    productId: ""
  };
  render() {
    if (getMerchantCategory().name !== "Holiday" || isAdmin()) {
      return this.state.stage === 1 ? (
        <AddProductFirstForm
          navigateToSecondForm={id =>
            this.setState({ stage: 2, productId: id })
          }
        />
      ) : this.state.stage === 2 ? (
        <AddProductSecondForm
          history={this.props.history}
          productId={this.state.productId}
          navigateToThirdForm={id => this.setState({ stage: 3, productId: id })}
        />
      ) : (
        <EditProductScoreFragment
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

export default AddProductForm;
