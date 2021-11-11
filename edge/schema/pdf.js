let PdfPrinter = require("pdfmake");
let fs = require("fs");
let path = require("path");
// Define font files
let fonts = {
  Roboto: {
    normal: path.join(__dirname, "/fonts/Roboto-Regular.ttf"),
    bold: path.join(__dirname, "/fonts/Roboto-Medium.ttf"),
    italics: path.join(__dirname, "/fonts/Roboto-Italic.ttf"),
    bolditalics: path.join(__dirname, "/fonts/Roboto-MediumItalic.ttf")
  }
};
let printer = new PdfPrinter(fonts);

const createPdfBinary = (pdfDoc, callback) => {
  let doc = printer.createPdfKitDocument(pdfDoc);
  //   doc.pipe(fs.createWriteStream("pdfs/basics.pdf"));
  //   doc.end();

  let chunks = [];
  let result;

  doc.on("data", function(chunk) {
    chunks.push(chunk);
  });
  doc.on("end", function() {
    result = Buffer.concat(chunks);
    callback(result.toString("base64"));
  });
  doc.end();
};

const typeDefs = `
  input Pdf {
    content: JSON
  }

  extend type Query {
    createPdf(pdf: Pdf): String
  }
`;

const resolvers = {
  Query: {
    createPdf: (_, { pdf }) => {
      return new Promise((resolve, reject) =>
        createPdfBinary(
          pdf,
          function(binary) {
            resolve(binary);
          },
          function(error) {
            console.log("ERROR:" + error);
            reject(error);
          }
        )
      );
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
};
