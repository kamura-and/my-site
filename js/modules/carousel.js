import { $ } from './utils.js';

export function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');

  // 複製して無限ループ
  track.innerHTML += track.innerHTML;
  const originalWidth = track.scrollWidth / 2;

  let isDown = false;
  let startX;
  let scrollLeft;
  let velocity = 0;

  const friction = 0.9;   // 慣性減衰
  const autoSpeed = 0.5;  // 自動スクロール速度
  const dragFactor = 0.3; // ドラッグの強さ
  const maxVelocity = 30; // 最大速度

  // -------------------
  // PC: マウスイベント
  // -------------------
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
    carousel.style.cursor = "grabbing";
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - startX;
    carousel.scrollLeft = scrollLeft - x;
    velocity = (x * dragFactor);
  });

  // -------------------
  // SP: タッチイベント
  // -------------------
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
    velocity = 0;
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault(); // スマホでの縦スクロールを無効化して横だけにする
    const x = e.touches[0].pageX - startX;
    carousel.scrollLeft = scrollLeft - x;
    velocity = (x * dragFactor);
  }, { passive: false });

  // -------------------
  // ホイール操作 (PCのみ有効)
  // -------------------
  carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    velocity += e.deltaY * 0.3; // 縦スクロールを横スクロールに変換
  }, { passive: false });

  // -------------------
  // アニメーションループ
  // -------------------
  function animate() {
    if (!isDown) {
      carousel.scrollLeft += autoSpeed + velocity;
      velocity *= friction;

      // 無限ループ処理
      if (carousel.scrollLeft >= originalWidth) {
        carousel.scrollLeft -= originalWidth;
      }
      if (carousel.scrollLeft < 0) {
        carousel.scrollLeft += originalWidth;
      }
    }

    requestAnimationFrame(animate);
  }
  animate();
}
