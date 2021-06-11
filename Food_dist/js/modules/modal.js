function modal() {

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

}

module.exports = modal;