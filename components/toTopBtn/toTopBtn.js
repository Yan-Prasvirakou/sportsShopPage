class Btn {

	render = () => {
		let html = pageYOffset > 150
			? `<div class='to-top-btn__wrap'><a href='#top' class='to-top-btn__btn' title='В начало'></a></div>`
			: null;
		ROOT_BTN.innerHTML = html;
	}

}

const toTopBtn = new Btn();

