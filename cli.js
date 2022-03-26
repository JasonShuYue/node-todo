const program = require("commander");
const api = require("./index");

program.option("-x, --xxx", "what the xx");

program
  .command("add <taskName...>")
  .description("add a task")
  .action((data) => {
    const input = data.join(" ");
    api.add(input);
  });

program
  .command("clear")
  .description("clear all tasks")
  .action(() => {
    console.log("clear all tasks");
  });

program.parse(process.argv);
