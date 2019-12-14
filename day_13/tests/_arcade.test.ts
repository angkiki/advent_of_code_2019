import { GameBoard } from '../_arcade';

describe('GameBoard Class', () => {
  const newBoard = new GameBoard();

  it('initialises an empty board', () => {
    expect(newBoard.board).toEqual([[]]);
  });

  it('adds a new tile correctly', () => {
    let coord = { fromTop: 0, fromLeft: 0 };
    newBoard.addTile(coord, 1);
    expect(newBoard.board).toEqual([[1]]);

    coord = { fromTop: 1, fromLeft: 1 };
    newBoard.addTile(coord, 2);
    expect(newBoard.board).toEqual([
      [1, null],
      [null, 2],
    ]);

    coord = { fromTop: 3, fromLeft: 2 };
    newBoard.addTile(coord, 3);
    expect(newBoard.board).toEqual([
      [1, null, null],
      [null, 2, null],
      [null, null, null],
      [null, null, 3],
    ]);
  });
});
