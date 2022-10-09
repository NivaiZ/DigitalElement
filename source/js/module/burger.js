const clickBurgerMenuFunction = () => {
  const burgerButton = document.querySelector(".header-block__burger");
  const contentMenu = document.querySelector('.header-block__content');

  burgerButton.addEventListener('click', () => {
    burgerButton.classList.toggle('header-block__burger--open');
    contentMenu.classList.toggle('header-block__content--open');
  })

  window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.header-block__content') && !target.closest('.header-block__burger')) {
      contentMenu.classList.remove('header-block__content--open');
      burgerButton.classList.remove('header-block__burger--open');
    }
  })

  window.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 27) {
      if (contentMenu.classList.contains('header-block__content--open')) {
        evt.preventDefault();
        contentMenu.classList.remove('header-block__content--open');
        burgerButton.classList.remove('header-block__burger--open');
      }
    }
  });

}

clickBurgerMenuFunction();
