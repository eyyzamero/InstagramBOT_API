import { Router } from "express";

import authRoutes from "./auth.routing";

const routes = Router();

routes.use("/auth", authRoutes);

export default routes;