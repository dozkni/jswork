function cards() {
    
    // CARDS

    class Card {
        constructor(dataCard) {
            this.img = dataCard.img;
            this.altimg = dataCard.altimg;
            this.title = dataCard.title;
            this.descr = dataCard.descr;
            this.price = dataCard.price;
        }

        render(container, ...classes) {
            const card = document.createElement('div');
            classes.forEach(className => card.classList.add(className));
            card.innerHTML = `
                    <img src="${this.img}" alt="${this.altimg}">
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                `;
            container.append(card);
        }
    }

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    const container = document.querySelector('.menu__field > .container');

    //const axios = require('axios');
    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(obj => {
                new Card(obj).render(container, ['menu__item']);
            });
        });

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(obj => {
    //             new Card(obj).render(container, ['menu__item']);
    //         });
    //     });
    
    // function readTextFile(file, callback) {
    //     var rawFile = new XMLHttpRequest();
    //     rawFile.overrideMimeType("application/json");
    //     rawFile.open("GET", file, true);
    //     rawFile.onreadystatechange = function() {
    //         if (rawFile.readyState === 4 && rawFile.status == "200") {
    //             callback(rawFile.responseText);
    //         }
    //     };
    //     rawFile.send(null);
    // }
    
    // readTextFile("db.json", function(text){
    //     const container = document.querySelector('.menu__field > .container');
    //     const data = JSON.parse(text);
    //     data.menu.forEach(item => {
    //         new Card(item).render(container, ['menu__item']);
    //     });
    // });

}

module.exports = cards;