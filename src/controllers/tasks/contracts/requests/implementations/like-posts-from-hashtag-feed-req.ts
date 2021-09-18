import { ILikePostsFromHashtagFeedReq } from "..";

export class LikePostsFromHashtagFeedReq implements ILikePostsFromHashtagFeedReq {

	constructor(
		public hashtag: string,
		public numberOfPostsToFollow: number
	) { }
}