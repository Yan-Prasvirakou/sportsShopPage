class Shopping {
	constructor() {
		document.addEventListener('keydown', this.removeKeyEvents);
		document.addEventListener('keydown', this.handleClearEsc);
		document.addEventListener('click', this.handleClearClickOut);

		this.isBasketOpened = false;
		this.openedBasketBg;
	}

	removeKeyEvents = (e) => {

		if (this.isBasketOpened) {
			document.body.classList.add('overfrowYHiden');
			if (e.code == 'ArrowUp' || e.code == 'ArrowDown'
			|| e.code == 'PageUp' || e.code == 'PageDown') {
				document.body.style.overflowY = 'hidden';
				e.preventDefault();
			}
		}
	}

	handleClearClickOut = (e) => {
		if (!e.target.closest('.shopping-container') && this.isBasketOpened) {
			this.handleClear();
			document.body.style.overflowY = 'scroll';
		}
	}

	handleClear() {
		ROOT_SHOPPING.innerHTML = '';
		this.isBasketOpened = false;
		this.openedBasketBg.remove();
		document.body.style.overflowY = 'scroll';
	}

	handleClearEsc = (e) => {
		if (e.code == 'Escape' && ROOT_SHOPPING.innerHTML) {
			this.handleClear();
			document.body.style.overflowY = 'scroll';
		}
	}

	handleDelete(event) {
		let tr = event.target.closest('tr');
		let productName = tr.querySelector('.shopping-container__name').textContent;
		
		CATALOG.forEach(({id,	name}) => {
			if (name == productName) {
				localStorageUtil.putProducts(id);
			}
		})

		this.render();
		headerPage.render(localStorageUtil.getProducts().length);
		productPage.render();
			setTimeout(() => {
				document.body.style.overflowY = 'hidden';
			}, 10);
	}

	renderBg() {
		if (!this.isBasketOpened && !document.querySelector('.shopping-body-bg')) {
			this.openedBasketBg = document.createElement('div');
			this.openedBasketBg.className = 'shopping-body-bg';
			document.querySelector('body').prepend(this.openedBasketBg);
		}
	}
	
	render() {
		const productsStore = localStorageUtil.getProducts();
		let htmlCatalog = '';
		let sumCatalog = 0;

		CATALOG.forEach(({ id, name, price }) => {
			if (productsStore.indexOf(id) !== -1) {
				sumCatalog += price;
				htmlCatalog += `
					<tr>
						<td class='shopping-container__name'>${name}</td>
						<td class='shopping-container__price'>${price.toLocaleString()}</td>
						<td class ='shopping-container__delete'>
							<span onclick ="shoppingPage.handleDelete(event);">Убрать</span>
						</td>
					</tr>
				`;
			}
		});

		const shoppingWithGoods = `
			<div class="shopping-container">
				<div class = "shopping__close" onclick = "shoppingPage.handleClear();"></div>
				<table class='shopping__table'>
					${htmlCatalog}
					<tr>
						<td class ='shopping-container__name'>Сумма:</td> 
						<td class ='shopping-container__price'>${sumCatalog.toLocaleString()}</td>  
					</tr>
				</table>
			</div>
		`;

		const emptyShopping = `
			<div class="shopping-container">
				<div class="shopping__close" onclick = "shoppingPage.handleClear();"></div> 
				<div class="shopping__empty">Карзина пуста</div>
			</div>
		`;
		
		if (productsStore.length) {
			ROOT_SHOPPING.innerHTML = shoppingWithGoods;
		} else {
			ROOT_SHOPPING.innerHTML = emptyShopping;
		}

		this.renderBg();
		this.isBasketOpened = true;
		document.body.style.overflowY = 'hidden';
	}
}

const shoppingPage = new Shopping();