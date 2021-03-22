const Menu = require("../../models/Menu");

const homeController = () => {
	return {
		async index(req, res) {
			try {
				let pizzas = await Menu.find();
				res.render("home", {
					pizzas,
					title: "Realtime Pizzas App - yousuf4you",
				});
			} catch (err) {
				console.log(err.message);
				res.status(502).json({
					msg: "There is no data like that." + err.message,
				});
			}
		},
	};
};

module.exports = homeController;
