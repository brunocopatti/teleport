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
			"SELECT `id`, `destination_url` FROM `redirects` WHERE `short_path` = ?",
			[shortPath]
		);
		if (results.length !== 1) {
			return res.sendStatus(404);
		}
		const redirectId = results[0].id;
		const destinationUrl = results[0].destination_url;
		await pool.execute(
			"INSERT INTO `redirect_reports`(`redirect_id`, `ip_address`) VALUES (?, ?)",
			[redirectId, req.ip]
		);
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

app.get("/api/redirects/:redirectId", async (req, res, next) => {
	try {
		const { redirectId } = req.params;
		const [results] = await pool.query(
			"SELECT * FROM `redirects` WHERE id = ?",
			[redirectId]
		);
		if (results.length !== 1) {
			return res.sendStatus(404);
		}
		return res.json(results[0]);
	} catch (error) {
		return next(error);
	}
});

app.put("/api/redirects/:redirectId", async (req, res, next) => {
	try {
		const { redirectId } = req.params;
		const { shortPath, destinationUrl } = req.body;
		await pool.execute(
			"UPDATE `redirects` SET `short_path` = ?, `destination_url` = ? WHERE id = ?",
			[shortPath, destinationUrl, redirectId]
		);
		const [results] = await pool.query(
			"SELECT * FROM `redirects` WHERE `short_path` = ?",
			[shortPath]
		);
		return res.json(results[0]);
	} catch (error) {
		return next(error);
	}
});

app.delete("/api/redirects/:redirectId", async (req, res, next) => {
	try {
		const { redirectId } = req.params;
		await pool.execute(
			"DELETE FROM `redirects` WHERE id = ?",
			[redirectId]
		);
		return res.sendStatus(204);
	} catch (error) {
		return next(error);
	}
});

app.listen(3000, () => {
	console.log("http://localhost:3000");
});