const clickBurgerMenuFunction = () => {
  const burgerButton = document.querySelector(".header-block__burger");
  const contentMenu = document.querySelector('.header-block__content');
  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('header-block__burger--open');
    contentMenu.classList.toggle('header-block__content--open');
  });
  window.addEventListener('click', e => {
    const target = e.target;

    if (!target.closest('.header-block__content') && !target.closest('.header-block__burger')) {
      contentMenu.classList.remove('header-block__content--open');
      burgerButton.classList.remove('header-block__burger--open');
    }
  });
  window.addEventListener("keydown", evt => {
    if (evt.keyCode === 27) {
      if (contentMenu.classList.contains('header-block__content--open')) {
        evt.preventDefault();
        contentMenu.classList.remove('header-block__content--open');
        burgerButton.classList.remove('header-block__burger--open');
      }
    }
  });
};

clickBurgerMenuFunction();
const onEscKey = evt => evt.key === 'Escape' || evt.key === 'Esc';

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const addForm = document.querySelector('.modal-content__send');
const addFormEmail = addForm.querySelector('#modal__email');

const onClickAndKeydown = messageType => {
  messageType.addEventListener('click', () => {
    messageType.remove();
  });
  document.addEventListener('keydown', evt => {
    if (onEscKey(evt)) {
      messageType.remove();
    }
  });
};

const onShowPopupSuccess = () => {
  const successFormTemplate = document.querySelector('#success').content.querySelector('.modal-content__message--success');
  const successMessage = successFormTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  onClickAndKeydown(successMessage);
};

const onShowPopupError = () => {
  const errorFormTemplate = document.querySelector('#error').content.querySelector('.modal-content__message--error');
  const errorMessage = errorFormTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  onClickAndKeydown(errorMessage);
};

function onSuccess(formNode) {
  onShowPopupSuccess();
}

function onError() {
  onShowPopupError();
}

function serializeForm(formNode) {
  const data = new FormData(formNode);
  return data;
}

function checkValidity(event) {
  const formNode = event.target.form;
  const isValid = formNode.checkValidity();
  onInput();
  formNode.querySelector('.modal__submit--button').disabled = !isValid;
}

async function sendData(data) {
  return await fetch('http://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: data
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const data = serializeForm(event.target);
  const {
    status,
    error
  } = await sendData(data);
  if (status === 200) onSuccess(event.target);else onError(error);
}

const isEmailValid = value => {
  return EMAIL_REGEXP.test(value);
};

const onInput = () => {
  if (isEmailValid(addFormEmail.value)) {
    addFormEmail.style.borderColor = 'green';
  } else {
    addFormEmail.style.borderColor = 'red';
  }
};

const applicantForm = document.getElementById('modal__form');
applicantForm.addEventListener('submit', handleFormSubmit);
applicantForm.addEventListener('input', checkValidity);
applicantForm.querySelector('.modal__submit--button').disabled = true;
const clickAddClassButtonFuction = () => {
  const clickButtonModal = document.querySelector('.feedback-block__link');
  const addClassButton = document.querySelector('.modal-content__form');
  const addClassBody = document.querySelector('body');
  const addClassModalOverlay = document.querySelector('.modal-content');
  const closeButtonModal = document.querySelector('.modal-content__button');
  const firstInputModal = addClassBody.querySelector('#modal__name');
  const secondInputModal = addClassBody.querySelector('#moda__email');
  let isStorageSupport = true;
  let storage = "";

  try {
    storage = localStorage.getItem('name');
    storage = localStorage.getItem('email');
  } catch (error) {
    isStorageSupport = false;
  }

  clickButtonModal.addEventListener('click', event => {
    event.preventDefault();
    addClassButton.classList.toggle('modal-content__form--open');
    addClassBody.classList.toggle('modal-content__body--noscroll');
    addClassModalOverlay.classList.toggle('modal-content__open');
    firstInputModal.focus();

    if (storage) {
      firstInputModal.value = storage;
      secondInputModal.value = storage;
      console.log(storage);
    } else {
      firstInputModal.focus();
    }
  });
  closeButtonModal.addEventListener('click', () => {
    addClassModalOverlay.classList.remove('modal-content__open');
    addClassBody.classList.remove('modal-content__body--noscroll');
    addClassButton.classList.remove('modal-content__form--open');
  });
  window.addEventListener("keydown", evt => {
    if (evt.keyCode === 27) {
      if (addClassModalOverlay.classList.contains('modal-content__open')) {
        evt.preventDefault();
        addClassModalOverlay.classList.remove('modal-content__open');
        addClassBody.classList.remove('modal-content__body--noscroll');
        addClassButton.classList.remove('modal-content__form--open');
      }
    }
  });
  window.addEventListener('click', e => {
    if (e.target === addClassModalOverlay) {
      addClassModalOverlay.classList.remove('modal-content__open');
      addClassButton.classList.remove('modal-content__form--open');
      addClassBody.classList.remove('modal-content__body--noscroll');
    }
  });
};

clickAddClassButtonFuction();