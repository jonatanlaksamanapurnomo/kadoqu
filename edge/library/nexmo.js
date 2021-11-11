const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECREET,
});

function sendNexmoSms(from, to, text) {
  nexmo.message.sendSms(from, to, text);
}

module.exports = {
  sendNexmoSms
};
