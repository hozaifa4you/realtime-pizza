const { Strategy } = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../../app/models/Users");

const init = passport => {
	passport.use(
		new Strategy(
			{ usernameField: "email" },
			async (email, password, done) => {
				// login
				// check if email exists
				const user = await User.findOne({ email });

				if (!user) {
					return done(null, false, { message: "Invalid Credentials" });
				}

				bcrypt
					.compare(password, user.password)
					.then(match => {
						if (match) {
							return done(null, user, {
								message: "Successfully Logged in",
							});
						}

						return done(null, false, { message: "Invalid Credentials" });
					})
					.catch(err => {
						return done(err, false, { message: "Something went wrong" });
					});
			}
		)
	);

	passport.serializeUser((user, done) => {
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};

module.exports = init;
