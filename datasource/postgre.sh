#!/usr/bin/env bash
if [ "$1" = "init" ]; then
    docker run --name edge-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 8080:5432 postgres:11.1-alpine
elif [ "$1" = "sql" ]; then
    (docker exec -i edge-postgres psql -U postgres) < $2
elif [ "$1" = "psql" ]; then
    docker exec -ti edge-postgres psql -U postgres
elif [ "$1" = "schema" ]; then
    schemafiles=`ls *-schema.sql`
    for eachfile in $schemafiles; do
        echo ''
        echo $eachfile
        echo '-----------------------------'
        (docker exec -i edge-postgres psql -U postgres) < $eachfile
        echo ''
    done
elif [ "$1" = "seed" ]; then
    schemafiles=`ls *-data.sql`
    for eachfile in $schemafiles; do
        echo ''
        echo $eachfile
        echo '-----------------------------'
        (docker exec -i edge-postgres psql -U postgres) < $eachfile
        echo ''
    done
elif [ "$1" = "alter" ]; then
    schemafiles=`ls *-alter.sql`
    for eachfile in $schemafiles; do
        echo ''
        echo $eachfile
        echo '-----------------------------'
        (docker exec -i edge-postgres psql -U postgres) < $eachfile
        echo ''
    done
elif [ "$1" = "build" ]; then
    cat *-schema.sql > schema.sql
    echo 'Schema sql builded'
elif [ "$1" = "buildseed" ]; then
    cat *-data.sql > seed.sql
    echo 'seed sql builded'
elif [ "$1" = "buildalter" ]; then
    cat *-alter.sql > schemaalteredtable.sql
    echo 'schemaalteredtable sql builded'
else
    docker start edge-postgres
fi
