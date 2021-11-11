const postmark = require("postmark");

let status = process.env.DEPLOY_STATUS;

let urlkadoqu = "http://localhost:3000/profile/my-cart/1";
let verifyUrl = "http://localhost:3000/register-status/";
let IMAGEKIT_BASE_URL = "https://ik.imagekit.io/nwiq66cx3pvsy";
let dashboardUrl = "http://localhost:3001/order/";
if (status === "STAGING") {
  urlkadoqu = "https://stag.kadoqu.com/profile/my-cart/1";
  verifyUrl = "https://stag.kadoqu.com/register-status/";
  dashboardUrl = "https://ds.kadoqu.com/order/";
} else if (status === "PRODUCTION") {
  urlkadoqu = "https://kadoqu.com/profile/my-cart/1";
  verifyUrl = "https://kadoqu.com/register-status/";
  dashboardUrl = "https://admin.kadoqu.com/order/";
}

function indonesianDateParser(createdAt) {
  let d = new Date(createdAt);
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  let date =
    days[d.getDay()] +
    ", " +
    d.getDate() +
    " " +
    months[d.getMonth()] +
    " " +
    d.getFullYear();
  return date;
}

function indonesianNextDayDateParser(createdAt) {
  let d = new Date(createdAt);
  d.setDate(d.getDate() + 1);
  let days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  let months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];
  let date =
    days[d.getDay()] +
    ", " +
    d.getDate() +
    " " +
    months[d.getMonth()] +
    " " +
    d.getFullYear();
  return date;
}

function numericToCurrency(number, withDecimal = false) {
  const n = withDecimal ? 2 : 0;
  const re = "\\d(?=(\\d{3})+" + (n > 0 ? "\\," : "$") + ")";
  return number.toFixed(n).replace(new RegExp(re, "g"), "$&.");
}

function productDetailMaker(orderProducts) {
  let result = "";
  orderProducts.forEach(item => {
    result += `
                  <tr>
                      <td> <img width="50px" src=${IMAGEKIT_BASE_URL +
                        item.productImage}  >  </img>
                          </td>
                               <td>
                                   <p style="color:#00998D">${
                                     item.productName
                                   }</p>
                              </td>
                          <td>
                             <p>${item.quantity}</p>
                      </td>
                      <td>
                            <p>Rp ${numericToCurrency(item.productPrice)}</p>
                      </td>
                  </tr>
      `;
  });
  return result;
}

function checkCourier(courierCode, courierService, shippingMethod) {
  let result = ``;
  switch (shippingMethod) {
    case "courier":
      result = `<p style="color:gray">Kurir : ${courierCode +
        " " +
        courierService}</p>`;
      break;
    case "warehouse":
      result = `<p style="color:gray">Pesanan ini diambil di Warehouse Kadoqu</p>`;
      break;
    case "Ojek Online":
      result = `<p style="color:gray">Kurir : Ojek Online</p>`;
      break;
    case "no_shipping":
      result = `<p style="color:gray">Pesanan ini tidak ada pengiriman</p>`;
      break;
    default:
      break;
  }
  return result;
}

