import React {useEffect, useState} from "react";
import "codemirror/"
import { io } from "socket.io-client";

const socket = io("http://localhost:8003");

socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
});

socket.emit("custom-event", 10, "Hi", { a: "a" });
