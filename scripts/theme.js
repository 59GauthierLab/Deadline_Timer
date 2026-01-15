/* =========================
   テーマ切り替え
   ========================= */

window.App = window.App || {};

App.theme = {
  init() {
    const { body, toggleBtn } = App.elements;

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      body.classList.toggle("light");
    });
  },
};
