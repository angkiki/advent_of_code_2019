const fs = require("fs");

const fuelNeeded = fuel => Math.floor(fuel / 3) - 2;
const partOne = data => data.reduce((acc, curr) => acc + fuelNeeded(curr), 0);

const partTwo = data =>
  data.reduce((acc, curr) => {
    let total = 0;
    let holder = curr;

    while (holder > 0) {
      let fuel = fuelNeeded(holder);
      if (fuel < 1) break;

      total += fuel;
      holder = fuel;
    }

    return acc + total;
  }, 0);

fs.readFile("./data.txt", "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  const dataArray = data.split("\n");

  console.log("- - - - Part One - - - -");
  console.log("Answer", partOne(dataArray));
  console.log("- - - - - - - - - - - - -");

  console.log("# #");
  console.log("# #");
  console.log("# #");
  console.log("# #");

  console.log("- - - - Part Two - - - -");
  console.log("Answer", partTwo(dataArray));
  console.log("- - - - - - - - - - - - -");
});
