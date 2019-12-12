export enum EDirection {
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
  LEFT = 'left',
}

export interface IHullMap {
  color: number;
  visited: boolean;
}
export interface ICoordinates {
  col: number;
  row: number;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Append & Prepend - Rows & Cols
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const prependRow = (hullMap: IHullMap[][]) => {
  const rowLen = hullMap[0].length;
  const newRow = Array(rowLen)
    .fill({})
    .map(_ => ({ color: 0, visited: false }));
  hullMap.unshift(newRow);
};

const appendRow = (hullMap: IHullMap[][]) => {
  const rowLen = hullMap[0].length;
  const newRow = Array(rowLen)
    .fill({})
    .map(_ => ({ color: 0, visited: false }));
  hullMap.push(newRow);
};

const prependCol = (hullMap: IHullMap[][]) => hullMap.forEach(r => r.unshift({ color: 0, visited: false }));
const appendCol = (hullMap: IHullMap[][]) => hullMap.forEach(r => r.push({ color: 0, visited: false }));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Map Traversal
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const traverseUp = (hullMap: IHullMap[][], coords: ICoordinates) => {
  const { row } = coords;
  if (!hullMap[row - 1]) {
    prependRow(hullMap);
    // account for offset in row
    coords.row += 1;
  }
};

const traverseDown = (hullMap: IHullMap[][], coords: ICoordinates) => {
  const { row } = coords;
  if (!hullMap[row + 1]) appendRow(hullMap);
};

const traverseLeft = (hullMap: IHullMap[][], coords: ICoordinates) => {
  const { row, col } = coords;
  if (!hullMap[row][col - 1]) {
    prependCol(hullMap);
    // account for offset in col
    coords.col += 1;
  }
};

const traverseRight = (hullMap: IHullMap[][], coords: ICoordinates) => {
  const { row, col } = coords;
  if (!hullMap[row][col + 1]) appendCol(hullMap);
};

// moves 1 step in the indicated direction, and will handle append/prepend row/col
export const traverseHull = (hullMap: IHullMap[][], direction: EDirection, coords: ICoordinates) => {
  switch (direction) {
    case EDirection.UP:
      traverseUp(hullMap, coords);
      coords.row -= 1;
      break;
    case EDirection.DOWN:
      traverseDown(hullMap, coords);
      coords.row += 1;
      break;
    case EDirection.RIGHT:
      traverseRight(hullMap, coords);
      coords.col += 1;
      break;
    case EDirection.LEFT:
      traverseLeft(hullMap, coords);
      coords.col -= 1;
      break;
  }

  if (!hullMap[coords.row][coords.col]) {
    console.log('direction that was traversed ->', direction);
    console.log('current row -> ', hullMap[coords.row]);
    console.log('col -> ', coords.col);

    throw Error('invalid traversal');
  }
};

export const paintPanel = (hullMap: IHullMap[][], coords: ICoordinates, colour: number) => {
  const { col, row } = coords;
  hullMap[row][col].color = colour;
  hullMap[row][col].visited = true;
};

export const countVisitedPanels = (hullMap: IHullMap[][]): number => {
  let total = 0;
  hullMap.forEach(row => {
    total += row.reduce((acc, curr) => acc + (curr.visited ? 1 : 0), 0);
  });

  return total;
};

export const turnLeft = (currDir: EDirection): EDirection => {
  switch (currDir) {
    case EDirection.UP:
      return EDirection.LEFT;
    case EDirection.RIGHT:
      return EDirection.UP;
    case EDirection.DOWN:
      return EDirection.RIGHT;
    case EDirection.LEFT:
      return EDirection.DOWN;
  }
};

export const turnRight = (currDir: EDirection): EDirection => {
  switch (currDir) {
    case EDirection.UP:
      return EDirection.RIGHT;
    case EDirection.RIGHT:
      return EDirection.DOWN;
    case EDirection.DOWN:
      return EDirection.LEFT;
    case EDirection.LEFT:
      return EDirection.UP;
  }
};

export const printHull = (hullMap: IHullMap[][]) => {
  hullMap.forEach((row: IHullMap[]) => {
    let result = '';

    row.forEach((hull: IHullMap) => {
      hull.color === 0 ? (result += '_') : (result += '#');
    });

    console.log(result);
  });
};
