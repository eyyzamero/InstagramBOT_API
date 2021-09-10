import { ClientWebSocketKey, ClientWebSocketType } from "../../../../enums";
import { UserRemovedFromFollowingBody, ClientWebSocketBaseRes, IUserRemovedFromFollowingRes } from "../..";

export class UserRemovedFromFollowingRes extends ClientWebSocketBaseRes implements IUserRemovedFromFollowingRes {
	
	constructor(
		key: ClientWebSocketKey = ClientWebSocketKey.NONE,
		type: ClientWebSocketType = ClientWebSocketType.NONE,
		data: UserRemovedFromFollowingBody = new UserRemovedFromFollowingBody()
	) {
		super(key, type, data);
	}
}