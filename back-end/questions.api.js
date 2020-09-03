"use strict";

// require the express module
const express = require("express");

const routes = express.Router();

const db = require("./connection");

routes.get("/questions", (req, res) => {
	let queryString = `SELECT * FROM questions ORDER BY RANDOM() LIMIT 10`;
	db.query(queryString).then(
		(dbresponse) => {
			res.json(dbresponse.rows);
		},
		(error) => {
			console.log(error.message);
		}
	);
});

module.exports = routes;
