const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
	{
		customerId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
			trim: true,
		},
		items: { type: Object, required: true, trim: true },
		phone: { type: String, required: true, trim: true },
		address: { type: String, required: true, trim: true },
		paymentMethod: { type: String, default: "COD" },
		status: { type: String, default: "order_placed" },
	},
	{ timestamps: true }
);

const Order = model("Orders", orderSchema);

module.exports = Order;
