interface ICell {
  visited: boolean;
  value: number | null;
}

interface ICoords {
  col: number;
  row: number;
}

export class Grid {
  grid: ICell[][];
  currCoords: ICoords;

  constructor(value: number) {
    const newCell: ICell = {
      visited: true,
      value,
    };

    this.grid = [[newCell]];
    this.currCoords = { col: 0, row: 0 };
  }

  moveUp = () => {
    const { col, row } = this.currCoords;
    if (!this.grid[row - 1]) {
      this.prependRow();
    }

    this.currCoords = { col, row: row - 1 };
  };

  moveDown = () => {
    const { col, row } = this.currCoords;
    if (!this.grid[row + 1]) {
      this.appendRow();
    }

    this.currCoords = { col, row: row + 1 };
  };

  moveLeft = () => {
    const { col, row } = this.currCoords;
    if (!this.grid[row][col - 1]) {
      this.prependCol();
    }

    this.currCoords = { col: col - 1, row };
  };

  moveRight = () => {
    const { col, row } = this.currCoords;
    if (!this.grid[row][col + 1]) {
      this.appendCol();
    }

    this.currCoords = { col: col + 1, row };
  };

  private makeNewCell = (): ICell => ({
    visited: false,
    value: null,
  });

  private makeNewRow = (): null[] => {
    const rowLen = this.grid[0].length;
    const newCell = this.makeNewCell();
    const newRow = Array(rowLen).fill({ ...newCell });
    return newRow;
  };

  private prependRow = () => {
    const newRow = this.makeNewRow();
    this.grid.unshift(newRow);
    this.currCoords.row += 1;
  };

  private appendRow = () => {
    const newRow = this.makeNewRow();
    this.grid.push(newRow);
  };

  private prependCol = () => {
    this.grid.forEach(row => {
      row.unshift(this.makeNewCell());
    });
    this.currCoords.col += 1;
  };

  private appendCol = () => {
    this.grid.forEach(row => {
      row.push(this.makeNewCell());
    });
  };
}
