import * as fs from "fs";

interface IResult {
  length: number;
  index: 0;
}

const WIDTH = 25;
const HEIGHT = 6;

const printLayer = (layer: number[]) => {
  for (let i = 0; i < 6; i++) {
    const unformattedLayer = layer.slice(i * 25, (i + 1) * 25);
    const formattedLayer = unformattedLayer.map((num: number) =>
      num === 0 ? "." : "#"
    );
    console.log(formattedLayer.join(""));
  }
};

const constructLayer = (
  currentLayer: number[],
  nextLayer: number[]
): number[] => {
  currentLayer.forEach((pixel: number, index: number) => {
    if (pixel === 2) {
      currentLayer[index] = nextLayer[index];
    }
  });

  return currentLayer;
};

const hasTransparentPixel = (layer: number[]): boolean => {
  for (let i = 0; i < layer.length; i++) {
    if (layer[i] === 2) return true;
  }

  return false;
};

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split("");

  const partOneCloneData = dataArray.map((n: string) => +n);
  const partOneResult = { length: 0, index: 0 };
  const layers = [];

  while (partOneCloneData.length > 0) {
    const temp = partOneCloneData.splice(0, WIDTH * HEIGHT);
    layers.push(temp);
  }

  layers.forEach((layer: number[], index: number) => {
    const leastZeros = layer.filter((num: number) => num > 0);
    if (leastZeros.length > partOneResult.length) {
      partOneResult.length = leastZeros.length;
      partOneResult.index = index;
    }
  });

  let numberOfOnes = 0;
  let numberOfTwos = 0;
  const leastCorruptedImage = layers[partOneResult.index];
  leastCorruptedImage.forEach((n: number) => {
    if (n === 1) numberOfOnes += 1;
    if (n === 2) numberOfTwos += 1;
  });

  console.log("computing part one....");
  console.log("number of ones ->", numberOfOnes);
  console.log("number of twos ->", numberOfTwos);
  console.log("ones * twos -> ", numberOfOnes * numberOfTwos);

  console.log("computing part two....");
  let finalImage = layers[0];
  let nextImageIndex = 1;
  while (hasTransparentPixel(finalImage)) {
    finalImage = constructLayer(finalImage, layers[nextImageIndex]);
    nextImageIndex += 1;
  }

  printLayer(finalImage);
});
