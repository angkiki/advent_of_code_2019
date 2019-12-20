import * as fs from 'fs';
import { intCodeProgram } from './_intCode';
import { Scaffold } from './_scaffold';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
  const sf = new Scaffold();
  intCodeProgram(dataArray, 0, sf);
  sf.printScaffold();
});
