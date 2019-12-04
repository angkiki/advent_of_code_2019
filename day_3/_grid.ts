enum EDir {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

interface IBuildGridResult {
  grid: number[][];
  coordinates: ICoordinates;
  smd: number | null; // shortest manhattan distance
}
interface ITraversalPayload {
  count: number;
  grid: number[][];
  coordinates: ICoordinates;
  marker: number;
  cpc: ICoordinates; // central port coordinates
}

interface ITraversalResult {
  coordinates: ICoordinates;
  smd: number | null; // shortest manhattan distance
}
interface ICoordinates {
  col: number;
  row: number;
}

interface IInstruction {
  direction: EDir;
  count: number;
}

const computeManhattanDistance = (
  centralPort: ICoordinates,
  coordinates: ICoordinates
): number => {
  const cpCol = centralPort.col;
  const cpRow = centralPort.row;

  const coorCol = coordinates.col;
  const coorRow = coordinates.row;

  return Math.abs(cpCol - coorCol) + Math.abs(cpRow - coorRow);
};

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
    count,
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

const prependNewRow = (grid: number[][]) => {
  const lengthOfRows = grid[0].length;
  const newRow = Array(lengthOfRows).fill(0);
  grid.unshift(newRow);
};

const appendNewRow = (grid: number[][]) => {
  const lengthOfRows = grid[0].length;
  const newRow = Array(lengthOfRows).fill(0);
  grid.push(newRow);
};

const traverseUp = ({
  count,
  grid,
  coordinates,
  marker,
  cpc,
}: ITraversalPayload): ITraversalResult => {
  const { row, col } = coordinates;
  let smd = null; // shortest manhattan distance
  let remainder = count;
  let currRow = row;

  while (remainder > 0) {
    currRow -= 1;
    remainder -= 1;

    if (!grid[currRow]) {
      prependNewRow(grid);
      cpc.row += 1;
      if (currRow < 0) {
        currRow = 0;
      }
    }

    if (grid[currRow][col] === 0) {
      grid[currRow][col] = marker;
    } else if (grid[currRow][col] !== marker) {
      grid[currRow][col] = 500;
      const currCoor = {
        col,
        row: currRow,
      };

      let distance = computeManhattanDistance(cpc, currCoor);
      if (smd === null || distance < smd) {
        smd = distance;
      }
    }
  }

  return {
    coordinates: {
      col,
      row: currRow,
    },
    smd,
  };
};

const traverseDown = ({
  count,
  grid,
  coordinates,
  marker,
  cpc,
}: ITraversalPayload): ITraversalResult => {
  const { row, col } = coordinates;
  let smd = null; // shortest manhattan distance
  let remainder = count;
  let currRow = row;

  while (remainder > 0) {
    currRow += 1;
    remainder -= 1;

    if (!grid[currRow]) {
      appendNewRow(grid);
      if (currRow < 0) {
        currRow = 0;
      }
    }

    if (grid[currRow][col] === 0) {
      grid[currRow][col] = marker;
    } else if (grid[currRow][col] !== marker) {
      grid[currRow][col] = 500;
      const currCoor = {
        col,
        row: currRow,
      };

      let distance = computeManhattanDistance(cpc, currCoor);
      if (smd === null || distance < smd) {
        smd = distance;
      }
    }
  }

  return {
    coordinates: {
      col,
      row: currRow,
    },
    smd,
  };
};

const traverseLeft = ({
  count,
  grid,
  coordinates,
  marker,
  cpc,
}: ITraversalPayload): ITraversalResult => {
  const { row, col } = coordinates;
  let smd = null; // shortest manhattan distance
  let remainder = count;
  let currCol = col;

  while (remainder > 0) {
    currCol -= 1;
    remainder -= 1;

    if (typeof grid[row][currCol] !== "number") {
      prependNewCol(grid);
      cpc.col += 1;
      if (currCol < 0) {
        currCol = 0;
      }
    }

    if (grid[row][currCol] === 0) {
      grid[row][currCol] = marker;
    } else if (grid[row][currCol] !== marker) {
      grid[row][currCol] = 500;
      const currCoor = {
        col: currCol,
        row,
      };

      let distance = computeManhattanDistance(cpc, currCoor);
      if (smd === null || distance < smd) {
        smd = distance;
      }
    }
  }

  return {
    coordinates: {
      col: currCol,
      row,
    },
    smd,
  };
};

const traverseRight = ({
  count,
  grid,
  coordinates,
  marker,
  cpc,
}: ITraversalPayload): ITraversalResult => {
  const { row, col } = coordinates;
  let smd = null; // shortest manhattan distance
  let remainder = count;
  let currCol = col;

  while (remainder > 0) {
    currCol += 1;
    remainder -= 1;

    if (typeof grid[row][currCol] !== "number") {
      appendNewCol(grid);
    }

    if (grid[row][currCol] === 0) {
      grid[row][currCol] = marker;
    } else if (grid[row][currCol] !== marker) {
      grid[row][currCol] = 500;
      const currCoor = {
        col: currCol,
        row,
      };

      let distance = computeManhattanDistance(cpc, currCoor);
      if (smd === null || distance < smd) {
        smd = distance;
      }
    }
  }

  return {
    coordinates: {
      col: currCol,
      row,
    },
    smd,
  };
};

export const buildWireGrid = (
  instructions: string[],
  grid: number[][],
  centralPort: ICoordinates,
  marker: number
): IBuildGridResult => {
  const centralPortCoordinates = {
    col: centralPort.col,
    row: centralPort.row,
  };

  let tempCol = centralPort.col;
  let tempRow = centralPort.row;
  let smd = null;

  for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const { direction, count } = readInstruction(instruction);
    const currCoordinates = {
      col: tempCol,
      row: tempRow,
    };
    let result: ITraversalResult;

    const payload: ITraversalPayload = {
      count,
      grid,
      coordinates: currCoordinates,
      marker,
      cpc: centralPortCoordinates,
    };

    switch (direction) {
      case EDir.UP:
        result = traverseUp(payload);
        break;
      case EDir.RIGHT:
        result = traverseRight(payload);
        break;
      case EDir.DOWN:
        result = traverseDown(payload);
        break;
      case EDir.LEFT:
        result = traverseLeft(payload);
        break;
    }

    tempCol = result.coordinates.col;
    tempRow = result.coordinates.row;
    if (smd === null || result.smd < smd) {
      smd = result.smd;
    }
  }

  return {
    grid,
    coordinates: centralPortCoordinates,
    smd,
  };
};
