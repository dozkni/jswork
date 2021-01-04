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

export default manageSlides;