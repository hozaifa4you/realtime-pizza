const Order = require("../../../models/Orders");

const adminOrderController = () => {
	return {
		index(req, res) {
			Order.find({ status: { $ne: "completed" } }, null, {
				sort: { createdAt: -1 },
			})
				.populate("customerId", -"password")
				.exec((err, orders) => {
					if (req.xht) {
						return res.json(orders);
					}
					return res.render("admin/orders");
				});
		},
	};
};

module.exports = adminOrderController;
