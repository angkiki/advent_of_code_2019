import * as fs from 'fs';
import { intCodeProgram } from './_intCode';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
  intCodeProgram(dataArray, 0);
});
