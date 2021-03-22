require("dotenv").config();
const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const chalk = require("chalk");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");

// local module
const databaseConnection = require("./app/db/db"); // TODO: depricated

// config
const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));

// set view engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

// database connection
databaseConnection(); // TODO: to be removed

// session config
app.use(
	session({
		secret: process.env.secretKey,
		resave: false,
		store: MongoDbStore.create({
			mongoUrl: process.env.DB_CONNECTION,
			collectionName: "sessions",
		}),
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	})
);

app.use(flash());

app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});

// Routers
require("./routes/web")(app);

// server listening
app.listen(PORT, () => {
	console.log(
		chalk.cyan(
			"app is listening on port: ".toUpperCase() + `http://localhost:${PORT}`
		)
	);
});
