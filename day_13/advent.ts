import * as fs from 'fs';
import { GameBoard, ETile } from './_arcade';
import { intCodeProgram } from './_intCode';

fs.readFile('./data.txt', 'utf-8', (err: Error, data: string) => {
  if (err) throw err;

  const dataArray = data.split(',').map(n => +n);

  console.log('computing part one ....');
  const gameBoard = new GameBoard();
  intCodeProgram(dataArray, 0, gameBoard);

  console.log('computing number of block tiles ....');
  let totalBlockTiles = 0;
  gameBoard.board.forEach((row: (number | null)[]) => {
    row.forEach((tile: number | null) => {
      if (tile === ETile.BLOCK) totalBlockTiles += 1;
    });
  });
  console.log('total number of block tiles: ', totalBlockTiles);
});
