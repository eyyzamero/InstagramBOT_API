import { Router } from "express";
import { TasksController } from "../../controllers/tasks/tasks.controller";
import Container from "typedi";

const tasksRoutes = Router();
const tasksController = Container.get(TasksController)

tasksRoutes.post("/followFromHashtag", async (req, res) => {
	var controllerRes = await tasksController.followPeopleFromHashtag(req, res);
	return res.json(controllerRes);
});

tasksRoutes.post("/followTopAccountsFromPoland", async (req, res) => {
	let controllerRes = await tasksController.followTopAccountsFromPoland(req, res);
	return res.json(controllerRes);
});

tasksRoutes.post("/followNewIncomersThenFollowTopAccountsFromPoland", async (req, res) => {
	let controllerRes = await tasksController.followNewIncomersThenFollowTopAccountsFromPoland(req, res);
	return res.json(controllerRes);
});

tasksRoutes.post("/likePostsFromHashtagFeed", async (req, res) => {
	let controllerRes = await tasksController.likePostsFromHashtagFeed(req, res);
	return res.json(controllerRes);
})

export default tasksRoutes;