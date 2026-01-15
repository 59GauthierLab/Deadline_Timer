/* =========================
   設定項目
   ========================= */

// 締切日時（秒まで指定可）
// constants.js の文字列を Date に変換して利用
const DEADLINE = new Date(DEADLINE_TIME_TEXT);

// 表示する任意テキスト
const LABEL_TEXT = "❣卒論提出まで❣";

/* =========================
   要素取得
   ========================= */

const timerEl = document.getElementById("timer");
const labelEl = document.getElementById("label");
const deadlineEl = document.getElementById("deadline");
const toggleBtn = document.getElementById("themeToggle");
const fontDecreaseBtn = document.getElementById("fontDecrease");
const fontResetBtn = document.getElementById("fontReset");
const fontIncreaseBtn = document.getElementById("fontIncrease");
const body = document.body;
const root = document.documentElement;

labelEl.textContent = LABEL_TEXT;

/* =========================
   締切日時表示
   ========================= */

function formatDeadline(date) {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

deadlineEl.textContent = `締め切り日時: ${formatDeadline(DEADLINE)}`;

/* =========================
   テーマ切り替え
   ========================= */

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
});

/* =========================
   フォントサイズ調整
   ========================= */

const FONT_SCALE = {
  min: 0.8,
  max: 5,
  // ボタン操作時の変化量を大きめに調整
  step: 0.3,
  // 初期サイズを 1.6 に設定
  default: 1.6,
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function setFontScale(scale) {
  const nextScale = clamp(scale, FONT_SCALE.min, FONT_SCALE.max);
  root.style.setProperty("--font-scale", nextScale.toFixed(2));
}

function getFontScale() {
  const current = parseFloat(
    getComputedStyle(root).getPropertyValue("--font-scale"),
  );
  return Number.isNaN(current) ? FONT_SCALE.default : current;
}

fontDecreaseBtn.addEventListener("click", () => {
  setFontScale(getFontScale() - FONT_SCALE.step);
});

fontIncreaseBtn.addEventListener("click", () => {
  setFontScale(getFontScale() + FONT_SCALE.step);
});

fontResetBtn.addEventListener("click", () => {
  setFontScale(FONT_SCALE.default);
});

/* =========================
   カウントダウン処理
   ========================= */

function updateTimer() {
  const now = new Date();
  let diff = Math.max(0, DEADLINE - now);

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  timerEl.textContent =
    `${days}d ` +
    `${String(hours).padStart(2, "0")}:` +
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;

  updateTimerColor(seconds);
}

/* =========================
   秒数に応じた色相変化
   ========================= */

function updateTimerColor(seconds) {
  // 秒数に応じて 0–360 の色相を回す
  const hue = (seconds / 60) * 360;

  const isDark = body.classList.contains("dark");

  // 背景に応じて彩度・明度を固定
  const saturation = isDark ? 70 : 60;
  const lightness = isDark ? 65 : 40;

  timerEl.style.color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/* =========================
   初期化
   ========================= */

updateTimer();
setInterval(updateTimer, 1000);
