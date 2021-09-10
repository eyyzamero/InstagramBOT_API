import { ClientWebSocketKey, ClientWebSocketType } from "../../../../enums";

export interface IUserRemovedFromFollowingRes {
	key: ClientWebSocketKey;
	type: ClientWebSocketType;
	data: object;
}