const getFormSendFunction = () => {
  const getForm = document.querySelector('.modal-content__send');
  getForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(getForm);
    fetch('http://httpbin.org/post', {
        method: "POST",
        body: formData
      }).then(res => res.json())
      .then(formData => console.log(formData))
      .catch(error => console.log(error))
  })
}

const formValidationFunction = () => {
  const error = 0;
  const formReq = document.querySelectorAll('._req');
  for (let index = 0; index < formReq.length; index++) {
    const input = formReq[index]
  }
}
const checkEmailFinction = (input) => {
  const reg = /[-.\w]+@([\w-]+\.)+[\w-]+/g;
}
getFormSendFunction();
formValidationFunction();
