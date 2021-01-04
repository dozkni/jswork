import manageTabs from './modules/manageTabs';
import startTimer from './modules/startTimer';
import modalWindow from './modules/modalWindow';
import renderMenuCard from './modules/cards';
import manageSlides from './modules/manageSlides';
import manageCalculator from './modules/manageCalculator';

document.addEventListener('DOMContentLoaded', () => {
    
    manageTabs();
    startTimer();
    modalWindow('button[data-modal]', '.modal');
    renderMenuCard();
    manageSlides();
    manageCalculator();

    // const panel = new Customizator();
    // panel.render();
});
