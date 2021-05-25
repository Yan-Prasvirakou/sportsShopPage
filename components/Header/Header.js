class Header {

	handleOpenShoppingPage() {
		if (!shoppingPage.isBasketOpened) {
			setTimeout(() => {
				shoppingPage.render();
			}, 50);
		}
	}

	render(count) {
		const html = `
			<div class='header-container'>
				<button class='header__menu-btn' onclick='headerPage.handleOpenMenu(event);'>
					<div class='header__menu-btn__first-line'></div>
					<div class='header__menu-btn__second-line'></div>
					<div class='header__menu-btn__third-line'></div>
				</button>
				<div class ='header-counter' onclick="headerPage.handleOpenShoppingPage();">
					<img class='header__img' src='img/basket.png'>
					<span>${count}</span>
				</div>
			</div>
		`;
		

		ROOT_HEADER.innerHTML = html;
	}

}

const headerPage = new Header();

