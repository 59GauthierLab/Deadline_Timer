/* =========================
   設定項目
   ========================= */

// 締切日時（秒まで指定可）
const DEADLINE = new Date("2026-01-27T16:29:59");

// 表示する任意テキスト
const LABEL_TEXT = "❣卒論提出まで❣";

/* =========================
   要素取得
   ========================= */

const timerEl = document.getElementById("timer");
const labelEl = document.getElementById("label");
const toggleBtn = document.getElementById("themeToggle");
const body = document.body;

labelEl.textContent = LABEL_TEXT;

/* =========================
   テーマ切り替え
   ========================= */

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");
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
