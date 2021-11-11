import React, { Component } from "react";
import "./OrderTrack.css";
import { Row, Col, Button } from "react-bootstrap";

const dateParser = statusDate => {
  let d = new Date(statusDate);
  let month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  let date = d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
  return date;
};

const Manifest = ({ manifest }) => (
  <Row className="my-2">
    <Col xs={1} className="order-track-manifest my-auto">
      <i className="fas fa-circle order-track-manifest-circle"></i>
    </Col>
    <Col xs>{manifest.manifest_description}</Col>
  </Row>
);

const OrderTrackBody = props => {
  return (
    <div className="py-4">
      {props.items.map(item => (
        <OrderTrackItem
          key={item.id}
          item={item}
          waybillTrack={item.orderStatusId === "4" ? props.waybillTrack : null}
        />
      ))}
    </div>
  );
};

const OrderTrackItem = props => {
  const { date, orderStatusId } = props.item;
  const waybillTrack = props.waybillTrack;
  let statusText = "";
  let note = "";
  if (orderStatusId === "1") {
    statusText = "Checkout berhasil";
    note = "Menunggu konfirmasi pembayaran";
  } else if (orderStatusId === "2") {
    statusText = "Pembayaran diverifikasi";
    note = "Pembayaran telah diterima kadoqu";
  } else if (orderStatusId === "3") {
    statusText = "Pesanan dibuat";
  } else if (orderStatusId === "4") {
    statusText = "Pesanan dikirim";
    note = "Klik track kurir";
  } else if (orderStatusId === "5") {
    statusText = "Pesanan telah sampai";
  } else if (orderStatusId === "6") {
    statusText = "Pesanan dibatalkan";
  }
  return (
    <Row className="my-3">
      <Col xs={4} sm={4} md={3}>
        <div className={`order-track-date-${orderStatusId}`}>
          {dateParser(date)}
        </div>
      </Col>
      <Col className="order-track-status-div" xs={8} sm={8} md={8}>
        <span className="order-track-status-text">{statusText}</span>
        <br />
        {note !== "" ? (
          orderStatusId === "4" && waybillTrack ? (
            <div className="order-track-note order-track-waybill ml-3">
              {waybillTrack.manifest.map((value, index) => (
                <Manifest key={index} manifest={value} />
              ))}
            </div>
          ) : (
            <div className="order-track-note">
              <span>{note}</span>
            </div>
          )
        ) : null}
      </Col>
    </Row>
  );
};

class OrderTrack extends Component {
  render() {
    const { order, isDesktop } = this.props;
    const orderTrack = order.orderTracks;
    const waybillTrack = order.waybillTrack;
    let status = "";
    if (order.orderStatusId === 1) {
      status = "Menunggu Pembayaran";
    } else if (order.orderStatusId === 2) {
      status = "Proses Verifikasi Pembayaran";
    } else if (order.orderStatusId === 3) {
      status = "Pesanan Diproses";
    } else if (order.orderStatusId === 4) {
      status = "Pesanan Telah Dikirim";
    } else if (order.orderStatusId === 5) {
      status = "Pesanan Sampai";
    } else if (order.orderStatusId === 6) {
      status = "Pesanan Dibatalkan";
    }

    return (
      <div>
        <div className={isDesktop ? "order-track-header" : ""}>
          {isDesktop ? (
            <div className="order-track-title text-center w-100">
              <span className="">Lacak Pesanan</span>
            </div>
          ) : (
            ""
          )}
          <div className={isDesktop ? "text-center" : "order-track-stat pt-2"}>
            <span className="order-track-statuses">
              Status Pesanan:{" "}
              <span className="order-track-status">{status}</span>
            </span>
          </div>
          <div className={isDesktop ? "text-center" : "order-track-stat-resi"}>
            {order.resi ? (
              <span className="order-track-no-resi">
                No. Resi:{" "}
                <span className="order-track-status">{order.resi}</span>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
        <OrderTrackBody
          items={orderTrack}
          waybillTrack={waybillTrack}
          isDesktop={isDesktop}
        />
        <div className="order-track-buttons d-flex justify-content-center w-100">
          <Button
            className="order-track-button  "
            type="button"
            onClick={this.props.back}
          >
            Kembali
          </Button>
        </div>
      </div>
    );
  }
}

export default OrderTrack;
