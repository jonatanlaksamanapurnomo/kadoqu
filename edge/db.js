require("custom-env").env();
const pgp = require("pg-promise")();
const pgpTrack = require("pg-promise")();

const db = pgp({
  user: process.env.PSQL_USER || "postgres",
  host: process.env.PSQL_HOST || "localhost",
  database: process.env.PSQL_DB || "postgres",
  password: process.env.PSQL_PASS || "mysecretpassword",
  ssl: process.env.PSQL_SSL ? true : false,
  port: process.env.PSQL_PORT ? parseInt(process.env.PSQL_PORT, 10) : 8080
});

const dbTrack = pgpTrack({
  user: process.env.PSQL_TRACK_USER || "postgres",
  host: process.env.PSQL_TRACK_HOST || "localhost",
  database: process.env.PSQL_TRACK_DB || "postgres",
  password: process.env.PSQL_TRACK_PASS || "mysecretpassword",
  ssl: process.env.PSQL_TRACK_SSL ? true : false,
  port: process.env.PSQL_TRACK_PORT ? parseInt(process.env.PSQL_TRACK_PORT, 10) : 8080
});

module.exports = {db, pgp, dbTrack, pgpTrack};
