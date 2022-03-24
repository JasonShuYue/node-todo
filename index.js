const { program } = require("commander");

program.option("-x, --xxx", "what the xxx").option("-y, --yyy", "what the yyy");

program.parse(process.argv);

console.log(program.opts());
