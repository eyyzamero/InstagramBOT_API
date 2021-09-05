import { IgApiClient } from "instagram-private-api";
import { ILoginReq } from "../../../controllers/auth/contracts/requests";
import { Service } from "typedi";

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
}