export enum EDirection {
  UP = 'up',
  RIGHT = 'right',
  LEFT = 'left',
  DOWN = 'down',
}

export interface ICoordinates {
  col: number;
  row: number;
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Append & Prepend - Rows & Cols
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const prependRow = (hullMap: number[][]) => {
  const rowLen = hullMap[0].length;
  const newRow = Array(rowLen).fill(0);
  hullMap.unshift(newRow);
};

const appendRow = (hullMap: number[][]) => {
  const rowLen = hullMap[0].length;
  const newRow = Array(rowLen).fill(0);
  hullMap.push(newRow);
};

const prependCol = (hullMap: number[][]) => hullMap.forEach(r => r.unshift(0));
const appendCol = (hullMap: number[][]) => hullMap.forEach(r => r.push(0));

// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Map Traversal
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const traverseUp = (hullMap: number[][], coords: ICoordinates) => {
  const { row } = coords;
  if (!hullMap[row - 1]) prependRow(hullMap);
};

const traverseDown = (hullMap: number[][], coords: ICoordinates) => {
  const { row } = coords;
  if (!hullMap[row + 1]) appendRow(hullMap);
};

const traverseLeft = (hullMap: number[][], coords: ICoordinates) => {
  const { row, col } = coords;
  if (!hullMap[row][col - 1]) prependCol(hullMap);
};

const traverseRight = (hullMap: number[][], coords: ICoordinates) => {
  const { row, col } = coords;
  if (!hullMap[row][col - 1]) appendCol(hullMap);
};

// moves 1 step in the indicated direction, and will handle append/prepend row/col
export const traverseHull = (
  hullMap: number[][],
  direction: EDirection,
  coords: ICoordinates
) => {
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
};

export const paintPanel = (
  hullMap: number[][],
  coords: ICoordinates
): number[][] => {
  const { col, row } = coords;
  hullMap[row][col] = 1;

  return hullMap;
};
