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
}
clickAddClassButtonFuction();
