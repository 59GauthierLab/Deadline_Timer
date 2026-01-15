/* =========================
   初期化
   ========================= */

window.App = window.App || {};

App.init = () => {
  App.elements.label.textContent = App.config.labelText;
  App.elements.deadline.textContent =
    `締め切り日時: ${App.timer.formatDeadline(App.config.deadline)}`;

  App.theme.init();
  App.fontScale.init();
  App.timer.start();
};

App.init();
