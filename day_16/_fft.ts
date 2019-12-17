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

  result.shift();
  return result.slice(0, frequencyLength);
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

    const evaluatedSignal = applyPhase(signal, phaseOffsetResult);
    newSignal.push(evaluatedSignal);
  }

  return cleanUpSignal(newSignal);
};

const applyEfficientPhase = (signal: number[], offset: number): number => {
  let i = offset;
  let j = offset;
  let total = 0;
  let positivePhase = true;

  while (i < signal.length) {
    while (j >= 0 && i < signal.length) {
      positivePhase ? (total += signal[i]) : (total -= signal[i]);
      i += 1;
      j -= 1;
    }

    i += offset + 1;
    j = offset;
    positivePhase = !positivePhase;
  }

  return total;
};

export const efficientSignalOffset = (signal: number[]): number[] => {
  const newSignal = [];

  for (let i = 0; i < signal.length; i++) {
    const evaluatedSignal = applyEfficientPhase(signal, i);
    newSignal.push(evaluatedSignal);
  }

  return cleanUpSignal(newSignal);
};

export const efficientSignalOffsetV2 = (signal: number[]): number[] => {
  const newSignal = [];
  let tally = 0;

  for (let i = signal.length - 1; i >= 0; i--) {
    const total = (tally + signal[i]) % 10;
    tally += total;
    newSignal.unshift(total);
  }

  return newSignal;
};
