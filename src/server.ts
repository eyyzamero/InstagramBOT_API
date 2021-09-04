import express from "express";

const APPLICATION = express();
const PORT = 8080 || process.env.PORT;

APPLICATION.get("/", (req, res) => {
	res.send("Hello");
});

APPLICATION.listen(PORT, () => {
	console.log(`Instagram BOT API server started at http://localhost:${PORT}`);
});