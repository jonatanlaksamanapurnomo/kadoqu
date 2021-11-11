const os = require("os");
const { createLogger, transports } = require("winston");
const LogzioWinstonTransport = require("winston-logzio");

const trans = [new transports.Console({ level: "info" })];

if (process.env.NODE_ENV === "production") {
  trans.push(
    new LogzioWinstonTransport({
      level: "info",
      type: `${os.hostname()}.edge`,
      token: process.env.LOGZ_IO_TOKEN
    })
  );
}

const logger = createLogger({
  transports: trans
});

process.on("uncaughtException", function(err) {
  console.error(err);
  logger.log("error", "Fatal uncaught exception crashed cluster", err);
  setTimeout(() => {
    console.log("bye");
    process.exit(1);
  }, 30000);
});

module.exports = {
  logger,
  createLogger: requestId => ({
    info: (message, meta = {}) =>
      logger.log("info", message, Object.assign({ requestId }, meta)),
    error: (message, meta = {}) =>
      logger.log("error", message, Object.assign({ requestId }, meta))
  })
};
