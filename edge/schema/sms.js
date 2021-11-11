const {sendNexmoSms} = require("../library/nexmo");

const typeDefs = `
  type feedback {
    sms_feedback: String
  }
  extend type Query {
    sendNexmoSms(from:String, to:String, text:String) : [feedback]

  }
  
`;

const resolvers = {
  Query: {
    sendNexmoSms: (_, {from, to, text}) => {
      return sendNexmoSms(from, to, text);
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
