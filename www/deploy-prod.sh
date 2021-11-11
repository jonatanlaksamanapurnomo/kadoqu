BUILD_ID=$(git rev-parse --verify --short HEAD)prod
echo Building rev: $BUILD_ID
export REACT_APP_GATEWAY_URL=https://edge.kadoqu.com
export REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp
export REACT_APP_KADOQU_URL=https://kadoqu.com

# code fresh api key
#docker login r.cfcr.io -u jonatanlaksamanapurnomo -p 141a554e8a54970cac94612fe4bac39a

docker build . -t rg.fr-par.scw.cloud/kadoqucontainerregistry/www:$BUILD_ID \
  --build-arg REACT_APP_GATEWAY_URL=https://edge.kadoqu.com \
  --build-arg REACT_APP_KADOQU_URL=https://kadoqu.com \
  --build-arg REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp \
  --build-arg REACT_APP_IMAGEKIT_BASE_URL=https://ik.imagekit.io/nwiq66cx3pvsy

docker push rg.fr-par.scw.cloud/kadoqucontainerregistry/www:$BUILD_ID

awk "{sub(/www:.+/,\"www:$BUILD_ID\")}1" deploy.yml >dep.yml
#mv dep.yml deploy.yml

kubectl apply -f dep.yml
backslash='\'
USERNAME=$(git log -1 --pretty=format:'%an')$backslash
COMMITID=$(git rev-parse --verify HEAD)$backslash
curl 'https://edge.kadoqu.com/' -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"mutation {  addDeployHistory(name: \"'"$USERNAME"'" , status: \"'"$COMMITID"'" , product: \"www\")}"}' --compressed
