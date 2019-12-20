export class Scaffold {
  map: (string | null)[][];
  row: number;
  pointer: number;

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

  private shiftPointer = () => {
    let newPointer = this.pointer + 1;
    if (this.row > 0 && newPointer > this.map[0].length - 1) {
      newPointer = 0;
    }

    this.pointer = newPointer;
  };
}
