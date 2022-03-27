const homeDir = require("os").homedir();
const home = process.env.HOME || homeDir;
const path = require("path");
const fs = require("fs");
const db = require("./db");

const dbPath = path.join(home, ".todo");

module.exports.add = async (title) => {
  // 读之前的任务
  const list = await db.read();

  // 往里面添加一个任务
  list.push({
    name: title,
    done: false,
  });
  // 存储任务到文件
  await db.write(list);
};

module.exports.clear = () => {
  db.write([]);
};
