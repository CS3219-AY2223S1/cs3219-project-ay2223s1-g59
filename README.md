# PeerPrep
<p align="center">
  <img src="https://user-images.githubusercontent.com/43946966/198839909-9140fda0-7544-4cac-94a1-23daca2dc1fe.png" />
</p>
PeerPrep is an interview preparation platform and peer matching system where students can find peers to practice whiteboard-style interview 
questions together. (CS3219 AY22/23)

There are mainly 2 ways to get started, with docker or concurrently.

## Docker
Install [Docker](https://docs.docker.com/get-docker/). You may use docker for testing and/or development. 
```sh
# start containers
docker-compose up

# alternatively, start containers in detached mode
docker-compose up -d

# if you need to rebuild services
docker compose build
```

If you are solely working on the frontend and only want to start backend containers, you may run the alternate docker compose file.

```sh
docker-compose -f docker-compose.backend.yml up

cd frontend/

npm start
```

Note that data is stored on disk for persistence under `volumes` in the compose file.

## Running multiple node servers
Alternatively, you can also use concurrently for backend development to run multiple node servers. This would be suitable if you're focusing on backend developement. 

Ensure that either a mongo server is up or the connection string points to Atlas. See below for instructions on setting up a local mongo container.

First you have to create a `.env` file in the root folder. It should look like the following:

```
DB_CLOUD_URI=<Atlas Connection String>
DB_LOCAL_URI=mongodb://localhost:27017/cs3219
DB_TEST_URI=mongodb://localhost:27017/tests
SECRET=<Secret Key for JWT>
NODE_ENV=development
```
Then, run the following:
```sh
# install package globally
npm install -g concurrently

# start microservices (to add chat service and collab service once done)
concurrently "nodemon matching-service/index.js" "nodemon user-service/index.js" "nodemon history-service/index.js" "nodemon question-service/index.js" "nodemon chat-service/index.js" "nodemon collaboration-service/index.js"

# start frontend in a separate terminal
cd frontend/
npm start
```

## Local mongoDB container
If you need to use a mongoDB instance during development, you can consider using docker.
```sh
docker run -d --name container_name \
      -e MONGO_INITDB_ROOT_USERNAME=mongo \
      -e MONGO_INITDB_ROOT_PASSWORD=mongo123 \
      mongo:latest
```
Note that it will have a port conflict with docker-compose at port 27017 if you run this container and docker-compose at the same time. To address this either shut down one of them or change the local port mapping.


## Microservices
See respective READMEs in the respective microservice folders for more information.
1. Matching Service
2. Question Service
3. User Service
4. History Service
5. Collaboration Service
6. Chat Service
