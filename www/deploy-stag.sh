export REACT_APP_GATEWAY_URL=https://edge-stag.kadoqu.com
export REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp
export REACT_APP_KADOQU_URL=https://stag.kadoqu.com

echo Building rev: $(git rev-parse --verify HEAD)

docker build . -t rg.fr-par.scw.cloud/kadoqucontainerregistry/www:$(git rev-parse --verify HEAD) \
  --build-arg REACT_APP_GATEWAY_URL=https://edge-stag.kadoqu.com \
  --build-arg REACT_APP_KADOQU_URL=https://stag.kadoqu.com \
  --build-arg REACT_APP_NOT_SITE_KEY=6LfxAKEUAAAAAKfFuxpKW71mLn0YkuAGaP0xfZfp \
  --build-arg REACT_APP_IMAGEKIT_BASE_URL=https://ik.imagekit.io/nwiq66cx3pvsy

docker push rg.fr-par.scw.cloud/kadoqucontainerregistry/www:$(git rev-parse --verify HEAD)

awk "{sub(/www:.+/,\"www:$(git rev-parse --verify HEAD)\")}1" deploy.yml >dep.yml
#mv dep.yml deploy.yml

kubectl apply -f dep.yml

backslash='\'
USERNAME=$(git log -1 --pretty=format:'%an')$backslash
COMMITID=$(git rev-parse --verify HEAD)$backslash
curl 'https://edge-stag.kadoqu.com/' -H 'content-type: application/json' --data-binary '{"operationName":null,"variables":{},"query":"mutation {  addDeployHistory(name: \"'"$USERNAME"'" , status: \"'"$COMMITID"'" , product: \"www\")}"}' --compressed
