import { ILoginRes } from "..";

export class LoginRes implements ILoginRes {
	
	constructor(
		public id: number = 0,
		public username: string = "",
		public fullName: string = "",
		public profilePictureID: string = "",
		public profilePictureURL: string = "",
		public isPrivate: boolean = false,
		public isVerified: boolean = false,
		public isBusinessAccount: boolean = false
	) { }
}