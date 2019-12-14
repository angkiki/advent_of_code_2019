import * as fs from 'fs';
import { Moon } from './_moons';
import { simluateTick } from './_ticks';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const rawMoonsArray = data.split('\n');
  const moonsArray = rawMoonsArray.map(rawMoon => new Moon(rawMoon));

  console.log('computing part one ....');
  for (let i = 1; i <= 1000; i++) {
    simluateTick(moonsArray);
  }

  console.log('computing total energy...');
  const totalEnergy = moonsArray.reduce((acc: number, curr: Moon) => {
    return acc + curr.kineticEnergy * curr.potentialEnergy;
  }, 0);
  console.log('total energy -> ', totalEnergy);
});
