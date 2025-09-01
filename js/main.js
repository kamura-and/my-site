import { initCarousel } from './modules/carousel.js';
import { initForm } from './modules/form.js';

document.addEventListener("DOMContentLoaded", () => {
  initCarousel();  // カルーセル処理
  initForm();      // フォーム処理
});
