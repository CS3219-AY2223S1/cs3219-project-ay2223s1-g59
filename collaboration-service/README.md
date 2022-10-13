# Collaboration Service

## How it works

Accepts 2 socket.io connections to create a room for both users.

## How to use postman to test socket connection.
* run `node index.js` in the terminal from the directory `./collaboration-service`.

* find the postman collections labelled "Collaboration Socket".
![start](https://user-images.githubusercontent.com/80625519/195425445-0da497ad-4377-4607-a451-07035f2fc6c9.PNG)

* within the new tab’s header, click the drop-down that says Raw, and select Socket.IO instead.
![tabheader](https://user-images.githubusercontent.com/80625519/195425564-9c2c2704-822f-4d4f-ae0c-419c34ce449c.PNG)

* Connect via the "Connect" button on the top right to both connections using the link "http://localhost:8003/". 
![connect](https://user-images.githubusercontent.com/80625519/195425628-55cc7b2b-9293-4867-8ba2-d01649746bbc.PNG)

* You should see a successful connection.
![connected](https://user-images.githubusercontent.com/80625519/195425703-480f9cfb-5080-46c1-8b37-31f28a514151.PNG)

* under events, ensure that the event "RECEIVE" is set to "Listen on connect". If it isn't, do set it to be so for both separate connections.
![receive](https://user-images.githubusercontent.com/80625519/195425750-bd2e46da-9c7a-4586-ad9c-7fe6a78d10a1.PNG)

* Under saved messages, there are three messages saved. "JOIN", "Update code", and "LEAVE". To join a room, click on "JOIN" and then send. Do so for both connections.
![join](https://user-images.githubusercontent.com/80625519/195425925-359112ae-e545-4711-b141-d18433e0b401.PNG)

* Before sending any messages, ensure the type of message sent is JSON not text.
![json](https://user-images.githubusercontent.com/80625519/195426115-e30aa1c8-0dda-40e3-a337-4edf7a43fe9b.PNG)

* To send a code fragment to the other connection use the "Update code" message and type whatever you wish to send into the message field labelled code then click send.
![change](https://user-images.githubusercontent.com/80625519/195426148-b61038a6-90e1-4f34-babb-6fb22528494d.PNG)

* On the opposing connection, the message will be received as "RECEIVED" in the message log.
![code receive](https://user-images.githubusercontent.com/80625519/195426191-ae2cf709-b2ed-4b36-997d-87daf81b7517.PNG)

* To disconnect from the room, send the "LEAVE" message.
![leave](https://user-images.githubusercontent.com/80625519/195426243-083bfb08-c29a-4869-96a9-7af3a61bcba2.PNG)

* To finally end the connection, click "Disconnect" on the top right.
![disconnect](https://user-images.githubusercontent.com/80625519/195426269-d14a4fe0-946a-4f3d-9667-b80a0d01649b.PNG)
