import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth.controller";
import Container from "typedi";

const authRoutes = Router();
const authController = Container.get(AuthController)

authRoutes.post("/login", async (req, res) => {
	var controllerRes = await authController.login(req, res);
	return res.json(controllerRes);
});

export default authRoutes;