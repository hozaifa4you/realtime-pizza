require("dotenv").config();
const express = require("express");
const path = require("path");
const chalk = require("chalk");
const expressLayout = require("express-ejs-layouts");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cors = require("cors");

// config
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));

// set view engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// server routes
app.get("/", (req, res) => {
	res.render("home");
});

app.get("/cart", (req, res) => {
	res.render("customers/cart");
});

app.get("/register", (req, res) => {
	res.render("auth/register");
});

app.get("/login", (req, res) => {
	res.render("auth/login");
});

// server listening
app.listen(PORT, () => {
	console.log(
		chalk.cyan(
			"app is listening on port: ".toUpperCase() + `http://localhost:${PORT}`
		)
	);
});
