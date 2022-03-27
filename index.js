const db = require("./db");
const inquirer = require("inquirer");

module.exports.add = async (title) => {
  // 读之前的任务
  const list = await db.read();

  // 往里面添加一个任务
  list.push({
    name: title,
    done: false,
  });

  // 存储任务到文件
  await db.write(list).then(
    () => {
      console.log("添加成功");
    },
    () => {
      console.log("添加失败");
    }
  );
};

module.exports.clear = async () => {
  await db.write([]).then(
    () => {
      console.log("清除成功");
    },
    () => {
      console.log("清除失败");
    }
  );
};

// 打印所有任务
const printTasks = async (list) => {
  const choices = (list) => {
    const quitChoice = {
      name: "退出",
      value: "-1",
    };
    const createTaskChoice = {
      name: "+ 创建任务",
      value: "-2",
    };

    const tasks = list.map((item, index) => {
      return {
        name: (item.done ? "[x]" : "[_]") + ` ${index + 1} - ` + item.name,
        value: index + "",
      };
    });

    console.log("@@@@@", tasks);
    return [quitChoice, ...tasks, createTaskChoice];
  };

  return inquirer.prompt({
    type: "list",
    name: "index",
    message: "请选择你要操作的任务",
    choices: choices(list),
  });
};

// 对任务的操作
const actionChoice = async () => {
  // 选择任务
  return inquirer.prompt({
    type: "list",
    name: "action",
    message: "请选择操作",
    choices: [
      {
        name: "退出",
        value: "quit",
      },
      {
        name: "已完成",
        value: "done",
      },
      {
        name: "未完成",
        value: "unDone",
      },
      {
        name: "改标题",
        value: "changeTitle",
      },
      {
        name: "删除",
        value: "delete",
      },
    ],
  });
};

// 处理用户操作
const handelAction = async (list, index) => {
  console.log("index:", index);
  if (index >= 0) {
    const res = await actionChoice(index);
    console.log("action:", res);
    handleTask(list, index, res.action);
  }
  if (index === -2) {
    createTask();
  }
};

// 根据用户操作，操作任务
const handleTask = async (list, index, actionType) => {
  let newList = list.slice(0);
  switch (actionType) {
    case "done":
      newList[index].done = true;
      break;
    case "unDone":
      newList[index].done = false;
      break;
    case "changeTitle":
      const newTitle = await getInput("请输入新的标题");
      newList[index].name = newTitle;
      break;
    case "delete":
      newList.splice(index, 1);
    default:
      break;
  }
  db.write(newList);
};

// 获取新的输入内容
const getInput = async (message) => {
  const res = await inquirer.prompt({
    type: "input",
    name: "name",
    message,
  });
  const { name } = res;
  return name;
};

// 创建一个新的任务
const createTask = async () => {
  const title = await getInput("请输入新的任务名称");
  this.add(title);
};

module.exports.showAll = async () => {
  // 读之前的任务
  const list = await db.read();
  const res = await printTasks(list);
  const { index } = res;
  await handelAction(list, index - 0);
};
