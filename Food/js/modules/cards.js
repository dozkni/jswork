import {getResource} from '../services/services';

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.classes = classes.length === 0 ? ['menu__item'] : classes;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 68;
        this.changeToRUR();
    }

    changeToRUR() {
        this.price *= this.transfer;
    }

    render() {
        const element = document.createElement('div');
        this.classes.forEach(item => element.classList.add(item));
        element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>`;
        this.parent.append(element);
    }
}

function renderMenuCard() {

    // axios.get('http://127.0.0.1:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price,
    //                 '.menu .container', 'menu__item').render();
    //             });
    //         });

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price,
                    '.menu .container', 'menu__item').render();
            });
        });
    
}

export default renderMenuCard;