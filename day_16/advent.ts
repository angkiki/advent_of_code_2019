import * as fs from 'fs';
import { signalOffset, efficientSignalOffset, efficientSignalOffsetV2 } from './_fft';

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
  const realInput = [];
  for (let i = 0; i < 10000; i++) {
    realInput.push(...inputArray);
  }
  console.log('done deriving real input ...');
  console.log('computing part two output....');
  const partTwoOffset = +inputArray.slice(0, 7).join('');
  let realPartTwoInput = realInput.slice(partTwoOffset);

  for (let i = 0; i < 100; i++) {
    realPartTwoInput = efficientSignalOffsetV2(realPartTwoInput);
    console.log('done with cycle ', i);
  }
  console.log('the answer for part two is: ', realPartTwoInput.slice(0, 8).join(''));

  // for (let i = 0; i < 100; i++) {
  //   realInput = efficientSignalOffset(realInput);
  //   console.log('done with cycle ', i);
  // }
  // console.log('done computing part two ...');

  // console.log('part two answer is: ', realPartTwoAnswer.join(''));
});
