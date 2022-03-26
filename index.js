const homeDir = require("os").homedir();
const home = process.env.HOME || homeDir;
const path = require("path");
const fs = require("fs");

const dbPath = path.join(home, ".todo");

module.exports.add = (title) => {
  // 读之前的任务
  fs.readFile(dbPath, { flag: "a+" }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let list = [];
      try {
        list = JSON.parse(data.toString());
      } catch (err2) {
        list = [];
      }
      const task = {
        name: title,
        done: false,
      };
      list.push(task);

      const string = JSON.stringify(list);

      fs.writeFile(dbPath, string + "\n", (err3) => {
        console.log(err3);
      });
    }
    console.log("final:", data.toString());
  });
};
