#!/usr/bin/env node

const { program } = require("commander");
const api = require("./index.js");

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
    api.clear();
  });

if (process.argv.length === 2) {
  void api.showAll();
  return;
}

program.parse(process.argv);
