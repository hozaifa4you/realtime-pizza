const passport = require("passport");

const loginController = () => {
	return {
		login(req, res) {
			res.render("auth/login");
		},
		postLogin(req, res, next) {
			passport.authenticate("local", (err, user, info) => {
				if (err) {
					req.flash("error", info.message);
					return next(err);
				}

				if (!user) {
					req.flash("error", info.message);
					return res.redirect("/login");
				}

				req.logIn(user, err => {
					if (err) {
						req.flash("error", info.message);
						return done(err);
					}

					return res.redirect("/cart");
				});
			})(req, res, next);
		},
	};
};

module.exports = loginController;
