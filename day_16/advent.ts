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

  console.log('deriving part two input ...');
  let realInput = [];
  for (let i = 0; i < 10000; i++) {
    realInput.push(...inputArray);
  }
  console.log('done deriving real input ...');
  console.log('computing part two output....');
  for (let i = 0; i < 100; i++) {
    realInput = efficientSignalOffset(realInput);
    console.log('done with cycle ', i);
  }
  console.log('done computing part two ...');

  const partTwoOffset = +inputArray.slice(0, 7).join('');
  const realPartTwoAnswer = realInput.slice(partTwoOffset, partTwoOffset + 8);
  console.log('part two answer is: ', realPartTwoAnswer.join(''));
});
