"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usserCount = 0;
let allsocket = [];
wss.on("connection", (socket) => {
    allsocket.push(socket);
    usserCount += 1;
    console.log("user connected #" + usserCount);
    socket.on("message", (message) => {
        console.log("message received " + message.toString());
        for (let i = 0; i < allsocket.length; i++) {
            const s = allsocket[i];
            s.send(message.toString() + ":sent form the server");
        }
        socket.send(message.toString() + ": sent form the server");
    });
});