function customerMail(
  to,
  Subject,
  userName,
  orderProducts,
  totalPayment,
  createdAt,
  discount,
  shippingFee,
  totalHargaBarang,
  paymentMethod,
  voucherDiscount,
  noPesanan,
  courierCode,
  courierService,
  shippingMethod,
  shippingAddress
) {
  function shippingFeeChecker(shippingFee) {
    let result = "";
    if (shippingFee != null) {
      result = `
              <tr>
                                                           <td>
                                                            <p>Biaya Pengiriman : </p>
                                                        </td>
                                                        <td>
                                                            <p>Rp ${shippingFee}</p>
                                                        </td>
                                                    </tr>
      `;
    } else {
      result = `
                        <tr>
                                                        <td>
                                                            <p>Biaya Pengiriman : </p>
                                                        </td>
                                                        <td>
                                                            <p>Anda tidak mengunakan jasa pengiriman</p>
                                                        </td>
                                                    </tr>
          `;
    }
    return result;
  }

  let courier = checkCourier(courierCode, courierService, shippingMethod);
  shippingFee = shippingFeeChecker(numericToCurrency(shippingFee || 0));
  let orderDate = indonesianDateParser(createdAt);
  let expDate = indonesianNextDayDateParser(createdAt);
  let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  discount = numericToCurrency((discount || 0) + (voucherDiscount || 0));
  totalPayment = numericToCurrency(totalPayment);
  totalHargaBarang = numericToCurrency(totalHargaBarang);
  let orderDetail = productDetailMaker(orderProducts);
  let paymentConfirmation = `
 <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title> </title>
    <!--[if !mso]><!-- -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:AllowPNG/>
            <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
        .outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    </style>
    <!--<![endif]-->
    <style type="text/css">
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
            }
            .mj-column-per-50 {
                width: 50% !important;
                max-width: 50%;
            }
        }
    </style>
    <style type="text/css">
        @media only screen and (max-width:480px) {
            table.full-width-mobile {
                width: 100% !important;
            }
            td.full-width-mobile {
                width: auto !important;
            }
        }
    </style>
</head>

<body>
<div style="">
    <!--[if mso | IE]>
    <table
            align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
    >
        <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <v:image
                        style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
                />
    <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tr style="vertical-align:top;">
                <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
                    <!--[if mso | IE]>
                    <table
                            border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                    >
                        <tr>
                            <td  style="">
                    <![endif]-->
                    <div class="mj-hero-content" style="margin:0px auto;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                            <tr>
                                <td style="">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                                    <tbody>
                                                    <tr>
                                                        <td style="width:100px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="100" /> </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <div style="font-family:helvetica;font-size:10px;line-height:1;text-align:left;color:#000000;"> Dear ${userName} </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:center;color:#00998D;"> Menunggu Konfirmasi Pembayaran </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#000000;"> Terima Kasih Telah Berbelanja di kadoqu </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;"> Belanjaan Kamu Telah Berhasil di Checkout Pada Tanggal </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;">
                                                    <h5>${orderDate}</h5>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>

    <table
            align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
            <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">

                        <tr>

                            <td
                                    class="" style="width:600px;"
                            >
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                        <!--[if mso | IE]>
                        <table  role="presentation" border="0" cellpadding="0" cellspacing="0">
                            <tr>

                                <td
                                        style="vertical-align:top;width:300px;"
                                >
                        <![endif]-->
                        <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                                            <tr>
                                                <th style="padding: 0 15px 0 0; text-align:center; ">Total Pembayaran</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="color:#00998D; font-size:20px;text-align:center">Rp ${totalPayment}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="padding: 0 15px 0 0; text-align:center; ">Metode Pembayaran</th>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 15px 0 0;">
                                                    <p style="color:#00998D; font-size:20px; text-align:center"> ${paymentMethod}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>

                        <td
                                style="vertical-align:top;width:300px;"
                        >
                        <![endif]-->
                        <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tr>
                                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                                            <tr>
                                                <th style="padding: 0 15px 0 0; text-align:left; text-align:center ">No Pesanan</th>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p style="color:#00998D; font-size:20px; text-align:center">${noPesanan}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th style="padding: 0 15px 0 0; text-align:left; text-align:center ">Waktu Pembayaran</th>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 15px 0 0;">
                                                    <p style="color:#00998D; font-size:20px ; text-align:center ">${expDate}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>

                        </tr>
                        </table>
                        <![endif]-->
                    </div>
                    <!--[if mso | IE]>
                    </td>

                    </tr>

                    </table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>

    <table
            align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
    >
        <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <v:image
                        style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
                />
    <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tr style="vertical-align:top;">
                <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
                    <!--[if mso | IE]>
                    <table
                            border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                    >
                        <tr>
                            <td  style="">
                    <![endif]-->
                    <div class="mj-hero-content" style="margin:0px auto;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                            <tr>
                                <td style="">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                    <tr>
                                                        <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;padding:10px 25px;background:#00998D;" valign="middle">
                                                            <a href=${urlkadoqu} style="background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;"> Cek Pesanan </a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                                                <!--[if mso | IE]>
                                                <table
                                                        align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
                                                >
                                                    <tr>
                                                        <td style="height:0;line-height:0;">
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        ${
                                          shippingAddress
                                            ? `
                                        <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                                                    <h3>Alamat Pengiriman</h3>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#00998D;">
                                                    <h4> ${shippingAddress}</h4>
                                                </div>
                                            </td>
                                        </tr>`
                                            : ""
                                        }
                                        <tr>
                                            <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                                                    ${courier}
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>

    <table
            align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
    >
        <tr>
            <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
    <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tbody>
            <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
                    <!--[if mso | IE]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">

                        <tr>

                            <td
                                    class="" style="vertical-align:top;width:600px;"
                            >
                    <![endif]-->
                    <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tr>
                                <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                                        ${orderDetail}
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                    <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                                    <!--[if mso | IE]>
                                    <table
                                            align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
                                    >
                                        <tr>
                                            <td style="height:0;line-height:0;">
                                                &nbsp;
                                            </td>
                                        </tr>
                                    </table>
                                    <![endif]-->
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td>

                    </tr>

                    </table>
                    <![endif]-->
                </td>
            </tr>
            </tbody>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>

    <table
            align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
    >
        <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
                <v:image
                        style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
                />
    <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
            <tr style="vertical-align:top;">
                <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
                    <!--[if mso | IE]>
                    <table
                            border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
                    >
                        <tr>
                            <td  style="">
                    <![endif]-->
                    <div class="mj-hero-content" style="margin:0px auto;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                            <tr>
                                <td style="">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                                        <tr>
                                            <td align="left" background="#22FFCC" style="background:#22FFCC;font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:5px;table-layout:auto;width:100%;">
                                                    <tr>
                                                        <td>
                                                            <p>Total Harga Barang : </p>
                                                        </td>
                                                        <td>
                                                            <p>Rp ${totalHargaBarang}</p>
                                                        </td>
                                                    </tr>
                                                 ${shippingFee}

                                                    <tr>
                                                        <td>
                                                            <p style="color:red">Potongan Discount : </p>
                                                        </td>
                                                        <td>
                                                            <p style="color:red">Rp ${discount}</p>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p>Grand Total : </p>
                                                        </td>
                                                        <td>
                                                            <p>Rp ${totalPayment}</p>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                                                <!--[if mso | IE]>
                                                <table
                                                        align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
                                                >
                                                    <tr>
                                                        <td style="height:0;line-height:0;">
                                                            &nbsp;
                                                        </td>
                                                    </tr>
                                                </table>
                                                <![endif]-->
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Jika Kamu Masih memiliki Pertanyaan Silahkan Contact Kami di hello@kadoqu.com </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                                                <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Atau Bisa Kontak GIdA di 0812181600 </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!--[if mso | IE]>
                    </td>
                    </tr>
                    </table>
                    <![endif]-->
                </td>
            </tr>
        </table>
    </div>
    <!--[if mso | IE]>
    </td>
    </tr>
    </table>
    <![endif]-->
</div>
</body>

</html>
  `;
  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: to,
    Subject: Subject,
    HtmlBody: paymentConfirmation
  });
}

