function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function hideModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {

    // MODAL

    const modal = document.querySelector(modalSelector),
          modalTrigger = document.querySelectorAll(triggerSelector);
          //modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(item => {
        item.addEventListener('click', () => showModal(modalSelector, modalTimerId));
    });

    //modalCloseBtn.addEventListener('click', hideModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') hideModal(modalSelector);
    });

    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) hideModal(modalSelector);
    });

    function showModalInTheEnd() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
                showModal(modalSelector, modalTimerId);
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

}

export default modal;
export {showModal, hideModal};