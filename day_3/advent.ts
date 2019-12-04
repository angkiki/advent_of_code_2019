import * as fs from "fs";
import { buildWireGrid } from "./_grid";

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const [wireOne, wireTwo] = data.split("\n");
  const wireOneInstructions = wireOne.split(",");
  const wireTwoInstructions = wireTwo.split(",");

  const startingGrid = [[999]];
  const centralPortCoordinates = {
    col: 0,
    row: 0,
  };

  console.log("- - - starting calculation for part one - - -");
  const wireOneResult = buildWireGrid(
    wireOneInstructions,
    startingGrid,
    centralPortCoordinates,
    100
  );

  const wireTwoResult = buildWireGrid(
    wireTwoInstructions,
    wireOneResult.grid,
    wireOneResult.coordinates,
    200
  );
  console.log("the shortest manhattan distance is -> ", wireTwoResult.smd);
});
