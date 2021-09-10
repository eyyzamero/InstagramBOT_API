import { IUserRemovedFromFollowingBody } from "../../..";

export class UserRemovedFromFollowingBody implements IUserRemovedFromFollowingBody {
	
	constructor(
		public username: string = ""
	) { }
}