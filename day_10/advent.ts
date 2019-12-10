import * as fs from "fs";
import { scanRow } from "./_traverse";

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split("\n").map(d => d.split(""));

  console.log("computing part one....");
  let total = 0;
  let result = [];

  for (let row = 0; row < dataArray.length; row++) {
    result.push([]);

    for (let col = 0; col < dataArray[row].length; col++) {
      result[row].push(0);

      if (dataArray[row][col] === "#") {
        let totalVisibleAsteroids = 0;
        const origin = { col, row };
        const offsetMemo = {};

        dataArray.forEach((mRow, index) => {
          totalVisibleAsteroids += scanRow(mRow, origin, index, offsetMemo);
        });

        result[row][col] = totalVisibleAsteroids;
        if (totalVisibleAsteroids > total) {
          total = totalVisibleAsteroids;
        }
      }
    }
  }

  console.log("derived result....");
  console.log(result);
  console.log("total asteroids observable... ", total);
});
