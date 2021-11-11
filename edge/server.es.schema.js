module.exports = {
  "query": {
    "bool": {
      "must": {
        "match_all": {}
      },
      "filter": [
        {
          "multi_match": {
            "query": true,
            "fields": ["isEnable"]
          }
        }
      ]
      // "sort": [
      //   {
      //     "merchantData.merchantLevel": {
      //       "mode": "max",
      //       "order": "desc"
      //     }
      //   }
      // ]
    }
  }
};
