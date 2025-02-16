require("dotenv").config();

const express = require("express");
const { body, matchedData } = require("express-validator");
const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const pool = require("../db");
const { validateInput } = require("../middleware/validator");

const authRouter = express.Router();

const errorJSON = {
	"error": "Invalid username/password"
};

authRouter.use(express.json());

authRouter.post(
	"/",
	body("username").isString().isLength({ min: 1, max: 255 }),
	body("password").isString().isLength({ min: 1, max: 255 }),
	validateInput,
	async (req, res, next) => {
		try {
			const { username, password } = matchedData(req);
			const [results] = await pool.query(
				"SELECT * FROM `users` WHERE `username` = ?",
				[username]
			);
			if (results.length !== 1) {
				return res.status(400).json(errorJSON);
			}
			const user = results[0];
			if (await argon2.verify(user.password_hash, password)) {
				// Only pass necessary info
				const token = jwt.sign({
					"id": user.id,
					"created_at": user.created_at
				}, process.env.SECRET);
				return res.json({ token });
			}
			return res.status(400).json(errorJSON);
		} catch (error) {
			return next(error);
		}
	}
);

module.exports = authRouter;