import React, {Component} from 'react';
import "./CustomeAccordion.css";
import {withApollo} from "react-apollo";


class CustomeAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showImages: false
    };
  }

  render() {
    return (
      <div>
        <p onClick={() => {
          this.setState({
            show: !this.state.show
          })
        }} style={{
          color: "#00998d",
          cursor: "pointer"
        }}>{this.props.clickMessage}</p>
        {this.state.show === true && (
          <div className="row">
            {this.props.cartItem.customeColor !== "" && (
              <div className="col-12 ">
                <p style={{fontSize: "75%"}}>Warna
                  : {this.props.cartItem.customeColor}</p>
              </div>
            )}
            {this.props.cartItem.isiUcapan !== "" && (
              <div className="col-12">
                <p style={{fontSize: "75%"}}>
                  <bold style={{color: "#00998d"}}>Notes</bold>
                  : {this.props.cartItem.isiUcapan}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withApollo(CustomeAccordion);
