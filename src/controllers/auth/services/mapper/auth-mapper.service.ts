import { AccountRepositoryLoginResponseLogged_in_user } from "instagram-private-api";
import { Service } from "typedi";
import { ILoginRes, LoginRes } from "../../contracts/responses";

@Service()
export class AuthMapperService {
	
	constructor() { }

	AccountRepositoryLoginResponseLoggedInUserToILoginRes(src: AccountRepositoryLoginResponseLogged_in_user): ILoginRes {
		if (src === null)
			return new LoginRes();

		let dest = new LoginRes(src.pk, src.username, src.full_name, src.profile_pic_id, src.profile_pic_url, src.is_private, src.is_verified, src.is_business);
		return dest; 
	}
}