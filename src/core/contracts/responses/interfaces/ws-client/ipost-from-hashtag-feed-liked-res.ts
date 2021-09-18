import { ClientWebSocketKey, ClientWebSocketType } from "../../../../../core/enums";

export interface IPostFromHashtagFeedLikedRes {
	key: ClientWebSocketKey;
	type: ClientWebSocketType;
	data: object | null;
}