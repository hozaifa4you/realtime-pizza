const moment = require("moment");

const Order = require("../../models/Orders");

const orderController = () => {
	return {
		order(req, res) {
			const { phone, address } = req.body;
			console.log(req.body);

			if (!phone || !address) {
				req.flash("error", "all fields are required");
				res.redirect("/cart");
			}

			let order = new Order({
				customerId: req.user._id,
				items: req.session.cart.items,
				phone,
				address,
			});

			// save the order
			order
				.save()
				.then(() => {
					req.flash("success", "Order successfully placed");
					delete req.session.cart;
					res.redirect("/customer/orders");
				})
				.catch(() => {
					req.flash("error", "You can not order now");
					return res.redirect("/cart");
				});
		},
		// redirect to order
		async index(req, res) {
			let orders = await Order.find({ customerId: req.user._id }, null, {
				sort: { createdAt: -1 },
			});
			res.render("customers/orders", { orders, moment });
		},
	};
};

module.exports = orderController;
