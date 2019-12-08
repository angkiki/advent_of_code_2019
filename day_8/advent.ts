import * as fs from "fs";

interface IResult {
  length: number;
  index: 0;
}

const WIDTH = 25;
const HEIGHT = 6;

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split("");

  const partOneCloneData = dataArray.map((n: string) => +n);
  const partOneLayers = [];

  const partOneResult = { length: 0, index: 0 };

  while (partOneCloneData.length > 0) {
    const temp = partOneCloneData.splice(0, WIDTH * HEIGHT);
    partOneLayers.push(temp);
  }

  partOneLayers.forEach((layer: number[], index: number) => {
    // console.log("layer -> ", layer.length);
    const leastZeros = layer.filter((num: number) => num !== 0);
    if (leastZeros.length > partOneResult.length) {
      partOneResult.length = leastZeros.length;
      partOneResult.index = index;
    }
  });

  let numberOfOnes = 0;
  let numberOfTwos = 0;
  console.log("part one result -> ", partOneResult);
  const leastCorruptedImage = partOneLayers[partOneResult.index];
  console.log("least corruptedImage");
  for (let i = 0; i < 6; i++) {
    let result = leastCorruptedImage.slice(25 * i, 25 * (i + 1));
    console.log(result.join(""));
  }
  console.log("####");
  leastCorruptedImage.forEach((n: number) => {
    if (n === 1) numberOfOnes += 1;
    if (n === 2) numberOfTwos += 2;
  });

  console.log("number of ones ->", numberOfOnes);
  console.log("number of twos ->", numberOfTwos);
  console.log("ones * twos -> ", numberOfOnes * numberOfTwos);
});
