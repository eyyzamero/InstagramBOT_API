export interface ILoginRes {
	id: number;
	username: string;
	fullName: string;
	profilePictureID: string;
	profilePictureURL: string;
	isPrivate: boolean;
	isVerified: boolean;
	isBusinessAccount: boolean;
}