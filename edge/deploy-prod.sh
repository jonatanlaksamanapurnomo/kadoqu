echo Building rev: $(git rev-parse --verify HEAD)

docker build . -t rg.fr-par.scw.cloud/kadoqucontainerregistry/edge:$(git rev-parse --verify HEAD)

docker push rg.fr-par.scw.cloud/kadoqucontainerregistry/edge:$(git rev-parse --verify HEAD)

awk "{sub(/edge:.+/,\"edge:$(git rev-parse --verify HEAD)\")}1" deployprod.yml >dep.yml
# mv dep.yml deploy.yml

kubectl apply -f dep.yml
backslash='\'
USERNAME=$(git log -1 --pretty=format:'%an')$backslash
COMMITID=$(git rev-parse --verify HEAD)$backslash
curl 'https://edge.kadoqu.com/' -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"mutation {  addDeployHistory(name: \"'"$USERNAME"'" , status: \"'"$COMMITID"'", product: \"edge\")}"}' --compressed
