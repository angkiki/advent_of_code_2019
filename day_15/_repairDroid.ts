import { Grid, ICoords } from './_grid';

export enum ERepairGrid {
  PATH = 0,
  WALL = 1,
  END = 2,
}

export enum EDir {
  UP = 1,
  DOWN = 2,
  LEFT = 3,
  RIGHT = 4,
}

export interface IMemo {
  [key: string]: boolean;
}

export class RepairDroid extends Grid {
  pathTraversed: EDir[];
  endCoords: ICoords;

  constructor() {
    super(ERepairGrid.PATH);
    this.pathTraversed = [];
    this.endCoords = { col: 0, row: 0 };
  }

  lastTraversed = () => this.pathTraversed[this.pathTraversed.length - 1];

  move = (dir: EDir) => {
    switch (dir) {
      case EDir.UP:
        this.moveUp();
        break;
      case EDir.DOWN:
        this.moveDown();
        break;
      case EDir.RIGHT:
        this.moveRight();
        break;
      case EDir.LEFT:
        this.moveLeft();
        break;
    }
    this.lastTraversed() === this.getInversedDir(dir) ? this.pathTraversed.pop() : this.pathTraversed.push(dir);
    this.markCurrentAsVisited();
  };

  markCurrentAsPath = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].value = ERepairGrid.PATH;
  };

  markCurrentAsWall = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].value = ERepairGrid.WALL;
    this.revertMove();
  };

  markCurentAsEnd = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].value = ERepairGrid.END;
    this.endCoords.row = row;
    this.endCoords.col = col;
  };

  findNextBestInput = (): EDir => {
    if (this.nextStepIsValid(EDir.UP)) return EDir.UP;
    if (this.nextStepIsValid(EDir.RIGHT)) return EDir.RIGHT;
    if (this.nextStepIsValid(EDir.DOWN)) return EDir.DOWN;
    if (this.nextStepIsValid(EDir.LEFT)) return EDir.LEFT;

    return this.getInversedDir(this.lastTraversed());
  };

  printDroidGrid = () => {
    this.grid.forEach((row, idx) => {
      let result = '';
      row.forEach((c, id) => {
        const { row, col } = this.currCoords;
        if (idx === row && id === col) {
          result += '@';
        } else {
          if (c.value === ERepairGrid.WALL) {
            result += '#';
          } else if (c.value === ERepairGrid.PATH) {
            result += '.';
          } else if (c.value === ERepairGrid.END) {
            result += '^';
          } else {
            result += '?';
          }
        }
      });
      console.log(result);
    });
  };

  computeOxygenSpread = (): number => {
    const memo: IMemo = {};
    // - 1 for discounting the starting grid
    return this.oxygenTraversal(this.endCoords, memo) - 1;
  };

  private oxygenTraversal = (cc: ICoords, memo: IMemo): number => {
    if (!this.cellIsValid(cc, memo)) {
      return 0;
    }

    const { row, col } = cc;
    const key = this.constructMemoKey(cc);
    memo[key] = true;
    const longest = Math.max(
      this.oxygenTraversal({ row: row + 1, col }, memo),
      this.oxygenTraversal({ row: row - 1, col }, memo),
      this.oxygenTraversal({ row, col: col + 1 }, memo),
      this.oxygenTraversal({ row, col: col - 1 }, memo)
    );
    return 1 + longest;
  };

  private cellIsValid = (cc: ICoords, memo: IMemo): boolean => {
    const { col, row } = cc;
    const key = this.constructMemoKey(cc);
    try {
      const { value } = this.grid[row][col];
      return value !== ERepairGrid.WALL && value !== null && !memo[key];
    } catch (e) {
      return false;
    }
  };

  private constructMemoKey = (cc: ICoords): string => {
    const { col, row } = cc;
    return `${col}-${row}`;
  };

  private getInversedDir = (dir: EDir): EDir => {
    switch (dir) {
      case EDir.UP:
        return EDir.DOWN;
      case EDir.DOWN:
        return EDir.UP;
      case EDir.RIGHT:
        return EDir.LEFT;
      case EDir.LEFT:
        return EDir.RIGHT;
    }
  };

  private nextStepIsValid = (dir: EDir): boolean => {
    const { col, row } = this.currCoords;

    switch (dir) {
      case EDir.UP:
        return !this.grid[row - 1] || !this.grid[row - 1][col].visited;
      case EDir.RIGHT:
        return !this.grid[row][col + 1] || !this.grid[row][col + 1].visited;
      case EDir.DOWN:
        return !this.grid[row + 1] || !this.grid[row + 1][col].visited;
      case EDir.LEFT:
        return !this.grid[row][col - 1] || !this.grid[row][col - 1].visited;
    }
  };

  private markCurrentAsVisited = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].visited = true;
  };

  private revertMove = () => {
    const inverseDir = this.getInversedDir(this.lastTraversed());
    this.move(inverseDir);
  };
}
