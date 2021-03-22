const loginController = () => {
	return {
		login(req, res) {
			res.render("auth/login");
		},
	};
};

module.exports = loginController;
