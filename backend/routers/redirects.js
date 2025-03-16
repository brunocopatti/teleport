const express = require("express");
const { body, param, matchedData } = require("express-validator");
const mysqlErrorKeys = require("mysql-error-keys");
const pool = require("../db");
const { validateInput } = require("../middleware/validator");
const loginRequired = require("../middleware/loginRequired");

const redirectsRouter = express.Router();

redirectsRouter.use(express.json());

redirectsRouter.post(
	"/",
	loginRequired,
	body("shortPath").isLength({ min: 1, max: 20 }),
	body("destinationUrl").isURL({ require_protocol: true }),
	validateInput,
	async (req, res, next) => {
		try {
			const { shortPath, destinationUrl } = matchedData(req);
			await pool.execute(
				"INSERT INTO `redirects`(`short_path`, `destination_url`, `user_id`) VALUES (?, ?, ?)",
				[shortPath, destinationUrl, req.user.id]
			);
			const [results] = await pool.query(
				`SELECT
					*
					,(SELECT COUNT(*)
					FROM redirect_reports
					WHERE redirect_id = redirects.id) AS clicks
				FROM redirects
				WHERE short_path = ?`,
				[shortPath]
			);
			return res.status(201).json(results[0]);
		} catch (error) {
			if (error.code === mysqlErrorKeys.ER_DUP_ENTRY) {
				return res.status(400).json({ "error": "Short path already taken" });
			}
			return next(error);
		}
	}
);

redirectsRouter.get(
	"/",
	loginRequired,
	async (req, res, next) => {
		try {
			const [results] = await pool.query(
				`SELECT *,
					(SELECT COUNT(*) FROM redirect_reports
					WHERE redirect_id = redirects.id)
					AS clicks
				FROM redirects
				WHERE user_id = ?`,
				[req.user.id]
			);
			return res.json(results);
		} catch (error) {
			return next(error);
		}
	}
);

redirectsRouter.get(
	"/:redirectId",
	loginRequired,
	param("redirectId").isInt(),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
			const [redirectResults] = await pool.query(
				`SELECT
					*
					,(SELECT COUNT(*)
					FROM redirect_reports
					WHERE redirect_id = redirects.id) AS clicks
				FROM redirects WHERE id = ? AND user_id = ?`,
				[redirectId, req.user.id]
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
	loginRequired,
	param("redirectId").isInt(),
	body("shortPath").isLength({ min: 1, max: 20 }),
	body("destinationUrl").isURL({ require_protocol: true }),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
			const { shortPath, destinationUrl } = req.body;
			const [updateResults] = await pool.execute(
				`UPDATE redirects
				SET short_path = ?,
				destination_url = ?
				WHERE id = ?
				AND user_id = ?`,
				[shortPath, destinationUrl, redirectId, req.user.id]
			);
			if (updateResults.affectedRows !== 1) {
				return res.sendStatus(404);
			}
			const [results] = await pool.query(
				`SELECT
					*
					,(SELECT COUNT(*)
					FROM redirect_reports
					WHERE redirect_id = redirects.id) AS clicks
				FROM redirects
				WHERE short_path = ?`,
				[shortPath]
			);
			return res.json(results[0]);
		} catch (error) {
			if (error.code === mysqlErrorKeys.ER_DUP_ENTRY) {
				return res.status(400).json({ "error": "Short path already taken" });
			}
			return next(error);
		}
	}
);

redirectsRouter.delete(
	"/:redirectId",
	loginRequired,
	param("redirectId").isInt(),
	validateInput,
	async (req, res, next) => {
		try {
			const { redirectId } = matchedData(req);
			const [results] = await pool.execute(
				"DELETE FROM `redirects` WHERE id = ? AND `user_id` = ?",
				[redirectId, req.user.id]
			);
			if (results.affectedRows !== 1) {
				return res.sendStatus(404);
			}
			return res.sendStatus(204);
		} catch (error) {
			return next(error);
		}
	}
);

module.exports = redirectsRouter;