const axios = require("axios");

function sendRajaSms(nomor, message) {
  let number = "0" + nomor.substring(2);
  return axios.get('http://sms241.xyz/sms/smsmasking.php', {
    params: {
      username: process.env.RAJASMS_USERNAME,
      key: process.env.RAJASMS_APIKEY,
      number: number,
      message: message
    }
  });
}

function orderAcceptedMessage(nomor, orderNumber) {
  let number = "0" + nomor.substring(2);
  let message = `Konfirmasi Pembayaran Berhasil! Pesanan No ${orderNumber}  sedang GIdA proses. Jika ada pertanyaan, silahkan hubungi CS kami di http://bit.ly/contactGIdA`;
  return axios.get('http://sms241.xyz/sms/smsmasking.php', {
    params: {
      username: process.env.RAJASMS_USERNAME,
      key: process.env.RAJASMS_APIKEY,
      number: number,
      message: message
    }
  });
}

module.exports = {
  sendRajaSms, orderAcceptedMessage
}
