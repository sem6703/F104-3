const SERVER_URL = 'https://academy.directlinedev.com';
const API_URL = SERVER_URL + '/api';


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

    let activeSlide = +localStorage.getItem('activeSlide') || 0;
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
        if (withAnimation) {
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
        localStorage.setItem('activeSlide', activeSlide);
    }

    buttonNext.addEventListener('click', function () {
        setActiveSlide(activeSlide + 1);
    });

    buttonBack.addEventListener('click', function () {
        setActiveSlide(activeSlide - 1);
    });

    window.addEventListener('resize', function () {
        initSlideWidth();
        setActiveSlide(activeSlide, false);
    });

    let isTouch = false;
    let startX = 0;
    let endX = 0;
    wrapper.addEventListener('touchstart', function (e) {
        if (isTouch) return;
        isTouch = true;
        startX = e.touches[0].pageX;
    });

    wrapper.addEventListener('touchmove', function (e) {
        if (!isTouch) return;
        endX = e.touches[0].pageX;
    });

    wrapper.addEventListener('touchend', function (e) {
        if (!isTouch) return;
        isTouch = false;
        if (Math.abs(startX - endX) < 50) {
            return;
        }
        if (startX - endX < 0) {
            setActiveSlide(activeSlide - 1);
        }

        if (startX - endX > 0) {
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

    setActiveSlide(activeSlide, false);

    return {
        setActiveSlide,
        next: () => setActiveSlide(activeSlide + 1),
        prev: () => setActiveSlide(activeSlide - 1),
    }
}


(function () {
    let months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", ""];
    // Слооооожная логика с сервером
    // Получаем ответ
    let dateJSON = '2020-02-11T15:36:27.200Z';
    let date = new Date(dateJSON);
    const month = date.getMonth();
    const year = date.getFullYear();
    const numDate = date.getDate();
    console.log(`Год: ${year}. Месяц: ${months[month]}. День: ${numDate}`);
})();

(function () {
    const form = document.querySelector('.form_js');
    
    if (!form) {
        return;
    }
    const tagsBox = form.querySelector('.tags-box_js');
    const result = document.querySelector('.result_js');
    const linkBox = document.querySelector('.pagination_js');
    const urlData = getDataFromURL();

    tagsBox.innerHTML = createSpiner();
    call('/tags', "GET", {}, function (xhr) {
        tagsBox.innerHTML = '';
        const data = JSON.parse(xhr.response);
        for (let tag of data.data) {
            tagsBox.insertAdjacentHTML("afterbegin", createTag(tag));
        }
        setDataToForm(form, urlData);
    });

    function getPosts(searchParams = getDataFromURL()) {
        result.innerHTML = createSpiner();
        linkBox.innerHTML = createSpiner();
        let url = new URL('https://qwe.com');
        url.searchParams.set('v', '1.0.0');
        const limit = 10;
        if(searchParams.tags.length) {
            url.searchParams.set('tags', JSON.stringify(searchParams.tags));
        }
        url.searchParams.set('sort', JSON.stringify(['commentsCount', 'DESC']));
        if(searchParams.name) {
            url.searchParams.set('filter', JSON.stringify({title: searchParams.name}));
        }
        url.searchParams.set('offset', (searchParams.page - 1) * limit);
        call('/posts?' + url.searchParams, 'GET', {}, function(xhr) {
            result.innerHTML = '';
            const data = JSON.parse(xhr.response);
            for (let post of data.data) {
                result.innerHTML += createCard(post);
            }
            const countPages = data.count / limit;
            linkBox.innerHTML = '';
            for (let i = 0; i < countPages; i++) {
                let link = document.createElement('a');
                link.innerText = "Страница "+ (countPages - i);
                linkBox.insertAdjacentElement('afterbegin', link);
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    let data = getDataFromForm(form);
                    data.page = countPages - i;
                    setDataToURL(data);
                    getPosts();
                })
            }
        });
    }

    getPosts();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const data = getDataFromForm(form);
        setDataToURL(data);
        getPosts();
    });
})();


// Создание элементов
function createTag(tag) {
    return `
    <div class="form-group form-check">
        <input name="tags" type="checkbox" class="form-check-input" id="tag-id-${tag.id}" value="${tag.id}">
        <label style="color: ${tag.color}" class="form-check-label" for="tag-id-${tag.id}">${tag.name}</label>
    </div>
    `
}

function createSpiner() {
    return `<div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>`
}

function createCard(card) {
    return `<div class="col-4">
        <div class="card">
        <img src="${SERVER_URL}${card.photo.desktopPhotoUrl}" class="card-img-top" alt="${card.title}">
        <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <p class="card-text">${card.text}</p>
        <p class="card-text">views: ${card.views}</p>
        <p class="card-text">commentsCount: ${card.commentsCount}</p>
        <p class="card-text">tags: ${card.tags.map(item => item.name).join('')}</p>
        </div>
    </div>
  </div>`
}

// Работа с сервером
function call(path, method = "GET", body = {}, onload = () => null, onerror = () => null) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, API_URL + path);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);

    xhr.onload = function () {
        onload(xhr);
    }
    xhr.onerror = function () {
        onerror(xhr);
    }
}

// Работа с формой
function setDataToURL(data) {
    let url = new URL('https://qwe.com');

    let keys = Object.keys(data);
    for (let key of keys) {
        if (typeof data[key] !== "object") {
            url.searchParams.append(key, data[key]);
        } else {
            for (let i = 0; i < data[key].length; i++) {
                url.searchParams.append(key, data[key][i]);
            }
        }
    }

    window.history.replaceState({}, '', `?${url.searchParams}`);
}

function getDataFromURL() {
    const url = new URL(location);
    let data = {};
    data.tags = url.searchParams.getAll('tags');
    data.option = url.searchParams.get('option') || '';
    data.name = url.searchParams.get('name') || '';
    data.page = +url.searchParams.get('page') || 1;
    return data;
}

function setDataToForm(form, data) {
    const inputs = form.querySelectorAll('input');
    for (const input of inputs) {
        switch (input.type) {
            case 'radio':
                input.removeAttribute('disabled');
                if (data[input.name] && data[input.name] === input.value) {
                    input.checked = true;
                }
                break;
            case 'checkbox':
                input.removeAttribute('disabled');
                if (data[input.name]) {
                    for (let item of data[input.name]) {
                        if (item === input.value) {
                            input.checked = true;
                            break;
                        }
                    }
                }
                break;
            default:
                input.removeAttribute('readonly');
                if (data[input.name]) {
                    input.value = data[input.name];
                }
        }
    }
    const textareas = form.querySelectorAll('textarea');
    for (const textarea of textareas) {
        if (data[textarea.name]) {
            textarea.value = data[textarea.name];
        }
    }
    return data;
}

function getDataFromForm(form) {
    let data = {};
    const inputs = form.querySelectorAll('input');
    for (const input of inputs) {
        switch (input.type) {
            case 'radio':
                if (input.checked) {
                    data[input.name] = input.value;
                }
                break;
            case 'checkbox':
                if (!data[input.name]) {
                    data[input.name] = [];
                }
                if (input.checked) {
                    data[input.name].push(input.value);
                }
                break;
            case 'file':
                data[input.name] = input.files;
                break;
            default:
                data[input.name] = input.value;
        }
    }
    const textareas = form.querySelectorAll('textarea');
    for (const textarea of textareas) {
        data[textarea.name] = textarea.value;
    }
    return data;
}