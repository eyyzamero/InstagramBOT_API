import { IUserAddedToFollowingBody } from "../../..";

export class UserAddedToFollowingBody implements IUserAddedToFollowingBody {
	
	constructor(
		public username: string = ""
	) { }
}