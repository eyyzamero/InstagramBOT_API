import WebSocket from "ws";

export interface IWebSocketClientModel {
	userName: string;
	webSocket: WebSocket;
}