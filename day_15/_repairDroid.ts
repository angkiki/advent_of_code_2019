import { Grid } from './_grid';

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

export class RepairDroid extends Grid {
  pathTraversed: EDir[];

  constructor() {
    super(ERepairGrid.PATH);
    this.pathTraversed = [];
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
  };

  findNextBestInput = (): EDir => {
    if (this.nextStepIsValid(EDir.UP)) return EDir.UP;
    if (this.nextStepIsValid(EDir.RIGHT)) return EDir.RIGHT;
    if (this.nextStepIsValid(EDir.DOWN)) return EDir.DOWN;
    if (this.nextStepIsValid(EDir.LEFT)) return EDir.LEFT;

    return this.getInversedDir(this.lastTraversed());
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
