function render() {
	const productsStore = localStorageUtil.getProducts();

	headerPage.render(productsStore.length);
	menuPage.render();
	productPage.render();
	document.addEventListener('scroll', toTopBtn.render);
}

spinnerPage.render();

let CATALOG = [];

async function getCatalog() {
	// "img": "../img/catalog/Гиря Уральская 24 кг.jpg" поменял на "img": "img/catalog/Гиря Уральская 24 кг.jpg"
	const res = await fetch('https://api.jsonbin.io/b/60ad6499b2b1d74df21dbcac', {
		headers: {
			'Content-Type': 'application/json',
			'secret-key': '$2b$10$iTDOViL0216vx78jKmSYneDaV3XYbFMLXnN1cXOkro4AZHluNAwKS'
		}
	})
    
	if (res.ok) {
		let json = await res.json();
		console.log(json);
		CATALOG = json;
		spinnerPage.handleClear();
		render();
	} else {
		errorPage.render();
		spinnerPage.handleClear();
	}
	
}

getCatalog();
