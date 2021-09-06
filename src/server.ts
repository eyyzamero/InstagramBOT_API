import "reflect-metadata";
import cors from "cors";
import express from "express";
import routes from "./core/routing/application.routing";
import Container from "typedi";
import { WebSocketService } from "./core/services/regular/web-socket.service";
var bodyParser = require('body-parser')

const APPLICATION = express();
const PORT = 8080 || process.env.PORT;

APPLICATION.use(bodyParser.urlencoded({ extended: false }))
APPLICATION.use(bodyParser.json())

APPLICATION.use(cors())

APPLICATION.use("/", routes);

const server = APPLICATION.listen(PORT, () => {
	console.log(`Instagram BOT API server started at http://localhost:${PORT}`);
});

const webSocketService = Container.get(WebSocketService);
webSocketService.initWebSocketServer(server);