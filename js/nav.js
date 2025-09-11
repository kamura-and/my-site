// nav.js
export function initNav() {
  const nav = document.getElementById('navArea');
  const btn = document.querySelector('.toggle_btn');
  const mask = document.getElementById('mask');
  const openClass = 'open';

  if (!nav || !btn || !mask) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle(openClass);
  });

  mask.addEventListener('click', () => {
    nav.classList.remove(openClass);
  });
}
