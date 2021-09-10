import { ClientWebSocketKey, ClientWebSocketType } from "../../../../../enums";
import { IClientWebSocketBaseRes } from "../../..";

export class ClientWebSocketBaseRes implements IClientWebSocketBaseRes {
	
	constructor(
		public key: ClientWebSocketKey,
		public type: ClientWebSocketType,
		public data: object | null
	) { }
}