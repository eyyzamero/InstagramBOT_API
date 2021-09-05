import { Router } from "express";
import { TasksController } from "../../controllers/tasks/tasks.controller";
import Container from "typedi";

const tasksRoutes = Router();
const tasksController = Container.get(TasksController)

tasksRoutes.post("/followFromHashtag", async (req, res) => {
	var controllerRes = await tasksController.followPeopleFromHashtag(req, res);
	return res.json(controllerRes);
});

export default tasksRoutes;