import { IFollowTopAccountsFromPolandReq } from "..";

export class FollowTopAccountsFromPolandReq implements IFollowTopAccountsFromPolandReq {
	
	constructor(
		public numberOfUsersToFollow: number = 0
	) { }
}