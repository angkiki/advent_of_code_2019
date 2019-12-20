export class Scaffold {
  map: (string | null)[][];
  row: number;
  pointer: number;

  readonly VALID_CHARS = ['#', '^', '<', '>', 'v'];
  readonly INTERSECTION = 'X';

  constructor() {
    this.map = [[]];
    this.row = 0;
    this.pointer = 0;
  }

  chart = (char: string) => {
    const { row, pointer } = this;
    if (row === 0) {
      this.map[0].push(char);
    } else {
      this.map[row][pointer] = char;
      this.shiftPointer();
    }
  };

  down = () => {
    const rowLen = this.map[0].length;
    const newRow = Array(rowLen).fill('.');
    this.map.push([...newRow]);
    this.row += 1;
    this.pointer = 0;
  };

  printScaffold = () => {
    this.map.forEach(r => {
      let res = '';
      r.forEach(c => (res += c));
      console.log(res);
    });
  };

  markIntersections = () => {
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (this.isIntersection(col, row)) {
          this.map[row][col] = this.INTERSECTION;
        }
      }
    }
  };

  computeIntersections = (): number => {
    let total = 0;

    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        if (this.map[row][col] === this.INTERSECTION) {
          total += row * col;
        }
      }
    }

    return total;
  };

  private isIntersection = (col: number, row: number): boolean => {
    try {
      const v = this.VALID_CHARS;
      const up = this.map[row - 1][col];
      const d = this.map[row + 1][col];
      const l = this.map[row][col - 1];
      const r = this.map[row][col + 1];

      return v.includes(up) && v.includes(d) && v.includes(l) && v.includes(r);
    } catch (e) {
      return false;
    }
  };

  private shiftPointer = () => {
    let newPointer = this.pointer + 1;
    if (this.row > 0 && newPointer > this.map[0].length - 1) {
      newPointer = 0;
    }

    this.pointer = newPointer;
  };
}
