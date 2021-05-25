class Menu {

	constructor() {
		this.isMenuOpened = false;
		this.openedMenuBg;
	}

	handleOpenMenu(event) {
		let menu = document.querySelector('.menu-element');
		let btn = event.target.closest('button');
		let secondLine = btn.querySelector('.menu__menu-btn__second-line');
		let firstLine = btn.querySelector('.menu__menu-btn__first-line');
		let thirdLine = btn.querySelector('.menu__menu-btn__third-line');

		if (!shoppingPage.isBasketOpened) {
			menu.classList.toggle('menu-element__active');
			secondLine.classList.toggle('menu__menu-btn__second-line-menu-opened');
			firstLine.classList.toggle('menu__menu-btn__first-line-menu-opened');
			thirdLine.classList.toggle('menu__menu-btn__third-line-menu-opened');
			btn.classList.toggle('menu__menu-btn__menu-opened');

		}

		this.isMenuOpened = !this.isMenuOpened;
		setTimeout(() => {
			document.body.style.overflowY = this.isMenuOpened ? 'hidden' : 'scroll';
			this.openedMenuBg.classList.toggle('menu-body-bg');
		}, 20);

		this.renderBg(menu, btn, firstLine, secondLine, thirdLine);
		console.log(this.isMenuOpened);
	}


	changeActiveClass(from, to) {
		document.querySelector(from).classList.remove('btn-active');
		document.querySelector(to).classList.add('btn-active');
	}

	sortGoods(event) {
			switch ((event.target.textContent).match(/\S/g).join('')) {
				case 'Повозрастанию':
					this.changeActiveClass('.menu__btn-to-lower', '.menu__btn-to-higher');
					CATALOG.sort((a, b) => a.price > b.price ? 1 : -1);
					break;
				case 'Поубыванию':
					this.changeActiveClass('.menu__btn-to-higher', '.menu__btn-to-lower');
					CATALOG.sort((a, b) => b.price > a.price ? 1 : -1);
					break;
			}
		productPage.render();
	}


	getChecked() {
		let labels = document.querySelectorAll('.menu__label');
		let checked = [];
		
		labels.forEach(label => {
			let input = label.querySelector('input[type=checkbox]');
			if (input.checked) checked.push(input.name);
		})
			
		return checked;
	}

	renderCheckedProducts() {
		this.getChecked();
		productPage.render();
	}

	renderBg(menu, btn, firstBtnLine, secondBtnLine, thirdBtnLine) {
		if (this.isMenuOpened && !document.querySelector('#menuBodyBg')) {
			this.openedMenuBg = document.createElement('div');

			this.openedMenuBg.onclick = (event) => {
				event.currentTarget.classList.remove('menu-body-bg');
				menu.classList.remove('menu-element__active');
				btn.classList.remove('menu__menu-btn__menu-opened');
				secondBtnLine.classList.remove('menu__menu-btn__second-line-menu-opened');
				firstBtnLine.classList.remove('menu__menu-btn__first-line-menu-opened');
				thirdBtnLine.classList.remove('menu__menu-btn__third-line-menu-opened');

				this.isMenuOpened = !this.isMenuOpened;
				document.body.style.overflowY = 'scroll';
			}

			this.openedMenuBg.id = 'menuBodyBg';
			document.querySelector('body').prepend(this.openedMenuBg);
		}
	}

	render() {
		const html = `
			<div class='menu-element'>
				<button class='menu__menu-btn' onclick='menuPage.handleOpenMenu(event);'>
					<div class='menu__menu-btn__first-line'></div>
					<div class='menu__menu-btn__second-line'></div>
					<div class='menu__menu-btn__third-line'></div>
				</button>
				<form action='' class='menu__form' name='menu'>
					<p>Выберите товар</p>
					<div class='menu__labels'>
						<label class = 'menu__label' onchange='menuPage.renderCheckedProducts()';>
							<input type ="checkbox" class='menu__label__checkbox' checked name='Гири'>
							<span class='menu__label__style-span'></span>
							<span class='menu__label__text-span'>Гири</span>
						</label>
						<br>
						<label class='menu__label' onchange='menuPage.renderCheckedProducts()';>
							<input type="checkbox" class='menu__label__checkbox' checked name='Эспандеры'>
							<span class='menu__label__style-span'></span>
							<span class='menu__label__text-span'>Эспандеры</span>
						</label>
						<br>
						<label class='menu__label' onchange='menuPage.renderCheckedProducts()';>
							<input type="checkbox" class='menu__label__checkbox' checked name='Гантели'>
							<span class='menu__label__style-span'></span>
							<span class ='menu__label__text-span'>Гантели</span>
						</label>
					</div>
					<p>Сортировать по цене</p>
					<button class='menu__btn-to-higher' onclick='menuPage.sortGoods(event); return false'>
						По возрастанию
					</button>
					<button class='menu__btn-to-lower' onclick='menuPage.sortGoods(event); return false'>
						По убыванию
					</button>
				</form>
			</div>
		`;

		ROOT_MENU.innerHTML = html;
	}
	
}

const menuPage = new Menu();