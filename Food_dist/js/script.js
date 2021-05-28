'use strict';

window.addEventListener('DOMContentLoaded', () => {

    // TABS

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabsContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabsContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabsContent();
                    showTabContent(i);
                }
            });
        }     
    });

    // TIMER

    const deadLine = Date.parse(new Date()) + 4 * 24 * 60 * 60 * 1000;

    function getTimeRemaining(endtime) {
        const t = endtime - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
              
    }

    setClock('.timer', deadLine);

    // MODAL

    const modal = document.querySelector('.modal'),
          modalTrigger = document.querySelectorAll('[data-modal]');
          //modalCloseBtn = document.querySelector('[data-close]');

    function showModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(item => {
        item.addEventListener('click', showModal);
    });

    //modalCloseBtn.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') hideModal();
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) hideModal();
    });

    setTimeout(showModal, 50000);

    function showModalInTheEnd() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
                showModal();
                window.removeEventListener('scroll', showModalInTheEnd);
            }
    }

    window.addEventListener('scroll', showModalInTheEnd);

    const x1 = document.querySelector('#x1'),
          x2 = document.querySelector('#x2');

    window.addEventListener('scroll', () => {
        x1.innerHTML = Math.floor(window.pageYOffset + document.documentElement.clientHeight);
        x2.innerHTML = Math.floor(document.documentElement.scrollHeight);
    });

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

    // FORM

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Ошибка'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: 'block';
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const fd = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(fd.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => showThanksModal(message.failure))
            .finally(() => form.reset());

        });
    }
    
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div> 
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            hideModal();
        }, 4000);
    }

    // SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current');
    let slideIndex = 1;

    showSlides(slideIndex);

    if(slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach(item => item.style.display = 'none');
        slides[slideIndex - 1].style.display = 'block';

        if(slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });

});
