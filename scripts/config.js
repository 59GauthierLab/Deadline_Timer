/* =========================
   設定項目
   ========================= */

window.App = window.App || {};

App.config = {
  // constants.js の文字列を Date に変換して利用
  deadline: new Date(DEADLINE_TIME_TEXT),
  // 表示する任意テキスト
  labelText: "❣️卒研発表まで❣️",
  // フォントサイズの調整パラメータ
  fontScale: {
    min: 0.8,
    max: 5,
    // ボタン操作時の変化量を大きめに調整
    step: 0.3,
    // 初期サイズを 1.6 に設定
    default: 1.6,
  },
};
