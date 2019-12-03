import * as fs from "fs";
import buildWireGrid from "./_grid";

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const [wireOne, wireTwo] = data.split("\n");
  const wireOneInstructions = wireOne.split(",");
  const wireTwoInstructions = wireTwo.split(",");

  const startingGrid = [[999]];
  const grid = buildWireGrid(wireOneInstructions, startingGrid);
});
