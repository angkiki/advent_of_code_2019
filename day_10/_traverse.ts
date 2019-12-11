interface ICoordinates {
  col: number;
  row: number;
}

interface IOffsetMemo {
  [key: string]: boolean;
}

// find greatest common divisor
export const findGCD = (n1: number, n2: number): number => {
  if (!n2) {
    return n1;
  }

  return findGCD(n2, n1 % n2);
};

// this will be Colums and Rows relative to Origin
const deriveOffset = (col: number, row: number): ICoordinates => {
  // check for 0s first
  if (col === 0) return { col: 0, row: row > 0 ? 1 : -1 };
  if (row === 0) return { col: col > 0 ? 1 : -1, row: 0 };

  const divisor = findGCD(Math.abs(col), Math.abs(row));
  return {
    col: col / divisor,
    row: row / divisor,
  };
};

const constructOffsetKey = (coords: ICoordinates): string =>
  `${coords.col}-${coords.row}`;

export const scanRow = (
  asteroidRow: string[],
  origin: ICoordinates,
  currentRow: number,
  offsetMemo: IOffsetMemo
): number => {
  let totalVisibleAseteroids = 0;

  const { col, row } = origin;

  // row is the "origin", so a negative number indicates
  // a row that is "down" from "origin"
  const offsetRow = row - currentRow;

  for (let i = 0; i < asteroidRow.length; i++) {
    // skip origin
    if (i === col && row === currentRow) continue;

    if (asteroidRow[i] === '#') {
      // col is the "origin", so a negative number indicates
      // a col that is to the right
      const offsetCol = col - i;

      const offset = deriveOffset(offsetCol, offsetRow);
      const key = constructOffsetKey(offset);

      if (offsetMemo[key]) continue;

      offsetMemo[key] = true;
      totalVisibleAseteroids += 1;
    }
  }

  return totalVisibleAseteroids;
};
