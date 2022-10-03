const clickAddClassButtonFuction = () => {
  const clickButtonModal = document.querySelector('.feedback-block__link');
  const addClassButton = document.querySelector('.modal-content__form');
  const addClassBody = document.querySelector('body');
  const addClassModalOverlay = document.querySelector('.modal-content');

  clickButtonModal.addEventListener('click', (event) => {
    event.preventDefault();
    addClassButton.classList.toggle('modal-content__form--open');
    addClassBody.classList.toggle('modal-content__body--noscroll');
    addClassModalOverlay.classList.toggle('modal-content__open');

  })

  window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      if (addClassModalOverlay.classList.contains('modal-content__open')) {
        evt.preventDefault();
        addClassModalOverlay.classList.remove('modal-content__open');
        addClassBody.classList.remove('modal-content__body--noscroll');
        addClassButton.classList.remove('modal-content__form--open');
      }
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === addClassModalOverlay) {
      addClassModalOverlay.classList.remove('modal-content__open');
      addClassButton.classList.remove('modal-content__form--open');
      addClassBody.classList.remove('modal-content__body--noscroll');

    }
  });

}

const validateInput = (item) => {
  const reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

  if (item.value.trim() == '') {
    return 'Fill in this field';
  }
  if (item.id === 'your_email' && !reg.test(item.value)) {

    return 'Enter a correct email address';
  }
  return false;
}

const checkForm = (form) => {
  let formObj = {};
  formObj.name = form.querySelector('#modal__name');
  formObj.email = form.querySelector('#modal__email');
  formObj.message = form.querySelector('#modal__message');
  for (let key in formObj) {
    let span = document.createElement('span');
    span.textContent = validateInput(formObj[key]);
    let label = form.querySelector('[for = ' + formObj[key].id + ']');
    if (span.textContent !== 'false' && !label.querySelector('span')) {
      label.appendChild(span);
    }
  }

  if (!form.querySelectorAll('label span').length) {
    return true;
  }
}
clickAddClassButtonFuction();
validateInput();
checkForm();
