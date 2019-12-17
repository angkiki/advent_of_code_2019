import { Grid } from './_grid';

enum ERepairGrid {
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
  constructor() {
    super(ERepairGrid.PATH);
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

    this.markCurrentAsVisited();
  };

  markCurrentAsWall = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col] = { value: ERepairGrid.WALL, visited: false };
  };

  private markCurrentAsVisited = () => {
    const { col, row } = this.currCoords;
    this.grid[row][col].visited = true;
  };
}
