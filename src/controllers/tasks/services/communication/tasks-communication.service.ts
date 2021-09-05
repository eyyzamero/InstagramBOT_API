import { InstagramAPIService } from "../../../../core/services/regular/instagram-api.service";
import { Service } from "typedi";
import { IFollowFromHashtagReq } from "../../contracts/requests";

@Service()
export class TasksCommunicationService {
	
	constructor(
		private _instagramApiService: InstagramAPIService
	) { }

	async followPeopleFromHashtag(req: IFollowFromHashtagReq) {
		let serviceRes = await this._instagramApiService.followPeopleFromHashtag(req);
		return serviceRes;
	}
}