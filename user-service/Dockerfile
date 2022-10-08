FROM node:16-alpine

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]