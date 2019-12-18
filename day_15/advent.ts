import * as fs from 'fs';
import { intCodeProgram } from './_intCode';
import { RepairDroid } from './_repairDroid';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
  const repairDroid = new RepairDroid();

  console.log('running int code & bot...');
  intCodeProgram(dataArray, repairDroid);
  console.log('distance traversed: ', repairDroid.pathTraversed.length);
});
