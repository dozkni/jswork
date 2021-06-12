function slider() {
    
    // SLIDER

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slider_wrapper = document.querySelector('.offer__slider-wrapper'),
          slider_nav = document.querySelector('.slider-nav');
    let slideIndex = 1;

    slider_wrapper.style.position = 'relative';

    const bars = [];
    
    for (let i = 0; i < slides.length; i++) {
        const el_bar = document.createElement('div');
        el_bar.classList.add('bar');
        el_bar.setAttribute('data-slide-num', i + 1);
        slider_nav.append(el_bar);
        bars.push(el_bar);
    }

    bars.forEach(item => {
        item.addEventListener('click', e => {
            showSlides(item.getAttribute('data-slide-num'));
        });
    });

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
        bars.forEach(item => {
            if (item.getAttribute('data-slide-num') == slideIndex) {
                item.style.opacity = '1';
            } else {
                item.style.opacity = '.5';
            }
        });
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

    slider_nav.addEventListener('click', e => {
        if (e.target.classList.contains('bar')) {
            slideIndex = e.target.getAttribute('data-slide-num');
            showSlides(slideIndex);
        }
    });

}

export default slider;