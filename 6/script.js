(function() {
  const {signUp, signIn} = document.forms;

  console.log(signUp, signIn);

  function getDataFromForm(form) {
    let data = {};
    const inputs = form.querySelectorAll('input');
    for(const input of inputs) {
      switch(input.type) {
        case 'radio':
          if(input.checked) {
            data[input.name] = input.value;
          }
          break;
        case 'checkbox':
          if(!data[input.name]) {
            data[input.name] = [];
          }
          if(input.checked) {
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
    for(const textarea of textareas) {
      data[textarea.name] = textarea.value;
    }
    return data;
  }

  function setErrorMessage(input, message) {
    let messageError = input.parentNode.querySelector('.invalid-feedback');
    messageError.innerText = message;
    input.insertAdjacentElement('afterend', messageError);
    input.classList.add('is-invalid');
    input.addEventListener('input', function handler() {
      input.classList.remove('is-invalid');
      input.removeEventListener('input', handler);
    });
    return messageError;
  }

  function setErrorsToForm(form, errors) {
    const inputs = form.querySelectorAll('input');
    for(const input of inputs) {
      if(errors[input.name]) {
        if(input.type === 'checkbox' || input.type === 'radio') {
          setErrorMessage(input, '');
        } else {
          setErrorMessage(input, errors[input.name]);
        }
      }
    }
    const textareas = form.querySelectorAll('textarea');
    for(const textarea of textareas) {
      if(errors[textarea.name]) {
        setErrorMessage(textarea, errors[textarea.name]);
      }
    }
  }

  signIn.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = getDataFromForm(signIn);
    console.log(data);
  })

  
  signUp.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = getDataFromForm(signUp);
    console.log(data);
    let errors = {};
    if(!checkEmail(data.email)) {
      errors.email = 'Вы ввели неверную почту!';
    }
    if(data.password < 8) {
      errors.password = 'Пароль должен содержать минимум 8 символов!';
    }
    if(data.accept !== 'yes') {
      errors.accept = 'Вы должны согласиться с нашими правилами!';
    }
    if(!data.name) {
      errors.name = 'Вы забыли ввести имя!';
    }
    setErrorsToForm(signUp, errors);
    console.log(errors);
  })

  function checkEmail(email) {
    return email.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
  }
})();