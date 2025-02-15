require("dotenv").config();

const express = require("express");
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

const app = express();

app.listen(3000, () => {
	console.log("http://localhost:3000");
});