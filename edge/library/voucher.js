const voucher = [
  {
    id: 1,
    nama_voucher: "bunga",
    items: [0, 1],
    discount: 1001230
  },
  {
    id: 2,
    nama_voucher: "tas",
    items: ["e297311d-c4e2-45a6-8e0b-ad04c8b11ca7", 4],
    discount: 1000
  }
];

function isvalid(nama_voucher, cart) {
  let hasil = 0;
  let isicart = JSON.parse(cart);
  let itemcart = isicart.map(item => item.idProduct || item.productId);

  let itemvoucher = [];

  voucher.filter(obj => {
    if (obj.nama_voucher == nama_voucher) {
      itemvoucher = obj;
    }
  });
  if (itemvoucher.items.length > 0) {
    let intersection = itemcart.filter(value => itemvoucher.items.includes(value));
    if (intersection.length > 0) {
      hasil = itemvoucher.discount;
    }
  } else {
    hasil = -1;
  }

  return hasil;
}

module.exports = {
  isvalid
};
