/* =========================
   フォントサイズ調整
   ========================= */

window.App = window.App || {};

App.fontScale = {
  clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  },
  set(scale) {
    const nextScale = App.fontScale.clamp(
      scale,
      App.config.fontScale.min,
      App.config.fontScale.max,
    );
    App.elements.root.style.setProperty("--font-scale", nextScale.toFixed(2));
  },
  get() {
    const current = parseFloat(
      getComputedStyle(App.elements.root).getPropertyValue("--font-scale"),
    );
    return Number.isNaN(current) ? App.config.fontScale.default : current;
  },
  init() {
    const { fontDecreaseBtn, fontResetBtn, fontIncreaseBtn } = App.elements;
    const { step, default: defaultScale } = App.config.fontScale;

    fontDecreaseBtn.addEventListener("click", () => {
      App.fontScale.set(App.fontScale.get() - step);
    });

    fontIncreaseBtn.addEventListener("click", () => {
      App.fontScale.set(App.fontScale.get() + step);
    });

    fontResetBtn.addEventListener("click", () => {
      App.fontScale.set(defaultScale);
    });
  },
};
