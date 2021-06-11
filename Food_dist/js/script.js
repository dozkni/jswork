'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs');
    const modal = require('./modules/modal');
    const timer = require('./modules/timer');
    const cards = require('./modules/cards');
    const form = require('./modules/form');
    const calc = require('./modules/calc');
    const slider = require('./modules/slider');

    tabs();
    modal();
    timer();
    cards();
    form();
    calc();
    slider();

});
