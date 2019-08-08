const os = require("os");
const pty = require("node-pty");
const readline = require("readline");
const {
  failedNotification,
  successfulNotification
} = require("./notificationWrapper.ts");

//keypressイベントを使用可能にする
readline.emitKeypressEvents(process.stdin);

// ベースのコマンドと引数の取得
const command = "monaca";
const argv = process.argv.slice(2);

// ptyのインスタンスの生成
var ptyProcess = pty.spawn(command, argv, {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.PWD,
  env: process.env
});

//readlineのインスタンスの生成
const rl = readline.createInterface({
  input: process.stdin, //標準入力を指定
  output: process.stdout, //標準出力を指定
  prompt: "", //デフォルトのプロンプトを指定(指定なしで"> ")
  terminal: true //process.stdin.setRawModeでエコーバックの切り替えを可能にする
});

ptyProcess.on("data", function(data: any) {
  process.stdout.write(data);
});

ptyProcess.on("exit", (exitCode: number) => {
  if (exitCode === 0) {
    successfulNotification();
  } else {
    failedNotification();
  }
  rl.close();
});

(async function() {
  while (true) {
    const str = await new Promise(res => rl.once("line", res));
    ptyProcess.write(str + "\n");
  }
})();
