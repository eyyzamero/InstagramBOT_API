import { Service } from "typedi";
import { Request, Response } from "express";
import { TasksCommunicationService } from "./services/communication/tasks-communication.service";
import { FollowFromHashtagReq, FollowNewIncomersThenFollowTopAccountsReq, FollowTopAccountsFromPolandReq } from "./contracts/requests";
import { LikePostsFromHashtagFeedReq } from "./contracts/requests/implementations/like-posts-from-hashtag-feed-req";

@Service()
export class TasksController {
	
	constructor(
		private _tasksCommunicationService: TasksCommunicationService
	) {}

	async followPeopleFromHashtag(req: Request, res: Response) {
		const serviceReq = new FollowFromHashtagReq(req.body.hashtag, req.body.numberOfUsersToFollow)
		const serviceRes = await this._tasksCommunicationService.followPeopleFromHashtag(serviceReq);
		return serviceRes;
	}

	async followTopAccountsFromPoland(req: Request, res: Response) {
		const serviceReq = new FollowTopAccountsFromPolandReq(req.body.numberOfUsersToFollow);
		const serviceRes = await this._tasksCommunicationService.followTopAccountsFromPoland(serviceReq);
		return serviceRes;
	}

	async followNewIncomersThenFollowTopAccountsFromPoland(req: Request, res: Response) {
		const serviceReq = new FollowNewIncomersThenFollowTopAccountsReq(req.body.numberOfUsersToFollow);
		const serviceRes = await this._tasksCommunicationService.followNewIncomersThenFollowTopAccountsFromPoland(serviceReq);
		return serviceRes;
	}

	async likePostsFromHashtagFeed(req: Request, res: Response) {
		const serviceReq = new LikePostsFromHashtagFeedReq(req.body.hashtag, req.body.numberOfPostsToFollow);
		const serviceRes = await this._tasksCommunicationService.likePostsFromHashtagFeed(serviceReq);
		return serviceRes;
	}
}