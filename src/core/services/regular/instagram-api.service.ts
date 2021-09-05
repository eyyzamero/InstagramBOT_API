import { IgApiClient } from "instagram-private-api";
import { ILoginReq } from "../../../controllers/auth/contracts/requests";
import { Service } from "typedi";
import { IFollowFromHashtagReq } from "../../../controllers/tasks/contracts/requests";

@Service()
export class InstagramAPIService {
	
	private readonly _instagramAPIClient: IgApiClient;

	constructor() {
		this._instagramAPIClient = new IgApiClient();
	}

	async login(req: ILoginReq) {
		this._instagramAPIClient.state.generateDevice(req.username);
		
		await this._instagramAPIClient.simulate.preLoginFlow();
		const loggedInAccount = await this._instagramAPIClient.account.login(req.username, req.password);
		await this._instagramAPIClient.simulate.postLoginFlow();

		return loggedInAccount;
	}

	async followPeopleFromHashtag(req: IFollowFromHashtagReq) {
		let numberOfFollowedUsers: number = 0;
		let tagFeed = await this._instagramAPIClient.feed.tag(req.hashtag);
		let tagFeedItems = await tagFeed.items();
		let usersFoundOnFeedNotFollowing = (await tagFeedItems).map(feedItem => feedItem.user).filter(x => !x.friendship_status.following);
		
		for(const user of usersFoundOnFeedNotFollowing) {
			if (numberOfFollowedUsers >= req.numberOfUsersToFollow) break;
			
			await this._instagramAPIClient.friendship.create(user.pk);

			console.log(`Iteration ${numberOfFollowedUsers + 1} - User: ${user.username} followed`);

			const timeToWaitUntilNextOperation = Math.round(Math.random() * 6000) + 1000;
			await new Promise(resolve => setTimeout(resolve, timeToWaitUntilNextOperation));
			
			numberOfFollowedUsers++;
		}
		return ;
	}
}