require("dotenv").config();

const express = require("express");
const { param } = require("express-validator");
const { IPinfoWrapper } = require("node-ipinfo");
const pool = require("./db");
const redirectsRouter = require("./routers/redirects");
const usersRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const { validateInput } = require("./middleware/validator");

const app = express();

const ipinfoWrapper = new IPinfoWrapper(process.env.IPINFO_TOKEN);

app.get(
	"/:shortPath",
	param("shortPath").isLength({ min: 1, max: 255 }),
	validateInput,
	async (req, res, next) => {
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
			const ipinfo = await ipinfoWrapper.lookupIp(req.ip);
			const location = ipinfo.loc || null;
			await pool.execute(
				"INSERT INTO `redirect_reports`(`redirect_id`, `location`) VALUES (?, ?)",
				[redirectId, location]
			);
			return res.redirect(destinationUrl);
		} catch (error) {
			return next(error);
		}
	}
);

app.use("/api/redirects", redirectsRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
	console.log("http://localhost:3000");
});