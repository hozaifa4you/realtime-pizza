const registerController = () => {
	return {
		register(req, res) {
			res.render("auth/register");
		},
		postRegister(req, res) {
			// logic
			const { name, email, password } = req.body;
		},
	};
};

module.exports = registerController;
