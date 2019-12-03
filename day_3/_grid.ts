enum EDir {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

interface ICoordinates {
  col: number;
  row: number;
}

interface IInstruction {
  direction: EDir;
  count: number;
}

const determineDirection = (rawDir: string): EDir => {
  switch (rawDir) {
    case "R":
      return EDir.RIGHT;
    case "L":
      return EDir.LEFT;
    case "U":
      return EDir.UP;
    default:
      return EDir.DOWN;
  }
};

const readInstruction = (instruction: string): IInstruction => {
  const rawDir = instruction.slice(0, 1);
  const direction = determineDirection(rawDir);
  const count = parseInt(instruction.slice(1));

  return {
    direction,
    count
  };
};

const appendNewCol = (grid: number[][]) => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].push(0);
  }
};

const prependNewCol = (grid: number[][]) => {
  for (let i = 0; i < grid.length; i++) {
    grid[i].unshift(0);
  }
};

const traverseUp = (
  count: number,
  grid: number[][],
  coordinates: ICoordinates
): ICoordinates => {
  const { row, col } = coordinates;

  let remainder = count;
  let currRow = row;

  while (remainder > 0) {
    currRow--;
    remainder--;

    if (grid[currRow]) {
      grid[currRow][col]++;
    } else {
      const lengthOfRows = grid[row].length;
      const newRow = Array(lengthOfRows).fill(0);
      grid.unshift(newRow);

      if (currRow < 0) {
        currRow = 0;
      }

      grid[currRow][col]++;
    }
  }

  return {
    col,
    row: currRow
  };
};

const traverseDown = (
  count: number,
  grid: number[][],
  coordinates: ICoordinates
): ICoordinates => {
  const { row, col } = coordinates;

  let remainder = count;
  let currRow = row;

  while (remainder > 0) {
    currRow++;
    remainder--;

    if (grid[currRow]) {
      grid[currRow][col]++;
    } else {
      const lengthOfRows = grid[row].length;
      const newRow = Array(lengthOfRows).fill(0);
      grid.unshift(newRow);
      grid[currRow][col]++;
    }
  }

  return {
    col,
    row: currRow
  };
};

const traverseLeft = (
  count: number,
  grid: number[][],
  coordinates: ICoordinates
): ICoordinates => {
  const { row, col } = coordinates;

  let remainder = count;
  let currCol = col;

  while (remainder > 0) {
    currCol--;
    remainder--;

    if (grid[row][currCol] >= 0) {
      grid[row][currCol]++;
    } else {
      // we append a 0 to every row
      prependNewCol(grid);
      if (currCol < 0) {
        currCol = 0;
      }
      grid[row][currCol]++;
    }
  }

  return {
    row,
    col: currCol
  };
};

const traverseRight = (
  count: number,
  grid: number[][],
  coordinates: ICoordinates
): ICoordinates => {
  const { row, col } = coordinates;

  let remainder = count;
  let currCol = col;

  while (remainder > 0) {
    currCol++;
    remainder--;

    if (grid[row][currCol] >= 0) {
      grid[row][currCol]++;
    } else {
      // we append a 0 to every row
      appendNewCol(grid);
      grid[row][currCol]++;
    }
  }

  return {
    row,
    col: currCol
  };
};

const buildWireGrid = (
  instructions: string[],
  grid: number[][]
): number[][] => {
  // TODO: either receive coordinates of ORIGIN
  // Or write a method to compute ORIGIN
  let col = 0;
  let row = 0;

  for (let i = 0; i < instructions.length; i++) {
    let instruction = instructions[i];
    const { direction, count } = readInstruction(instruction);
    let newCoordinates;

    switch (direction) {
      case EDir.UP:
        newCoordinates = traverseUp(count, grid, { col, row });
        break;
      case EDir.RIGHT:
        newCoordinates = traverseRight(count, grid, { col, row });
        break;
      case EDir.DOWN:
        newCoordinates = traverseDown(count, grid, { col, row });
        break;
      case EDir.LEFT:
        newCoordinates = traverseLeft(count, grid, { col, row });
        break;
    }

    col = newCoordinates.col;
    row = newCoordinates.row;
  }

  return grid;
};

export default buildWireGrid;
