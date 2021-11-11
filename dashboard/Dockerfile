#buid image note
#docker build -t dashboard .  ///-t means tag you can give tag name to image that you want build i gabe it name www and . means you take this folder
#docker run --name dashboard  -d -it -p 5000:40 dashboard  /// docker run you create container --name name it www -it for interactivce terminal -p (port) give it port 3000:30 << use internal port 30 as cmd serve defined
# if docker container has created you just need use ---> docker start www <---- ( same as name that you make when you build it first)

FROM mhart/alpine-node:11 AS builder

ARG REACT_APP_IMAGEKIT_ID
ARG REACT_APP_IMAGEKIT_API_KEY
ARG REACT_APP_IMAGEKIT_PRIVATE_KEY
ARG REACT_APP_GATEWAY_URL
ARG REACT_APP_NOT_SITE_KEY
ARG REACT_APP_IMAGEKIT_BASE_URL

WORKDIR /app
COPY package.json /app
RUN yarn install
COPY . .
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "40", "-s", "."]

