import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { setupMaster, fork } from "cluster";
const __dirname = dirname(fileURLToPath(import.meta.url));
async function start(file) {
  let args = [join(__dirname, file), ...process.argv.slice(2)];
  setupMaster({ exec: args[0], args: args.slice(1) });
  let p = fork();
  p.on("exit", (code) => {
    if (code !== 0) {
      console.log(`Reiniciando proceso...`);
      start(file);
    }
  });
}
start("main.js");
