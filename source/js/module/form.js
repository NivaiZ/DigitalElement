const onEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const addForm = document.querySelector('.modal-content__send');
const addFormEmail = addForm.querySelector('#modal__email');

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
  onInput();
  formNode.querySelector('.modal__submit--button').disabled = !isValid
}

async function sendData(data) {
  return await fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: data,
  })
}

async function handleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  const { status, error } = await sendData(data)

  if (status === 200) onSuccess(event.target)
  else onError(error)
}


const isEmailValid = (value) => {
  return EMAIL_REGEXP.test(value);
}

const onInput = () => {
  if (isEmailValid(addFormEmail.value)) {
    addFormEmail.style.borderColor = 'green';
  } else {
    addFormEmail.style.borderColor = 'red';
  }
}

const applicantForm = document.getElementById('modal__form')
applicantForm.addEventListener('submit', handleFormSubmit)
applicantForm.addEventListener('input', checkValidity)

applicantForm.querySelector('.modal__submit--button').disabled = true
