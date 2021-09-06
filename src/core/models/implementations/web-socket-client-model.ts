import WebSocket from "ws";
import { IWebSocketClientModel } from "..";

export class WebSocketClientModel implements IWebSocketClientModel {
	
	constructor (
		public userName: string,
		public webSocket: WebSocket
	) { }
}