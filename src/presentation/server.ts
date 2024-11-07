import "dotenv/config";
import http from "http";
import app from "./app";
import getMongoSource from "../infrastructure/sources/mongoSource";
import { WebSocket } from "ws";

getMongoSource();

const server = http.createServer(app);
const wss = new WebSocket.Server({
    server,
    clientTracking: true
});

wss.on("connection", socket => {
    socket.send(JSON.stringify({ message: "connected!" }));

    socket.on("error", console.error);

    socket.on("message", data => console.log(data));
});

const port = parseInt(process.env.APP_PORT || "8080");

server.listen(port, () =>
    console.log(`[server]: listening on http://localhost:${port}`)
);