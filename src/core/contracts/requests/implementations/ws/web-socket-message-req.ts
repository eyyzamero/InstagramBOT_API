import { IWebSocketMessageReq } from "../..";

export class WebSocketMessageReq implements IWebSocketMessageReq {
	
	constructor(
		public key: string = "",
		public data: object | null
	) { }
}