import React from "react";
import showTransformationsPhoto from "../library/ShowImageTransformation";
import { shortIndonesianDateMonthYearParser } from "../utils/dateTimeFormatter";
import { WrappingLabAlert } from "./SweetAlerts";

import "./WrappingLabProductItem.css";

const WrappingLabProductItem = ({
  draggable,
  source,
  item,
  isMobile,
  ...props
}) => (
  <div
    draggable={draggable}
    className={
      "wrapping-lab-product-item" +
      (!draggable ? " wrapping-lab-product-item-disabled" : " cursor-grab")
    }
    onMouseOver={() => draggable && props.preventScroll(true)}
    onMouseLeave={() => draggable && props.preventScroll(false)}
    onDragStart={e => {
      if (!draggable) return;
      e.dataTransfer.setData("itemDetail", JSON.stringify(item));
      e.dataTransfer.setData("source", source);
      e.target.classList.add("wrapping-lab-product-item-dragged");
    }}
    onDragEnd={e => {
      if (!draggable) return;
      e.target.classList.remove("wrapping-lab-product-item-dragged");
      e.preventDefault();
    }}
    onClick={() => {
      if (!draggable) WrappingLabAlert();
    }}
  >
    <div className="wrapping-lab-product-item-image-container">
      <img
        src={showTransformationsPhoto(500, 500, item.image)}
        alt={item.productName}
      />
    </div>
    {draggable && <div className="wrapping-lab-product-item-overlay" />}
    {/* this overlay div is meant to overcome image dragging bug in Mozilla */}
    <div className="wrapping-lab-product-item-qty">&times;{item.quantity}</div>
    <div className="wrapping-lab-product-item-name">{item.productName}</div>
    {item.date && (
      <div className="wrapping-lab-product-item-detail">
        {shortIndonesianDateMonthYearParser(item.date.from)} -{" "}
        {shortIndonesianDateMonthYearParser(item.date.to)}
      </div>
    )}
    {draggable && isMobile && (
      <i
        className={`fas fa-chevron-${source === "unwrapped" ? "down" : "up"}`}
        onClick={() => props.handleWrap(item)}
      />
    )}
  </div>
);

export default WrappingLabProductItem;
