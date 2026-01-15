/* =========================
   カウントダウン処理
   ========================= */

window.App = window.App || {};

App.timer = {
  formatDeadline(date) {
    return date.toLocaleString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  },
  updateTimer() {
    const now = new Date();
    const diff = Math.max(0, App.config.deadline - now);

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    App.elements.timer.textContent =
      `${days}d ` +
      `${String(hours).padStart(2, "0")}:` +
      `${String(minutes).padStart(2, "0")}:` +
      `${String(seconds).padStart(2, "0")}`;

    App.timer.updateTimerColor(seconds);
  },
  updateTimerColor(seconds) {
    // 秒数に応じて 0–360 の色相を回す
    const hue = (seconds / 60) * 360;

    const isDark = App.elements.body.classList.contains("dark");

    // 背景に応じて彩度・明度を固定
    const saturation = isDark ? 70 : 60;
    const lightness = isDark ? 65 : 40;

    App.elements.timer.style.color =
      `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  },
  start() {
    App.timer.updateTimer();
    setInterval(App.timer.updateTimer, 1000);
  },
};
