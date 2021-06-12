import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import form from './modules/form';
import calc from './modules/calc';
import slider from './modules/slider';
import {showModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 50000);

    tabs();
    modal('[data-modal]', '.modal', modalTimerId);
    timer();
    cards();
    form(modalTimerId);
    calc();
    slider();

});
