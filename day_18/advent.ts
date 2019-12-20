import * as fs from 'fs';
import { Map } from './_map';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split('\n').map(r => r.split(''));
  const m = new Map(dataArray);
  m.printMap();
});
