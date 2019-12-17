import * as fs from 'fs';
import { signalOffset, efficientSignalOffset } from './_fft';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const inputArray = data.split('').map(n => +n);
  let currInputArray = [...inputArray];
  let efficientInput = [...inputArray];

  console.log('computing part one ....');
  for (let i = 0; i < 100; i++) {
    currInputArray = signalOffset(currInputArray);
    efficientInput = efficientSignalOffset(efficientInput);
  }
  console.log('result is -> ', currInputArray.slice(0, 8).join(''));
  console.log('result is -> ', efficientInput.slice(0, 8).join(''));
});
