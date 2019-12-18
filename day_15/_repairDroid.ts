import { Grid } from './_grid';

export enum ERepairGrid {
  PATH = 0,
  WALL = 1,
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

    this.pathTraversed.push(dir);
    this.markCurrentAsVisited();
  };

  markCurrentAsWall = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].value = ERepairGrid.WALL;
    this.revertMove();
  };

  private markCurrentAsVisited = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].visited = true;
  };

  private revertMove = () => {
    const lastMove = this.pathTraversed.pop();

    // move back in opposite direction
    switch (lastMove) {
      case EDir.UP:
        this.moveDown();
        break;
      case EDir.DOWN:
        this.moveUp();
        break;
      case EDir.RIGHT:
        this.moveLeft();
        break;
      case EDir.LEFT:
        this.moveRight();
        break;
    }
  };
}
