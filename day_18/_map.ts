interface ICoords {
  col: number;
  row: number;
}

export class Map {
  map: string[][];

  constructor(map: string[][]) {
    this.map = map;
  }

  printMap = () => {
    this.map.forEach(row => {
      let r = '';
      row.forEach(c => (r += c));
      console.log(r);
    });
  };
}
