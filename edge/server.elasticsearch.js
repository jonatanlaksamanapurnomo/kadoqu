const client = require("./server.client");
const elasticSearchSchema = require("./server.es.schema");

/**
 * TODO Ping the CLIENT to be sure
 * *** ElasticSearch *** is up
 */
client.ping({
  requestTimeout: 30000
}, function(error) {
  !error
    ? console.log("ElasticSearch is running!")
    : console.error("Elastic Search Down!");
});


function ElasticSearchClient(body) {
  // perform the actual search passing in the index, the search query and the type
  return client.search({ index: "products", body: body });
}

function ElasticSearchUpdate(body) {
//  lets update some document by query
  return client.updateByQuery({ index: "products", body: body });
}

function ELasticSearchDelete(body) {
//    lets delete some document by query
  return client.deleteByQuery({ index: "products", body: body });
}

function ElasticSearchDeleteAllDocuments() {
  return client.deleteByQuery({
    index: "products", body: {
      "query": {
        "match_all": {}
      }
    }
  });
}

function ApiElasticSearchClient(req, res) {
  // perform the actual search passing in the index, the search query and the type
  ElasticSearchClient({ ...elasticSearchSchema })
    .then(r => res.send(r["hits"]["hits"]))
    .catch(e => {
      console.error(e);
      res.send([]);
    });
}

module.exports = {
  ApiElasticSearchClient,
  ElasticSearchClient,
  ELasticSearchDelete,
  ElasticSearchUpdate,
  ElasticSearchDeleteAllDocuments
};
