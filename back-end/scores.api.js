"use strict";

// require the express module
const express = require("express");

const routes = express.Router();

const db = require("./connection");

routes.get("/scores", (req, res) => {
	let queryString = `SELECT * FROM scores ORDER BY score DESC LIMIT 5`;
	db.query(queryString).then(
		(dbresponse) => {
			res.json(dbresponse.rows);
		},
		(error) => {
			console.log(error.message);
		}
	);
});

routes.get("/scores/:username", (req, res) => {
	let uname = req.params.username;
	let queryString = `SELECT * FROM scores WHERE username = ${uname}`;
	db.query(queryString).then(
		(dbresponse) => {
			res.json(dbresponse.rows);
		},
		(error) => {
			console.log(error.message);
		}
	);
});

routes.post("/scores", (req, res) => {
	let queryString = `INSERT INTO  scores (username, score)
     VALUES($1::VARCHAR, $2::SMALLINT)`;
	db.query(queryString, [req.body.username, req.body.score]).then(
		(dbresponse) => {
			res.json(req.body);
		},
		(error) => {
			console.log(error.message);
		}
	);
});

module.exports = routes;
