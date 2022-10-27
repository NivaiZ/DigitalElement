const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const addForm = document.querySelector('.modal-content__send');
const addFormEmail = addForm.querySelector('#modal__email');
const applicantForm = document.getElementById('modal__form');


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

function onSuccess(formNode) {
  onShowPopupSuccess();
  console.log(formNode);
}

function onError() {
  onShowPopupError();
}

function serializeForm(formNode) {
  const data = new FormData(formNode)
  return data
}

function checkValidity(event) {
  const formNode = event.target.form
  const isValid = formNode.checkValidity()
  formNode.querySelector('.modal__submit--button').disabled = !isValid
}

async function sendData(onSuccess, onFail, data) {
  return await fetch('https://httpbin.org/post',
    {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      body: data,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
}

async function handleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)
  sendData(onShowPopupSuccess, onShowPopupError, data);
}


const isEmailValid = (value) => {
  return EMAIL_REGEXP.test(value);
}

applicantForm.addEventListener('submit', handleFormSubmit);
applicantForm.addEventListener('input', checkValidity);
applicantForm.querySelector('.modal__submit--button').disabled = true
