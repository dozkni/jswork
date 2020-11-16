document.addEventListener('DOMContentLoaded', () => {
    
    manageTabs();
    startTimer();
    modalWindow();

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        20,
        '.menu .container'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        16,
        '.menu .container'
    ).render();

});

function manageTabs() {

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

function startTimer() {

    const deadline = '2020-11-20';

    function getTimeRemaining(enddate) {
        const t = Date.parse(enddate) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60)) % 24,
              minutes = Math.floor(t / (1000 * 60)) % 60,
              seconds = Math.floor(t / 1000) % 60;
        
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            num = '0' + num;
        }
        return num;
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
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;

            if (t <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);
    
}

function modalWindow() {
    
    const btnOpen = document.querySelectorAll('button[data-modal]'),
          btnClose = document.querySelectorAll('[data-modal-close]'),
          modal = document.querySelector('.modal');

    const showModal = () => {
        clearInterval(modalTimetId);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
    };
        
    const hideModal = () => {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    };
    
    btnOpen.forEach(item => {
        item.addEventListener('click', showModal);
    });
    
    btnClose.forEach(item => {
        item.addEventListener('click', hideModal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            hideModal();
        }
    });

    const modalTimetId = setTimeout(showModal, 5000);

    function showModalByScroll() {
        const metric = document.querySelector('.metric'),
              wY = metric.querySelector('#wY'),
              dC = metric.querySelector('#dC'),
              dS = metric.querySelector('#dS'),
              visiblePart = Math.floor(window.pageYOffset + document.documentElement.clientHeight);

        wY.innerHTML = Math.floor(window.pageYOffset);
        dC.innerHTML = Math.floor(document.documentElement.clientHeight);
        dS.innerHTML = visiblePart + ' ' + Math.floor(document.documentElement.scrollHeight);
        if (visiblePart + 1 >= document.documentElement.scrollHeight) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    function calcMetric() {
        const metric = document.querySelector('.metric'),
              wY = metric.querySelector('#wY'),
              dC = metric.querySelector('#dC'),
              dS = metric.querySelector('#dS'),
              visiblePart = Math.floor(window.pageYOffset + document.documentElement.clientHeight);

        wY.innerHTML = Math.floor(window.pageYOffset);
        dC.innerHTML = Math.floor(document.documentElement.clientHeight);
        dS.innerHTML = visiblePart + ' ' + Math.floor(document.documentElement.scrollHeight);
    }

    window.addEventListener('scroll', showModalByScroll);
    window.addEventListener('scroll', calcMetric);
}

class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parentSelector);
        this.transfer = 68;
        this.changeToRUR();
    }

    changeToRUR() {
        this.price *= this.transfer;
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('menu__item');
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