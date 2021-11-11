import React from "react";
import { Card } from "react-bootstrap";

const AddressCard = props => (
  <Card>
    <Card.Header>
      {[props.title ? props.title : "", "Address"].join(" ")}
    </Card.Header>
    <Card.Body>
      <div>{props.address.name}</div>
      <div>{`${props.address.street}, ${props.address.subdistrict}`}</div>
      <div>{`${props.address.city}, ${props.address.province}`}</div>
      <div>{props.address.postCode}</div>
      <div>
        <i className="fa fa-phone mr-1" />
        {props.address.phone}
      </div>
    </Card.Body>
  </Card>
);

export default AddressCard;
