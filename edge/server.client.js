const ElasticSearch = require('elasticsearch');

/**
 * *** ElasticSearch *** client
 * @type {Client}
 */
const client = new ElasticSearch.Client({
  hosts: [ process.env.ELASTIC_SEARCH_HOSTING]
});

module.exports = client;

// local host
// http://localhost:9200
