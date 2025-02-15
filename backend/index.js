require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const app = express();

app.use(express.json());

app.get("/:shortPath", async (req, res, next) => {
	try {
		const { shortPath } = req.params;
		const [results] = await pool.query(
			"SELECT `destination_url` FROM `redirects` WHERE `short_path` = ?",
			[shortPath]
		);
		if (results.length !== 1) {
			return res.sendStatus(404);
		}
		const destinationUrl = results[0].destination_url;
		return res.redirect(destinationUrl);
	} catch (error) {
		return next(error);
	}
});

app.post("/api/redirects", async (req, res, next) => {
	try {
		const { shortPath, destinationUrl } = req.body;
		await pool.execute(
			"INSERT INTO `redirects`(`short_path`, `destination_url`) VALUES (?, ?)",
			[shortPath, destinationUrl]
		);
		const [results] = await pool.query(
			"SELECT * FROM `redirects` WHERE `short_path` = ?",
			[shortPath]
		);
		return res.status(201).json(results[0]);
	} catch (error) {
		return next(error);
	}
});

app.get("/api/redirects", async (req, res, next) => {
	try {
		const MAX_REDIRECTS_COUNT = 10;
		const [results] = await pool.query(
			"SELECT * FROM `redirects` LIMIT ?",
			[MAX_REDIRECTS_COUNT]
		);
		return res.json(results);
	} catch (error) {
		return next(error);
	}
});

app.listen(3000, () => {
	console.log("http://localhost:3000");
});