import React from "react";
import { Card } from "react-bootstrap"
import "./AddressCard.css";

/*
Return address card component that should be styled upon call

Input:
className <string> - addition className
children <node> - JSX/HTML content to be displayed on below each respective parent
Card address <object> - address object contains:
    id - identifier of this address
    alias - alias name for the address
    name - name of the person whom the address belong
    street - street name
    subdistrict - the address's subdistrict
    city - the address's city
    province - the address's province
    postCode - the address's post_code
    phone - phone number to be contacted
Card onClick <function> - function to be called upon clicking the address card itself
Link onClick <function> - function to be called upon choosing "choose other address", if empty then the option would not be displayed
Button onClick <function> - function to be called upon clicking green/gray button
Button active <boolean> - condition to differentiate button color (true = green, false = gray)
*/

class AddressCard extends React.Component {
  static Link = (props) =>
    <div
      className={"address-card-link kadoqu-primary-color " + props.className}
      onClick={props.onClick}
    >
      {props.children}
    </div>

  static Button = (props) =>
      <button
        className={
          "address-card-button " +
          (props.active ? "active " : "") +
          props.className
        }
        type={props.type ? props.type : "button"}
        onClick={props.onClick}
      >
        {props.children}
      </button>

  render() {
    const { address, onClick, children } = this.props
    return (
      <Card
        className={"address-card " + this.props.className}
      >
        <div className="address-card-address-section" onClick={onClick}>
          <div className="address-card-title">{address.alias}</div>
          <div className="address-card-content">
            <div>{address.name}</div>
            <div>{address.street + ", " + address.subdistrict + ","}</div>
            <div>
              {address.city + ", " + address.province + " " + address.postCode}
            </div>
            <div>{address.phone}</div>
          </div>
        </div>
        {children}
    </Card>
    );
  }
}

export default AddressCard;
