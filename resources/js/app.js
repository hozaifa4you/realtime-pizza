import Axios from "axios";
import Noty from "noty";

import { initAdmin } from "./admin";

const addToCart = document.querySelectorAll(".add-to-cart");

const updateCart = pizza => {
	const cartCounter = document.querySelector("#cart-counter");

	Axios.post("/update-cart", pizza)
		.then(result => {
			cartCounter.innerText = result.data.totalQty;

			new Noty({
				text: "Item Added to Cart",
				type: "success",
				timeout: 1000,
			}).show();
		})
		.catch(err => {
			new Noty({
				text: "Can't save data now!",
				type: "error",
				timeout: 1000,
			}).show();
			console.log(`Error occurred during saving session: ` + err.message);
		});
};

addToCart.forEach(btn => {
	btn.addEventListener("click", e => {
		let pizza = JSON.parse(btn.dataset.pizza);
		updateCart(pizza);
	});
});

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
	setTimeout(function() {
		alertMsg.remove();
	}, 1500);
}

// admin initAdmin
initAdmin();
