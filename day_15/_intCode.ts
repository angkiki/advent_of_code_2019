import { EDir, RepairDroid } from './_repairDroid';

enum EModes {
  POSITION = 0,
  IMMEDIATE = 1,
  RELATIVE = 2,
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

const parseInstruction = (instruction: number): IParsedInstructions => {
  const intstructionsArray = instruction.toString().split('');
  const opCode = intstructionsArray.splice(intstructionsArray.length - 2);
  const [p1, p2, p3] = intstructionsArray.reverse();

  return {
    opCode: parseInt(opCode.join('')),
    p1: p1 ? +p1 : 0,
    p2: p2 ? +p2 : 0,
    p3: p3 ? +p3 : 0,
  };
};

const determineMemoryAddress = (
  data: number[],
  param: number,
  currentPosition: number,
  offset: number,
  relativeBase: number
): number => {
  switch (param) {
    case EModes.POSITION:
      return data[currentPosition + offset];
    case EModes.IMMEDIATE:
      return currentPosition + offset;
    default:
      // case 2
      return data[currentPosition + offset] + relativeBase;
  }
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
    case 9:
    case 99:
      return true;
    default:
      return false;
  }
};

const opCodeOneTwo = (
  data: number[],
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
) => {
  const { p1, p2, p3 } = parsed;
  const pos1 = determineMemoryAddress(data, p1, cP, 1, cRB);
  const pos2 = determineMemoryAddress(data, p2, cP, 2, cRB);
  const pos3 = determineMemoryAddress(data, p3, cP, 3, cRB);

  // we can read "memory" beyond the provided data, defaults to 0
  const num1 = data[pos1] || 0;
  const num2 = data[pos2] || 0;
  const result = parsed.opCode === 1 ? num1 + num2 : num1 * num2;

  data[pos3] = result;
};

const opCodeThree = (
  data: number[],
  input: number,
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
) => {
  const position = determineMemoryAddress(data, parsed.p1, cP, 1, cRB);
  data[position] = input;
};

const opCodeFour = (
  data: number[],
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
): number => {
  const position = determineMemoryAddress(data, parsed.p1, cP, 1, cRB);
  return data[position];
};

const opCodeFiveSix = (
  data: number[],
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
): number => {
  const { p1, p2 } = parsed;
  const pos1 = determineMemoryAddress(data, p1, cP, 1, cRB);
  const pos2 = determineMemoryAddress(data, p2, cP, 2, cRB);

  // we can read "memory" beyond the provided data, defaults to 0
  const num1 = data[pos1] || 0;
  const num2 = data[pos2] || 0;

  if (parsed.opCode === 5) {
    return num1 > 0 ? num2 : cP + 3;
  } else {
    return num1 === 0 ? num2 : cP + 3;
  }
};

const opCodeSevenEight = (
  data: number[],
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
) => {
  const { p1, p2, p3 } = parsed;
  const pos1 = determineMemoryAddress(data, p1, cP, 1, cRB);
  const pos2 = determineMemoryAddress(data, p2, cP, 2, cRB);
  const pos3 = determineMemoryAddress(data, p3, cP, 3, cRB);

  // we can read "memory" beyond the provided data, defaults to 0
  const num1 = data[pos1] || 0;
  const num2 = data[pos2] || 0;

  if (parsed.opCode === 7) {
    data[pos3] = num1 < num2 ? 1 : 0;
  } else {
    data[pos3] = num1 === num2 ? 1 : 0;
  }
};

const opCodeNine = (
  data: number[],
  parsed: IParsedInstructions,
  cP: number, // current pointer position
  cRB: number // currentRelativeBase
): number => {
  const pos1 = determineMemoryAddress(data, parsed.p1, cP, 1, cRB);
  const num1 = data[pos1] || 0;
  return cRB + num1;
};

export const intCodeProgram = (data: number[], droid: RepairDroid) => {
  let pointer = 0;
  let instruction = data[pointer];
  let parsed = parseInstruction(instruction);
  let relativeBase = 0;

  let input = EDir.UP;

  while (isValid(parsed.opCode)) {
    if (parsed.opCode === 99) {
      break;
    }

    switch (parsed.opCode) {
      case 3:
        opCodeThree(data, input, parsed, pointer, relativeBase);
        pointer += 2;
        break;
      case 4:
        const output = opCodeFour(data, parsed, pointer, relativeBase);
        // handle movement here
        // if output === 2, "end" is found
        // output is 1 -> move in that direction
        // output is 0 -> its a wall
        pointer += 2;
        break;
      case 5:
      case 6:
        pointer = opCodeFiveSix(data, parsed, pointer, relativeBase);
        break;
      case 7:
      case 8:
        opCodeSevenEight(data, parsed, pointer, relativeBase);
        pointer += 4;
        break;
      case 9:
        relativeBase = opCodeNine(data, parsed, pointer, relativeBase);
        pointer += 2;
        break;
      default:
        opCodeOneTwo(data, parsed, pointer, relativeBase);
        pointer += 4;
    }

    instruction = data[pointer];
    parsed = parseInstruction(instruction);
  }
};
