import * as fs from 'fs';
import { intCodeProgram } from './_intCode';

export enum EBotDirection {
  NORTH = 1,
  SOUTH = 2,
  EAST = 3,
  WEST = 4,
}

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);
});