function orderInProgressEmail(
  to,
  Subject,
  userName,
  orderProducts,
  totalPayment,
  createdAt,
  discount,
  shippingFee,
  totalHargaBarang,
  shippingMethod,
  shippingAddress,
  paymentMethod,
  orderNumber,
  wrappingFee
) {
  let orderDate = indonesianDateParser(createdAt);
  let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  totalHargaBarang = numericToCurrency(totalHargaBarang);
  shippingFee = numericToCurrency(shippingFee || 0);
  wrappingFee = numericToCurrency(wrappingFee || 0);
  discount = numericToCurrency(discount || 0);
  totalPayment = numericToCurrency(totalPayment);
  let orderDetail = productDetailMaker(orderProducts);
  let htmlBody = `
    <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> </title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.full-width-mobile {
        width: 100% !important;
      }
      td.full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body>
  <div style="">
    <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:100px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="100" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:helvetica;font-size:10px;line-height:1;text-align:left;color:#000000;"> Dear ${userName} </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:550px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/confirm_email_2_proses_pesanan.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="550" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:center;color:#00998D;"> Pesanan Kamu Sedang GIdA Proses </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#000000;"> Terima Kasih Telah Berbelanja di kadoqu </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;"> Pembayaran Menggunakan Bank Transfer Telah di Konfirmasi dan Berhasil </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                <!--[if mso | IE]>
        <table  role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>

              <td
                 style="vertical-align:top;width:300px;"
              >
              <![endif]-->
                <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                          <tr>
                            <th style="padding: 0 15px 0 0; text-align:center; ">Total Pembayaran</th>
                          </tr>
                          <tr>
                            <td>
                              <p style="color:#00998D; font-size:20px;text-align:center">Rp ${totalPayment}</p>
                            </td>
                          </tr>
                          <tr>
                            <th style="padding: 0 15px 0 0; text-align:center; ">Metode Pembayaran</th>
                          </tr>
                          <tr>
                            <td style="padding: 0 15px 0 0;">
                              <p style="color:#00998D; font-size:20px; text-align:center">${paymentMethod}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>

              <td
                 style="vertical-align:top;width:300px;"
              >
              <![endif]-->
                <div class="mj-column-per-50 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                          <tr>
                            <th style="padding: 0 15px 0 0; text-align:left; text-align:center ">No Pesanan</th>
                          </tr>
                          <tr>
                            <td>
                              <p style="color:#00998D; font-size:20px; text-align:center">${orderNumber}</p>
                            </td>
                          </tr>
                          <tr>
                            <th style="padding: 0 15px 0 0; text-align:left; text-align:center ">Waktu Pembayaran</th>
                          </tr>
                          <tr>
                            <td style="padding: 0 15px 0 0;">
                              <p style="color:#00998D; font-size:20px ; text-align:center ">${orderDate}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>

          </tr>
          </table>
        <![endif]-->
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;padding:10px 25px;background:#00998D;" valign="middle">
                          <a href=${urlkadoqu} style="background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;"> Cek Pesanan </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                            <h3>Alamat Pengiriman</h3>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#00998D;">
                            <h4> ${shippingAddress}</h4>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                            <h3>Detail Pesanan ${orderNumber}</h3>
                            <p style="color:gray">Kurir : ${shippingMethod}</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                        ${orderDetail}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" background="#22FFCC" style="background:#22FFCC;font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:5px;table-layout:auto;width:100%;">
                            <tr>
                              <td>
                                <p>Total Harga Barang : </p>
                              </td>
                              <td>
                                <p>Rp ${totalHargaBarang}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Biaya Pengiriman : </p>
                              </td>
                              <td>
                                <p>Rp ${shippingFee}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Jasa Bungkus : </p>
                              </td>
                              <td>
                                <p>Rp ${wrappingFee}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color:red">Potongan Discount : </p>
                              </td>
                              <td>
                                <p style="color:red">Rp ${discount}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Grand Total : </p>
                              </td>
                              <td>
                                <p>Rp ${totalPayment}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Jika Kamu Masih memiliki Pertanyaan Silahkan COntact Kami di hello@kadoqu.com </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Atau Bisa Kontak GIdA di 0812181600 </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
    <![endif]-->
  </div>
</body>

</html>
    `;

  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: to,
    Subject: Subject,
    HtmlBody: htmlBody
  });
}

