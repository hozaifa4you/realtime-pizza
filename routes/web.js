const homeController = require("../app/http/controllers/homeControllers");
const registerController = require("../app/http/controllers/registerController");
const loginController = require("../app/http/controllers/loginController");
const cartController = require("../app/http/controllers/customers/cartController");

const initRouters = app => {
	// server routes
	app.get("/", homeController().index);

	app.get("/cart", cartController().cart);

	app.get("/register", registerController().register);

	app.get("/login", loginController().login);

	app.post("/update-cart", cartController().update);
};

module.exports = initRouters;
