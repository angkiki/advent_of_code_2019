const MIN = 372037;
const MAX = 905157;

const parseNum = (pin: number): number[] =>
  pin
    .toString()
    .split("")
    .map(x => parseInt(x));

const isIncremental = (pin: number[]): boolean => {
  for (let i = 0; i < pin.length - 1; i++) {
    if (pin[i + 1] < pin[i]) {
      return false;
    }
  }

  return true;
};

const hasAdjaecent = (pin: number[]): boolean => {
  for (let i = 0; i < pin.length - 1; i++) {
    if (pin[i] === pin[i + 1]) {
      return true;
    }
  }
  return false;
};

const partTwoAdjaecent = (pin: number[]): boolean => {
  const memo = {};

  for (let i = 0; i < pin.length - 1; i++) {
    if (pin[i] === pin[i + 1]) {
      if (!memo[pin[i]]) {
        memo[pin[i]] = 0;
      }
      memo[pin[i]] += 1;
    }
  }

  for (let keys in memo) {
    if (memo[keys] === 1) {
      return true;
    }
  }

  return false;
};

const isValid = (pin: number): boolean => {
  const parsed = parseNum(pin);
  return hasAdjaecent(parsed) && isIncremental(parsed);
};

const partTwoIsValid = (pin: number): boolean => {
  const parsed = parseNum(pin);
  return partTwoAdjaecent(parsed) && isIncremental(parsed);
};

let partOneValid = 0;
let partTwoValid = 0;
let currentPin = MIN;

while (currentPin <= MAX) {
  if (isValid(currentPin)) {
    partOneValid += 1;
  }

  if (partTwoIsValid(currentPin)) {
    partTwoValid += 1;
  }

  currentPin += 1;
}

console.log("Total Valid Pins -> ", partOneValid);
console.log("Total Valid Pins Part 2-> ", partTwoValid);
