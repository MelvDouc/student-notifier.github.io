import fs from "fs";
import { config } from "dotenv";

config();

const claspPath = "./.clasp.json";
const contents = `{
  "scriptId": "${process.env.SCRIPT_ID}",
  "rootDir": "src"
}`;

fs.writeFile(claspPath, contents, { encoding: "utf-8" }, (err, data) => {
  if (err)
    throw err;
  console.log(`.clasp.json was successfully created/overwritten.`);
});