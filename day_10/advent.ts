import * as fs from "fs";

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split("\n").map(d => d.split(""));
});
