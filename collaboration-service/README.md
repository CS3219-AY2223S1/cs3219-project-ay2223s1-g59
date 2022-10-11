# Collaboration Service

## How it works

Accepts 2 socket.io connections to create a room for both users.

## How to use postman to test socket connection.
* run `node index.js` in the terminal from the directory `./collaboration-service`.

* find the postman collections labelled "Collaboration Socket".
![before connect](https://user-images.githubusercontent.com/80625519/194764798-263f57c6-513a-4dc1-8023-cd2fbc1d4c29.PNG)

* Connect via the "Connect" button on the top right to both connections using the link "http://localhost:8003/". You should see a successful connection as shown below:
![connected](https://user-images.githubusercontent.com/80625519/194764903-58e1d912-acd0-44a9-b308-30522cce6304.PNG)

* under events, ensure that the event "RECEIVE" is set to "Listen on connect". If it isn't, do set it to be so for both separate connections.
![listen to receive](https://user-images.githubusercontent.com/80625519/194764920-ce1f878c-1f87-4e78-859e-587484eacc60.PNG)

* Under saved messages, there are three messages saved. "CONNECT", "Update code", and "DISCONNECT". To join a room, click on "CONNECT" and then send. Do so for both connections.
![connected room](https://user-images.githubusercontent.com/80625519/194764964-d4bbb793-0888-4cc9-b0ff-37b3ba9dfeb3.PNG)

* To send a code fragment to the other connection use the "Update code" message and type whatever you wish to send into the message field labelled code then click send.
![send](https://user-images.githubusercontent.com/80625519/194764936-43df226b-ca6b-4314-a7e2-d183b4aa34cd.PNG)

* On the opposing connection, the message will be received as "RECEIVED" in the message log.
![received](https://user-images.githubusercontent.com/80625519/194765392-baa8f735-4943-4455-881d-44b23aac8870.PNG)

* To disconnect from the room, send the "DISCONNECT" message.
![disconnected room](https://user-images.githubusercontent.com/80625519/194766036-e790693c-0482-408c-b3c9-b5e5e8544afe.PNG)

* To finally end the connection, click "Disconnect" on the top right.
![disconnected](https://user-images.githubusercontent.com/80625519/194766067-201188b4-ae90-47de-bb2b-cf050eaa8605.PNG)
