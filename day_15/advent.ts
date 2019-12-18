import * as fs from 'fs';
import { intCodeProgram } from './_intCode';
import { RepairDroid, ERepairGrid } from './_repairDroid';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
  const repairDroid = new RepairDroid();

  console.log('running int code & bot...');
  intCodeProgram(dataArray, repairDroid);
  console.log('distance traversed: ', repairDroid.pathTraversed.length);

  repairDroid.grid.forEach((row, idx) => {
    let result = '';
    row.forEach((c, id) => {
      const { row, col } = repairDroid.currCoords;
      if (idx === row && id === col) {
        result += '@';
      } else {
        if (c.value === ERepairGrid.WALL) {
          result += '#';
        } else if (c.value === ERepairGrid.PATH) {
          result += '.';
        } else if (c.value === ERepairGrid.END) {
          result += '^';
        } else {
          result += '?';
        }
      }
    });
    console.log(result);
  });
});
