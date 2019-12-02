import * as fs from "fs";

const isValid = (number: number): boolean =>
  number === 1 || number === 2 || number === 99;

const opCode = (
  data: number[],
  currentPosition: number,
  instruction: number
) => {
  const pTwo = data[currentPosition + 1];
  const pThree = data[currentPosition + 2];
  const pFour = data[currentPosition + 3];

  const numTwo = data[pTwo];
  const numThree = data[pThree];
  const result = instruction === 1 ? numTwo + numThree : numTwo * numThree;

  data[pFour] = result;
};

const intCodeProgram = (data: number[]) => {
  let pointer = 0;
  let instruction = data[pointer];

  while (isValid(instruction)) {
    if (instruction === 99) {
      break;
    }

    opCode(data, pointer, instruction);
    pointer += 4;
    instruction = data[pointer];
  }
};

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray: number[] = data.split(",").map(x => parseInt(x));

  // updating the dataArray as per the instructions
  const partOneArray = [...dataArray];
  partOneArray[1] = 12;
  partOneArray[2] = 2;

  console.log("- - - - Part One - - - -");
  intCodeProgram(partOneArray);
  console.log("Value @ Position 0 -> ", partOneArray[0]);
  console.log("- - - - - - - - - - - - -");
  console.log("# #");
  console.log("# #");
  console.log("# #");
  console.log("- - - - Part Two - - - -");
  console.log("... computing the noun & verb for part 2 ...");

  parentLoop: for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      const partTwoArray = [...dataArray];
      partTwoArray[1] = noun;
      partTwoArray[2] = verb;
      intCodeProgram(partTwoArray);

      if (partTwoArray[0] === 19690720) {
        console.log("noun -> ", noun);
        console.log("verb -> ", verb);
        break parentLoop;
      }
    }
  }
  console.log("- - - - - - - - - - - - -");
});
