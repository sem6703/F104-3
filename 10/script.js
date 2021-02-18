const buttonOpeningModalRegister = document.querySelector(".j-register-button");
const modalRegister = document.querySelector(".j-modal-register");
const buttonCloseModalRegister = document.querySelector(".j-close-modal-register");
const registerForm = document.forms.registerForm;

const buttonOpeningModalLogin = document.querySelector(".j-login-button");
const modalLogin = document.querySelector(".j-modal-login");
const buttonCloseModalLogin = document.querySelector(".j-close-modal-login");
const loginForm = document.forms.loginForm;

const linkToProfile = document.querySelector(".j-to-profile");

// Логика регистрации пользователя
function register(e) {
  e.preventDefault();
  const body = getDataFromForm(e.target);
  e.target.classList.add('is-loading');
  console.log(body);
  sendRequest({
    url: '/users', 
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify(body),
  })
  .then(res => {
    return res.json();
  })
  .then(res => {
    if(res.success) {
      alert('Вы успешно создали пользователя с id ' + res.data.id);
      console.log(res);
    } else {
      throw res;
    }
  })
  .catch(err => {
    setErrorsToForm(e.target, err.errors);
    console.error(err);
  })
  .finally(() => {
    e.target.classList.remove('is-loading');
  });
}

buttonOpeningModalRegister.addEventListener('click', () => {
  interactionModal(modalRegister);
});
buttonCloseModalRegister.addEventListener('click', () => {
  interactionModal(modalRegister);
  setDataToForm(registerForm, {
    age: '',
    email: '',
    password: '',
    location: '',
    surname: '',
    name: '',
  })
});
buttonCloseModalLogin.addEventListener('click', () => {
  interactionModal(modalLogin);
});

registerForm.addEventListener('submit', (e) => {
  register(e);
});
loginForm.addEventListener('submit', (e) => {
  logIn(e);
});