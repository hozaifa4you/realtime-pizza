const logoutController = () => {
	return {
		logout(req, res, next) {
			req.logout();

			res.redirect("/login");
		},
	};
};

module.exports = logoutController;
