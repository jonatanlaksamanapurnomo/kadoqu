import { rpFormat } from "../utils/currencyFormatter";

const handleKirim = orderDetail => {
  let Kirim = "Ambil di Warehouse";
  if (orderDetail.courierCode) {
    Kirim = `${orderDetail.courierCode}  ${orderDetail.courierService}`;
  }

  return Kirim;
};

const handleKirimHarga = orderDetail => {
  let harga = "Shipping Fee : Rp 0";
  if (orderDetail.courierCode) {
    harga = ` Shipping Fee : ${rpFormat(orderDetail.shippingFee)}`;
  }

  return harga;
};

export { handleKirim, handleKirimHarga };
