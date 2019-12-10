interface ICoordinates {
  col: number;
  row: number;
}

interface IOffsetMemo {
  [key: string]: boolean;
}

// this will be Colums and Rows relative to Origin
const deriveOffset = (col: number, row: number): ICoordinates => {
  // check for 0s first
  if (col === 0) return { col: 0, row: row > 0 ? 1 : -1 };
  if (row === 0) return { col: col > 0 ? 1 : -1, row: 0 };

  // col is +ve, row is -ve, indicating a top right movement
  if (col > 0 && row < 0) {
    // Math.abs the row just to find the smaller number as the LCM
    if (col > Math.abs(row) && col % row === 0) {
      return { row: -1, col: col / -row };
    } else if (row % col === 0) {
      return { row: row / col, col: 1 };
    }
  }

  // col is -ve, row is -ve, indicating a top left movement
  if (col < 0 && row < 0) {
    // finding the smaller number as the LCM (means finding the "bigger" number)
    if (col > row && row % col === 0) {
      return { col: -1, row: -(row / col) };
    } else if (col % row === 0) {
      return { col: -(row / col), row: -1 };
    }
  }

  // col is +ve, row is +ve, indicating a bottom right movement
  if (col > 0 && row > 0) {
    if (col > row && col % row === 0) {
      return { col: col / row, row: 1 };
    } else if (row % col === 0) {
      return { col: 1, row: row / col };
    }
  }

  // col is -ve, row is +ve, indicating a bottom left movement
  if (col < 0 && row > 0) {
    // Math.abs the row just to find the smaller number as the LCM
    if (Math.abs(col) > row && col % row === 0) {
      return { col: col / row, row: 1 };
    } else if (row % col === 0) {
      return { col: -1, row: row / -col };
    }
  }

  return {
    col: col,
    row: row,
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

    if (asteroidRow[i] === "#") {
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
