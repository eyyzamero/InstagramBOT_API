import { Router } from "express";

import authRoutes from "./auth.routing";
import tasksRoutes from "./tasks.routing";

const routes = Router();

routes.use("/auth", authRoutes);
routes.use("/tasks", tasksRoutes);

export default routes;