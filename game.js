const readline = require("readline");

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Hello ?", function(resultat) {
  console.log(resultat);
});
