import React from "react";
import { Modal } from "react-bootstrap";

const TrackingShipmentModal = props => (
  <Modal
    show={props.show}
    onHide={props.onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Tracking Shipment</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <div>
        Status <strong>{props.waybillTrack.delivery_status.status}</strong>
      </div>
      <div>
        {props.waybillTrack.delivery_status.pod_date}{" "}
        {props.waybillTrack.delivery_status.pod_time}
      </div>
      <ul className="mt-3">
        {props.waybillTrack.manifest.map((value, index) => (
          <li key={index}>
            {value.manifest_description}{" "}
            <strong>
              {value.manifest_date} {value.manifest_time}
            </strong>
          </li>
        ))}
      </ul>
    </Modal.Body>
  </Modal>
);

export default TrackingShipmentModal;
