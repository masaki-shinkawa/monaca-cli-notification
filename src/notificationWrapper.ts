const notifier = require('node-notifier');

module.exports = {
  failedNotification: () => {
    notifier.notify({
      title: "Failed",
      message: "コマンドが失敗しました..."
    });
  },
  successfulNotification: () => {
    notifier.notify({
      title: "Successful",
      message: "コマンドが成功しました！"
    });
  }
}