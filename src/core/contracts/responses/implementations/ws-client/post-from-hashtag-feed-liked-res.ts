import { ClientWebSocketKey, ClientWebSocketType } from "../../../../../core/enums";
import { ClientWebSocketBaseRes, IPostFromHashtagFeedLikedRes } from "../..";

export class PostFromHashtagFeedLikedRes extends ClientWebSocketBaseRes implements IPostFromHashtagFeedLikedRes {

	constructor(
		key: ClientWebSocketKey = ClientWebSocketKey.NONE,
		type: ClientWebSocketType = ClientWebSocketType.NONE,
		data: null = null
	) {
		super(key, type, data)
	}
}