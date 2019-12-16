const BASE_PHASE = [0, 1, 0, -1];

const pointerAddition = (pointer: number): number => {
  let newPointer = (pointer += 1);
  return newPointer > 3 ? 0 : newPointer;
};

export const phaseOffset = (offset: number, frequencyLength: number): number[] => {
  const result = [];
  let pointer = 0;

  while (result.length < frequencyLength + 1) {
    const phases = Array(offset + 1).fill(BASE_PHASE[pointer]);
    result.push(...phases);
    pointer = pointerAddition(pointer);
  }

  return result.slice(0, frequencyLength + 1);
};

const applyPhase = (signal: number[], phase: number[]): number => {
  let total = 0;

  for (let i = 0; i < signal.length; i++) {
    total += signal[i] * phase[i];
  }

  return total;
};

const takeLastDigit = (num: number): number => {
  let strNum = num.toString();
  let lastDigit = strNum.slice(strNum.length - 1);
  return +lastDigit;
};

const cleanUpSignal = (signal: number[]): number[] => {
  return signal.map((num: number) => takeLastDigit(num));
};

export const signalOffset = (signal: number[]): number[] => {
  const newSignal = [];

  for (let i = 0; i < signal.length; i++) {
    const phaseOffsetResult = phaseOffset(i, signal.length);
    phaseOffsetResult.shift();

    const evaluatedSignal = applyPhase(signal, phaseOffsetResult);
    newSignal.push(evaluatedSignal);
  }

  return cleanUpSignal(newSignal);
};
