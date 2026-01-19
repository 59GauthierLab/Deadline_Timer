/* =========================
   時刻同期ユーティリティ
   ========================= */

window.App = window.App || {};

App.clock = {
  anchorUnixMs: Date.now(),
  anchorPerfMs: performance.now(),
  // 一定間隔でアンカーを再同期して長期ドリフトを抑える
  resyncIntervalMs: 60 * 1000,
  lastResyncMs: Date.now(),
  syncAnchors() {
    App.clock.anchorUnixMs = Date.now();
    App.clock.anchorPerfMs = performance.now();
    App.clock.lastResyncMs = App.clock.anchorUnixMs;
  },
  nowMs() {
    // Date.now の変化を performance.now と合成し，イベントループ遅延の影響を緩和
    const elapsedMs = performance.now() - App.clock.anchorPerfMs;
    return App.clock.anchorUnixMs + elapsedMs;
  },
  calcNextBoundaryDelay(nowMs) {
    // 秒境界の補正数式: delay = 1000 - (nowMs % 1000)
    return 1000 - (nowMs % 1000);
  },
  maybeResync(nowMs) {
    if (nowMs - App.clock.lastResyncMs >= App.clock.resyncIntervalMs) {
      App.clock.syncAnchors();
    }
  },
};
