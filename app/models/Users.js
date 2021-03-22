const { Schema, model } = require("mongoose");

const userSchema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, trim: true },
		password: { type: String, required: true, trim: false },
		role: { type: String, default: "customer" },
	},
	{ timestamps: true }
);

const User = model("Users", userSchema);

module.exports = User;
