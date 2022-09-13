# Matching Service
## Table of Contents
  * [Local setup](#local-setup)
    + [Postman](#postman)
  * [How it works](#how-it-works)
    + [Flowchart](#flowchart)
  * [Future amendments](#future-amendments)

## Local setup
You will need to create a `.env` file in the root directory of `matching-service`. The file should like this, but you may use whatever connection strings as required for MongoDB. You may refer to `index.js` on how it uses the URI to connect to MongoDB.
```
DB_CLOUD_URI=mongodb+srv://*****:*****@cluster0.xxxxxxx.mongodb.net/cs3219-matching-service
ENV=DEV
DB_LOCAL_URI=mongodb://localhost:27017/cs3219-matching-service
```

Install dependencies
```
npm install
```

Start node server
```
node index.js

# or if you have nodemon
nodemon index.js
```

### Postman
`matching_service.postman_collection.json` contains the postman collection you may use for testing.
Please see [Importing and exporting data
](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/) on how to import the Postman collection.
![image](https://user-images.githubusercontent.com/43946966/189924595-35c74493-a654-4506-9b37-b6bbffe3307d.png)


## How it works
The matching service uses create, read and delete operations on the MongoDB collections *matches* and *interviews* to match players with each other. You may refer to `models/` to see how the schema for both collections look like.

### Flowchart
Here is a flowchart explaining the logic for `/find-match` route in `/routes/matchRoutes.js`.
![Flowchart](matching-service-flowchart.drawio.png)

Kindly note the difference between collection and documents. More info [here](https://www.geeksforgeeks.org/mongodb-database-collection-and-document/).

Once the interview document is created, the chat service (separate microservice) can use the information for the interview to establish socket.io connections. Static information can be called to the frontend with the `/interview/:id` route in `routes/matchRoutes.js`. 

## Future amendments
It is likely that the responses for the various routes need to be improved upon.

To add checks and error messages.