import * as fs from "fs";
import { permutation } from "./_util";

export enum EModes {
  POSITION = 0,
  IMMEDIATE = 1,
}

interface IResult {
  largestNumber: number;
  index: number;
}

interface IParsedInstructions {
  opCode: number;
  p1?: EModes;
  p2?: EModes;
  p3?: EModes;
}

export const parseInstruction = (instruction: number): IParsedInstructions => {
  const intstructionsArray = instruction.toString().split("");
  const opCode = intstructionsArray.splice(intstructionsArray.length - 2);
  const [p1, p2, p3] = intstructionsArray.reverse();

  return {
    opCode: parseInt(opCode.join("")),
    p1: p1 ? +p1 : 0,
    p2: p2 ? +p2 : 0,
    p3: p3 ? +p3 : 0,
  };
};

const isValid = (instruction: number): boolean => {
  switch (instruction) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
    case 99:
      return true;
    default:
      return false;
  }
};

const opCodeOneTwo = (
  data: number[],
  currentPosition: number,
  parsed: IParsedInstructions
) => {
  const pos1 =
    parsed.p1 === 0 ? data[currentPosition + 1] : currentPosition + 1;
  const pos2 =
    parsed.p2 === 0 ? data[currentPosition + 2] : currentPosition + 2;
  const pos3 =
    parsed.p3 === 0 ? data[currentPosition + 3] : currentPosition + 3;

  const num1 = data[pos1];
  const num2 = data[pos2];
  const result = parsed.opCode === 1 ? num1 + num2 : num1 * num2;

  data[pos3] = result;
};

const opCodeThree = (
  data: number[],
  currentPosition: number,
  input: number,
  parsed: IParsedInstructions
) => {
  const position =
    parsed.p1 === 0 ? data[currentPosition + 1] : currentPosition + 1;
  data[position] = input;
};

const opCodeFour = (
  data: number[],
  currentPosition: number,
  parsed: IParsedInstructions
): number => {
  const position =
    parsed.p1 === 0 ? data[currentPosition + 1] : currentPosition + 1;
  return data[position];
};

const opCodeFiveSix = (
  data: number[],
  currentPosition: number,
  parsed: IParsedInstructions
): number => {
  const pos1 =
    parsed.p1 === 0 ? data[currentPosition + 1] : currentPosition + 1;
  const pos2 =
    parsed.p2 === 0 ? data[currentPosition + 2] : currentPosition + 2;

  const num1 = data[pos1];

  if (parsed.opCode === 5) {
    return num1 > 0 ? data[pos2] : currentPosition + 3;
  } else {
    return num1 === 0 ? data[pos2] : currentPosition + 3;
  }
};

const opCodeSevenEight = (
  data: number[],
  currentPosition: number,
  parsed: IParsedInstructions
) => {
  const pos1 =
    parsed.p1 === 0 ? data[currentPosition + 1] : currentPosition + 1;
  const pos2 =
    parsed.p2 === 0 ? data[currentPosition + 2] : currentPosition + 2;
  const pos3 =
    parsed.p3 === 0 ? data[currentPosition + 3] : currentPosition + 3;

  const num1 = data[pos1];
  const num2 = data[pos2];

  if (parsed.opCode === 7) {
    data[pos3] = num1 < num2 ? 1 : 0;
  } else {
    data[pos3] = num1 === num2 ? 1 : 0;
  }
};

const intCodeProgram = (
  data: number[],
  inputOne: number,
  inputTwo: number
): number[] => {
  let pointer = 0;
  let instruction = data[pointer];
  let parsed = parseInstruction(instruction);
  let input = inputOne;
  let inputOneRead = false;

  const allOutputs = [];

  while (isValid(parsed.opCode)) {
    if (parsed.opCode === 99) {
      break;
    }

    if (inputOneRead) {
      input = inputTwo;
    }

    switch (parsed.opCode) {
      case 3:
        opCodeThree(data, pointer, input, parsed);
        inputOneRead = true;
        pointer += 2;
        break;
      case 4:
        const output = opCodeFour(data, pointer, parsed);
        allOutputs.push(output);
        pointer += 2;
        break;
      case 5:
      case 6:
        pointer = opCodeFiveSix(data, pointer, parsed);
        break;
      case 7:
      case 8:
        opCodeSevenEight(data, pointer, parsed);
        pointer += 4;
        break;
      default:
        opCodeOneTwo(data, pointer, parsed);
        pointer += 4;
    }

    instruction = data[pointer];
    parsed = parseInstruction(instruction);
  }

  return allOutputs;
};

fs.readFile("./data.txt", "utf-8", (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(",").map(num => +num);
  const baseSequence = [0, 1, 2, 3, 4];
  const allSequences = permutation(baseSequence);
  const partOneResult: IResult = { largestNumber: 0, index: 0 };
  console.log("computing part one ....");

  for (let i = 0; i < allSequences.length; i++) {
    const currentSequence = allSequences[i];
    let inputTwo = 0;
    currentSequence.forEach((command: number) => {
      let temp = intCodeProgram([...dataArray], command, inputTwo);
      inputTwo = temp[0];
    });

    if (inputTwo > partOneResult.largestNumber) {
      partOneResult.largestNumber = inputTwo;
      partOneResult.index = i;
    }
  }

  console.log("result -> ", partOneResult);
  console.log("largest sequence -> ", allSequences[partOneResult.index]);
});
