import Swal from "sweetalert2";
import IMAGES from "../data/images";
import "./SweetAlert.css";

const Toast = Swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 2000
});

const PopUpLogOut = () =>
  Swal.fire({
    customClass: {
      container: "pop-up-main-backdrop",
      popup: "pop-up-logout-container",
      title: "kadoqu-primary-color"
    },
    showConfirmButton: false,
    timer: 3000,
    title: "Logout berhasil",
    text: "Sampai jumpa lagi!",
    imageUrl: IMAGES["Modal With GIdA"].flower,
    imageAlt: "Success!",
    imageWidth: 100
  });

// const PopUpFavorite = (isFavorited, productName) =>
//   Swal.fire({
//     customClass: {
//       container: "pop-up-main-backdrop",
//       popup: "pop-up-logout-container",
//       title: "kadoqu-primary-color"
//     },
//     showConfirmButton: false,
//     timer: 2500,
//     title: "Favorit berhasil " + (isFavorited ? "ditambah" : "dibuang"),
//     text: isFavorited
//       ? `${productName} sudah jadi favorit kamu`
//       : `${productName} bukan favorit kamu lagi`,
//     imageUrl: IMAGES["Modal With GIdA"][isFavorited ? "flower" : "cry"],
//     imageAlt: "Success!",
//     imageWidth: 100
//   });

const DeleteProductCartConfirmation = callbackConfirmDelete => {
  Swal.fire({
    customClass: {
      cancelButton: "kadoqu-primary-button w-45",
      confirmButton: "kadoqu-danger-button w-45"
    },
    title: "Hapus Produk?",
    confirmButtonText: "Hapus",
    showCancelButton: true,
    cancelButtonText: "Batal",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      callbackConfirmDelete();
    }
  });
};

const DeleteProductCartConfirmation2 = (
  callbackConfirmDelete,
  callbackCancelDelete,
  minQty = 1
) => {
  Swal.fire({
    customClass: {
      cancelButton: "kadoqu-primary-button w-45",
      confirmButton: "kadoqu-danger-button w-45"
    },
    title: "Hapus Produk?",
    text: "Min. pembelian " + minQty + " pcs",
    confirmButtonText: "Hapus",
    showCancelButton: true,
    cancelButtonText: "Batal",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      callbackConfirmDelete();
    } else {
      callbackCancelDelete();
    }
  });
};

const DeleteAddressCardConfirmation = (alias, callbackConfirmDelete) => {
  Swal.fire({
    customClass: {
      cancelButton: "kadoqu-primary-button w-45",
      confirmButton: "kadoqu-danger-button w-45"
    },
    title: `Hapus Alamat "${alias}"?`,
    confirmButtonText: "Hapus",
    showCancelButton: true,
    cancelButtonText: "Batal",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      callbackConfirmDelete();
    }
  });
};

const InsufficientStockAlert = callbackCancel => {
  Swal.fire({
    customClass: {
      container: "pop-up-main-backdrop",
      popup: "pop-up-cart-container",
      title: "pop-up-main-title",
      content: "pop-up-main-subtitle",
      confirmButton: "kadoqu-primary-button pop-up-cart-button",
      cancelButton: "kadoqu-primary-button pop-up-cart-button"
    },
    title: "Stok tidak cukup",
    text: "GIdA gak punya sebanyak itu",
    imageWidth: 100,
    imageUrl: IMAGES["Modal With GIdA"]["stock"],
    imageAlt: "Insufficient stock",
    animation: false,
    confirmButtonText: "Kontak CS",
    showCancelButton: true,
    cancelButtonText: "OK",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      Swal.fire({
        customClass: {
          container: "pop-up-main-backdrop",
          popup: "pop-up-logout-container",
          title: "kadoqu-primary-color"
        },
        showConfirmButton: false,
        title: "CS kami bakal bantu",
        text: "Silakan chat di WhatsApp ya",
        imageUrl: IMAGES["Modal With GIdA"].flower,
        imageAlt: "Success!",
        imageWidth: 100
      });
      window.open("https://wa.me/628112181600", "_blank");
    } else {
      callbackCancel();
    }
  });
};

