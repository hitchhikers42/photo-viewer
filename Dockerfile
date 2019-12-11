FROM node:10

WORKDIR /Users/peterbarnum/Desktop/FEC_SECTION/photo-viewer

COPY package*.json ./

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "node", "server.js", "npm run db:init","npm run db:seed", "npm run start"]