function shippingEmail(
  to,
  Subject,
  userName,
  orderProducts,
  totalPayment,
  createdAt,
  discount,
  shippingFee,
  totalHargaBarang,
  courierCode,
  courierService,
  shippingMethod,
  shippingAddress,
  paymentMethod,
  orderNumber,
  wrappingFee,
  orderResi
) {
  let courier = checkCourier(courierCode, courierService, shippingMethod);
  let orderDate = indonesianDateParser(createdAt);
  let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  totalHargaBarang = numericToCurrency(totalHargaBarang);
  shippingFee = numericToCurrency(shippingFee || 0);
  wrappingFee = numericToCurrency(wrappingFee || 0);
  discount = numericToCurrency(discount || 0);
  totalPayment = numericToCurrency(totalPayment);
  let orderDetail = productDetailMaker(orderProducts);
  let htmlBody = `
 <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> </title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    .ReadMsgBody {
      width: 100%;
    }

    .ExternalClass {
      width: 100%;
    }

    .ExternalClass * {
      line-height: 100%;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if !mso]><!-->
  <style type="text/css">
    @media only screen and (max-width:480px) {
      @-ms-viewport {
        width: 320px;
      }
      @viewport {
        width: 320px;
      }
    }
  </style>
  <!--<![endif]-->
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.full-width-mobile {
        width: 100% !important;
      }
      td.full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body>
  <div style="">
    <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:100px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="100" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:helvetica;font-size:10px;line-height:1;text-align:left;color:#000000;"> Dear ${userName} </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:550px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/confirm_email_3_pengiriman.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="550" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:center;color:#00998D;"> Pesanan Kamu Sedang GIdA Proses </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;line-height:1;text-align:center;color:#000000;"> Terima Kasih Telah Berbelanja di kadoqu </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;"> Pesanan Kamu Sudah Di Kirim Oleh Kurir Pilihan Kamu </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;line-height:1;text-align:center;color:#000000;">
                            <h5>No Resi : ${orderResi}</h5>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;padding:10px 25px;background:#00998D;" valign="middle">
                            <a href=${urlkadoqu} style="background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;"> Cek Pesanan </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                        </td>
                      </tr>
                      ${
                        shippingAddress
                          ? `<tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                            <h3>Alamat Pengiriman</h3>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#00998D;">
                            <h4> ${shippingAddress}</h4>
                          </div>
                        </td>
                      </tr>`
                          : ""
                      }
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                            <h3>Detail Pesanan ${orderNumber}</h3>
                            ${courier}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="Margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
                        ${orderDetail}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;height:0px;mso-position-horizontal:center;position:absolute;top:0;width:0px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" background="#22FFCC" style="background:#22FFCC;font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:5px;table-layout:auto;width:100%;">
                            <tr>
                              <td>
                                <p>Total Harga Barang : </p>
                              </td>
                              <td>
                                <p>Rp ${totalHargaBarang}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Biaya Pengiriman : </p>
                              </td>
                              <td>
                                <p>Rp ${shippingFee}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Jasa Bungkus : </p>
                              </td>
                              <td>
                                <p>Rp ${wrappingFee}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color:red">Potongan Discount : </p>
                              </td>
                              <td>
                                <p style="color:red">Rp ${discount}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Grand Total : </p>
                              </td>
                              <td>
                                <p>Rp ${totalPayment}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Jika Kamu Masih memiliki Pertanyaan Silahkan COntact Kami di hello@kadoqu.com </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;"> Atau Bisa Kontak GIdA di 0812181600 </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
    <![endif]-->
  </div>
</body>

</html>
    `;

  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: to,
    Subject: Subject,
    HtmlBody: htmlBody
  });
}

