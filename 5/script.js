(function () {
    // const container = document.querySelector('.container_js');
    // console.log(container);
})();

(function () {
    // const contextmenu = document.querySelector('.contextmenu_js');

    // console.log(contextmenu.classList.contains('contextmenu_hidden_1'));
})();

(function () {
    // const contextmenu = document.querySelector('.contextmenu_js');
    // console.log(contextmenu.getAttribute('data-id'));
    // console.log(contextmenu.hasAttribute('data-id'));
    // console.log(contextmenu.removeAttribute('data-id'));
    // console.log(contextmenu.hasAttribute('data-id'));
    // console.log(contextmenu.setAttribute('data-id', '228'));
    // console.log(contextmenu.getAttribute('data-id'));

    // contextmenu.style.cssText = 'position: absolute; display: block;';
})();

(function () {
    // let ownContextMenu = event => {
    //     if(event.keyCode === 27) {
    //         window.removeEventListener('keydown', ownContextMenu);
    //         alert('Ты нажал esc');
    //     } else {
    //         alert(`Необходимо нажать esc, а не "${event.key}"`);
    //     }
    // }

    // window.addEventListener("keydown", ownContextMenu);
})();

(function () {
    const button = document.querySelector('.button-to-top_js');
    if (!button) {
        return;
    }
    function toTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    function handleScroll() {
        if (window.pageYOffset > 1500) {
            button.classList.remove('button-to-top_hidden');
        } else {
            button.classList.add('button-to-top_hidden');
        }
    }

    window.addEventListener('scroll', handleScroll);
    button.addEventListener('click', toTop);
})();

(function () {
    const contextmenu = document.querySelector('.contextmenu_js');
    if(!contextmenu) {
        return;
    }
    const button = contextmenu.querySelector('.contextmenu__button_js');
    if(!button) {
        return;
    }

    
    window.addEventListener('contextmenu', openContexmenu);
    button.addEventListener('click', firstAction);

    function firstAction() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        closeMenu();
    }

    function closeMenu() {
        contextmenu.classList.add('contextmenu_hidden');

        window.removeEventListener('click', closeMenuHandler);
        window.removeEventListener('scroll', closeMenu);
        window.removeEventListener('keydown', ownContextMenu);
    }

    function closeMenuHandler(event) {
        if(contextmenu.contains(event.target)) {
            console.log('Да');
        } else {
            closeMenu();
        }
    }

    function ownContextMenu (event) {
        if(event.keyCode === 27) {
            closeMenu();
        }
    }

    function openContexmenu(event) {
        event.preventDefault();
        const {clientX, clientY} = event;
        contextmenu.classList.remove('contextmenu_hidden');
        contextmenu.style.top = `${clientY}px`;
        contextmenu.style.left = `${clientX}px`;
        window.addEventListener('click', closeMenuHandler);
        window.addEventListener('scroll', closeMenu);
        window.addEventListener('keydown', ownContextMenu);
    }
})();