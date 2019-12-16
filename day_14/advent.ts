import * as fs from 'fs';
import { parseRawFormula, Formula, IParsedFormula, IFormulas, IReserves, findOreRequired } from './_formula';

const FUEL = 'FUEL';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const FORMULAS: IFormulas = {};
  const RESERVES: IReserves = {};

  const formulaArray = data.split('\n');
  const parsedFormulas = formulaArray.map(formula => parseRawFormula(formula));

  parsedFormulas.forEach((formula: IParsedFormula) => {
    const { input, output } = formula;
    const newFormula = new Formula(input, output);

    const name = newFormula.output.name;
    if (FORMULAS[name]) {
      console.log('duplicate outputs.... ', name);
      throw Error('There are duplicate producing outputs...');
    }
    FORMULAS[newFormula.output.name] = newFormula;
  });

  console.log('computing ores needed for Part One ....');
  const totalOres = findOreRequired(FUEL, 1, FORMULAS, RESERVES);
  console.log('total ores required -> ', totalOres);
});
