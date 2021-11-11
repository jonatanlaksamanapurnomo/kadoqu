const postmark = require("postmark");

const typeDefs = `
 extend type Mutation{
      emailShippingFee(to:String , html:String):String
      forgetPasswordEmail(link:String,email:String,nama:String):String
  }

`;

const resolvers = {
  Mutation: {
    emailShippingFee: (_, {to, html}) => {
      let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
      client.sendEmail({
        From: "admin@kadoqu.com",
        To: to,
        Subject: "Payment Confirmation",
        HtmlBody: html
      });
      return "sukses";
    }
    ,
    forgetPasswordEmail: (_, {link, email, nama}) => {
      let client = new postmark.ServerClient(process.env.POSTMARK_SERVER_API_KEY);
      client.sendEmail({
        From: "admin@kadoqu.com",
        To: email,
        Subject: "Forget Password",
        HtmlBody: `<!doctype html>
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
                          <div style="font-family:helvetica;font-size:12px;font-weight:900;line-height:1;text-align:left;color:#000000;">Dear ${nama} ,</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:30px;font-weight:600;line-height:1;text-align:center;color:#00998D;">Lupa Password?</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Gak Usah Kawatir kehilangan Account kamu</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;padding-top:0;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Cukup Klik Tombol di bawah ini untuk mengatur ulang password</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tr>
                              <td align="center" bgcolor="#00998D" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#00998D;" valign="middle"> <a href="${link}" style="display:inline-block;background:#00998D;color:white;font-family:Helvetica;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;"
                                  target="_blank">
              Click Here
            </a> </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:100;line-height:1;text-align:center;color:#000000;">Jika kamu merasa tidak mengubah password</div>
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

</html>`

      });
      return "sukses";
    }
  },
};

module.exports = {
  typeDefs,
  resolvers
};
