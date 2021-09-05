import { IFollowFromHashtagReq } from "..";

export class FollowFromHashtagReq implements IFollowFromHashtagReq {
	
	constructor(
		public hashtag: string = "",
		public numberOfUsersToFollow: number = 0,
	) { }
}