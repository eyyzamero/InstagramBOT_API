import { InstagramAPIService } from "../../../../core/services/regular/instagram-api.service";
import Container, { Service } from "typedi";
import { ILoginReq } from "../../contracts/requests";
import { ILoginRes } from "../../contracts/responses";
import { AuthMapperService } from "..";

@Service()
export class AuthService {

	private _authMapperService: AuthMapperService = Container.get(AuthMapperService);

	constructor(
		private _instagramApiService: InstagramAPIService
	) { }

	async login(req: ILoginReq): Promise<ILoginRes> {
		var serviceRes = await this._instagramApiService.login(req);
		var mappedServiceRes = this._authMapperService.AccountRepositoryLoginResponseLoggedInUserToILoginRes(serviceRes);
		return mappedServiceRes;
	}
}