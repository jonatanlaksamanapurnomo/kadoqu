import {indonesianDateParser} from "../utils/dateTimeFormatter";
import {numericToCurrency} from "../utils/formatter";


function  products(orderProducts){
    let html = ``;
    orderProducts.forEach(product => {
        html+=`
              <tr>
                          <td> <img width="50px" src="${product.product.image}"></img>
                          </td>
                          <td>
                            <p style="color:#00998D">${product.product.name}</p>
                          </td>
                           <td>
                            <p style="color:#00998D">${product.quantity}</p>
                          </td>
                          <td>
                            <p>Rp ${numericToCurrency(product.product.price)}</p>
                          </td>
                        </tr>
        `;
    });

    return html;
}
const emailBuilder =( order,ongkir ) =>{
    let orderDate = indonesianDateParser(order.createdAt);
    let totalPayment = numericToCurrency(order.total , true);
    let ongkosKirim = numericToCurrency(ongkir , true);
  let html = ` 
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
                          <div style="font-family:helvetica;font-size:10px;line-height:1;text-align:left;color:#000000;"> Dear Customer </div>
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
                              <p style="color:#00998D; font-size:20px; text-align:center">${order.paymentMethod}</p>
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
                              <p style="color:#00998D; font-size:20px; text-align:center">${order.number}</p>
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
                                <p style="background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;Margin:0;text-decoration:none;text-transform:none;"> Cek Pesanan </p>
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
                            <h4> Jalan Professor Eyckman No.28 Pavilliun, Pasteur, Kec. Sukajadi, Kota Bandung, Jawa Barat 40161</h4>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:0px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
                            <h3>Detail Pesanan #123123123</h3>
                            <p style="color:gray">${order.shippingMethod}</p>
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
                      ${products(order.orderProducts)}
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
                                <p>Rp ${totalPayment}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Biaya Pengiriman : </p>
                              </td>
                              <td>
                                <p>Rp ${ongkosKirim}</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p>Jasa Bungkus : </p>
                              </td>
                              <td>
                                <p>Rp 0</p>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <p style="color:red">Potongan Discount : </p>
                              </td>
                              <td>
                                <p style="color:red">Rp 0 </p>
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

  return html;
};

export  default  emailBuilder;