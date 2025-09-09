export function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const track = document.querySelector('.carousel-track');

  // コンテンツを複製して無限ループ風に
  track.innerHTML += track.innerHTML;
  const items = document.querySelectorAll('.carousel-item');
  const itemWidth = items[0].offsetWidth + 10; // 幅＋マージン
  const totalWidth = itemWidth * items.length;

  let isDown = false;
  let startX;
  let currentX = 0;   // translateX 現在位置
  let velocity = 0;

  const friction = 0.9;
  const autoSpeed = 0.5;
  const dragFactor = 0.3;

  // PC: マウス操作
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - currentX;
    velocity = 0;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    currentX = e.pageX - startX;
    velocity = (e.movementX * dragFactor);
  });

  // SP: タッチ操作
  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - currentX;
    velocity = 0;
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.touches[0].pageX - startX;
    currentX = x;
    // velocity を大きくしすぎない
    velocity = (x - currentX) * dragFactor;
  }, { passive: false });

  // アニメーションループ
  function animate() {
    if (!isDown) {
      currentX -= autoSpeed + velocity; // ← translateXはマイナス方向
      velocity *= friction;
    }

    // 無限ループ処理
    if (currentX <= -totalWidth / 2) {
      currentX = 0;
    }
    if (currentX > 0) {
      currentX = -totalWidth / 2;
    }

    track.style.transform = `translateX(${currentX}px)`;
    requestAnimationFrame(animate);
  }
  animate();
}

// ページ読み込み時に初期化
document.addEventListener("DOMContentLoaded", () => {
  initCarousel();
});