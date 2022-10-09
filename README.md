# PeerPrep
PeerPrep is an interview preparation platform and peer matching system where students can find peers to practice whiteboard-style interview 
questions together. (CS3219 AY22/23)

## Docker
Get [Docker](https://docs.docker.com/get-docker/).
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

## Set up a local mongoDB container
If you need to use a mongoDB instance during development, you can consider using docker.
```sh
docker run -d --name container_name \
      -e MONGO_INITDB_ROOT_USERNAME=admin \
      -e MONGO_INITDB_ROOT_PASSWORD=password \
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
