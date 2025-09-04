// main.js
import { initCarousel } from './carousel.js';
import { initForm } from './form.js';
import { $ } from './utils.js';

// -------------------
// ハンバーガーメニュー + 背景オーバーレイ + スクロール禁止
// -------------------
function initHamburger() {
  const hamburger = $('.hamburger');
  const nav = $('.nav');

  if (!hamburger || !nav) return;

  // 背景オーバーレイ作成
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    const isActive = hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.style.display = isActive ? 'block' : 'none';
    document.body.style.overflow = isActive ? 'hidden' : 'auto';
  }

  hamburger.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);
}

// -------------------
// ページ読み込み時に初期化
// -------------------
document.addEventListener('DOMContentLoaded', () => {
  initCarousel();
  initForm();
  initHamburger();
});
