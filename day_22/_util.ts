export enum EInstructionTypes {
  CUT,
  DEAL_NEW,
  DEAL_WITH,
}

interface IInstruction {
  type: EInstructionTypes;
  count: number;
}

export const parseInstructions = (instruction: string): IInstruction => {
  const iArr = instruction.split(' ');
  let count: EInstructionTypes, type: number;

  if (iArr[0] === 'cut') {
    type = EInstructionTypes.CUT;
    count = +iArr[1];
  } else {
    if (iArr[1] === 'with') {
      type = EInstructionTypes.DEAL_WITH;
      count = +iArr[3];
    } else {
      type = EInstructionTypes.DEAL_NEW;
      count = 0;
    }
  }

  return {
    type,
    count,
  };
};
