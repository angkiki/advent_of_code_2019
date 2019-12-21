import * as fs from 'fs';
import { intCodeProgram } from './_intCode';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);

  const map: number[][] = [];

  for (let x = 0; x < 50; x++) {
    map.push([]);
    for (let y = 0; y < 50; y++) {
      const result = intCodeProgram([...dataArray], x, y)[0];
      map[x].push(result);
    }
  }

  let total = 0;
  map.forEach(r => {
    r.forEach(c => {
      if (c === 1) total += 1;
    });
  });
  console.log('total affected area -> ', total);
});
