import { Request, Response } from "express";
import { Service } from "typedi";
import { ILoginReq, LoginReq } from "./contracts/requests";
import { ILoginRes } from "./contracts/responses";
import { AuthService } from "./services";

@Service()
export class AuthController {
	
	constructor(
		private readonly _authService: AuthService
	) { }

	async login(req: Request, res: Response): Promise<ILoginRes> {
		const serviceReq: ILoginReq = new LoginReq(req.body.username, req.body.password);
		const serviceRes = await this._authService.login(serviceReq);
		return serviceRes;
	}
}