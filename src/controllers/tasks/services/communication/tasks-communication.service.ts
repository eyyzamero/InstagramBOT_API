import { InstagramAPIService } from "../../../../core/services/regular/instagram-api.service";
import { Service } from "typedi";
import { IFollowFromHashtagReq, IFollowNewIncomersThenFollowTopAccountsReq, IFollowTopAccountsFromPolandReq, ILikePostsFromHashtagFeedReq } from "../../contracts/requests";

@Service()
export class TasksCommunicationService {
	
	constructor(
		private _instagramApiService: InstagramAPIService
	) { }

	async followPeopleFromHashtag(req: IFollowFromHashtagReq) {
		let serviceRes = await this._instagramApiService.followPeopleFromHashtag(req);
		return serviceRes;
	}

	async followTopAccountsFromPoland(req: IFollowTopAccountsFromPolandReq) {
		let serviceRes = await this._instagramApiService.followTopAccountsFromPoland(req);
		return serviceRes;
	}

	async followNewIncomersThenFollowTopAccountsFromPoland(req: IFollowNewIncomersThenFollowTopAccountsReq) {
		let serviceRes = await this._instagramApiService.followNewIncomersThenFollowTopAccountsFromPoland(req);
		return serviceRes;
	}

	async likePostsFromHashtagFeed(req: ILikePostsFromHashtagFeedReq) {
		let serviceRes = await this._instagramApiService.likePostsFromHashtagFeed(req);
		return serviceRes;
	}
}