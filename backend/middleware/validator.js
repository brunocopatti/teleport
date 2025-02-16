const { validationResult } = require("express-validator");

const validateInput = (req, res, next) => {
	const result = validationResult(req);
	if (result.isEmpty()) {
		return next();
	}
	return res.status(400).json({
		"errors": result.array()
	})
}

module.exports = { validateInput };