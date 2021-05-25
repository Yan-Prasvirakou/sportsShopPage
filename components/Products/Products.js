class Products {
	constructor() {
		this.classNameActive = 'products-element__btn_active';
		this.labelAdd = 'Добавить в корзину';
		this.labelRemove = 'Удалить из корзины';
	}

	handleSetLocationStorage(el, id) {
		if (!headerPage.isMenuOpened) {
			const { pushedProduct, products} = localStorageUtil.putProducts(id);
			
			if (pushedProduct) {
				el.classList.add(this.classNameActive);
				el.innerHTML = this.labelRemove;
			} else {
				el.classList.remove(this.classNameActive);
				el.innerHTML = this.labelAdd;
			}

			headerPage.render(products.length);
		}
	}

	render() {
		const productsStore = localStorageUtil.getProducts();
		const checkedProducts = menuPage.getChecked();
		let htmlCatalog = '';
		let html = '';

		if (checkedProducts.length) {
			CATALOG.forEach(({ id, name, img, price, product}) => {
				let activeClass = '';
				let activeText = '';

				if (productsStore.indexOf(id) === -1) {
					activeText = this.labelAdd;
				} else {
					activeClass = ' ' + this.classNameActive;
					activeText = this.labelRemove;
				}

				if (checkedProducts.indexOf(product) !== -1) {
					htmlCatalog += `
					<li class='products-element'>
						<span class='products-element__name'>${name}</span>
						<img  class='products-element__img' src='${img}'>
						<span class='products-element__price'> ${price.toLocaleString()}</span>
						<button class='products-element__btn${activeClass}' onclick='productPage.handleSetLocationStorage(this, "${id}");'>
							${activeText}
						</button>
					</li>
				`;
				}
			});

			html = `
				<ul class='products-container'>
					${htmlCatalog}
				</ul>
			`;
			} else {
				html = `<div class='products__empty'>Товары не выбраны</div>`;
			}
		

		ROOT_PRODUCTS.innerHTML = html;
	}

}

const productPage = new Products();

