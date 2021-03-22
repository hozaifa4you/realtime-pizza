const registerController = () => {
	return {
		register(req, res) {
			res.render("auth/register");
		},
	};
};

module.exports = registerController;
