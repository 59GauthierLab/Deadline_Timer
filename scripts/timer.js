/* =========================
   カウントダウン処理
   ========================= */

window.App = window.App || {};

App.timer = {
  lastTotalSeconds: null,
  timeoutId: null,
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
    const nowMs = App.clock.nowMs();
    const diff = Math.max(0, App.config.deadline.getTime() - nowMs);

    const totalSeconds = Math.floor(diff / 1000);

    // 同一秒内での再描画を避けて端末間の表示差分を抑える
    if (App.timer.lastTotalSeconds === totalSeconds) {
      return;
    }

    App.timer.lastTotalSeconds = totalSeconds;

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
  scheduleTick() {
    App.timer.updateTimer();

    const nowMs = App.clock.nowMs();
    App.clock.maybeResync(nowMs);

    // 次の秒境界に合わせて再実行してズレを最小化
    // 補正式: delay = 1000 - (nowMs % 1000)
    const delay = App.clock.calcNextBoundaryDelay(nowMs);

    App.timer.timeoutId = setTimeout(App.timer.scheduleTick, delay);
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
    // 初期化時は即時描画し，次の秒境界から同期更新
    App.clock.syncAnchors();
    App.timer.lastTotalSeconds = null;
    App.timer.updateTimer();
    App.timer.scheduleTick();
  },
};
