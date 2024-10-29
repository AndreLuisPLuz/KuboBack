import "dotenv/config";
import app from "./app";
import getMongoSource from "../infrastructure/sources/mongoSource";
import { WebSocketServer } from "ws";

getMongoSource();
const port = parseInt(process.env.APP_PORT || "8080");
app.listen(port, () => console.log(`[server]: listening on http://localhost:${port}`));

const socketPort = parseInt(process.env.SOCKET_PORT || "5000");
const wss = new WebSocketServer({
    port: socketPort,
    clientTracking: true,
}, () => console.log(`[server]: waiting for socket connections on http://localhost:${socketPort}`));

wss.on("connection", socket => {
    socket.send(JSON.stringify({ message: "connected!" }));

    socket.on("error", console.error);

    socket.on("message", data => console.log(data));
});