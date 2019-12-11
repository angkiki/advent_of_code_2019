import * as fs from 'fs';
import { intCodeProgram } from './_intCode';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;
  const dataArray = data.split(',').map((n: string) => +n);
  console.log('computing part one ....');
  const result = intCodeProgram(dataArray);
  console.log('result -> ', result);
});
