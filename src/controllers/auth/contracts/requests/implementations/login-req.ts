import { ILoginReq } from "..";

export class LoginReq implements ILoginReq {
	
	constructor(
		public username: string = "",
		public password: string = ""	
	) { }
}