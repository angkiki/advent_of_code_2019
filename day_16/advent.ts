import * as fs from 'fs';
import { signalOffset } from './_fft';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const inputArray = data.split('').map(n => +n);
  let currInputArray = inputArray;

  console.log('computing part one ....');
  for (let i = 0; i < 100; i++) {
    currInputArray = signalOffset(currInputArray);
  }
  console.log('result is -> ', currInputArray.slice(0, 8).join(''));
});
