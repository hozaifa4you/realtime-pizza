const bcrypt = require("bcrypt");

const User = require("../../models/Users");

const registerController = () => {
	return {
		register(req, res) {
			res.render("auth/register");
		},
		async postRegister(req, res) {
			// logic
			const { name, email, password } = req.body;

			// empty validate
			if (!name || !email || !password) {
				req.flash("error", "All fields are required");
				req.flash("name", name);
				req.flash("email", email);

				return res.redirect("/register");
			}

			// user exist validate
			User.exists({ email }, (err, result) => {
				if (err) {
					return res.status(500).json({ msg: "error occurred find user" });
				}

				if (result) {
					req.flash("error", "Email already taken");
					req.flash("name", name);
					req.flash("email", email);

					return res.redirect("/register");
				}
			});

			// create user
			const hashPass = await bcrypt.hash(password, 10);

			let user = new User({
				name,
				email,
				password: hashPass,
			});

			user
				.save()
				.then(data => {
					console.log(data);
					res.redirect("/login");
				})
				.catch(err => {
					res.status(400).send(err);
					req.flash("error", "something went wrong saving user.");
					return req.redirect("/register");
				});
		},
	};
};

module.exports = registerController;
