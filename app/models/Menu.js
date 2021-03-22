const { Schema, model } = require("mongoose");

const menuSchema = new Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	price: { type: Number, required: true },
	size: { type: String, required: true },
});

const Menu = model("Menus", menuSchema);

module.exports = Menu;
