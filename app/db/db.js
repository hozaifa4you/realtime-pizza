const mongoose = require("mongoose");
const DB_CONNECTION = process.env.DB_CONNECTION;
const chalk = require("chalk");

const databaseConnection = () => {
	mongoose.connect(
		DB_CONNECTION,
		{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
		() => {
			console.log(
				chalk.cyan(
					"database connected at: ".toUpperCase() +
						mongoose.connection.host
				)
			);
		}
	);
};

module.exports = databaseConnection;
