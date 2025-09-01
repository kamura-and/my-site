import { $ } from './utils.js';

export function initForm() {
  const form = $("form");
  if (!form) return; // フォームがないページは無視

  form.addEventListener("submit", (e) => {
    const email = $("input[name='email']").value;
    if (!email.includes("@")) {
      e.preventDefault();
      alert("メールアドレスが不正です");
    }
  });
}
