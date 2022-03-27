const homeDir = require("os").homedir();
const home = process.env.HOME || homeDir;
const fs = require("fs");
const path = require("path");
const dbPath = path.join(home, ".todo");

module.exports = {
  read: (path = dbPath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(path, { flag: "a+" }, (err, data) => {
        if (err) return reject(err);
        let list;
        try {
          list = JSON.parse(data.toString());
        } catch (err2) {
          list = [];
        }
        resolve(list);
      });
    });
  },
  write: (content, path = dbPath) => {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(content);
      fs.writeFile(path, string + "\n", (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  },
};
