document.addEventListener('DOMContentLoaded', () => {
    
    manageTabs();
    startTimer();
    modalWindow();

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

    const deadline = '2020-11-15';

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
    constructor(src, alt, title, descr, price) {
        this.src = src;
        this.alt = alt;
        this.title = title;
        this.descr = descr;
        this.price = price;
    }
}