import { ClientWebSocketKey, ClientWebSocketType } from "../../../../../enums";

export interface IClientWebSocketBaseRes {
	key: ClientWebSocketKey,
	type: ClientWebSocketType,
	data: object | null
}