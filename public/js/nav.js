const navLinks = document.querySelector('.nav__links')
const hamburgerButton = document.querySelector('.nav .hamburger')

hamburgerButton.addEventListener('click', () => {
	hamburgerButton.classList.toggle('is-active')
	navLinks.classList.toggle('active')
})
