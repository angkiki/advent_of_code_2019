export enum ETile {
  EMPTY = 0,
  WALL = 1,
  BLOCK = 2,
  PADDLE = 3,
  BALL = 4,
}

export interface ICoords {
  fromTop: number;
  fromLeft: number;
}

export class GameBoard {
  board: (number | null)[][];

  constructor() {
    this.board = [[]];
  }

  addTile = (coords: ICoords, tile: ETile) => {
    const { fromTop, fromLeft } = coords;

    // check that coords are within boundaries
    if (fromTop >= this.board.length || fromLeft >= this.board[0].length) {
      this.padBoard(coords);
    }

    if (this.board[fromTop][fromLeft] === null) {
      this.board[fromTop][fromLeft] = tile;
    }
  };

  private padBoard = (coords: ICoords) => {
    const { fromLeft, fromTop } = coords;

    const colDiff = fromLeft + 1 - this.board[0].length;
    const rowDiff = fromTop + 1 - this.board.length;

    if (rowDiff > 0) {
      for (let i = 0; i < rowDiff; i++) {
        const newRow = Array(this.board[0].length).fill(null);
        this.board.push([...newRow]);
      }
    }

    if (colDiff > 0) {
      this.board.forEach((row: (number | null)[]) => {
        const newCols = Array(colDiff).fill(null);
        row.push(...newCols);
      });
    }
  };
}
