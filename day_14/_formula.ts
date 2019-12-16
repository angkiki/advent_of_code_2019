const ORE = 'ORE';

export interface IFormulas {
  [key: string]: Formula;
}

export interface IReserves {
  [key: string]: number;
}

export interface IChemical {
  count: number;
  name: string;
}

export interface IParsedFormula {
  input: IChemical[];
  output: IChemical;
}

export class Formula {
  input: IChemical[];
  output: IChemical;

  constructor(input: IChemical[], output: IChemical) {
    this.input = input;
    this.output = output;
  }
}

const parseRawIO = (rawIO: string): IChemical => {
  const [count, name] = rawIO.split(' ');
  return {
    count: +count,
    name,
  };
};

export const parseRawFormula = (rawFormula: string): IParsedFormula => {
  const [rawInput, rawOutput] = rawFormula.split(' => ');
  const output = parseRawIO(rawOutput);
  const input = rawInput.split(', ').map(rawIn => parseRawIO(rawIn));

  return {
    input,
    output,
  };
};

// c -> chemical name, dop -> desired output from parent called, ms -> master formula sheet, r -> reserves memo
export const findOreRequired = (c: string, dop: number, ms: IFormulas, r: IReserves): number => {
  const chemical = ms[c];

  // base case
  if (chemical.input.length === 1 && chemical.input[0].name === ORE) {
    // dop represents the total number of resource C that we want
    // chemical.output.count represents the total number of output produced per unit
    // i.e. 165 ORE => 10 A, dop is 50, so we want 165 * (50 / 10) number of Ores
    return chemical.input[0].count * (dop / chemical.output.count);
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // NAMES ARE SHORTENED FOR LESS CLUTTERED CODE - NAMES ARE EXPLAINED IN COMMENTS
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // amountOfChemicalProducedPerOutput - i.e. 10AB => 5AC, aOCPPO is 5
  const AOCPPO = chemical.output.count;

  // base multiplier - number of units we need, i.e. aOCPPO is 5, we need 50 AC, bm is 10
  const BM = Math.ceil(dop / AOCPPO);

  let totalOresRequired = 0;

  chemical.input.forEach((c: IChemical) => {
    // amountOfChemicalInReserves
    const AOCIR = r[c.name] || 0;
    // amountOfChemicalNeededToProduceOutput - i.e. 10A => 5C, if we need 15C, we need 30A, AOCNTPO is 30
    const AOCNTPO = c.count * BM;
    // amountOfCurrentChemicalProducedPerOutput - same as AOCPPO, but is for current instance 'C', i.e. 10A => 5C, AOCCPPO is 5;
    const AOCCPPO = ms[c.name].output.count;

    const multiplier = Math.ceil((AOCNTPO - AOCIR) / AOCCPPO);
    const totalChemicalProduced = multiplier * AOCCPPO;
    const totalResourceRequiredToProduceTotalChemical = findOreRequired(c.name, totalChemicalProduced, ms, r);
    const excessChemicalProduced = totalChemicalProduced + AOCIR - AOCNTPO;

    totalOresRequired += totalResourceRequiredToProduceTotalChemical;
    r[c.name] = excessChemicalProduced;
  });

  return totalOresRequired;
};
