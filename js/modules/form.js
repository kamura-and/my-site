// form.js
export function initForm() {
  const form = document.querySelector('form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("送信完了（Ajaxやバリデーションを追加可能）");
  });
}
