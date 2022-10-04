const addForm = document.querySelector('.modal-content__send');
const addFormName = addForm.querySelector('#modal__name');
const addFormEmail = addForm.querySelector('#modal__email');

addForm.addEventListener('submit', (evt)=> {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(onShowPopupSuccess, onShowPopupError, formData);
})

const sendData = (onSucces, onFail, body) => {
  fetch('https://24.javascript.pages.academy/keksobooking',
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
    .querySelector('.success');
  const successMessage = successFormTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  onClickAndKeydown(successMessage);
};

const onShowPopupError = () => {
  const errorFormTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');
  const errorMessage = errorFormTemplate.cloneNode(true);
  document.body.appendChild(errorMessage);
  onClickAndKeydown(errorMessage);
};

validEmailFunction();
