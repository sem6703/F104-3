function slider(selectorStr) {
    const selector = document.querySelector(selectorStr);
    const wrapper = selector.querySelector(".slider__wrapper");
    const innerWrapper = selector.querySelector(".slider__inner-wrapper");
    const pagination = selector.querySelector(".slider__pagination");
    const buttonBack = selector.querySelector(".slider__button_back");
    const buttonNext = selector.querySelector(".slider__button_next");
    const slides = selector.querySelectorAll(".slider_slide");

    let slideWidth = 0;

    let maxSlideIndex = innerWrapper.childElementCount - 1;
    let timerId = null;

    let activeSlide = 0;
    let dots = [];
    initDots();
    setButtonState(buttonBack);

    function initSlideWidth() {
        slideWidth = wrapper.offsetWidth;
        for (let slide of slides) {
            slide.style.width = `${slideWidth}px`;
        }
    }
    initSlideWidth();

    function setButtonState(button, state = false) {
        if (state) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', '');
        }
    }

    function setActiveSlide(index, withAnimation = true) {
        if (index < 0 || index > maxSlideIndex) {
            return;
        }
        clearTimeout(timerId);
        if(withAnimation) {
            innerWrapper.style.transition = 'transform 500ms';
            timerId = setTimeout(() => {
                innerWrapper.style.transition = '';
            }, 500);
        }
        setButtonState(buttonNext, true);
        setButtonState(buttonBack, true);
        index === 0 && setButtonState(buttonBack);
        index === maxSlideIndex && setButtonState(buttonNext);
        innerWrapper.style.transform = `translateX(${index * slideWidth * (-1)}px)`;
        dots[activeSlide].classList.remove('slider__dot_active');
        activeSlide = index;
        dots[activeSlide].classList.add('slider__dot_active');
    }

    buttonNext.addEventListener('click', function () {
        setActiveSlide(activeSlide + 1);
    });

    buttonBack.addEventListener('click', function () {
        setActiveSlide(activeSlide - 1);
    });

    window.addEventListener('resize', function() {
        initSlideWidth();
        setActiveSlide(activeSlide, false);
    });

    let isTouch = false;
    let startX = 0;
    let endX = 0;
    wrapper.addEventListener('touchstart', function (e) {
        if(isTouch) return;
        isTouch = true;
        startX = e.touches[0].pageX;
    });

    wrapper.addEventListener('touchmove', function (e) {
        if(!isTouch) return;
        endX = e.touches[0].pageX;
    });

    wrapper.addEventListener('touchend', function (e) {
        if(!isTouch) return;
        isTouch = false;
        if(Math.abs(startX - endX) < 50) {
            return;
        }
        if(startX - endX < 0){
            setActiveSlide(activeSlide - 1);
        }
        
        if(startX - endX > 0){
            setActiveSlide(activeSlide + 1);
        }
     });

    function initDots() {
        for (let i = 0; i < maxSlideIndex + 1; i++) {
            let dot = document.createElement('button');
            dot.classList.add('slider__dot');
            if (i === activeSlide) {
                dot.classList.add('slider__dot_active');
            }
            dots.push(dot);
            dot.addEventListener('click', function () {
                setActiveSlide(i);
            })
            pagination.insertAdjacentElement('beforeend', dot);
        }
    }

    return {
        setActiveSlide,
        next: () => setActiveSlide(activeSlide + 1),
        prev: () => setActiveSlide(activeSlide - 1),
    }
}

const mySlider = slider('.slider');
slider('.slider2');

const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    
    loop: true, 
    slidesPerView: 1,
    breakpoints: {
        640: {
            slidesPerView: 2
        }
    },
    pagination: {
      el: '.swiper-pagination',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });

  swiper.slideNext();