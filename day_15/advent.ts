import * as fs from 'fs';
import { intCodeProgram } from './_intCode';
import { RepairDroid, ERepairGrid } from './_repairDroid';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
  const repairDroid = new RepairDroid();

  console.log('running int code & bot...');
  intCodeProgram(dataArray, repairDroid);
  repairDroid.printDroidGrid();

  console.log('computing minutes for part 2....');
  const minutesTaken = repairDroid.computeOxygenSpread();
  console.log('minutes taken: ', minutesTaken);
});
