require("dotenv").config();

const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

module.exports = pool;