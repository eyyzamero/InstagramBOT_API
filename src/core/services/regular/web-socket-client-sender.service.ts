import { IWebSocketClientModel } from "../../../core/models";
import { Service } from "typedi";
import { WebSocketService } from "./web-socket.service";
import { ClientWebSocketKey, ClientWebSocketType } from "../../enums";
import { IUserAddedToFollowingRes, IUserRemovedFromFollowingRes, UserAddedToFollowingBody, UserAddedToFollowingRes, UserRemovedFromFollowingBody, UserRemovedFromFollowingRes, IPostFromHashtagFeedLikedRes, PostFromHashtagFeedLikedRes } from "../../contracts/responses";

@Service()
export class WebSocketClientSenderService {
	
	constructor(
		private _webSocketService: WebSocketService
	) { }

	get webSocketClientInstance(): IWebSocketClientModel | null {
		const username = global.sessionUsername;
		if (!username) return null;
		
		const client = this._webSocketService.getClientByUsername(username);
		return client;
	}

	logUserAddedToFollowing(username: string) {
		const data: IUserAddedToFollowingRes = new UserAddedToFollowingRes(
			ClientWebSocketKey.LOG,
			ClientWebSocketType.USER_ADDED_TO_FOLLOWING,
			new UserAddedToFollowingBody(username)
		);

		this._consoleLogOperation(`User: ${username} added from following`);
		this._sendMessageToClientWebSocket(data);
	}

	logUserRemovedFromFollowing(username: string) {
		const data: IUserRemovedFromFollowingRes = new UserRemovedFromFollowingRes(
			ClientWebSocketKey.LOG,
			ClientWebSocketType.USER_REMOVED_FROM_FOLLOWING,
			new UserRemovedFromFollowingBody(username)
		);

		this._consoleLogOperation(`User: ${username} removed from following`);
		this._sendMessageToClientWebSocket(data);
	}

	logPostFromHashtagFeedLiked(username: string, hashtag: string) {
		const data: IPostFromHashtagFeedLikedRes = new PostFromHashtagFeedLikedRes(
			ClientWebSocketKey.LOG,
			ClientWebSocketType.POST_FROM_HASHTAG_FEED_LIKED,
			null
		);

		this._consoleLogOperation(`Liked post from hashtag: ${hashtag}`);
		this._sendMessageToClientWebSocket(data);
	}

	private _consoleLogOperation(text: string) {
		if (global.environment === "development")
			console.log(text);
	}

	private _sendMessageToClientWebSocket(data: object) {
		const stringified = JSON.stringify(data);
		this.webSocketClientInstance?.webSocket.send(stringified);
	}
}