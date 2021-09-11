import { IFollowNewIncomersThenFollowTopAccountsReq } from "..";

export class FollowNewIncomersThenFollowTopAccountsReq implements IFollowNewIncomersThenFollowTopAccountsReq {

	constructor(
		public numberOfUsersToFollow: number = 0
	) { }
}