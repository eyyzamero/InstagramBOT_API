import { ClientWebSocketKey, ClientWebSocketType } from "../../../../enums";
import { UserAddedToFollowingBody, ClientWebSocketBaseRes, IUserAddedToFollowingRes } from "../..";

export class UserAddedToFollowingRes extends ClientWebSocketBaseRes implements IUserAddedToFollowingRes {
	
	constructor(
		key: ClientWebSocketKey = ClientWebSocketKey.NONE,
		type: ClientWebSocketType = ClientWebSocketType.NONE,
		data: UserAddedToFollowingBody = new UserAddedToFollowingBody()
	) {
		super(key, type, data);
	}
}