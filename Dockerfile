FROM node:10

WORKDIR /Users/peterbarnum/Desktop/deploy/photo-viewer

COPY package*.json ./

RUN npm install
RUN npm run db:seed
COPY . .

EXPOSE 4444

CMD [ "npm", "run" "server"]