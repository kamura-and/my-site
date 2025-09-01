import { $ } from './utils.js';

export function initCarousel() {
  const carousel = $(".wrap");
  if (!carousel) return;

  const items = Array.from(carousel.children);

  // 複製してループ用に追加
  items.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  // 慣性スクロール用
  let wheelVelocity = 0;
  const friction = 0.95;
  const autoSpeed = 0.5; // 自動スライド速度

  // ドラッグ開始
  function startDrag(e) {
    isDown = true;
    carousel.classList.add("dragging");
    startX = e.pageX !== undefined ? e.pageX - carousel.offsetLeft : e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  }

  function dragMove(e) {
    if (!isDown) return;
    const x = e.pageX !== undefined ? e.pageX - carousel.offsetLeft : e.touches[0].pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX) * 2;
  }

  function endDrag() {
    isDown = false;
    carousel.classList.remove("dragging");
  }

  // マウスイベント
  carousel.addEventListener("mousedown", startDrag);
  carousel.addEventListener("mousemove", dragMove);
  carousel.addEventListener("mouseup", endDrag);
  carousel.addEventListener("mouseleave", endDrag);

  // タッチイベント
  carousel.addEventListener("touchstart", startDrag);
  carousel.addEventListener("touchmove", dragMove);
  carousel.addEventListener("touchend", endDrag);

  // マウスホイールで横スクロール（慣性）
  carousel.addEventListener("wheel", (e) => {
    e.preventDefault();
    wheelVelocity += e.deltaY * 0.5;
  });

  const originalWidth = carousel.scrollWidth / 2;

  function animate() {
    if (!isDown) {
      // 自動スライド + ホイール慣性を合算
      const move = autoSpeed + wheelVelocity;
      carousel.scrollLeft += move;

      // 減衰処理
      wheelVelocity *= friction;
    }

    // 無限ループ
    if (carousel.scrollLeft >= originalWidth) {
      carousel.scrollLeft -= originalWidth;
    } else if (carousel.scrollLeft < 0) {
      carousel.scrollLeft += originalWidth;
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  console.log("カルーセル初期化完了（自動スライド + ホイール慣性）");
}
