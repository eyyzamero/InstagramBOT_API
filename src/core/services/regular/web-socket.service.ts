import { Server } from "http";
import { IWebSocketClientModel, WebSocketClientModel } from "../../../core/models";
import { Service } from "typedi";
import WebSocket from "ws"

@Service()
export class WebSocketService {
	
	private _webSocketServer: WebSocket.Server;
	private _webSocketClients: Array<IWebSocketClientModel> = new Array<IWebSocketClientModel>();

	get clients() {
		return this._webSocketClients;
	}
	
	constructor() { }

	initWebSocketServer(server: Server) {
		this._webSocketServer = new WebSocket.Server({
			server: server,
			path: "/instagram-bot-ws"
		});

		this._webSocketServer.on("connection", (webSocketClient, request) => {

			var incomingURL = new URL(request.url, `http://${request.headers.host}`);
			var username = incomingURL.searchParams.get("username");

			if (!username || this.clients.some(x => x.userName === username))
				webSocketClient.close();

			let newWebSocketClient = new WebSocketClientModel(username, webSocketClient)
			
			this.clients.push(newWebSocketClient);
		});
	}

	getClientByUsername(username: string) {
		return this.clients.find(x => x.userName === username);
	}
}