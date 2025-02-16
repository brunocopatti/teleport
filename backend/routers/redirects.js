const express = require("express");
const { body, param, matchedData } = require("express-validator");
const pool = require("../db");
const { validateInput } = require("../middleware/validator");

const redirectsRouter = express.Router();

redirectsRouter.use(express.json());

redirectsRouter.post(
	"/",
	body("shortPath").isLength({ min: 1, max: 255 }),
	body("destinationUrl").isURL(),
	validateInput,
	async (req, res, next) => {
		try {
			const { shortPath, destinationUrl } = matchedData(req);
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
	}
);

redirectsRouter.get("/", async (req, res, next) => {
	try {
		const MAX_REDIRECTS_COUNT = 10;
		const [results] = await pool.query(
			`SELECT *,
				(SELECT COUNT(*) FROM redirect_reports
				WHERE redirect_id = redirects.id)
				AS clicks
			FROM redirects
			LIMIT ?`,
			[MAX_REDIRECTS_COUNT]
		);
		return res.json(results);
	} catch (error) {
		return next(error);
	}
});

redirectsRouter.get(
	"/:redirectId",
	param("redirectId").isInt(),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
			const [redirectResults] = await pool.query(
				"SELECT * FROM `redirects` WHERE id = ?",
				[redirectId]
			);
			if (redirectResults.length !== 1) {
				return res.sendStatus(404);
			}
			const [redirectReportResults] = await pool.query(
				"SELECT * FROM `redirect_reports` WHERE `redirect_id` = ?",
				[redirectId]
			);
			return res.json({
				"redirect": redirectResults[0],
				"reports": redirectReportResults
			});
		} catch (error) {
			return next(error);
		}
	}
);

redirectsRouter.put(
	"/:redirectId",
	param("redirectId").isInt(),
	body("shortPath").isLength({ min: 1, max: 255 }),
	body("destinationUrl").isURL(),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
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
	}
);

redirectsRouter.delete(
	"/:redirectId",
	param("redirectId").isInt(),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
			await pool.execute(
				"DELETE FROM `redirects` WHERE id = ?",
				[redirectId]
			);
			return res.sendStatus(204);
		} catch (error) {
			return next(error);
		}
	}
);

module.exports = redirectsRouter;