function sendNewOrderNoticeToAdmins(
  subject,
  customerName,
  orderCreatedAt,
  orderDetail,
  products
) {
  const orderDate = indonesianDateParser(orderCreatedAt);
  const client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  let result = "";
  let wrappingResult = "";
  let wrappingDetail = "";
  let address =
    $orderDetail.shipping_address &&
    `jl ${orderDetail.shipping_address.street},Kec ${orderDetail.shipping_address.street},${orderDetail.shipping_address.city} , ${orderDetail.shipping_address.province} ${orderDetail.shipping_address.postCode}`;
  products[1].forEach(item => {
    if (item.wrapper) {
      wrappingDetail += `<p>Wrapping Paper : ${item.wrapper.type} </p>`;
    }
    if (item.ribbon) {
      wrappingDetail += `<p>Ribbon : ${item.ribbon.type} </p>`;
    }

    item.items.forEach(orderedItem => {
      wrappingResult += `
           <tr>
                      <td> <img width="50px" src=${IMAGEKIT_BASE_URL +
                        orderedItem.product.image}  >  </img>
                          </td>
                               <td>
                                   <p style="color:#00998D">${
                                     orderedItem.product.name
                                   }</p>
                              </td>
                          <td>
                             <p>${orderedItem.quantity}</p>
                      </td>
                      <td>
                            <p>Rp ${orderedItem.product.price}</p>
                      </td>
                  </tr>
      `;
    });
  });
  products[0].forEach(item => {
    result += `
                  <tr>
                      <td> <img width="50px" src=${IMAGEKIT_BASE_URL +
                        item.productImage}  >  </img>
                          </td>
                               <td>
                                   <p style="color:#00998D">${
                                     item.productName
                                   }</p>
                              </td>
                          <td>
                             <p>${item.quantity}</p>
                      </td>
                      <td>
                            <p>Rp ${item.productPrice}</p>
                      </td>
                  </tr>
      `;
  });
  const htmlBody = `
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> </title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }
      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body>
  <div style="">
    <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:100px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:helvetica;font-size:10px;line-height:1;text-align:left;color:#000000;">Dear Admin</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:left;color:#00998D;">Pesanan Baru yang perlu dikirim</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1px;table-layout:auto;width:100%;border:none;">
                        <tr>
                          <td>
                            <p>No Pesanan</p>
                          </td>
                          <td>
                            <p>${orderDetail.no}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Pesanan Atas Nama</p>
                          </td>
                          <td>
                            <p>${customerName}</p>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <p>Tanggal Pemesanan</p>
                          </td>
                          <td>
                            <p>${orderDate}</p>
                          </td>
                        </tr>
                        ${
                          address
                            ? `
                            <tr>
                              <td>
                                <p>Alamat Pengiriman</p>
                              </td>
                              <td>
                                <p>${address}</p>
                              </td>
                            </tr>
                            `
                            : ""
                        }
                      </table>
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:left;color:#00998D;">Purchased Product</div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;">
                        ${result}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="vertical-align:top;width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;line-height:1;text-align:left;color:#00998D;">Wrapping Gift</div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#00998D;">Detail :
                            ${wrappingDetail}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <table cellpadding="0" cellspacing="0" width="100%" border="0" style="color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;border:none;">
                        ${wrappingResult}
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                      <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                      <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                    </td>
                  </tr>
                </table>
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">Powered By Kadoqu</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#00998D;" valign="middle">
                                <a href=${dashboardUrl +
                                  orderDetail.id} style="display:inline-block;background:#00998D;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;">
                                Check Order </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
    <![endif]-->
  </div>
</body>

</html>
      `;
  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: process.env.KADOQU_ADMIN_EMAIL,
    Subject: subject,
    HtmlBody: htmlBody
  });
}

