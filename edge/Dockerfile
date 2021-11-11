
#using  node -9 image from docker
FROM node:10-slim
#tell docker that we will use /app folder (docker will make it in his/her magicly world)
WORKDIR /app
#copy pacckage.json into /app that we speicfied before why just app not all folder cause we want docker cache this first :)
COPY package.json /app
#yarn install  make sure yarn fill all our library or dependency that we used into /app in magical world of docker
RUN yarn install
#then we need to move our folder into our docker world  (something like schema db) dll
COPY . /app
#and in docker world we just need to run yarn start  easy right
CMD ["yarn","start"]


#dockernizing note (edge)
#buld image use :  docker run -it -p 4000:4000 edge  << :4000 is internal port that appolo use
#run image with   docker run -it  --name=edge -p 4000:4000 -d -e PSQL_HOST='172.17.0.1' edge  << :4000 is internal port that apollo use you can campsule it into env  --name edge i give it that container name edge
#next term if you already build docker image and container you can simply run docker start edge

#todo : specified docker internal port into env file (done)