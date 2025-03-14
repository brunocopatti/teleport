const express = require("express");
const { body, matchedData } = require("express-validator");
const argon2 = require("argon2");
const mysqlErrorKeys = require("mysql-error-keys");
const pool = require("../db");
const { validateInput } = require("../middleware/validator");

const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.post(
	"/",
	body("username").isString().isLength({ min: 1, max: 255 }),
	body("password").isString().isLength({ min: 1, max: 255 }),
	validateInput,
	async (req, res, next) => {
		try {
			const { username, password } = matchedData(req);
			const passwordHash = await argon2.hash(password);
			await pool.execute(
				"INSERT INTO `users`(`username`, `password_hash`) VALUES (?, ?)",
				[username, passwordHash]
			);
			const [results] = await pool.query(
				"SELECT * FROM `users` WHERE `username` = ?",
				[username]
			);
			const user = results[0];
			delete user.password_hash;
			return res.status(201).json(user);
		} catch (error) {
			if (error.code === mysqlErrorKeys.ER_DUP_ENTRY) {
				return res.status(400).json({ "error": "Username already taken" });
			}
			return next(error);
		}
	}
);

module.exports = usersRouter;