function adminMail(to, Subject) {
  let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: to,
    Subject: Subject,
    HtmlBody: HtmlBody
  });
}

function emailVerify(to, Subject, customerName, token) {
  let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
  return client.sendEmail({
    From: "admin@kadoqu.com",
    To: to,
    Subject: Subject,
    HtmlBody: `
    <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <title> </title>

  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
    #outlook a {
      padding: 0;
    }

    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }

    table,
    td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }

    img {
      border: 0;
      height: auto;
      line-height: 100%;
      outline: none;
      text-decoration: none;
      -ms-interpolation-mode: bicubic;
    }

    p {
      display: block;
      margin: 13px 0;
    }
  </style>
  <!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
  <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
  <style type="text/css">
    @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  </style>
  <!--<![endif]-->
  <style type="text/css">
    @media only screen and (min-width:480px) {
      .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
      .mj-column-per-50 {
        width: 50% !important;
        max-width: 50%;
      }
    }
  </style>
  <style type="text/css">
    @media only screen and (max-width:480px) {
      table.mj-full-width-mobile {
        width: 100% !important;
      }
      td.mj-full-width-mobile {
        width: auto !important;
      }
    }
  </style>
</head>

<body>
  <div style="">
    <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;" width="600"
        >
          <tr>
            <td  style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
              <v:image
                 style="border:0;mso-position-horizontal:center;position:absolute;top:0;width:600px;z-index:-3;" xmlns:v="urn:schemas-microsoft-com:vml"
              />
      <![endif]-->
    <div style="margin:0 auto;max-width:600px;">
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tr style="vertical-align:top;">
          <td style="background:#ffffff;background-position:center center;background-repeat:no-repeat;padding:0px;vertical-align:top;" height="0">
            <!--[if mso | IE]>
        <table
           border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
        >
          <tr>
            <td  style="">
      <![endif]-->
            <div class="mj-hero-content" style="margin:0px auto;">
              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                <tr>
                  <td style="">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;margin:0px;">
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                            <tbody>
                              <tr>
                                <td style="width:100px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/Footer/kadoqu_HJeQl-ptdN.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:helvetica;font-size:12px;font-weight:900;line-height:1;text-align:left;color:#000000;">Dear ${customerName} ,</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;font-weight:600;line-height:1;text-align:center;color:#00998D;">Terima Kasih Sudah</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;font-weight:600;line-height:1;text-align:center;color:#00998D;">Bergabung di Kadoqu.com</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Cukup Klik Tombol dibawah ini untuk verfikasi akun kamu</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#00998D;" valign="middle"> <a href=${verifyUrl +
                                token} style="display:inline-block;background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                  target="_blank">
              Klik disni
            </a> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Jika kamu merasa tidak membuat akun</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Kamu bisa abaikan pesan ini atau hubungi customer service kami</div>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <p style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:100%;"> </p>
                          <!--[if mso | IE]>
        <table
           align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #00998D;font-size:1;margin:0px auto;width:550px;" role="presentation" width="550px"
        >
          <tr>
            <td style="height:0;line-height:0;">
              &nbsp;
            </td>
          </tr>
        </table>
      <![endif]-->
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:10px;font-weight:100;line-height:1;text-align:center;color:#000000;">Jika Kamu Masih memiliki Pertanyaan Silahkan Contact Kami di hello@kadoqu.com</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:10px;font-weight:100;line-height:1;text-align:center;color:#000000;">Atau Bisa Kontak GIdA di 0812181600</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </div>
            <!--[if mso | IE]>
            </td>
          </tr>
        </table>
      <![endif]-->
          </td>
        </tr>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>

      <table
         align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
      >
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
    <div style="margin:0px auto;max-width:600px;">
      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
        <tbody>
          <tr>
            <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
              <!--[if mso | IE]>
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0">

        <tr>

            <td
               class="" style="width:600px;"
            >
          <![endif]-->
              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0;line-height:0;text-align:left;display:inline-block;width:100%;direction:ltr;">
                <!--[if mso | IE]>
        <table  role="presentation" border="0" cellpadding="0" cellspacing="0">
          <tr>

              <td
                 style="vertical-align:top;width:300px;"
              >
              <![endif]-->
                <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tr>
                      <td align="center" style="font-size:0px;padding:10px 25px;padding-left:250px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:25px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/fb.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="25" /> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>

              <td
                 style="vertical-align:top;width:300px;"
              >
              <![endif]-->
                <div class="mj-column-per-50 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:50%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tr>
                      <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                          <tbody>
                            <tr>
                              <td style="width:30px;"> <img height="auto" src="https://ik.imagekit.io/nwiq66cx3pvsy/ig.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="30" /> </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso | IE]>
              </td>

          </tr>
          </table>
        <![endif]-->
              </div>
              <!--[if mso | IE]>
            </td>

        </tr>

                  </table>
                <![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--[if mso | IE]>
          </td>
        </tr>
      </table>
      <![endif]-->
  </div>
</body>

</html>
    `
  });
}

module.exports = {
  sendNewOrderNoticeToAdmins,
  customerMail,
  adminMail,
  orderInProgressEmail,
  shippingEmail,
  emailVerify
};
