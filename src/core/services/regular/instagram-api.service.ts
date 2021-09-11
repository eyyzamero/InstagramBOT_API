import { Feed, IgApiClient } from "instagram-private-api";
import { ILoginReq } from "../../../controllers/auth/contracts/requests";
import { Service } from "typedi";
import { FollowTopAccountsFromPolandReq, IFollowFromHashtagReq, IFollowNewIncomersThenFollowTopAccountsReq, IFollowTopAccountsFromPolandReq } from "../../../controllers/tasks/contracts/requests";
import { WebSocketClientSenderService } from "./web-socket-client-sender.service";

@Service()
export class InstagramAPIService {
	
	private readonly _instagramAPIClient: IgApiClient;

	constructor(
		private _webSocketClientSenderService: WebSocketClientSenderService
	) {
		this._instagramAPIClient = new IgApiClient();
	}

	async login(req: ILoginReq) {
		this._instagramAPIClient.state.generateDevice(req.username);
		
		await this._instagramAPIClient.simulate.preLoginFlow();
		const loggedInAccount = await this._instagramAPIClient.account.login(req.username, req.password);
		await this._instagramAPIClient.simulate.postLoginFlow();

		global.sessionUsername = req.username;

		return loggedInAccount;
	}

	async followPeopleFromHashtag(req: IFollowFromHashtagReq) {
		let numberOfFollowedUsers: number = 0;
		let tagFeed = await this._instagramAPIClient.feed.tag(req.hashtag);
		let tagFeedItems = await tagFeed.items();
		let usersFoundOnFeedNotFollowing = (await tagFeedItems).map(feedItem => feedItem.user).filter(x => !x.friendship_status.following);
		
		for(const user of usersFoundOnFeedNotFollowing) {
			if (numberOfFollowedUsers >= req.numberOfUsersToFollow) break;
			
			await this._followUser(user.pk, user.username);

			this._webSocketClientSenderService.logUserAddedToFollowing(user.username);

			const timeToWaitUntilNextOperation = Math.round(Math.random() * 6000) + 1000;
			await new Promise(resolve => setTimeout(resolve, timeToWaitUntilNextOperation));
			
			numberOfFollowedUsers++;
		}
		return;
	}

	async followTopAccountsFromPoland(req: IFollowTopAccountsFromPolandReq) {
		let numberOfInteractions = 0;

		const followingFeed = this._instagramAPIClient.feed.accountFollowing(this._instagramAPIClient.state.cookieUserId);
		const following = await this._getAllItemsFromFeed(followingFeed);
		const followingUsernames = following.map(x => x.username);

		for(const account of this._getTopAccountsFromPolandArray(false)) {
			if (numberOfInteractions >= req.numberOfUsersToFollow) break;

			const user = await this._instagramAPIClient.user.searchExact(account);

			if (!user) continue;

			const followingThisAccount = followingUsernames.includes(user.username);

			console.log(`Executing: ${followingThisAccount ? "UNFOLLOW_THEN_FOLLOW_BACK" : "FOLLOW_USER"} for username: ${user.username} [Iteration: ${numberOfInteractions}] `)

			followingThisAccount
				? await this._unfollowThenFollowBack(user.pk, user.username)
				: await this._followUser(user.pk, user.username)

			const timeToWaitUntilNextOperation = Math.round(Math.random() * 6000) + 1000;
			await new Promise(resolve => setTimeout(resolve, timeToWaitUntilNextOperation));

			numberOfInteractions++;
		}
		return;
	}

	async followNewIncomersThenFollowTopAccountsFromPoland(req: IFollowNewIncomersThenFollowTopAccountsReq) {
		let numberOfInteractions = 0;

		const accountsWhitelist = this._getTopAccountsFromPolandArray(false);

		const followersFeed = this._instagramAPIClient.feed.accountFollowers(this._instagramAPIClient.state.cookieUserId);
		const followers = await this._getAllItemsFromFeed(followersFeed);
		const followersExceptWhitelist = followers.filter(follower => !accountsWhitelist.includes(follower.username));

		for(const follower of followersExceptWhitelist) {
			if (numberOfInteractions >= req.numberOfUsersToFollow) break;
			
			await follower.checkFollow();

			this._webSocketClientSenderService.logUserAddedToFollowing(follower.username);

			const timeToWaitUntilNextOperation = Math.round(Math.random() * 6000) + 1000;
			await new Promise(resolve => setTimeout(resolve, timeToWaitUntilNextOperation));

			numberOfInteractions++;
		}

		const interactionsLeft = req.numberOfUsersToFollow - numberOfInteractions;

		if (interactionsLeft > 0) {
			var req = new FollowTopAccountsFromPolandReq(interactionsLeft);

			await this.followTopAccountsFromPoland(req);
		}
	}

	private _getTopAccountsFromPolandArray(shuffle: boolean): Array<string> {
		let accounts = new Array<string>(
			"_rl9", "annalewandowskahpba", "wersow", "frizoluszek", "stuuburton", "lenkalul", "trombabomba", "chodakowskaewa", "martyna.world", "joannakrupa",
			"fit.lovers", "juliawieniawa", "murcix", "sylwiaprzybysz", "blowek5", "marcindubiel", "juliakostera", "deynn", "ryskalamarcysia", "_minimajk",
			"littlemooonster96", "redlipstickmonster", "ola_nowak", "maffashion_official", "naruciak", "rezigiusz", "kurdejszatan", "m_rozenek", "fusialka", "nataliasiwiec.official",
			"kuba_wojewodzki_official", "reserved", "kwiatkowsky", "wujekluki", "linkimaster", "roxie_wegiel", "kruszwil", "dominikrupinski", "sylwialipka_music", "adam_zdrojkowski",
			"malgorzatakozuchowska_", "pamelastefanowicz", "kingasawczuk", "magdagessler_official", "quebahombre", "netflixpl", "abstrachujetv", "jemerced", "queen_of_life_77", "dodaqueen",
		);
		return accounts;
	}

	private async _unfollowThenFollowBack(userID: number, username: string) {
		const friendshipDestroy = await this._instagramAPIClient.friendship.destroy(userID);

		if (friendshipDestroy)
			this._webSocketClientSenderService.logUserRemovedFromFollowing(username);
		
		const timeToWaitUntilNextOperation = Math.round(Math.random() * 2000) + 1000;
		await new Promise(resolve => setTimeout(resolve, timeToWaitUntilNextOperation));

		await this._followUser(userID, username);
	}

	private async _followUser(userID: number, username: string) {
		const friendshipCreate = await this._instagramAPIClient.friendship.create(userID);

		if (friendshipCreate) 
			this._webSocketClientSenderService.logUserAddedToFollowing(username);
	}

	private async _getAllItemsFromFeed<T>(feed: Feed<any, T>): Promise<T[]> {
		let items: Array<T> = new Array<T>();

		do {
			items = items.concat(await feed.items());
		} while (feed.isMoreAvailable());

		return items;
	}
}