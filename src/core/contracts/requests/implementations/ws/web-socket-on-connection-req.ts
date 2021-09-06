import { IWebSocketOnConnectionReq } from "../..";

export class WebSocketOnConnectionReq implements IWebSocketOnConnectionReq {
	
	constructor(
		public username: string = ""
	) { }
}