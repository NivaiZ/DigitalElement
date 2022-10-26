const clickAddClassButtonFuction = () => {
  const clickButtonModal = document.querySelector('.feedback-block__link');
  const addClassButton = document.querySelector('.modal-content__form');
  const addClassBody = document.querySelector('body');
  const addClassModalOverlay = document.querySelector('.modal-content');
  const closeButtonModal = document.querySelector('.modal-content__button');
  const firstInputModal = addClassBody.querySelector('#modal__name');
  const secondInputModal = addClassBody.querySelector('#moda__email');

  clickButtonModal.addEventListener('click', (event) => {
    event.preventDefault();
    addClassButton.classList.toggle('modal-content__form--open');
    addClassBody.classList.toggle('modal-content__body--noscroll');
    addClassModalOverlay.classList.toggle('modal-content__open');

    firstInputModal.focus();
  })

  closeButtonModal.addEventListener('click', () => {
    addClassModalOverlay.classList.remove('modal-content__open');
    addClassBody.classList.remove('modal-content__body--noscroll');
    addClassButton.classList.remove('modal-content__form--open');
  })

  document.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      if (addClassModalOverlay.classList.contains('modal-content__open')) {
        evt.preventDefault();
        addClassModalOverlay.classList.remove('modal-content__open');
        addClassBody.classList.remove('modal-content__body--noscroll');
        addClassButton.classList.remove('modal-content__form--open');
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target === addClassModalOverlay) {
      addClassModalOverlay.classList.remove('modal-content__open');
      addClassButton.classList.remove('modal-content__form--open');
      addClassBody.classList.remove('modal-content__body--noscroll');

    }
  });

}

clickAddClassButtonFuction();
