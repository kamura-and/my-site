import { initForm } from './form.js';
import { initCarousel, setMenuOpenFunction } from './carousel.js';
import { $ } from './utils.js';

function initHamburger() {
  const hamburger = $('.hamburger');
  const nav = $('.nav');
  if (!hamburger || !nav) return;

  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  let menuOpen = false;
  let scrollY = 0;

  function toggleMenu() {
    menuOpen = !menuOpen;
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.style.display = menuOpen ? 'block' : 'none';

    if (menuOpen) {
      scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    }
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  return () => menuOpen;
}

document.addEventListener('DOMContentLoaded', () => {
  initForm();

  const menuOpenFunc = initHamburger();
  setMenuOpenFunction(menuOpenFunc);

  initCarousel();
});
