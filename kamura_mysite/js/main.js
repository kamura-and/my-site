// main.js
import { initNav } from './nav.js';
import { initCarousel } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();        // ナビゲーション初期化
  initCarousel();   // カルーセル初期化
});
