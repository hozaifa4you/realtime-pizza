const homeController = require("../app/http/controllers/homeControllers");
const registerController = require("../app/http/controllers/registerController");
const loginController = require("../app/http/controllers/loginController");
const cartController = require("../app/http/controllers/customers/cartController");
const logoutController = require("../app/http/controllers/logout");
const orderController = require("../app/http/controllers/orderController");
const adminOrderController = require("../app/http/controllers/admin/adminOrderController");

// custom middleware
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");

const initRouters = app => {
	// server routes
	app.get("/", homeController().index);

	app.get("/register", guest, registerController().register);
	app.post("/register", registerController().postRegister);

	app.get("/login", guest, loginController().login);
	app.post("/login", loginController().postLogin);

	app.post("/logout", logoutController().logout);

	//customers Routers
	app.post("/update-cart", cartController().update);
	app.get("/cart", cartController().cart);
	app.post("/orders", auth, orderController().order);
	app.get("/customer/orders", auth, orderController().index);

	// admin router
	app.get("/admin/orders", adminOrderController().index);
};

module.exports = initRouters;
