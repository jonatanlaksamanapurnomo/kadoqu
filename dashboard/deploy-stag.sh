echo Building rev: $(git rev-parse --verify HEAD)

docker build . -t rg.fr-par.scw.cloud/kadoqucontainerregistry/dashboard:$(git rev-parse --verify HEAD) \
  --build-arg REACT_APP_IMAGEKIT_ID=nwiq66cx3pvsy \
  --build-arg REACT_APP_IMAGEKIT_API_KEY=Fo2hI3ralt1f7SgAVOyChvPpTH8= \
  --build-arg REACT_APP_IMAGEKIT_PRIVATE_KEY=BIuFYAtNPqxbt0o//RDQAmkIQXI= \
  --build-arg REACT_APP_GATEWAY_URL=https://edge-stag.kadoqu.com \
  --build-arg REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp \
  --build-arg REACT_APP_IMAGEKIT_BASE_URL=https://ik.imagekit.io/nwiq66cx3pvsy

docker push rg.fr-par.scw.cloud/kadoqucontainerregistry/dashboard:$(git rev-parse --verify HEAD)

awk "{sub(/dashboard:.+/,\"dashboard:$(git rev-parse --verify HEAD)\")}1" deploy.yml >dep.yml
#mv dep.yml deploy.yml

kubectl apply -f dep.yml

backslash='\'
USERNAME=$(git log -1 --pretty=format:'%an')$backslash
COMMITID=$(git rev-parse --verify HEAD)$backslash
curl 'https://edge-stag.kadoqu.com/' -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"mutation {  addDeployHistory(name: \"'"$USERNAME"'" , status: \"'"$COMMITID"'", product: \"dashboard\")}"}' --compressed