const SetQuantityToMaxStockConfirmation = (
  callbackConfirm,
  callbackCancel = () => {
  }
) => {
  Swal.fire({
    customClass: {
      confirmButton: "kadoqu-primary-button w-45",
      cancelButton: "kadoqu-primary-button w-45"
    },
    title: "Oh no..",
    text: "Ada produk yang melebihi stok, mau kami ubah biar sesuai stok kami?",
    imageUrl: "https://ik.imagekit.io/nwiq66cx3pvsy/Profile/profile-04.png",
    imageWidth: 200,
    imageAlt: "Insufficient stock",
    animation: false,
    reverseButtons: true,
    confirmButtonText: "Boleh deh",
    showCancelButton: true,
    cancelButtonText: "Ngga usah deh",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      callbackConfirm();
    } else {
      callbackCancel();
    }
  });
};

const PopUpCart = (
  goToCart,
  onContinueShopping = undefined,
  customTitle = "",
  customCancelText = ""
) => {
  Swal.fire({
    customClass: {
      container: "pop-up-main-backdrop",
      popup: "pop-up-cart-container",
      title: "pop-up-cart-title",
      header: "pop-up-cart-header",
      confirmButton: "kadoqu-primary-button pop-up-cart-button",
      cancelButton: "kadoqu-primary-button pop-up-cart-button"
    },
    title: customTitle || "Barang berhasil dimasukan",
    imageUrl: IMAGES["Modal With GIdA"].happy,
    imageAlt: "Success!",
    reverseButtons: true,
    confirmButtonText: "Cek Keranjang",
    showCancelButton: true,
    cancelButtonText: customCancelText || "Lanjut Belanja",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      goToCart.push("/cart");
      return;
    }
    if (result.dismiss) {
      typeof onContinueShopping === "function" && onContinueShopping();
      return goToCart.goBack();
    }
  });
};

const PopUpEmptyCart = goToProductList => {
  Swal.fire({
    customClass: {
      container: "pop-up-main-backdrop",
      popup: "pop-up-cart-container",
      title: "pop-up-cart-title",
      confirmButton: "kadoqu-primary-button pop-up-cart-button w-75"
    },
    title: "Keranjang kamu kosong...",
    imageUrl: IMAGES["Modal With GIdA"].cry,
    imageAlt: "Empty cart",
    confirmButtonText: "Belanja Sekarang!",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      goToProductList();
    }
  });
};

const PopUpRating = goToHome => {
  Swal.fire({
    title: "Selesai!",
    text: "Pesan kamu bakal GIdA simpan dalam hati!",
    icon: "success",
    confirmButtonText: "OK",
    confirmButtonClass: "kadoqu-primary-button w-50 rating-submit-button",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(() => goToHome());
};

const WrappingLabAlert = () => {
  Swal.fire({
    customClass: {
      container: "pop-up-main-backdrop",
      popup: "pop-up-cart-container",
      title: "pop-up-main-title-2",
      content: "pop-up-main-subtitle",
      confirmButton: "kadoqu-primary-button pop-up-cart-button",
      cancelButton: "kadoqu-primary-button pop-up-cart-button"
    },
    title: "GIdA bantu untuk bungkus barang ini ya",
    text: "Silahkan hubungi CS untuk menggunakan wrapping lab",
    imageWidth: 100,
    imageUrl: IMAGES["Modal With GIdA"]["stock"],
    imageAlt: "Wrapping lab alert",
    animation: false,
    confirmButtonText: "Kontak CS",
    showCancelButton: true,
    cancelButtonText: "OK",
    onOpen: () => Swal.getConfirmButton().blur()
  }).then(result => {
    if (result.value) {
      Swal.fire({
        customClass: {
          container: "pop-up-main-backdrop",
          popup: "pop-up-logout-container",
          title: "kadoqu-primary-color"
        },
        showConfirmButton: false,
        title: "CS kami bakal bantu",
        text: "Silakan chat di WhatsApp ya",
        imageUrl: IMAGES["Modal With GIdA"].flower,
        imageAlt: "Success!",
        imageWidth: 100
      });
      window.open("https://wa.me/628112181600", "_blank");
    }
  });
};

export {
  Toast,
  PopUpLogOut,
  // PopUpFavorite,
  DeleteProductCartConfirmation,
  InsufficientStockAlert,
  SetQuantityToMaxStockConfirmation,
  PopUpCart,
  PopUpEmptyCart,
  PopUpRating,

  DeleteAddressCardConfirmation,
  WrappingLabAlert,
  DeleteProductCartConfirmation2

};
