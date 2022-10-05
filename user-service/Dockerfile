# Base image
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy files required for the app to run
COPY . .

# Tell the port number the container should expose
EXPOSE 8000

# Run the application
CMD [ "npm", "start"]