require("dotenv").config();

const jwt = require("jsonwebtoken");
const { header, matchedData } = require("express-validator");
const { validateInput } = require("./validator");

const loginRequired = [
	header("Authorization").notEmpty(),
	validateInput,
	(req, res, next) => {
		try {
			const { authorization } = matchedData(req);
			const token = authorization.replace(/^Bearer /, "");
			const user = jwt.verify(token, process.env.SECRET);
			req.user = user;
			return next();
		} catch (error) {
			return next(error);
		}
	}
];

module.exports = loginRequired;