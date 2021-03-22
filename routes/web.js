const homeController = require("../app/http/controllers/homeControllers");
const registerController = require("../app/http/controllers/registerController");
const loginController = require("../app/http/controllers/loginController");
const cartController = require("../app/http/controllers/customers/cartController");
const logoutController = require("../app/http/controllers/logout");

// custom middleware
const guest = require("../app/http/middlewares/guest");

const initRouters = app => {
	// server routes
	app.get("/", homeController().index);

	app.get("/cart", cartController().cart);

	app.get("/register", guest, registerController().register);
	app.post("/register", registerController().postRegister);

	app.get("/login", guest, loginController().login);
	app.post("/login", loginController().postLogin);

	app.post("/update-cart", cartController().update);

	app.post("/logout", logoutController().logout);
};

module.exports = initRouters;
