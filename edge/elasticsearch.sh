if  [ "$1"  = "start-elk" ]; then
    docker-compose -f ./elasticsearch_kibana.yml up
fi

