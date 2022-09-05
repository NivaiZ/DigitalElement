const clickBurgerMenuFunction = () => {
  const burgerButton = document.querySelector(".header-block__burger");
  burgerButton.addEventListener('click', () => {
   burgerButton.classList.toggle('header-block__burger--open')
  })
}
clickBurgerMenuFunction();
