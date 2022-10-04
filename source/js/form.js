const addForm = document.querySelector('.modal-content__send');
const addFormName = addForm.querySelector('#modal__name');
const addFormEmail = addForm.querySelector('#modal__email');

const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const onClickAndKeydown = (messageType) => {
  messageType.addEventListener('click', () => {
    messageType.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (onEscKey(evt)) {
      messageType.remove();
    }
  });
};

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(onShowPopupSuccess, onShowPopupError, formData);
})

const sendData = (onSucces, onFail, body) => {
  fetch('http://httpbin.org/post',
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSucces();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

const onShowPopupSuccess = () => {
  const successFormTemplate = document.querySelector('#success')
    .content
    .querySelector('.modal-content__message--success');
  const successMessage = successFormTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  onClickAndKeydown(successMessage);
};

const onShowPopupError = () => {
  const errorFormTemplate = document.querySelector('#error')
    .content
    .querySelector('.modal-content__message--error');
  const errorMessage = errorFormTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  onClickAndKeydown(errorMessage);
};
