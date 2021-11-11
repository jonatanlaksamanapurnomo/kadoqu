BUILD_ID=$(git rev-parse --verify --short HEAD)prod
echo Building rev: $BUILD_ID

docker build . -t rg.fr-par.scw.cloud/kadoqucontainerregistry/dashboard:$BUILD_ID \
  --build-arg REACT_APP_IMAGEKIT_ID=nwiq66cx3pvsy \
  --build-arg REACT_APP_IMAGEKIT_API_KEY=Fo2hI3ralt1f7SgAVOyChvPpTH8= \
  --build-arg REACT_APP_IMAGEKIT_PRIVATE_KEY=BIuFYAtNPqxbt0o//RDQAmkIQXI= \
  --build-arg REACT_APP_GATEWAY_URL=https://edge.kadoqu.com \
  --build-arg REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp \
  --build-arg REACT_APP_IMAGEKIT_BASE_URL=https://ik.imagekit.io/nwiq66cx3pvsy

docker push rg.fr-par.scw.cloud/kadoqucontainerregistry/dashboard:$BUILD_ID

awk "{sub(/dashboard:.+/,\"dashboard:$BUILD_ID\")}1" deploy.yml >dep.yml
#mv dep.yml deploy.yml
kubectl apply -f dep.yml

backslash='\'
USERNAME=$(git log -1 --pretty=format:'%an')$backslash
COMMITID=$(git rev-parse --verify HEAD)$backslash
curl 'https://edge.kadoqu.com/' -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"mutation {  addDeployHistory(name: \"'"$USERNAME"'" , status: \"'"$COMMITID"'", product: \"dashboard\")}"}' --compressed
