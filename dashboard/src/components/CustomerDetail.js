import React from "react";
import {Card} from "react-bootstrap";
import {getFullDate, getTime} from "../utils/dateTimeFormatter";

const CustomerDetail = props => (
  <Card>
    <Card.Header>
      {[props.title ? props.title : "", "Customer"].join(" ")}
    </Card.Header>
    <Card.Body>
      <div> Name
        : {props.orderDetail.user.firstName + " " + props.orderDetail.user.lastName}</div>
      <div>Email : {props.orderDetail.user.email}</div>
      <div>Time : {getFullDate(props.orderDetail.createdAt) +
      " " +
      getTime(props.orderDetail.createdAt)}</div>
      <div>
      Status: {props.orderDetail.orderStatus.status}
      </div>
      <div>        Phone Number:{props.orderDetail.user.phone}
</div>
    </Card.Body>
  </Card>
);

export default CustomerDetail;
