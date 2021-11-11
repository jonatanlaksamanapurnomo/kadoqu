import Swal from "sweetalert2";

const LoadingAlert = msg =>
  Swal.fire({
    title: msg,
    showCancelButton: false,
    showConfirmButton: false,
    imageUrl: "https://ik.imagekit.io/nwiq66cx3pvsy/Ball-0.8s-200px.gif",
    imageWidth: 100,
    imageHeight: 100,
    imageAlt: "Custom image"
  });

const CloseLoadingAlert = () => Swal.close();

export { LoadingAlert, CloseLoadingAlert };
