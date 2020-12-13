//import Customizator from './customizator';

document.addEventListener('DOMContentLoaded', () => {
    
    manageTabs();
    startTimer();
    modalWindow();
    renderMenuCard();
    manageSlides();
    manageCalculator();

    // const panel = new Customizator();
    // panel.render();
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
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modal-close') == '') {
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

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-modal-close>&times;</div>
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

    const forms = document.querySelectorAll('form');
    const messages = {
        loading: 'img/spinner.svg',
        sucsess: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
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
            statusMessage.src = messages.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            
            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(messages.sucsess);
            })
            .catch(() => {
                showThanksModal(messages.failure);
            })
            .finally(() => {
                statusMessage.remove();
                form.reset();
            });

        });
    }
}

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

    const getResource = async url => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status ${res.status}`);
        }

        return await res.json();
    };

    axios.get('http://127.0.0.1:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price,
                    '.menu .container', 'menu__item').render();
                });
            });

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price,
    //                 '.menu .container', 'menu__item').render();
    //         });
    //     });
    
}

function manageSlides() {

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width,
          widthFrame = +width.replace(/\D/g, '');

    let slideIndex = 1,
        offset = 0;

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
          dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) dot.style.opacity = 1;
        indicators.append(dot);
        dots.push(dot);
    }

    slidesWrapper.style.width = width;

    total.textContent = String(slides.length).padStart(2, '0');
    current.textContent = String(slideIndex).padStart(2, '0');

    next.addEventListener('click', () => {
        if (offset == widthFrame * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthFrame;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex++;
        changeSlideIndex();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthFrame * (slides.length - 1);
        } else {
            offset -= widthFrame;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        slideIndex--;
        changeSlideIndex();
    });

    function changeSlideIndex() {
        if (slideIndex > slides.length) slideIndex = 1;
        if (slideIndex < 1) slideIndex = slides.length;
        current.textContent = String(slideIndex).padStart(2, '0');
        changeDots();
    }

    function changeDots() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    dots.forEach(dot => {
        dot.addEventListener('click', e => {
            slideIndex = e.target.getAttribute('data-slide-to');
            offset = widthFrame * (slideIndex - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            changeSlideIndex(); 
        });
    });

    // showSlides(slideIndex);

    // total.textContent = String(slides.length).padStart(2, '0');

    // function showSlides(n) {
    //     if (n > slides.length) slideIndex = 1;
    //     if (n < 1) slideIndex = slides.length;
        
    //     slides.forEach(item => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block';

    //     current.textContent = String(slideIndex).padStart(2, '0');
    // }

    // function addSlideIndex(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => addSlideIndex(-1));
    // next.addEventListener('click', () => addSlideIndex(1));

}

function manageCalculator() {

    const result = document.querySelector('.calculating__result span');
    let sex = 'female', height, weight, age, ratio = 1.375;

    function calcTotal() {
        let resulttextContent;
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            resulttextContent = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio;
        } else {
            resulttextContent = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio;
        }
        result.textContent = Math.round(resulttextContent);
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        elements.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
    
                calcTotal();
            });
        })
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
                }
            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}