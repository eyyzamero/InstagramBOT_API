import { ClientWebSocketKey, ClientWebSocketType } from "../../../../enums";

export interface IUserAddedToFollowingRes {
	key: ClientWebSocketKey;
	type: ClientWebSocketType;
	data: object;
}